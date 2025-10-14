"use client"
import React, { useState } from 'react'
import './login.css'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          expiresInMins: 30,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user data and role in localStorage
      const userData = {
        ...data,
        role: formData.role // Add selected role to user data
      };
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirect or handle successful login
      window.location.href = '/dashboard'; // Adjust based on your routing setup
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input 
              type="text" 
              name="username"
              placeholder="Username"
              className="login-input"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              name="password"
              placeholder="Password"
              className="login-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select 
              name="role"
              className="login-input"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">ta_member</option>
              <option value="admin">ta_admin</option>
              <option value="moderator">panelist</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage