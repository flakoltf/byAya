const PRODUCTS = [
  { id: 1, name: "Clavier Mécanique RGB", price: 89, image: "https://picsum.photos/id/160/300/200" },
  { id: 2, name: "Souris Gaming Sans Fil", price: 55, image: "https://picsum.photos/id/2/300/200" },
  { id: 3, name: "Casque Audio Étudiant", price: 45, image: "https://picsum.photos/id/48/300/200" },
];

const Products = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Équipements Informatiques</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl border border-base-200">
            <figure><img src={product.image} alt={product.name} /></figure>
            <div className="card-body">
              <h2 className="card-title text-primary">{product.name}</h2>
              <p>Parfait pour coder toute la nuit.</p>
              <div className="card-actions justify-between items-center mt-4">
                <span className="text-xl font-bold">{product.price}€</span>
                <button className="btn btn-primary btn-sm">Ajouter au panier</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;