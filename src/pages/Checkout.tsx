import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCardIcon, 
  ChevronLeftIcon,
  CheckBadgeIcon,
  HomeModernIcon,
  QrCodeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Checkout = () => {
  const { cart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'twint'>('card');
  
  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    street: '',
    zip: '',
    city: '',
    country: 'Suisse',
    mailboxName: '' // On garde le camelCase pour React
  });

  useEffect(() => {
    const loadBillingAddress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login', { state: { from: '/checkout' } });
        return;
      }

      const { data, error } = await supabase
        .from('billing_addresses')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        // CORRECTION DE L'ERREUR TS : On mappe correctement les noms de la DB vers le State
        setBillingAddress({
          fullName: data.full_name || '',
          street: data.street || '',
          zip: data.zip || '',
          city: data.city || '',
          country: data.country || 'Suisse',
          mailboxName: data.mailbox_name || '' // Ici : data.mailbox_name -> mailboxName
        });
      }
    };
    loadBillingAddress();
  }, [navigate]);

  const handleOrder = async () => {
    if (!billingAddress.street || !billingAddress.city || !billingAddress.zip) {
      alert("Veuillez compléter votre adresse de facturation.");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Sauvegarde de l'adresse (Upsert)
      await supabase.from('billing_addresses').upsert({
        user_id: user?.id,
        full_name: billingAddress.fullName,
        street: billingAddress.street,
        zip: billingAddress.zip,
        city: billingAddress.city,
        country: billingAddress.country,
        mailbox_name: billingAddress.mailboxName // On renvoie mailbox_name à la DB
      }, { onConflict: 'user_id' });

      const fullAddr = `${billingAddress.street}, ${billingAddress.zip} ${billingAddress.city}, ${billingAddress.country}`;

      // Création de la commande
      const { data: order, error: orderErr } = await supabase.from('orders').insert({
        user_id: user?.id,
        total_price: totalPrice,
        address_delivery: fullAddr,
        status: 'en attente',
        payment_method: paymentMethod
      }).select().single();

      if (orderErr) throw orderErr;

      // Ajout des articles
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
        product_name: item.name
      }));

      await supabase.from('order_items').insert(orderItems);
      
      clearCart();
      alert(`Merci ! Votre commande ByAya est validée.`);
      navigate('/orders');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la validation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => navigate('/cart')} 
          className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-8 hover:opacity-60 transition-all"
        >
          <ChevronLeftIcon className="w-4 h-4" /> Retour au panier
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLONNE GAUCHE : FORMULAIRES */}
          <div className="lg:col-span-7 space-y-10">
            <h1 className="text-4xl font-black italic text-primary uppercase tracking-tighter">Validation</h1>

            {/* SECTION ADRESSE - GRILLE 12 COLONNES ALIGNÉE */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-primary/5">
              <div className="flex items-center gap-4 mb-10 border-b border-primary/5 pb-6">
                <HomeModernIcon className="w-6 h-6 text-primary opacity-40" />
                <h2 className="text-xl font-bold italic text-[#5D4037]">Adresse de facturation</h2>
              </div>

              <div className="grid grid-cols-12 gap-x-6 gap-y-8">
                {/* Ligne 1 : Nom Complet */}
                <div className="col-span-12">
                  <label className="text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1 block">Nom complet</label>
                  <input type="text" className="input w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium" 
                    value={billingAddress.fullName} onChange={(e) => setBillingAddress({...billingAddress, fullName: e.target.value})} />
                </div>

                {/* Ligne 2 : Rue */}
                <div className="col-span-12">
                  <label className="text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1 block">Rue et Numéro</label>
                  <input type="text" className="input w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                    value={billingAddress.street} onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})} />
                </div>

                {/* Ligne 3 : CP et Ville (Alignés) */}
                <div className="col-span-12 md:col-span-4">
                  <label className="text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1 block">Code Postal</label>
                  <input type="text" className="input w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                    value={billingAddress.zip} onChange={(e) => setBillingAddress({...billingAddress, zip: e.target.value})} />
                </div>
                <div className="col-span-12 md:col-span-8">
                  <label className="text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1 block">Ville</label>
                  <input type="text" className="input w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                    value={billingAddress.city} onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})} />
                </div>

                {/* Ligne 4 : Boîte aux lettres et Pays */}
                <div className="col-span-12 md:col-span-6">
                  <label className="text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1 block">Nom sur la boîte (Si différent)</label>
                  <input type="text" className="input w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                    value={billingAddress.mailboxName} onChange={(e) => setBillingAddress({...billingAddress, mailboxName: e.target.value})} />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <label className="text-[10px] font-black uppercase text-primary tracking-widest mb-2 ml-1 block">Pays</label>
                    <select className="select w-full bg-[#FAF9F6] border-none focus:ring-1 focus:ring-primary rounded-xl h-14 font-medium"
                        value={billingAddress.country} onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}>
                        <option>Suisse</option>
                        <option>France</option>
                        <option>Belgique</option>
                    </select>
                </div>
              </div>
            </div>

            {/* SECTION PAIEMENT */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-primary/5">
              <div className="flex items-center gap-4 mb-10 border-b border-primary/5 pb-6">
                <CreditCardIcon className="w-6 h-6 text-primary opacity-40" />
                <h2 className="text-xl font-bold italic text-[#5D4037]">Mode de règlement</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-primary/5 bg-[#FAF9F6]'}`}
                >
                  <div className="flex items-center gap-4">
                    <CreditCardIcon className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-primary' : 'opacity-30'}`} />
                    <span className={`text-xs font-black uppercase tracking-widest ${paymentMethod === 'card' ? 'text-primary' : 'opacity-40'}`}>Carte</span>
                  </div>
                  {paymentMethod === 'card' && <CheckBadgeIcon className="w-5 h-5 text-primary" />}
                </div>

                <div 
                  onClick={() => setPaymentMethod('twint')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${paymentMethod === 'twint' ? 'border-[#E30613] bg-red-50' : 'border-primary/5 bg-[#FAF9F6]'}`}
                >
                  <div className="flex items-center gap-4">
                    <QrCodeIcon className={`w-6 h-6 ${paymentMethod === 'twint' ? 'text-[#E30613]' : 'opacity-30'}`} />
                    <span className={`text-xs font-black uppercase tracking-widest ${paymentMethod === 'twint' ? 'text-[#E30613]' : 'opacity-40'}`}>TWINT</span>
                  </div>
                  {paymentMethod === 'twint' && <CheckBadgeIcon className="w-5 h-5 text-[#E30613]" />}
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : RÉSUMÉ RÉDUIT */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-primary/5">
              <h3 className="text-lg font-bold italic text-[#5D4037] mb-8">Votre Panier</h3>
              
              <div className="space-y-6 mb-10">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#FAF9F6] rounded-xl overflow-hidden">
                        <img src={item.image_url} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#5D4037]">{item.name}</p>
                        <p className="text-[10px] font-black uppercase text-primary opacity-40">Qté: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-serif italic">{(item.price * item.quantity).toFixed(2)} .-</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-primary/10 space-y-4">
                <div className="flex justify-between items-end pt-4">
                  <span className="text-xs font-black uppercase text-primary tracking-widest">Total</span>
                  <span className="text-4xl font-serif italic text-[#5D4037]">{totalPrice.toFixed(2)} <small className="text-xs not-italic opacity-40">CHF</small></span>
                </div>
              </div>

              <button 
                onClick={handleOrder}
                disabled={loading}
                className={`btn btn-block mt-12 bg-primary hover:bg-[#A68966] text-white border-none rounded-2xl h-16 text-xs font-black uppercase tracking-[0.2em] shadow-xl transition-all ${loading ? 'loading' : ''}`}
              >
                {loading ? "Confirmation..." : `Confirmer le paiement`}
              </button>

              <div className="flex items-center justify-center gap-3 mt-10 opacity-30">
                <ShieldCheckIcon className="w-4 h-4 text-primary" />
                <span className="text-[9px] font-black uppercase tracking-widest">Sécurisé ByAya Switzerland</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;