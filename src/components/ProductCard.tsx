import { ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  product: any;
  onAdd: () => void;
}

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(196,164,132,0.15)] border border-primary/5">
      
      {/* IMAGE AVEC EFFET DE ZOOM ET OVERLAY */}
      <figure className="relative h-[320px] overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        
        {/* Badge Catégorie Minimaliste */}
        <div className="absolute top-5 left-5">
          <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Overlay au survol avec bouton rapide */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button 
            onClick={onAdd}
            className="bg-white text-primary p-4 rounded-full shadow-xl translate-y-10 group-hover:translate-y-0 transition-transform duration-500 hover:bg-primary hover:text-white"
          >
            <ShoppingBagIcon className="w-6 h-6" />
          </button>
        </div>
      </figure>

      {/* CONTENU TEXTUEL */}
      <div className="p-8 space-y-3">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-serif italic text-[#5D4037] group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h2>
          {/* Petit indicateur de qualité */}
          <SparklesIcon className="w-4 h-4 text-primary opacity-30" />
        </div>

        <p className="text-[#8D6E63] text-xs leading-relaxed line-clamp-2 opacity-70 italic">
          {product.description}
        </p>

        <div className="pt-4 flex justify-between items-center border-t border-primary/5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Prix</span>
            <span className="text-xl font-black text-primary italic">
              {product.price} <small className="text-[10px] not-italic opacity-50">CHF</small>
            </span>
          </div>

          <button 
            onClick={onAdd}
            className="relative overflow-hidden group/btn px-6 py-3 rounded-xl bg-[#FAF9F6] border border-primary/20 text-primary text-xs font-black uppercase tracking-widest transition-all hover:bg-primary hover:text-white shadow-sm"
          >
            <span className="relative z-10">Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;