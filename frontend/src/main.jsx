import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { LoaderProvider } from './context/LoaderContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx';
import './language/i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <LoaderProvider>
          <WishlistProvider>
            <CurrencyProvider>
              <App />
            </CurrencyProvider>
          </WishlistProvider>
        </LoaderProvider>
      </UserProvider>
    </Router>
  </StrictMode>
);
