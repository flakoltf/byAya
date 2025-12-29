import { useNavigate } from 'react-router-dom';
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const ServiceStripe = () => {
  const navigate = useNavigate();

  // TON LIEN DE TEST STRIPE
  const SHAMPOOING_LINK = "https://buy.stripe.com/test_00w7sM5mHexo9cg3KCcMM00";

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* HEADER STYLE BYAYA */}
      <div className="pt-24 pb-16 px-4 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary opacity-40 mb-4 block">
          Expertise & Soins
        </span>
        <h1 className="text-4xl md:text-6xl font-black italic text-primary uppercase tracking-tighter mb-6">
          Nos Services <span className="text-[#5D4037]">Exclusifs</span>
        </h1>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* CARTE SERVICE : SHAMPOOING / SOIN */}
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
              Un nettoyage profond respectant l'équilibre naturel de votre cuir chevelu, infusé aux essences précieuses ByAya.
            </p>

            <ul className="space-y-4 mb-10 text-[11px] font-black uppercase tracking-widest text-primary/60">
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-4 h-4 text-green-400" /> Analyse de porosité incluse
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-4 h-4 text-green-400" /> Massage crânien relaxant
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-4 h-4 text-green-400" /> Produits 100% naturels
              </li>
            </ul>

            <button 
              onClick={() => window.location.href = SHAMPOOING_LINK}
              className="btn btn-primary btn-block h-16 rounded-2xl shadow-lg text-white font-black uppercase tracking-[0.2em] text-[10px] border-none group-hover:scale-[1.02] transition-transform"
            >
              Réserver ce soin
            </button>
          </div>

          {/* CARTE SERVICE : PROCHAINEMENT (DESIGN VIDE) */}
          <div className="bg-[#FAF9F6] rounded-[3rem] p-10 border border-dashed border-primary/20 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-6 rounded-full shadow-sm mb-6">
              <ShieldCheckIcon className="w-10 h-10 text-primary opacity-20" />
            </div>
            <h3 className="text-xl font-black italic text-[#5D4037] opacity-40 uppercase tracking-tighter mb-2">
              Diagnostic Privé
            </h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/30">
              Bientôt disponible
            </p>
          </div>

        </div>

        {/* SECTION RÉASSURANCE */}
        <div className="mt-20 py-10 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <ShieldCheckIcon className="w-6 h-6 text-primary opacity-30" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-40">
              Paiement TWINT & Cartes sécurisé
            </span>
          </div>
          
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:gap-4 transition-all"
          >
            Voir toute la collection <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceStripe;