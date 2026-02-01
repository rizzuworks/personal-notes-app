import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArchivesPage from './pages/ArchivesPage';
import AddNotePage from './pages/AddNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LocaleProvider, useLocale } from './contexts/LocaleContext';
import { IoSunnyOutline, IoMoonOutline, IoExitOutline } from 'react-icons/io5';  

function Header() {
  const { authedUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();
  return (
    <header>
      <h1><Link to="/">{locale === 'id' ? 'Aplikasi catatan' : 'Notes App'}</Link></h1>
      <nav className="navigation">
        <ul>
          {authedUser && (
            <li>
              <Link to="/archives">{locale === 'id' ? 'Arsip' : 'Archives'}</Link>
            </li>
          )}
          <li>
            <button className="toggle-locale" onClick={toggleLocale} aria-label="Toggle locale">
              {locale === 'id' ? 'ID' : 'EN'}
            </button>
          </li>
          <li>
            <button className="toggle-theme" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <IoSunnyOutline /> : <IoMoonOutline />}
            </button>
          </li>
          {authedUser && (
            <li>
              <button className="button-logout" onClick={logout}>{authedUser.name} <IoExitOutline /></button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

function AppRoutes() {
  const { authedUser, loading } = useAuth();
  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;

  return (
    <Routes>
      {authedUser ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/archives" element={<ArchivesPage />} />
          <Route path="/new" element={<AddNotePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <div className="app-container">
            <BrowserRouter>
              <Header />
              <main>
                <AppRoutes />
              </main>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
