import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  UsersIcon, 
  CurrencyEuroIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    ordersCount: 0,
    customersCount: 0,
    outOfStock: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const { data: orders } = await supabase.from('orders').select('total_price');
        const revenue = orders?.reduce((acc, curr) => acc + Number(curr.total_price), 0) || 0;

        const { count: customers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        const { count: stockOut } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('stock', 0);

        setStats({
          totalRevenue: revenue,
          ordersCount: orders?.length || 0,
          customersCount: customers || 0,
          outOfStock: stockOut || 0
        });
      } catch (error) {
        console.error("Erreur stats dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-dots loading-lg text-primary"></span></div>;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black italic text-primary mb-8 font-serif uppercase tracking-tighter">
          ByAya Business
        </h1>

        {/* GRILLE DES STATISTIQUES FLASH */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="stat bg-base-100 shadow-xl rounded-2xl border-b-4 border-success">
            <div className="stat-figure text-success"><CurrencyEuroIcon className="w-8 h-8" /></div>
            <div className="stat-title font-bold text-sm opacity-60">Revenu Total</div>
            <div className="stat-value text-2xl">{stats.totalRevenue.toFixed(2)}CHF
            </div>
          </div>

          <div className="stat bg-base-100 shadow-xl rounded-2xl border-b-4 border-primary">
            <div className="stat-figure text-primary"><ShoppingBagIcon className="w-8 h-8" /></div>
            <div className="stat-title font-bold text-sm opacity-60">Commandes</div>
            <div className="stat-value text-2xl">{stats.ordersCount}</div>
          </div>

          <div className="stat bg-base-100 shadow-xl rounded-2xl border-b-4 border-info">
            <div className="stat-figure text-info"><UsersIcon className="w-8 h-8" /></div>
            <div className="stat-title font-bold text-sm opacity-60">Clients</div>
            <div className="stat-value text-2xl">{stats.customersCount}</div>
          </div>

          <div className="stat bg-base-100 shadow-xl rounded-2xl border-b-4 border-error">
            <div className="stat-figure text-error"><ExclamationTriangleIcon className="w-8 h-8" /></div>
            <div className="stat-title font-bold text-sm opacity-60">Ruptures Stock</div>
            <div className="stat-value text-2xl">{stats.outOfStock}</div>
          </div>
        </div>

        {/* MENU DE NAVIGATION ADMIN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/admin/orders" className="group card bg-primary text-primary-content shadow-xl hover:scale-105 transition-transform">
            <div className="card-body items-center text-center py-10">
              <ShoppingBagIcon className="w-12 h-12 mb-4 group-hover:animate-bounce" />
              <h2 className="card-title text-2xl">Commandes</h2>
              <p className="opacity-80 text-sm">Gérer les livraisons</p>
            </div>
          </Link>

          <Link to="/admin/products" className="group card bg-secondary text-secondary-content shadow-xl hover:scale-105 transition-transform">
            <div className="card-body items-center text-center py-10">
              <CubeIcon className="w-12 h-12 mb-4 group-hover:animate-bounce" />
              <h2 className="card-title text-2xl">Catalogue</h2>
              <p className="opacity-80 text-sm">Stocks et produits</p>
            </div>
          </Link>

          <Link to="/admin/stats" className="group card bg-accent text-accent-content shadow-xl hover:scale-105 transition-transform">
            <div className="card-body items-center text-center py-10">
              <ChartBarIcon className="w-12 h-12 mb-4 group-hover:animate-bounce" />
              <h2 className="card-title text-2xl">Analyses</h2>
              <p className="opacity-80 text-sm">Chiffres et stats</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;