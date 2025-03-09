import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        API_CONFIG.ENDPOINTS.USER.GET_BY_ID(userId),
      );
      if (response.data) {
        setUser({
          id: userId,
          name: response.data.fullName,
          email: response.data.email,
          avatar: response.data.profileImgUrl,
          points: response.data.pointsCount,
          username: response.data.username || response.data.email.split('@')[0],
        });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      setIsAuthenticated(true);
      fetchUserDetails(userId);

      if (location.pathname === '/login') {
        navigate('/feed');
      }
    }
  }, [navigate, location]);

  const login = (response) => {
    const { token, userId } = response;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    setIsAuthenticated(true);
    fetchUserDetails(userId);

    navigate('/feed');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
