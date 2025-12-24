import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline'; // Utilisation de ShoppingBagIcon

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-2 md:px-6 h-16 flex items-center">
      {/* --- PARTIE GAUCHE : LOGO & BURGER --- */}
      <div className="navbar-start flex items-center">
        <div className="dropdown lg:hidden">
          {/* Bouton Menu avec fond beige/crème */}
          <label tabIndex={0} className="btn btn-ghost btn-circle bg-base-200 hover:bg-base-300 border-none mr-2">
            <Bars3Icon className="h-6 w-6 text-primary" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-200">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/products">Boutique</Link></li>
            {user?.user_metadata?.role === 'admin' && (
              <li><Link to="/admin" className="text-secondary font-bold">Dashboard Admin</Link></li>
            )}
          </ul>
        </div>
        
        <Link to="/" className="btn btn-ghost text-2xl font-black italic text-primary tracking-tighter flex items-center h-full">
          ByAya
        </Link>
      </div>

      {/* --- PARTIE CENTRALE : MENU (PC) --- */}
      <div className="navbar-center hidden lg:flex items-center">
        <ul className="menu menu-horizontal px-1 font-medium gap-2 text-primary">
          <li><Link to="/products" className="hover:opacity-70 transition-opacity uppercase text-xs font-bold tracking-widest">Boutique</Link></li>
        </ul>
      </div>

      {/* --- PARTIE DROITE : PANIER & COMPTE --- */}
      <div className="navbar-end flex items-center gap-2">
        
        {/* BOUTON PANIER : Même fond que le menu burger */}
        <Link to="/cart" className="btn btn-ghost btn-circle bg-base-200 hover:bg-base-300 border-none flex items-center justify-center mr-1">
          <div className="indicator">
            <ShoppingBagIcon className="h-6 w-6 text-primary" />
            {totalItems > 0 && (
              <span className="badge badge-sm badge-primary indicator-item font-bold border-none text-white">
                {totalItems}
              </span>
            )}
          </div>
        </Link>

        {/* Profil / Connexion */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online flex items-center p-0">
              <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold border-2 border-primary shadow-sm">
                {user.user_metadata?.first_name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-200">
              <li className="px-4 py-2 font-bold text-primary italic border-b mb-2">
                Bonjour, {user.user_metadata?.first_name || 'Ami(e)'}
              </li>
              {user.user_metadata?.role === 'admin' && (
                <li><Link to="/admin" className="text-secondary font-bold">✨ Dashboard Admin</Link></li>
              )}
              <li><Link to="/profile">Mon Profil</Link></li>
              <li><Link to="/orders">Mes Commandes</Link></li>
              <div className="divider my-1"></div>
              <li><button onClick={handleLogout} className="text-error font-bold">Déconnexion</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Link to="/login" className="btn btn-ghost btn-sm hidden sm:flex text-primary font-bold">Connexion</Link>
            <Link to="/register" className="btn btn-primary btn-sm text-white rounded-full px-5 shadow-md">S'inscrire</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;