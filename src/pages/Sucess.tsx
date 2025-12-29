import { useNavigate } from 'react-router-dom';
import { 
  CheckBadgeIcon, 
  ShoppingBagIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        
        {/* CARTE DE SUCCÈS STYLE BYAYA */}
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-primary/5 relative overflow-hidden">
          
          {/* ÉLÉMENT DÉCORATIF EN ARRIÈRE-PLAN */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          {/* ICÔNE DE VALIDATION */}
          <div className="flex justify-center mb-10">
            <div className="bg-[#FAF9F6] p-6 rounded-full border border-primary/10 animate-pulse">
              <CheckBadgeIcon className="h-16 w-16 text-primary" />
            </div>
          </div>

          {/* TEXTES */}
          <h1 className="text-4xl md:text-5xl font-black italic text-primary uppercase tracking-tighter mb-6">
            Paiement Réussi
          </h1>
          
          <div className="w-16 h-1 bg-primary mx-auto rounded-full opacity-20 mb-8"></div>

          <p className="text-[#5D4037] font-serif italic text-xl mb-4">
            Merci pour votre confiance, Aya.
          </p>
          
          <p className="text-[#8D6E63] text-sm leading-relaxed mb-12 max-w-sm mx-auto opacity-70 uppercase tracking-widest font-bold">
            Votre rituel capillaire est en cours de préparation. Un e-mail de confirmation vient de vous être envoyé.
          </p>

          {/* ACTIONS */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => navigate('/orders')}
              className="btn btn-primary h-16 rounded-2xl shadow-xl text-white font-black uppercase tracking-[0.2em] text-[10px] border-none transition-transform hover:-translate-y-1"
            >
              Voir mon historique de soins
            </button>
            
            <button 
              onClick={() => navigate('/products')}
              className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 hover:text-primary transition-colors py-4"
            >
              Continuer mes achats <ArrowRightIcon className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* FOOTER MINIMALISTE */}
        <div className="mt-12">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary opacity-30">
            ByAya — L'excellence capillaire suisse
          </p>
        </div>

      </div>
    </div>
  );
};

export default Success;