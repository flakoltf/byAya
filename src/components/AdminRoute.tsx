import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// On utilise React.ReactNode au lieu de JSX.Element
interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        // Vérifie si le rôle dans metadata est bien admin
        setIsAdmin(user?.user_metadata?.role === 'admin');
      } catch (error) {
        console.error("Erreur vérification admin:", error);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  // Pendant que Supabase vérifie, on affiche un écran vide ou un spinner
  if (isAdmin === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Si c'est un admin, on affiche la page, sinon redirection vers l'accueil
  return isAdmin ? <>{children}</> : <Navigate to="/" replace />;
};

export default AdminRoute;