import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  Home,
  ShoppingBag,
  Swords,
  Trophy,
  Menu,
  X,
  User,
  LogOut,
} from 'lucide-react';
import logo from '../../assets/icons/greenlogo.svg';
import { useAuth } from '../../context/AuthContext';

// eslint-disable-next-line react/prop-types
const NavBar = ({ miditem = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { icon: Home, path: '/feed', label: 'Feed' },
    { icon: ShoppingBag, path: '/shop', label: 'Shop' },
    { icon: Swords, path: '/challenges', label: 'Challenges' },
    { icon: Trophy, path: '/leaderboard', label: 'Leaderboard' },
  ];

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Greenie Logo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          {miditem && (
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(({ icon: Icon, path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 transition-colors ${
                    isActive(path)
                      ? 'text-primary-green'
                      : 'text-gray-600 hover:text-primary-green'
                  }`}
                >
                  <Icon size={24} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-primary-green relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>

            {/* Profile Section */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none transition-transform duration-200 ease-in-out hover:scale-105"
              >
                <img
                  src={user?.avatar || 'https://github.com/shadcn.png'}
                  alt="Profile"
                  className="h-9 w-9 rounded-full border-1 border-primary-green"
                />
              </button>

              {/* Profile Dropdown */}
              <div
                className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-100 transform transition-all duration-200 ease-in-out ${
                  isProfileOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <p className="text-xs text-primary-green mt-1">
                    {user?.points?.toLocaleString() || 0} Points
                  </p>
                </div>

                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    <span>View Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3">
            {miditem && (
              <div className="flex flex-col space-y-4">
                {navItems.map(({ icon: Icon, path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      isActive(path)
                        ? 'text-primary-green bg-green-50'
                        : 'text-gray-600 hover:text-primary-green hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Profile and Logout in Mobile */}
            <div className="border-t mt-4 pt-4">
              <Link
                to="/profile"
                className="flex items-center space-x-3 p-2 rounded-lg text-gray-600 hover:text-primary-green hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-2 rounded-lg text-gray-600 hover:text-primary-green hover:bg-gray-50 w-full"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
