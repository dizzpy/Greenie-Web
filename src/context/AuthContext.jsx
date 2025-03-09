import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for token and userId on mount
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      setIsAuthenticated(true);
      setUser({
        id: userId,
        name: 'Dizzpy',
        email: 'dizzpy@mail.com',
        avatar: 'https://github.com/shadcn.png',
      });

      if (location.pathname === '/login') {
        navigate('/feed');
      }
    }
  }, [navigate, location]);

  const login = (response, userData) => {
    // Expecting response to contain both token and userId
    const { token, userId } = response;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    setIsAuthenticated(true);
    setUser({
      id: userId,
      ...userData,
    });

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
