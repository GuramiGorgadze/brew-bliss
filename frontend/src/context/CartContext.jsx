import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../api/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = useCallback(async () => {
    const data = await api.getCart();
    if (data?.data) setCartCount(data.data.length);
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const reset = () => setCartCount(0);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, refreshCart, reset }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
