import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../Components/Button';
import RegisterImage from '../../../assets/LoginImage.svg';
import { API_CONFIG } from '../../../config/api.config';

const Register = () => {
  const [name, setName] = useState('');
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
      const response = await axios.post(API_CONFIG.ENDPOINTS.REGISTER, {
        fullName: name,
        email,
        password,
      });

      if (response.data) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErr(error.response.data.message || 'Validation error occurred');
      } else {
        setErr('Something went wrong! Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Image Section (Hidden on Mobile) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-green-100">
        <img
          src={RegisterImage}
          alt="Register Illustration"
          className="max-w-[80%]"
        />
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-sm md:max-w-md mx-auto">
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Create an Account
          </h2>
          {err && <p className="text-red-500 text-center mt-4">{err}</p>}

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-primary-green focus:border-primary-green"
                placeholder="Your Name "
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-primary-green focus:border-primary-green"
                placeholder="E-mail Here "
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
              {loading ? 'Creating...' : 'Create'}
            </Button>
            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-primary-green font-semibold">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
