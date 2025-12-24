import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-white text-[#5D4037] border-t border-primary/10">
      {/* SECTION PRINCIPALE */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* COLONNE 1 : LOGO & RÉSEAUX */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-black text-primary tracking-tighter uppercase">ByAya</h2>
            <p className="text-sm text-[#8D6E63] leading-relaxed opacity-80">
              Sublimez votre chevelure avec nos soins naturels et artisanaux. 
              L'excellence suisse pour la santé de vos cheveux.
            </p>
            <div className="flex justify-center md:justify-start gap-5">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-primary hover:opacity-60 transition-opacity">
                <i className="fa-brands fa-instagram text-2xl"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-primary hover:opacity-60 transition-opacity">
                <i className="fa-brands fa-tiktok text-xl mt-0.5"></i>
              </a>
            </div>
          </div>

          {/* COLONNE 2 : NAVIGATION RAPIDE */}
          <div className="text-center md:text-left">
            <h3 className="font-black uppercase text-[10px] tracking-[0.3em] mb-8 text-primary">La Collection</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-tight">
              <li><Link to="/products" className="hover:text-primary transition-colors">Tous les produits</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Notre Histoire</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">Mon Panier</Link></li>
            </ul>
          </div>

          {/* COLONNE 3 : ASSISTANCE (Lien mis à jour vers /diagnostic) */}
          <div className="text-center md:text-left">
            <h3 className="font-black uppercase text-[10px] tracking-[0.3em] mb-8 text-primary">Assistance</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-tight">
              <li><Link to="/profile" className="hover:text-primary transition-colors">Mon Compte</Link></li>
              <li><Link to="/diagnostic" className="hover:text-primary transition-colors">Diagnostic Capillaire</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Livraison & Retours</Link></li>
            </ul>
          </div>

          {/* COLONNE 4 : CONTACT DIRECT */}
          <div className="text-center md:text-left">
            <h3 className="font-black uppercase text-[10px] tracking-[0.3em] mb-8 text-primary">Contact</h3>
            <ul className="space-y-5 text-sm font-bold">
              <li className="flex items-center justify-center md:justify-start gap-4">
                <MapPinIcon className="w-5 h-5 text-primary opacity-40 shrink-0" />
                <span className="text-[#8D6E63] uppercase tracking-tight">Genève, Suisse</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4">
                <PhoneIcon className="w-5 h-5 text-primary opacity-40 shrink-0" />
                <span className="text-[#8D6E63]">+41 79 000 00 00</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4">
                <EnvelopeIcon className="w-5 h-5 text-primary opacity-40 shrink-0" />
                <span className="text-[#8D6E63]">contact@byaya.ch</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* BARRE DE RÉASSURANCE */}
      <div className="bg-[#FAF9F6] border-y border-primary/5 py-10">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <SparklesIcon className="w-6 h-6 text-primary opacity-30" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5D4037]">100% Naturel</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <TruckIcon className="w-6 h-6 text-primary opacity-30" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5D4037]">Expédition Suisse</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <ShieldCheckIcon className="w-6 h-6 text-primary opacity-30" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5D4037]">Paiement Sécurisé</span>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="text-primary opacity-30 font-black text-xl">CH</div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5D4037]">Qualité Helvétique</span>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="bg-white py-8 text-center border-t border-primary/5">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary opacity-30">
          © {new Date().getFullYear()} ByAya Switzerland — Excellence Naturelle
        </p>
      </div>
    </footer>
  );
};

export default Footer;