import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void; // Ajouté
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Initialisation depuis le localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('byaya_cart');
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Erreur de lecture du panier:", error);
      return [];
    }
  });

  // 2. Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('byaya_cart', JSON.stringify(cart));
  }, [cart]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Nouvelle fonction pour baisser la quantité proprement
  const decreaseQuantity = (id: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      // Si la quantité est de 1, on supprime l'article
      return prev.filter((i) => i.id !== id);
    });
  };

  // Mise à jour : Supprime l'article COMPLÈTEMENT (pour le bouton "Supprimer")
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('byaya_cart');
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      decreaseQuantity, // Ajouté ici
      clearCart, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
  }
  return context;
};