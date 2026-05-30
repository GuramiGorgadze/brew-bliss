import { useEffect } from "react";
import * as api from "./api/api.js";
import "./styles/style.scss";

import { Navbar, Footer, Main, TopBar } from "./layouts";
import { LoadingScreen, ProtectedRoute } from "./components";
import { Routes, Route, useNavigate } from "react-router-dom";
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
} from "./routes";

// Hooks
import useDocumentTitle from "./hooks/useDocumentTitle";
import useScrollTop from "./hooks/useScrollTop";
import useAppScale from "./hooks/useAppScale";
import { useUserData } from "./context/UserContext.jsx";

function App() {
  useDocumentTitle();
  useScrollTop();
  useAppScale();

  const { loggedIn, login, setIsAuthLoading } = useUserData();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data: tokenData } = await api.getToken();
        const res = await api.getUser(tokenData);
        if (res.data) {
          login(res.data);
        }
      } catch (error) {
        console.error("Failed to log in", error);
      } finally {
        setIsAuthLoading(false)
      }
    };
    getUserInfo();
  }, []);

  return (
    <>
      <TopBar />
      <Navbar />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductSingle />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
      <LoadingScreen />
    </>
  );
}

export default App;