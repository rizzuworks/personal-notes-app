import React, { createContext, useContext, useEffect, useState } from 'react';

const LocaleContext = createContext();

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
};

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    try { return localStorage.getItem('app-locale') || 'id'; } catch (e) { return 'id'; }
  });

  useEffect(() => {
    try { localStorage.setItem('app-locale', locale); } catch (e) {}
  }, [locale]);

  const toggleLocale = () => setLocale((l) => (l === 'id' ? 'en' : 'id'));

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleContext;
