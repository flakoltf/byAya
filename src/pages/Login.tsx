import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate(from, { replace: true });
    } catch (error: any) {
      setErrorMsg(error.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-[440px]">
        
        {/* LOGO / TITRE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic text-primary tracking-tighter uppercase mb-2">ByAya</h1>
          <div className="w-10 h-0.5 bg-primary mx-auto opacity-20"></div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-primary/5 p-8 md:p-10">
          
          {/* Message spécial Panier */}
          {location.state?.from === '/cart' && (
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-8 text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-tight">
                Connectez-vous pour finaliser <br /> votre commande ByAya
              </p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-[#5D4037] italic mb-8 text-center">Connexion</h2>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-xl mb-6 border border-red-100 animate-pulse">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* EMAIL */}
            <div className="form-control">
              <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-primary opacity-30" />
                </div>
                <input 
                  type="email" 
                  placeholder="votre@email.ch" 
                  className="input w-full pl-12 bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* MOT DE PASSE */}
            <div className="form-control">
              <label className="label-text text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-primary opacity-30" />
                </div>
                <input 
                  type="password" 
                  placeholder="********" 
                  className="input w-full pl-12 bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* BOUTON CONNEXION */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className={`btn btn-block h-16 rounded-2xl border-none shadow-lg text-white font-black uppercase tracking-[0.2em] transition-all bg-primary hover:bg-[#A68966] ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Authentification...' : 'Se connecter'}
              </button>
            </div>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-primary/10"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-primary/40 bg-white px-4">Nouveau client ?</div>
          </div>

          <div className="text-center">
            <p className="text-sm text-[#8D6E63] italic">
              Découvrez nos soins naturels exclusifs. <br />
              <Link to="/register" className="text-primary font-black hover:underline mt-2 block not-italic uppercase tracking-tighter">
                Créer un compte ByAya
              </Link>
            </p>
          </div>
        </div>
        
        <p className="mt-10 text-center text-[10px] uppercase font-bold tracking-[0.3em] text-primary opacity-30">
          © ByAya — Soins Capillaires d'Exception
        </p>
      </div>
    </div>
  );
};

export default Login;