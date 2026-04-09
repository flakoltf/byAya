import { useNavigate } from 'react-router-dom';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// 1. INITIALISATION DE STRIPE (Frontend)
// Mets ta clé publique pk_test ici
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_valeur_par_defaut');
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ServiceStripe = () => {
  const navigate = useNavigate();

  // 2. FONCTION DE PAIEMENT (La logique pro)
  const handleStripePayment = async (): Promise<void> => {
    try {
      const stripe = await stripePromise as any;
      if (!stripe) throw new Error("Stripe n'a pas pu être chargé.");

      // Appel au backend
      const response = await fetch(`${API_URL}/create-checkout-session`, {
          method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            items: [{ name: "Rituel Shampooing", price: 35.00, quantity: 1 }]
        })
      });

      if (!response.ok) throw new Error("Le serveur Backend ne répond pas.");

      const session = await response.json();

      if (session.url) {
        // Redirection vers Stripe
        window.location.href = session.url;
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de paiement : Veuillez vérifier la connexion au serveur.");
    }
  };

  // 3. LE VISUEL (Ton interface)
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 pt-10">
      <div className="pt-24 pb-16 px-4 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary opacity-40 mb-4 block">
          Expertise & Soins
        </span>
        <h1 className="text-4xl md:text-6xl font-black italic text-primary uppercase tracking-tighter mb-6">
          Nos Services <span className="text-[#5D4037]">Exclusifs</span>
        </h1>
      </div>

      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="group bg-white rounded-[3rem] p-10 shadow-xl border border-primary/5 transition-all duration-500 hover:border-primary/20 hover:-translate-y-2">
            <div className="flex justify-between items-start mb-8">
              <div className="bg-[#FAF9F6] p-4 rounded-2xl">
                <SparklesIcon className="w-8 h-8 text-primary opacity-60" />
              </div>
              <span className="text-3xl font-serif italic text-primary">35.00 <small className="text-xs not-italic opacity-50">CHF</small></span>
            </div>

            <h3 className="text-2xl font-black italic text-[#5D4037] mb-4 uppercase tracking-tighter">
              Rituel Shampooing
            </h3>
            
            <p className="text-[#8D6E63] italic text-sm leading-relaxed mb-8 opacity-80">
              Un nettoyage profond respectant l'équilibre naturel de votre cuir chevelu.
            </p>

            <ul className="space-y-4 mb-10 text-[11px] font-black uppercase tracking-widest text-primary/60">
              <li className="flex items-center gap-3"><CheckCircleIcon className="w-4 h-4 text-green-400" /> Produits 100% naturels</li>
              <li className="flex items-center gap-3"><CheckCircleIcon className="w-4 h-4 text-green-400" /> Massage crânien relaxant</li>
            </ul>

            <button 
              onClick={handleStripePayment}
              className="btn btn-primary btn-block h-16 rounded-2xl shadow-lg text-white font-black uppercase tracking-[0.2em] text-[10px] border-none group-hover:scale-[1.02] transition-all"
            >
              Réserver ce soin
            </button>
          </div>

          <div className="bg-[#FAF9F6] rounded-[3rem] p-10 border border-dashed border-primary/20 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-black italic text-[#5D4037] opacity-40 uppercase tracking-tighter">Diagnostic Privé</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/30">Bientôt disponible</p>
          </div>

        </div>
      </div>
    </div>
  );
};