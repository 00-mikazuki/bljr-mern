import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedData = localStorage.getItem("blogData");
    
    if (storedData) {
      const blogData = JSON.parse(storedData);
      const user = blogData.user || null;
      setAuth(user);
    } else {
      setAuth(null);
    }
  }, [
    navigate,
    location.pathname
  ]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}