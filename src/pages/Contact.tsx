import { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
      setTimeout(() => setSent(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* HEADER MINIMALISTE */}
      <div className="pt-20 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black italic text-primary uppercase tracking-tighter mb-4">
          Contactez ByAya
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* GRILLE ALIGNÉE : Utilisation de items-stretch pour égaliser les hauteurs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLONNE GAUCHE : INFOS & CONSEIL (4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Bloc Coordonnées - Belge très clair */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-primary/10 flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-bold italic text-primary mb-8 border-b border-primary/5 pb-4 uppercase tracking-widest">
                Informations
              </h3>
              <div className="space-y-8">
                <div className="flex items-center gap-5 group">
                  <div className="bg-primary/5 p-3 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <MapPinIcon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold opacity-80">Genève, Suisse</span>
                </div>
                <div className="flex items-center gap-5 group">
                  <div className="bg-primary/5 p-3 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <EnvelopeIcon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold opacity-80">contact@byaya.ch</span>
                </div>
                <div className="flex items-center gap-5 group">
                  <div className="bg-primary/5 p-3 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <PhoneIcon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold opacity-80">+41 79 000 00 00</span>
                </div>
              </div>
            </div>

            {/* Bloc Conseil - Belge Signature (Même couleur que le bouton) */}
            <div className="bg-primary/10 border-2 border-primary/20 p-8 rounded-[2rem] flex flex-col items-center text-center justify-center">
              <SparklesIcon className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-lg font-bold text-primary uppercase italic mb-2">Conseil Privé</h3>
              <p className="text-xs font-medium text-primary/80 leading-relaxed max-w-[200px]">
                Diagnostic capillaire gratuit par nos experts sous 24h.
              </p>
            </div>
          </div>

          {/* COLONNE DROITE : FORMULAIRE (8/12) */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-primary/5">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Inputs alignés avec grille */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="form-control">
                    <label className="label-text text-[10px] font-black uppercase text-primary mb-3 ml-1 tracking-widest">Votre Nom</label>
                    <input type="text" required className="input input-bordered w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium" 
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-control">
                    <label className="label-text text-[10px] font-black uppercase text-primary mb-3 ml-1 tracking-widest">Votre Email</label>
                    <input type="email" required className="input input-bordered w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium" 
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label-text text-[10px] font-black uppercase text-primary mb-3 ml-1 tracking-widest">Sujet</label>
                  <input type="text" required className="input input-bordered w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium" 
                    value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                </div>

                <div className="form-control">
                  <label className="label-text text-[10px] font-black uppercase text-primary mb-3 ml-1 tracking-widest">Message</label>
                  <textarea className="textarea textarea-bordered w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-2xl h-44 font-medium"
                    required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                {/* BOUTON ENVOYER : Harmonisé en Beige */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`btn btn-block h-16 rounded-2xl border-none text-sm font-black uppercase tracking-[0.2em] shadow-lg transition-all
                    ${sent ? 'bg-success text-white' : 'bg-primary hover:bg-primary/80 text-white'}`}
                >
                  {loading ? <span className="loading loading-spinner"></span> : 
                   sent ? <div className="flex items-center gap-2"><CheckCircleIcon className="w-5 h-5"/> Envoyé</div> : 
                   'Envoyer ma demande'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;