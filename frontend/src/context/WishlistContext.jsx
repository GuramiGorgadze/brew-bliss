import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../api/api';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistedIds, setWishlistedIds] = useState(new Set());

  useEffect(() => {
    api.getWishlist().then((data) => {
      if (data?.data) {
        setWishlistedIds(new Set(data.data.map((item) => item.productId._id)));
      }
    });
  }, []);

  const add = (id) => setWishlistedIds((prev) => new Set([...prev, id]));
  const remove = (id) =>
    setWishlistedIds((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });

  return (
    <WishlistContext.Provider value={{ wishlistedIds, add, remove }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
