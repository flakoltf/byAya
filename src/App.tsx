import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import About from './pages/About';
import Diagnostic from './pages/Diagnostic'

import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminStats from './pages/AdminStats';
import AdminRoute from './components/AdminRoute';

// IMPORTANT : Importe le Provider que nous avons créé
import { CartProvider } from './context/CartContext';

function App() {
  return (
    // On enveloppe TOUT le contenu dans le CartProvider
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-base-100">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/diagnostic" element={<Diagnostic/>} />
           {/* --- ROUTES ADMIN (Protégées par AdminRoute) --- */}
            {/* On enveloppe chaque page admin pour vérifier le rôle de l'utilisateur */}
            <Route path="/admin" element={
              <AdminRoute><AdminDashboard /></AdminRoute>
            } />
            
            <Route path="/admin/products" element={
              <AdminRoute><AdminProducts /></AdminRoute>
            } />
            
            <Route path="/admin/orders" element={
              <AdminRoute><AdminOrders /></AdminRoute>
            } />
            
            <Route path="/admin/stats" element={
              <AdminRoute><AdminStats /></AdminRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;