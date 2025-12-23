// src/components/ProductCard.jsx

// 🚨 On a supprimé l'interface ici car le .jsx ne le comprend pas

const ProductCard = ({ name, price, image, category }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-shadow">
      <figure className="px-4 pt-4">
        <img src={image} alt={name} className="rounded-xl h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <div className="badge badge-secondary badge-outline text-xs">{category}</div>
        <h2 className="card-title text-lg">{name}</h2>
        <p className="text-xl font-bold text-primary">{price}€</p>
        <div className="card-actions mt-4">
          <button className="btn btn-primary btn-block btn-sm">Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;