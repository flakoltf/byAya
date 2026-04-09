import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});

// Initialisation du client d'administration Supabase
const supabaseAdminUrl = process.env.SUPABASE_URL as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// On utilise un try/catch silencieux ou on instancie seulement si les clés sont là pour éviter les crash local dev
const supabase = (supabaseAdminUrl && supabaseServiceKey) 
  ? createClient(supabaseAdminUrl, supabaseServiceKey) 
  : null;

const app = express();

const ALLOWED_ORIGINS = process.env.NODE_ENV === 'production' 
  ? ['https://byaya.ch', 'https://www.byaya.ch'] 
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// --- ROUTE SPECIALE : WEBHOOK STRIPE ---
// Attention: le webhook Stripe a besoin du corps de la requête "brut" (raw) pour la vérification sécurisée
app.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Traiter l'événement de paiement réussi
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    
    if (orderId && supabase) {
      console.log(`Paiement réussi pour la commande : ${orderId}`);
      // Mise à jour de la base de données vers "payée"
      const { error } = await supabase
        .from('orders')
        .update({ status: 'payée' })
        .eq('id', orderId);
        
      if (error) console.error("Erreur de mise à jour Supabase :", error);
    }
  }

  res.json({ received: true });
});

// A partir d'ici, on peut utiliser express.json() pour le reste des requêtes (Checkout, Contact, etc)
app.use(express.json());

// --- ROUTE 1 : PAIEMENT STRIPE ---
app.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    // orderId est fourni par le Frontend
    const { items, email, orderId } = req.body;
    const origin = req.headers.origin || 'https://byaya.ch';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'chf',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      // On attache l'identifiant de la base de données au reçu de paiement !!
      metadata: { orderId: orderId || '' },
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cart`,
    });
    res.json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Erreur interne" });
  }
});

// --- ROUTE 2 : FORMULAIRE DE CONTACT ---
app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'contact@byaya.ch',
      subject: `[BY AYA] ${subject}`,
      text: `Nouveau message de : ${name} (${email})\n\nMessage :\n${message}`,
    });
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: "Erreur lors de l'envoi" });
  }
});

export default app;