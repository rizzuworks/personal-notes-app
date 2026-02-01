import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { locale } = useLocale();

  const onRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(locale === 'id' ? 'Password dan konfirmasi password tidak sama!' : 'Password and confirmation do not match!');
      return;
    }

    if (password.length < 6) {
      alert(locale === 'id' ? 'Password harus minimal 6 karakter!' : 'Password must be at least 6 characters!');
      return;
    }

    setIsLoading(true);

    const { error } = await register({
      name: name,
      email: email,
      password: password,
    });

    if (!error) {
      alert(locale === 'id' ? 'Registrasi berhasil! Silakan login.' : 'Registration successful! Please login.');
      navigate('/');
    }

    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__inner">
  <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill the form to register an account.'}</h2>
        <form className="input-register" onSubmit={onRegister}>
          <label htmlFor="name">{locale === 'id' ? 'Nama' : 'Name'}</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(event) => setName(event.target.value)}
            required
          />
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
            minLength="6"
          />
          <label htmlFor="confirmPassword">{locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (locale === 'id' ? 'Memuat...' : 'Loading...') : (locale === 'id' ? 'Daftar' : 'Register')}
          </button>
        </form>
        <p>{locale === 'id' ? 'Sudah punya akun?' : 'Already have an account?'} <Link to="/">{locale === 'id' ? 'Masuk di sini.' : 'Login here.'}</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
