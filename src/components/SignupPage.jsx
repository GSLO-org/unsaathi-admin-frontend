import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', name: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/signup', form);
      alert('User registered successfully!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSignup}>
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Signup</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
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
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-blue-600 underline">
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
