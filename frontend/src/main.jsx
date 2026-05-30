import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </UserProvider>
    </Router>
  </StrictMode>,
);
