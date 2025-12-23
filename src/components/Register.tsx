import { useState } from 'react';

// On définit ce que le composant a besoin de recevoir (Props)
interface RegisterProps {
  setPage: (page: string) => void;
}

function Register({ setPage }: RegisterProps) {
  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: ''
  });

  // Capture les changements dans les inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gère la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      alert("⚠️ Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    alert(`Bienvenue ${formData.nom} !`);
    setPage('home'); // Retourne à l'accueil après validation
  };

  return (
    /* LE PARENT UNIQUE (Fragment) */
    <>
      <section className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 mt-10">
        <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-8">Rejoindre byAya</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="form-control">
            <input 
              name="nom" 
              type="text" 
              placeholder="Nom complet" 
              className="input input-bordered w-full" 
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-control">
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              className="input input-bordered w-full" 
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-control">
            <input 
              name="password" 
              type="password" 
              placeholder="Mot de passe" 
              className="input input-bordered w-full" 
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn bg-[#d4a373] hover:bg-[#b88a5d] text-white w-full border-none mt-4">
            S'inscrire
          </button>
        </form>

        <button 
          onClick={() => setPage('home')} 
          className="btn btn-link w-full mt-4 text-gray-500"
        >
          Retour à la boutique
        </button>
      </section>
    </> 
    /* FIN DU PARENT UNIQUE */
  );
}

export default Register;