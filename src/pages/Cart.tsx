import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ShoppingBagIcon, 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const Cart = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart(); 
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  const handleCheckoutClick = async () => {
    // 1. Vérifier si l'utilisateur est connecté
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    try {
      // 2. Appeler la Edge Function Supabase pour créer la session Stripe
      // On envoie le contenu du panier (cart) et l'email de l'utilisateur
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          cartItems: cart, 
          userEmail: session.user.email 
        },
      });

      if (error) throw error;

      // 3. Rediriger vers la page de paiement sécurisée de Stripe
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Erreur lors de l'initialisation du paiement:", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#FAF9F6]">
        <div className="bg-white p-10 rounded-full shadow-sm mb-8 border border-primary/10">
          <ShoppingBagIcon className="h-16 w-16 text-primary opacity-20" />
        </div>
        <h2 className="text-4xl font-black italic text-[#5D4037] mb-4 uppercase tracking-tighter">Votre panier est vide</h2>
        <p className="text-[#8D6E63] italic mb-10 max-w-sm opacity-70">
          Offrez à votre chevelure le soin qu'elle mérite. Parcourez notre collection pour commencer votre rituel.
        </p>
        <Link to="/products" className="btn btn-primary rounded-full px-12 shadow-xl text-white font-bold uppercase tracking-widest text-xs">
          Explorer la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      <div className="container mx-auto pt-16 pb-10 px-4 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-black italic mb-12 text-primary uppercase tracking-tighter text-center md:text-left">
          Mon Panier
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item: any) => (
              <div key={item.id} className="group bg-white rounded-[2rem] shadow-sm border border-primary/5 overflow-hidden transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row items-center">
                  <figure className="w-full md:w-48 h-48 overflow-hidden">
                    <img src={item.image_url} alt={item.name} className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110" />
                  </figure>
                  
                  <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center w-full gap-6">
                    <div className="space-y-2 text-center md:text-left">
                      <h3 className="font-serif italic text-xl text-[#5D4037]">{item.name}</h3>
                      <p className="text-primary font-black text-sm uppercase tracking-widest">{item.price.toFixed(2)} CHF</p>
                      
                      <div className="flex items-center gap-6 mt-6 bg-[#FAF9F6] w-fit mx-auto md:mx-0 rounded-xl px-4 py-2 border border-primary/5">
                        <button 
                          onClick={() => decreaseQuantity(item.id)} 
                          className="text-primary hover:scale-125 transition-transform"
                        >
                          <MinusIcon className="w-4 h-4"/>
                        </button>
                        
                        <span className="font-black text-sm text-[#5D4037] w-4 text-center">{item.quantity}</span>
                        
                        <button 
                          onClick={() => addToCart(item)} 
                          className="text-primary hover:scale-125 transition-transform"
                        >
                          <PlusIcon className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                      <p className="font-serif italic text-2xl text-[#5D4037]">{(item.price * item.quantity).toFixed(2)} <small className="text-xs not-italic opacity-50">CHF</small></p>
                      <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-300 hover:text-red-500 transition-colors">
                        <TrashIcon className="w-3 h-3" /> Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-primary/5 p-8 md:p-10 sticky top-28">
              <h2 className="text-2xl font-black italic mb-8 text-[#5D4037] border-b border-primary/5 pb-4">Résumé</h2>
              <div className="space-y-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8D6E63] font-medium italic">Sous-total</span>
                  <span className="font-bold text-[#5D4037]">{totalPrice.toFixed(2)} CHF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8D6E63] font-medium italic">Livraison</span>
                  <span className="text-primary font-black uppercase tracking-tighter text-[10px] bg-primary/10 px-3 py-1 rounded-full">Offerte</span>
                </div>
                
                <div className="h-[1px] bg-primary/10 my-6"></div>
                
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black uppercase tracking-widest text-primary">Total</span>
                  <span className="text-3xl font-serif italic text-[#5D4037]">{totalPrice.toFixed(2)} <small className="text-xs not-italic font-medium opacity-50">CHF</small></span>
                </div>
                
                <button 
                  onClick={handleCheckoutClick}
                  className="btn btn-primary btn-block h-16 rounded-2xl shadow-xl text-white font-black uppercase tracking-[0.2em] text-xs border-none mt-8 transition-transform hover:-translate-y-1"
                >
                  Passer au paiement
                </button>

                <div className="mt-8 pt-8 border-t border-primary/5">
                  <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary opacity-40 mb-4">
                    <ShieldCheckIcon className="w-4 h-4" /> Paiement 100% Sécurisé
                  </div>
                  <div className="flex justify-center gap-6 opacity-20 grayscale hover:grayscale-0 transition-all">
                    <i className="fa-brands fa-cc-visa text-2xl"></i>
                    <i className="fa-brands fa-cc-mastercard text-2xl"></i>
                    <i className="fa-brands fa-cc-apple-pay text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;