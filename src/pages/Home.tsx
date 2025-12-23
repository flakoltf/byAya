// src/pages/Home.tsx
import ProductCard from "../components/ProductCard";

// Données fictives des produits capillaires
const HAIR_PRODUCTS = [
  { id: 1, name: "Shampoing Purifiant", price: 14.99, category: "Soin", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "Après-Shampoing Soyeux", price: 16.50, category: "Soin", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Masque Réparateur Karité", price: 22.00, category: "Masque", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80" },
  { id: 4, name: "Hydrolat de Romarin Bio", price: 12.00, category: "Tonique", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=300&q=80" },
];

const Home = () => {
  return (
    <div className="space-y-16">
      {/* SECTION HERO : Utilisation d'un composant DaisyUI */}
      <section className="hero bg-base-200 py-16 rounded-3xl overflow-hidden">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Sublimez vos cheveux</h1>
            <p className="py-6 text-lg">
              Découvrez notre gamme naturelle pour des cheveux forts, brillants et en pleine santé.
            </p>
            <button className="btn btn-primary">Découvrir la gamme</button>
          </div>
        </div>
      </section>

      {/* SECTION PRODUITS */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Nos essentiels</h2>
            <p className="text-gray-500">Sélectionnés avec soin pour vous</p>
          </div>
          <button className="btn btn-ghost">Voir tout →</button>
        </div>

        {/* GRILLE REACT : On mappe sur notre tableau pour générer les cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HAIR_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} // Obligatoire en React pour les performances
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;