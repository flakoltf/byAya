import { useNavigate } from 'react-router-dom';
import { 
  SparklesIcon, 
  BeakerIcon, 
  ShieldCheckIcon,
  CheckBadgeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* HERO SECTION */}
      <section className="pt-24 pb-20 px-4 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 block animate-fade-in">
          ByAya Switzerland
        </span>
        <h1 className="text-5xl md:text-7xl font-black italic text-[#5D4037] uppercase tracking-tighter mb-8 leading-tight">
          L'Héritage <br /> de la Beauté Pure
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full opacity-20"></div>
      </section>

      {/* SECTION 1 : NOTRE HISTOIRE */}
      <section className="container mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center md:text-left">
            <h2 className="text-3xl font-serif italic text-[#5D4037]">Une vision née de l'exigence.</h2>
            <p className="text-[#8D6E63] leading-relaxed italic text-lg opacity-90">
              ByAya est née de la volonté de réconcilier la science capillaire et la pureté de la nature. Inspirée par les paysages suisses, notre marque s'engage à offrir une expérience de soin d'exception.
            </p>
            <p className="text-[#8D6E63] leading-relaxed opacity-70 text-sm uppercase tracking-wide">
              Chaque formule est le fruit d'une recherche méticuleuse pour sublimer vos cheveux sans compromis.
            </p>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-700 border border-primary/5 flex items-center justify-center p-4">
               {/* Remplacer par une vraie image plus tard */}
               <div className="text-primary/20 font-black uppercase tracking-[0.5em] text-center rotate-90 md:rotate-0">
                 ByAya <br /> Signature
               </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[2rem] shadow-xl border border-primary/5 hidden md:block">
              <span className="text-3xl font-black text-primary italic">100%</span>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Naturel & Suisse</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 : NOS PILIERS */}
      <section className="bg-white py-24 border-y border-primary/5">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto">
                <CheckBadgeIcon className="w-8 h-8 text-primary opacity-60" />
              </div>
              <h4 className="text-xl font-bold italic text-[#5D4037]">Pureté Botanique</h4>
              <p className="text-xs text-[#8D6E63] italic leading-relaxed">
                Des ingrédients sourcés avec éthique, sans silicones ni sulfates agressifs.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto">
                <SparklesIcon className="w-8 h-8 text-primary opacity-60" />
              </div>
              <h4 className="text-xl font-bold italic text-[#5D4037]">Éclat Durable</h4>
              <p className="text-xs text-[#8D6E63] italic leading-relaxed">
                Une fibre capillaire traitée en profondeur pour un éclat réel et sain.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto">
                <ShieldCheckIcon className="w-8 h-8 text-primary opacity-60" />
              </div>
              <h4 className="text-xl font-bold italic text-[#5D4037]">Excellence Suisse</h4>
              <p className="text-xs text-[#8D6E63] italic leading-relaxed">
                Une exigence de qualité supérieure héritée du savoir-faire helvétique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : LE MOT DE LA CRÉATRICE */}
      <section className="container mx-auto max-w-3xl px-6 py-32 text-center">
        <BeakerIcon className="w-12 h-12 text-primary mx-auto opacity-20 mb-8" />
        <blockquote className="text-2xl md:text-4xl font-serif italic text-[#5D4037] leading-tight mb-10">
          "ByAya, c'est une invitation à célébrer la beauté brute et authentique que la nature nous offre."
        </blockquote>
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Aya Letaief</p>
          <p className="text-xs italic text-[#8D6E63] opacity-40">Fondatrice — ByAya Switzerland</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="pb-24 px-6 text-center">
        <button 
          onClick={() => navigate('/products')}
          className="group relative inline-flex items-center gap-4 px-12 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-full shadow-2xl hover:bg-[#A68966] transition-all hover:-translate-y-1"
        >
          Voir la collection
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </section>
    </div>
  );
};

export default About;