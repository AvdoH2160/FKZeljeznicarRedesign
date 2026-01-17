import { createContext, useContext, useState, useEffect } from "react";

// Kreiranje konteksta
const CartContext = createContext();

// Hook za korištenje konteksta
export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Učitavanje iz localStorage ako postoji
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Čuvanje u localStorage kad se promijeni
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Dodavanje u korpu
  const addToCart = (product, size, quantity) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingIndex >= 0) {
      // Ako već postoji taj proizvod sa istom veličinom, povećaj količinu
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems([...cartItems, { product, size, quantity }]);
    }
  };

  // Uklanjanje proizvoda iz korpe
  const removeFromCart = (productId, size) => {
    setCartItems(cartItems.filter(
      item => !(item.product.id === productId && item.size === size)
    ));
  };

  // Promjena količine
  const updateQuantity = (productId, size, quantity) => {
    quantity = Number(quantity);
    if(quantity < 1) quantity = 1;

    const updated = cartItems.map(item => {
      if(item.product.id === productId && item.size === size){
        return { ...item, quantity }; // stvarno kreira novu instancu
      }
      return item;
    });
    setCartItems(updated);
  };

  // Total cijena
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.product.priceOverride || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
