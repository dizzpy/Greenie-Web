import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Home, ShoppingBag, Swords, Trophy, Menu, X } from 'lucide-react';
import logo from '../../assets/icons/greenlogo.svg';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { icon: Home, path: '/feed', label: 'Feed' },
    { icon: ShoppingBag, path: '/shop', label: 'Shop' },
    { icon: Swords, path: '/challenges', label: 'Challenges' },
    { icon: Trophy, path: '/leaderboard', label: 'Leaderboard' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Greenie Logo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
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

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-primary-green relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </button>

            <div className="hidden md:block">
              <img
                src="https://github.com/shadcn.png"
                alt="Profile"
                className="h-9 w-9 rounded-full border-2 border-primary-green"
              />
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
