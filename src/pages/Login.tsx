import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
          <h1 className="text-2xl font-bold text-center">Connexion</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="etudiant@ecole.fr" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input type="password" placeholder="********" className="input input-bordered" required />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-secondary">Se connecter</button>
          </div>
          <label className="label text-center">
            <p className="text-sm">Pas encore de compte ? <Link to="/register" className="link link-primary">S'inscrire</Link></p>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;