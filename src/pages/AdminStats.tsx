import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminStats = () => {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      
      // 1. Récupération des commandes pour le graphique de revenus
      const { data: orders } = await supabase
        .from('orders')
        .select('created_at, total_price')
        .order('created_at', { ascending: true });

      // Groupement par date
      const chartData = orders?.reduce((acc: any, curr: any) => {
        const date = new Date(curr.created_at).toLocaleDateString('fr-FR');
        const existing = acc.find((item: any) => item.date === date);
        if (existing) {
          existing.revenue += Number(curr.total_price);
        } else {
          acc.push({ date, revenue: Number(curr.total_price) });
        }
        return acc;
      }, []);
      setRevenueData(chartData || []);

      // 2. Récupération des produits les plus vendus
      const { data: items } = await supabase
        .from('order_items')
        .select('product_name, quantity');

      const productSales = items?.reduce((acc: any, curr: any) => {
        const existing = acc.find((item: any) => item.name === curr.product_name);
        if (existing) {
          existing.sales += curr.quantity;
        } else {
          acc.push({ name: curr.product_name, sales: curr.quantity });
        }
        return acc;
      }, []);
      
      setTopProducts(productSales?.sort((a: any, b: any) => b.sales - a.sales).slice(0, 5) || []);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-20 text-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold italic font-serif text-primary">Analyse des Ventes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GRAPHIQUE DES REVENUS */}
        <div className="card bg-base-100 shadow-xl p-6 border border-base-200">
          <h2 className="card-title mb-6 opacity-70">Évolution du Chiffre d'Affaires (CHF)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#D926A9" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRAPHIQUE DES MEILLEURES VENTES */}
        <div className="card bg-base-100 shadow-xl p-6 border border-base-200">
          <h2 className="card-title mb-6 opacity-70">Top 5 Produits (Quantité)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="sales" fill="#570DF8" radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;