import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  MapPinIcon, 
  PhoneIcon, 
  CalendarIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    civility: 'Mme',
    address: '',
    birthDate: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            civility: formData.civility,
            address: formData.address,
            phone: formData.phone,
            birth_date: formData.birthDate
          }
        }
      });

      if (error) throw error;

      setIsSuccess(true);
      setMessage("Parfait ! Un lien de confirmation a été envoyé. Veuillez activer votre compte ByAya depuis votre boîte mail.");
      
    } catch (error: any) {
      setMessage(`Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        
        {/* LOGO & TITRE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic text-primary tracking-tighter uppercase mb-2">ByAya</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Rejoindre la collection</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl border border-primary/5 p-8 md:p-12">
          
          {message && (
            <div className={`mb-8 p-6 rounded-2xl flex items-center gap-4 ${isSuccess ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {isSuccess ? <CheckCircleIcon className="w-8 h-8 shrink-0" /> : null}
              <p className="text-sm font-bold italic">{message}</p>
            </div>
          )}

          {!isSuccess && (
            <form onSubmit={handleRegister} className="space-y-8">
              
              <div className="border-b border-primary/5 pb-4">
                <h2 className="text-2xl font-bold text-[#5D4037] italic">Créer mon compte</h2>
                <p className="text-xs text-[#8D6E63] mt-1 opacity-60 italic">Vos informations personnelles pour une expérience sur-mesure.</p>
              </div>

              {/* GRILLE D'INFORMATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                <div className="form-control">
                  <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Civilité</label>
                  <select 
                    className="select bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                    value={formData.civility}
                    onChange={(e) => setFormData({...formData, civility: e.target.value})}
                  >
                    <option value="Mme">Madame</option>
                    <option value="M.">Monsieur</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Prénom</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-30" />
                    <input type="text" placeholder="Aya" required className="input w-full pl-12 bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                      value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Nom</label>
                  <input type="text" placeholder="Letaief" required className="input w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                    value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>

                <div className="form-control">
                  <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Date de naissance</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-30" />
                    <input type="date" required className="input w-full pl-12 bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                      value={formData.birthDate} onChange={(e) => setFormData({...formData, birthDate: e.target.value})} />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Téléphone</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-30" />
                    <input type="tel" placeholder="079 000 00 00" required className="input w-full pl-12 bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Email professionnel</label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-30" />
                    <input type="email" placeholder="votre@mail.com" required className="input w-full pl-12 bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Adresse de livraison par défaut</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-4 top-4 w-5 h-5 text-primary opacity-30" />
                  <textarea 
                    className="textarea w-full pl-12 bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-2xl h-28 font-medium pt-4" 
                    placeholder="Rue, numéro, CP et Ville..." 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="form-control">
                <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Mot de passe sécurisé</label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-30" />
                  <input type="password" placeholder="Minimum 6 caractères" required className="input w-full pl-12 bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                    value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
              </div>

              <div className="pt-6">
                <button 
                  disabled={loading}
                  className={`btn btn-block h-16 rounded-2xl border-none shadow-lg text-white font-black uppercase tracking-[0.2em] transition-all bg-primary hover:bg-[#A68966] ${loading ? 'loading' : ''}`}
                >
                  {loading ? 'Création de votre univers...' : "Confirmer l'inscription"}
                </button>
              </div>
            </form>
          )}

          <div className="text-center mt-10">
            <p className="text-sm text-[#8D6E63] italic opacity-70">
              Déjà membre de la collection ? <br />
              <Link to="/login" className="text-primary font-black uppercase tracking-tighter hover:underline mt-2 inline-block not-italic">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;