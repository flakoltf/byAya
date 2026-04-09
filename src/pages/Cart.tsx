import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ShoppingBagIcon, 
  PlusIcon, 
  MinusIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const Cart = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart(); 
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  const handleCheckoutClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    try {
      // APPEL RESILIENT (Au cas où il y a un / à la fin de l'URL)
      const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');
      const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          items: cart.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image_url 
          })), 
          email: session.user.email 
        }),
      });

      if (!response.ok) throw new Error("Le serveur sur le port 8080 ne répond pas.");

      const data = await response.json();

      if (data?.url) {
        window.location.href = data.url; // Redirection vers Stripe
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      alert("Erreur : Impossible de joindre le serveur de paiement sur le port 8080.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#FAF9F6]">
        <div className="bg-white p-10 rounded-full shadow-sm mb-8 border border-primary/10">
          <ShoppingBagIcon className="h-16 w-16 text-primary opacity-20" />
        </div>
        <h2 className="text-4xl font-black italic text-[#5D4037] mb-4 uppercase tracking-tighter">Votre panier est vide</h2>
        <Link to="/products" className="btn btn-primary rounded-full px-12 shadow-xl text-white font-bold uppercase tracking-widest text-xs">
          Explorer la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 pt-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-black italic mb-12 text-primary uppercase tracking-tighter">Mon Panier</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item: any) => (
              <div key={item.id} className="bg-white rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-primary/5">
                <img src={item.image_url} alt={item.name} className="w-32 h-32 object-cover rounded-2xl" />
                <div className="flex-1">
                  <h3 className="font-serif italic text-xl text-[#5D4037]">{item.name}</h3>
                  <div className="flex items-center gap-4 mt-4">
                    <button onClick={() => decreaseQuantity(item.id)} className="p-2 bg-[#FAF9F6] rounded-lg"><MinusIcon className="w-4 h-4"/></button>
                    <span className="font-bold">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="p-2 bg-[#FAF9F6] rounded-lg"><PlusIcon className="w-4 h-4"/></button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif italic text-xl text-[#5D4037]">{(item.price * item.quantity).toFixed(2)} CHF</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-300 text-[10px] uppercase font-bold mt-2">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-primary/5 sticky top-28">
              <h2 className="text-2xl font-black italic mb-6 text-[#5D4037]">Résumé</h2>
              <div className="flex justify-between mb-4 border-b pb-4"><span className="italic text-[#8D6E63]">Total</span><span className="text-3xl font-serif italic text-[#5D4037]">{totalPrice.toFixed(2)} CHF</span></div>
              <button onClick={handleCheckoutClick} className="btn btn-primary btn-block h-16 rounded-2xl text-white font-black uppercase tracking-widest text-xs">Payer avec Stripe</button>
              <div className="flex items-center justify-center gap-2 mt-6 text-[9px] font-black uppercase tracking-widest text-primary opacity-40">
                <ShieldCheckIcon className="w-4 h-4" /> Paiement Sécurisé
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;