import express, { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

const app = express();

// Configuration CORS simplifiée mais efficace
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.post('/create-checkout-session', async (req: Request, res: Response) => {
  console.log("📥 Requête de paiement reçue !"); // Tu dois voir ça dans le terminal
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

    console.log("✅ Session Stripe créée avec succès");
    res.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Erreur Stripe:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// On écoute sur 127.0.0.1 pour être sûr que c'est local
app.listen(8080, '127.0.0.1', () => {
  console.log(`🚀 SERVEUR ACTIF SUR http://127.0.0.1:8080`);
});