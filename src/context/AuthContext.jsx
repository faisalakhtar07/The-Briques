import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser, getMe } from "../api/auth.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("briques_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("briques_token");
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("briques_user", JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem("briques_token");
        localStorage.removeItem("briques_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const persist = ({ token, user }) => {
    localStorage.setItem("briques_token", token);
    localStorage.setItem("briques_user", JSON.stringify(user));
    setUser(user);
  };

  const register = async (payload) => {
    const { data } = await registerUser(payload);
    persist(data);
    return data;
  };

  const login = async (payload) => {
    const { data } = await loginUser(payload);
    persist(data);
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // ignore network errors on logout
    }
    localStorage.removeItem("briques_token");
    localStorage.removeItem("briques_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
