import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import LoginImage from '../../../assets/LoginImage.svg';
import { API_CONFIG } from '../../../config/api.config';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const response = await axios.post(API_CONFIG.ENDPOINTS.LOGIN, {
        email,
        password,
      });

      if (response.data) {
        // Pass the entire response data containing token and userId
        login(response.data, {
          name: 'Dizzpy',
          email: email,
          avatar: 'https://github.com/shadcn.png',
        });

        const lastPath = localStorage.getItem('lastPath') || '/feed';
        navigate(lastPath);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErr('Invalid email or password');
      } else {
        setErr('Something went wrong! Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
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
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          {err && <p className="text-red-500 text-center mt-4">{err}</p>}

          <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-primary-green focus:border-primary-green"
                placeholder="E-mail Here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-primary-green focus:border-primary-green"
                placeholder="Password"
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
              <button
                onClick={handleRegisterClick}
                type="button"
                className="text-primary-green font-semibold hover:underline"
              >
                Create Account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
