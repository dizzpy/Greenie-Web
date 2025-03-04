import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../Components/Button';
import LoginImage from '/src/assets/CCC.svg'; // Absolute path for Vite

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await axios.post('/api/auth/login', { email, password });
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Image Section (Hidden on Mobile) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-green-100">
        <img
          src={LoginImage}
          alt="Login Illustration"
          className="max-w-[80%]"
        />
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-sm md:max-w-md mx-auto">
          <h2 className="text-center text-3xl font-bold text-gray">Login</h2>
          {err && <p className="text-red-500 text-center mt-4">{err}</p>}

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
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
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-primary-green focus:border-primary-green"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-primary-green focus:border-primary-green"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <p className="text-center text-sm mt-4">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-primary-green font-semibold">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
