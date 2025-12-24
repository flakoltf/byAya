import { useState, useEffect } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // On vérifie si l'utilisateur a déjà donné son accord
    const consent = localStorage.getItem('byaya_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('byaya_cookie_consent', 'accepted');
    setIsVisible(false);
    // Ici, tu peux déclencher le chargement de Google Analytics ou Pixel FB
  };

  const declineCookies = () => {
    localStorage.setItem('byaya_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] animate-fade-in-up">
      <div className="bg-white rounded-[2rem] shadow-2xl border border-primary/10 p-8">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheckIcon className="w-6 h-6 text-primary opacity-40" />
          <h3 className="text-xs font-black uppercase tracking-widest text-[#5D4037]">Confidentialité</h3>
        </div>
        
        <p className="text-[11px] text-[#8D6E63] leading-relaxed mb-8 uppercase tracking-tight">
          Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. 
          En cliquant sur "Accepter", vous consentez à l'utilisation de nos traceurs.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={acceptCookies}
            className="w-full py-3 bg-primary text-white font-black uppercase tracking-widest text-[9px] rounded-xl shadow-lg hover:bg-[#A68966] transition-all"
          >
            Accepter tout
          </button>
          <button 
            onClick={declineCookies}
            className="w-full py-3 bg-[#FAF9F6] text-[#8D6E63] font-black uppercase tracking-widest text-[9px] rounded-xl hover:bg-primary/5 transition-all"
          >
            Continuer sans accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;