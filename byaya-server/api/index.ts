import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

const app = express();

// Mise à jour du CORS pour accepter ton site en ligne
app.use(cors({
  origin: ['http://localhost:5173', 'https://byaya.ch', 'https://www.byaya.ch'], 
  credentials: true
}));

app.use(express.json());

// --- ROUTE 1 : PAIEMENT STRIPE ---
app.post('/create-checkout-session', async (req: Request, res: Response) => {
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
      // Modifie ces URLs avec ton vrai nom de domaine quand tu seras en prod
      success_url: 'https://byaya.ch/success',
      cancel_url: 'https://byaya.ch/cart',
    });
    res.json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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

  const mailOptions = {
    from: email,
    to: 'contact@byaya.ch',
    subject: `[BY AYA] ${subject}`,
    text: `Nouveau message de : ${name} (${email})\n\nMessage :\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: "Erreur lors de l'envoi" });
  }
});

// IMPORTANT POUR VERCEL : On exporte l'app sans faire de app.listen()
export default app;