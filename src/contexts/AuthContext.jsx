import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserLogged, getAccessToken, putAccessToken } from '../utils/network-data';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (getAccessToken()) {
        const { error, data } = await getUserLogged();
        if (!error) {
          setAuthedUser(data);
        } else {
          putAccessToken('');
        }
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  const login = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { error, data } = await getUserLogged();
    if (!error) setAuthedUser(data);
    return { error };
  };

  const logout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  return (
    <AuthContext.Provider value={{ authedUser, loading, login, logout, isAuthenticated: !!authedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;