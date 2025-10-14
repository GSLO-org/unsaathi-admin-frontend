import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/testimonials');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
        <p className="text-center mt-4">
          New user?{' '}
          <button type="button" onClick={() => navigate('/signup')} className="text-blue-600 underline">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
