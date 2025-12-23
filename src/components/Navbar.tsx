import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-20">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          By Aya
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link to="/products">Produits</Link></li>
          <li>
            <Link to="/cart" className="indicator">
              <span className="indicator-item badge badge-primary badge-sm">0</span>
              Panier
            </Link>
          </li>
          <li>
            <Link to="/login" className="btn btn-outline btn-sm">Connexion</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;