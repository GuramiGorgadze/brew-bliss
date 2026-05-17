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
      case '/about':
        document.title = 'About - Brew Bliss';
        break;
      case '/contact':
        document.title = 'Contact - Brew Bliss';
        break;
      default:
        document.title = 'Brew Bliss - Raise Your Mood, Not Just Your Glass';
    }
  }, [pathname]);
};

export default useDocumentTitle;