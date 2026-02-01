import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login as loginAPI } from '../utils/network-data';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { locale } = useLocale();

  const onLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { error, data } = await loginAPI({ email, password });

    if (!error) {
      await login(data);
    }

    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__inner">
  <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Please login to use the app.'}</h2>
        <form className="input-login" onSubmit={onLogin}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (locale === 'id' ? 'Memuat...' : 'Loading...') : (locale === 'id' ? 'Masuk' : 'Login')}
          </button>
        </form>
        <p>{locale === 'id' ? 'Belum punya akun?' : 'Don\'t have an account?'} <Link to="/register">{locale === 'id' ? 'Daftar di sini.' : 'Register here.'}</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;
