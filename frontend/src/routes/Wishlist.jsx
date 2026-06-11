import React, { useState, useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { PageTitle, InstagramCarousel, Product } from '../components';
import * as api from '../api/api';
import EmptyWishlist from '../assets/icons/empty-wishlist.svg';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { useDataLoader } = useLoader();

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await useDataLoader(api.getWishlist);
      if (data?.data) {
        setWishlistItems(data.data);
      } else if (data?.err) {
        console.log(data.err);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-wrapper">
      <PageTitle pageName="Wishlist" />

      <div className="wishlist">
        <div className="wishlist--title">Your favourite products</div>
        <div className="wishlist--desc">
          Discover your hand-picked brews, saved and ready to order
        </div>

        <div className="wishlist--products">
          {wishlistItems.map((item) => (
            <Product
              key={item.productId._id}
              product={item.productId}
              isWishlisted={true}
              onWishlistChange={(productId) =>
                setWishlistItems((prev) => prev.filter((w) => w.productId._id !== productId))
              }
            />
          ))}

          {wishlistItems.length === 0 && (
            <div className="wishlist__empty">
              <img
                src={EmptyWishlist}
                alt=""
              />
              <p>Wishlist is empty</p>
            </div>
          )}
        </div>
      </div>

      <InstagramCarousel />
    </div>
  );
}

export default Wishlist;
