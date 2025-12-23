import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-200">
        <form className="card-body">
          <h1 className="text-2xl font-bold text-center">Créer un compte</h1>
          <div className="form-control">
            <label className="label"><span className="label-text">Nom complet</span></label>
            <input type="text" placeholder="Ayoub" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" placeholder="email@exemple.com" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Mot de passe</span></label>
            <input type="password" placeholder="********" className="input input-bordered" required />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">S'inscrire</button>
          </div>
          <p className="text-center text-sm mt-4">
            Déjà inscrit ? <Link to="/login" className="link link-primary">Se connecter</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;