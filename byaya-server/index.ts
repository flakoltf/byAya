import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// 1. Charger les variables d'environnement
dotenv.config();

// 2. Initialisation de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

const app = express();

// 3. Configuration CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL de ton projet React
  credentials: true
}));

app.use(express.json());

// --- ROUTE 1 : PAIEMENT STRIPE ---
app.post('/create-checkout-session', async (req: Request, res: Response) => {
  console.log("📥 Requête de paiement reçue !");
  try {
    const { items, email } = req.body;

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
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cart',
    });

    console.log("✅ Session Stripe créée");
    res.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Erreur Stripe:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// --- ROUTE 2 : FORMULAIRE DE CONTACT ---
app.post('/api/contact', async (req: Request, res: Response) => {
  console.log("📧 Nouveau message de contact reçu !");
  const { name, email, subject, message } = req.body;

  // Configurer le transporteur d'email (Exemple avec Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Ton adresse Gmail
      pass: process.env.EMAIL_PASS, // Ton mot de passe d'application Google
    },
  });

  const mailOptions = {
    from: email,
    to: 'contact@byaya.ch', // Ton adresse de réception
    subject: `[BY AYA] ${subject}`,
    text: `Nouveau message de : ${name} (${email})\n\nMessage :\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé avec succès");
    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("❌ Erreur Email:", error.message);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
  }
});

// --- DÉMARRAGE DU SERVEUR ---
const PORT = 8080;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`
  🚀 SERVEUR BY AYA ACTIF
  📍 URL : http://127.0.0.1:${PORT}
  💳 Stripe : Opérationnel
  📧 Contact : Opérationnel
  `);
});