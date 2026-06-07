import { createContext, useState, useContext } from 'react';
import { logoutUser as logoutApi } from '../api/api.js';

const UserContext = createContext({
  userData: null,
});

export const useUserData = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const login = (userData) => {
    setUserData(userData);
    setLoggedIn(true);
  };

  const logout = async () => {
    await logoutApi();
    setUserData(null);
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ loggedIn, userData, login, logout, isAuthLoading, setIsAuthLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
