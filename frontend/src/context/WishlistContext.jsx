import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as api from '../api/api';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistedIds, setWishlistedIds] = useState(new Set());

  const refreshWishlist = useCallback(async () => {
    try {
      const data = await api.getWishlist();
      if (data?.data) {
        const ids = data.data.map((item) => item.productId?._id || item.productId);
        setWishlistedIds(new Set(ids));
      }
    } catch (error) {
      console.error('Failed to refresh wishlist data:', error);
    }
  }, []);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const add = (id) => setWishlistedIds((prev) => new Set([...prev, id]));

  const remove = (id) =>
    setWishlistedIds((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });

  const wishlistCount = wishlistedIds.size;

  return (
    <WishlistContext.Provider
      value={{ wishlistedIds, wishlistCount, add, remove, refreshWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
