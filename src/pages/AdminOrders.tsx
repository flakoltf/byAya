import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    setLoading(true);
    // On récupère toutes les commandes + le nom du client (via la table profiles)
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles (first_name, last_name)
      `)
      .order('created_at', { ascending: false });

    if (!error) setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAllOrders(); }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);
    
    if (!error) fetchAllOrders(); // Rafraîchir la liste
  };
    if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 italic font-serif">Gestion des Commandes Clients</h1>

      <div className="overflow-x-auto shadow-xl rounded-box">
        <table className="table w-full bg-base-100">
          <thead>
            <tr className="bg-primary text-white">
              <th>Date</th>
              <th>Client</th>
              <th>Total</th>
              <th>Statut Actuel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover">
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="font-semibold">
                  {order.profiles?.first_name} {order.profiles?.last_name}
                </td>
                <td className="font-bold text-secondary">{order.total_price} CHF</td>
                <td>
                  <span className={`badge font-bold ${
                    order.status === 'validee' ? 'badge-success' : 
                    order.status === 'expediee' ? 'badge-info' : 'badge-warning'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select 
                    className="select select-bordered select-xs"
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    value={order.status}
                  >
                    <option value="en_cours">En attente</option>
                    <option value="validee">Payée / Validée</option>
                    <option value="expediee">Envoyée</option>
                    <option value="annulee">Annulée</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;