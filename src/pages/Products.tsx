import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('products').select('*').order('name');
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {/* HEADER ÉLÉGANT */}
      <div className="pt-16 pb-12 px-4 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">ByAya Collections</span>
        <h1 className="text-4xl md:text-5xl font-black italic text-[#5D4037] uppercase tracking-tighter mb-8">
          Nos Soins Capillaires
        </h1>
        
        {/* BARRE DE RECHERCHE MINIMALISTE */}
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-primary opacity-40 group-focus-within:opacity-100 transition-opacity" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un soin d'exception..."
            className="w-full h-14 pl-14 pr-6 bg-white border-none shadow-sm rounded-2xl text-sm font-medium focus:ring-1 focus:ring-primary/30 transition-all placeholder:italic placeholder:opacity-30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 gap-4">
            <span className="loading loading-spinner loading-lg text-primary opacity-40"></span>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Préparation de votre sélection</p>
          </div>
        ) : (
          /* GRILLE : 1 par ligne mobile, 2 par ligne ordinateur */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 justify-items-center">
            {filteredProducts.map((product) => (
              <div key={product.id} className="w-full max-w-[420px] transition-transform duration-500 hover:translate-y-[-5px]">
                <ProductCard 
                  product={{
                    ...product,
                    price: Number(product.price).toFixed(2)
                  }}
                  onAdd={() => addToCart(product)}
                />
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-32">
            <p className="text-[#8D6E63] italic opacity-40 text-lg">
              Aucun soin ne correspond à votre recherche actuelle.
            </p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 text-xs font-black uppercase tracking-widest text-primary hover:underline"
            >
              Voir toute la collection
            </button>
          </div>
        )}
      </div>

      {/* PETIT RAPPEL DE MARQUE EN BAS */}
      {!loading && filteredProducts.length > 0 && (
        <div className="mt-24 text-center">
            <div className="w-10 h-0.5 bg-primary mx-auto mb-6 opacity-20"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary opacity-40">
              Inspiré par la nature — Créé pour vous
            </p>
        </div>
      )}
    </div>
  );
};

export default Products;