import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Importation de tes images d'assets
import img1 from '../assets/images/after-shampoing.jpg';
import img2 from '../assets/images/all-product.jpg';
import img3 from '../assets/images/pack-shampoing.jpg';
import img4 from '../assets/images/hair-mask-three-other.jpg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    { id: 1, img: img1, title: "L'Essence de la Douceur", desc: "Soin Après-Shampoing haute brillance" },
    { id: 2, img: img2, title: "Rituel Holistique", desc: "L'expertise ByAya au service de vos cheveux" },
    { id: 3, img: img3, title: "Éditions Limitées", desc: "Nos coffrets iconiques à partager" },
    { id: 4, img: img4, title: "Nutrition Profonde", desc: "Masques aux actifs naturels précieux" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* SECTION HÉRO : CAROUSEL IMMERSIF */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === slide.id ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Image avec zoom lent automatique */}
            <img 
              src={slide.img} 
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ${currentSlide === slide.id ? 'scale-110' : 'scale-100'}`} 
              alt={slide.title} 
            />
            
            {/* Overlay doux (pas de noir) */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#FAF9F6]/80 flex flex-col justify-center items-center text-center px-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#5D4037] mb-4 animate-fade-in">
                ByAya Switzerland
              </span>
              <h2 className="text-4xl md:text-7xl font-serif italic text-[#5D4037] mb-6 drop-shadow-sm">
                {slide.title}
              </h2>
              <p className="text-sm md:text-lg text-[#8D6E63] font-medium max-w-xl opacity-80 italic">
                {slide.desc}
              </p>
              
              <Link to="/products" className="mt-10 px-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-full shadow-2xl hover:bg-[#A68966] transition-all transform hover:-translate-y-1">
                Explorer la collection
              </Link>
            </div>
          </div>
        ))}

        {/* Indicateurs minimalistes */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-4">
          {slides.map((slide) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(slide.id)}
              className={`h-1 transition-all duration-500 rounded-full ${currentSlide === slide.id ? 'bg-primary w-12' : 'bg-primary/20 w-6 hover:bg-primary/40'}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION MANIFESTE (Responsive & Épurée) */}
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-primary/30"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Notre Philosophie</span>
            <div className="h-[1px] w-8 bg-primary/30"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black italic text-[#5D4037] uppercase tracking-tighter leading-tight">
            La nature au service de <br /> votre éclat unique.
          </h1>
          
          <p className="text-base md:text-lg text-[#8D6E63] leading-relaxed italic opacity-80">
            Chez ByAya, nous croyons que chaque cheveu raconte une histoire. 
            Nos soins sont formulés avec des ingrédients botaniques d'exception 
            pour révéler la beauté originelle de votre chevelure, sans compromis.
          </p>

          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
            <div className="text-[9px] font-bold uppercase tracking-widest">Cruelty Free</div>
            <div className="text-[9px] font-bold uppercase tracking-widest">Swiss Made</div>
            <div className="text-[9px] font-bold uppercase tracking-widest">Natural Actives</div>
            <div className="text-[9px] font-bold uppercase tracking-widest">Paraben Free</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;