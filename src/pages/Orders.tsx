import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  MapPinIcon,
  CalendarIcon,
  ReceiptRefundIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data, error } = await supabase
          .from('orders')
          .select(`*, order_items (*)`)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Erreur commandes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'validee': 
        return "bg-green-50 text-green-700 border-green-100";
      case 'expediee': 
        return "bg-blue-50 text-blue-700 border-blue-100";
      case 'en attente': 
        return "bg-primary/10 text-primary border-primary/20";
      default: 
        return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center py-32 bg-[#FAF9F6] min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary opacity-30"></span>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-4 opacity-30">Chargement de votre historique</p>
    </div>
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* HEADER MINIMALISTE */}
      <div className="pt-20 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black italic text-primary uppercase tracking-tighter mb-4">
          Mes Commandes
        </h1>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto max-w-4xl px-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-16 text-center shadow-xl border border-primary/5">
            <ShoppingBagIcon className="w-20 h-20 mx-auto mb-8 text-primary opacity-10" />
            <p className="text-[#8D6E63] italic text-lg mb-10">Votre historique est encore vierge de soins d'exception.</p>
            <Link to="/products" className="btn btn-primary px-12 rounded-full text-white font-black uppercase tracking-widest text-xs border-none shadow-lg">
              Découvrir la collection
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <div key={order.id} className="collapse collapse-arrow bg-white rounded-[2.5rem] shadow-xl border border-primary/5 transition-all duration-300 hover:border-primary/20">
                <input type="checkbox" className="peer" /> 
                
                {/* EN-TÊTE DE LA COMMANDE */}
                <div className="collapse-title p-8 md:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-8">
                    
                    <div className="flex items-center gap-6">
                      <div className="bg-[#FAF9F6] p-4 rounded-2xl hidden md:flex">
                        <CubeIcon className="w-6 h-6 text-primary opacity-40" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-40">
                            Réf. {order.id.slice(0, 8).toUpperCase()}
                          </span>
                          <div className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                            {order.status}
                          </div>
                        </div>
                        <span className="text-xl font-serif italic text-[#5D4037]">
                          {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 ml-auto mr-4">
                      <div className="text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-40 block mb-1">Total payé</span>
                        <span className="text-2xl font-black text-primary italic">
                          {order.total_price.toFixed(2)} <small className="text-xs not-italic font-medium opacity-50">CHF</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DÉTAILS DE LA COMMANDE */}
                <div className="collapse-content px-8 md:px-12 bg-[#FAF9F6]/30">
                  <div className="py-10 space-y-8">
                    
                    {/* Liste des articles */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <ReceiptRefundIcon className="w-5 h-5 text-primary opacity-30" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Détail des soins acquis</h4>
                      </div>

                      <div className="grid gap-4">
                        {order.order_items.map((item: any) => (
                          <div key={item.id} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-primary/5 shadow-sm transition-transform hover:scale-[1.01]">
                            <div className="flex flex-col">
                              <span className="text-base font-bold text-[#5D4037]">{item.product_name}</span>
                              <span className="text-[10px] font-black uppercase text-primary/40 tracking-tighter">Quantité commandée : {item.quantity}</span>
                            </div>
                            <span className="text-lg font-serif italic text-primary">{item.price_at_purchase.toFixed(2)} .-</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Adresse et Logistique */}
                    <div className="pt-8 border-t border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex items-start gap-4">
                        <MapPinIcon className="w-6 h-6 text-primary opacity-30 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block mb-2">Lieu de livraison</span>
                          <p className="text-sm text-[#8D6E63] italic font-medium leading-relaxed">
                            {order.address_delivery}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <CalendarIcon className="w-6 h-6 text-primary opacity-30 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block mb-2">Horodatage</span>
                          <p className="text-sm text-[#8D6E63] italic font-medium">
                            Passée à {new Date(order.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-20 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary opacity-30">
              ByAya — L'excellence capillaire suisse
            </p>
        </div>
      </div>
    </div>
  );
};

export default Orders;