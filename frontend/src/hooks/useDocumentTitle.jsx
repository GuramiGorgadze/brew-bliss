import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDocumentTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/':
        document.title = 'Brew Bliss - Raise Your Mood, Not Just Your Glass';
        break;
      case '/products':
        document.title = 'Products - Brew Bliss';
        break;
      case '/products/:id':
        document.title = 'Products - Brew Bliss';
        break;
      case '/about':
        document.title = 'About - Brew Bliss';
        break;
      case '/contact':
        document.title = 'Contact - Brew Bliss';
        break;
      case '/team':
        document.title = 'Team - Brew Bliss';
        break;
      case '/register':
        document.title = 'Register - Brew Bliss';
        break;
      case '/login':
        document.title = 'Login - Brew Bliss';
        break;
      case '/account':
        document.title = 'Account - Brew Bliss';
        break;
      case '/cart':
        document.title = 'Cart - Brew Bliss';
        break;
      case '/wishlist':
        document.title = 'Wishlist - Brew Bliss';
        break;
      case '/account/address':
        document.title = 'Account Address - Brew Bliss';
        break;
      default:
        if (pathname.startsWith('/products/')) {
          document.title = 'Product Details - Brew Bliss';
        } else if (pathname.startsWith('/reset-password/')) {
          document.title = 'Reset Password - Brew Bliss';
        } else {
          document.title = 'Brew Bliss - Raise Your Mood, Not Just Your Glass';
        }
    }
  }, [pathname]);
};

export default useDocumentTitle;
