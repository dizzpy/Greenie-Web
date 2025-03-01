import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../Components/Button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErr('Passwords do not match!');
      return;
    }

    try {
      await axios.post('/api/auth/register', { email, password });
      navigate('/login');
    } catch (error) {
      setErr(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      <h2 className="text-center text-3xl font-bold text-primary-green">
        Register
      </h2>
      {err && <p className="text-red-500 text-center mt-4">{err}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border border-outline rounded-md focus:ring-primary-green focus:border-primary-green"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-4 py-2 border border-outline rounded-md focus:ring-primary-green focus:border-primary-green"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 block w-full px-4 py-2 border border-outline rounded-md focus:ring-primary-green focus:border-primary-green"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button className="w-full">Register</Button>
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-primary-green font-semibold">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
