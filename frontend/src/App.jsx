import { useEffect } from 'react';
import * as api from './api/api.js';
import './styles/style.scss';

import { Navbar, Footer, Main, TopBar } from './layouts';
import { LoadingScreen, ProtectedRoute, ScrollToTopButton } from './components';
import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Products,
  About,
  Contact,
  NotFound,
  ProductSingle,
  Register,
  Login,
  Account,
  Address,
  Team,
  Cart,
  ResetPassword,
  Wishlist,
  Checkout,
  OrderSuccess,
} from './routes';

import useDocumentTitle from './hooks/useDocumentTitle';
import useScrollTop from './hooks/useScrollTop';
import useAppScale from './hooks/useAppScale';
import { useUserData } from './context/UserContext.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  useDocumentTitle();
  useScrollTop();
  useAppScale();

  const { login, setIsAuthLoading } = useUserData();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const tokenRes = await api.getToken();

        if (!tokenRes.data) {
          return;
        }

        const res = await api.getUser(tokenRes.data);
        if (res.data) login(res.data);
      } catch (error) {
        console.log('Failed to log in', error);
      } finally {
        setIsAuthLoading(false);
      }
    };
    getUserInfo();
  }, []);

  return (
    <>
      <Toaster
        position="bottom-center"
        containerStyle={{
          bottom: '60px',
        }}
        toastOptions={{
          duration: 3000,
          className: 'custom-toast',

          iconTheme: {
            primary: '#FEA90C',
          },
        }}
      />
      <TopBar />
      <Navbar />
      <Main>
        <ScrollToTopButton />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />
          <Route
            path="/products/:id"
            element={<ProductSingle />}
          />

          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/team"
            element={<Team />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account/address"
            element={
              <ProtectedRoute>
                <Address />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Main>
      <Footer />
      <LoadingScreen />
    </>
  );
}

export default App;
