import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../lib/api';
import '../../styles/Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password.length < 6) {
      setErrorMessage('Password baru minimal harus 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await api.post('/auth/reset-password', {
        email: email.trim(),
        password,
      });

      setSuccessMessage(res.message || 'Password berhasil diperbarui!');
      
      // Arahkan kembali ke halaman login setelah 2 detik
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal mengatur ulang password. Pastikan email terdaftar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      {/* Sisi Kiri - Poster */}
      <div className="login-left">
        <img
          src="/images/auth/poster.png"
          alt="Nexora Business Intelligence"
          className="login-poster"
        />
      </div>

      {/* Sisi Kanan - Form Reset Password */}
      <div className="login-right">
        <div className="form-container">
          <h2>Reset Password</h2>
          <p className="subtitle">Masukkan email terdaftar Anda dan buat password baru</p>

          <form onSubmit={handleReset}>
            {/* Input Email */}
            <div className="input-group">
              <img src="/images/auth/user.png" alt="Email Icon" className="input-icon" />
              <input
                type="email"
                placeholder="Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Input Password Baru */}
            <div className="input-group">
              <img src="/images/auth/lock.png" alt="Lock Icon" className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password (min. 6 karakter)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setIsPasswordTouched(true)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                <img
                  src={showPassword ? '/images/auth/view.png' : '/images/auth/hide.png'}
                  alt="Toggle Password Visibility"
                  className="toggle-icon"
                />
              </button>
            </div>

            {/* Input Konfirmasi Password */}
            <div className="input-group">
              <img src="/images/auth/lock.png" alt="Lock Icon" className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                <img
                  src={showConfirmPassword ? '/images/auth/view.png' : '/images/auth/hide.png'}
                  alt="Toggle Password Visibility"
                  className="toggle-icon"
                />
              </button>
            </div>

            {isPasswordTouched && password.length < 6 && (
              <span className="error-message">Password harus minimal terdiri dari 6 karakter.</span>
            )}

            {errorMessage && <span className="error-message">{errorMessage}</span>}

            {successMessage && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                border: '1px solid #a7f3d0',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '16px'
              }}>
                ✓ {successMessage} Mengalihkan ke login...
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Updating Password...' : 'Reset Password'}
            </button>
          </form>

          <p className="create-account">
            Remember your credentials? <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
