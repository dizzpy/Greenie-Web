import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';

// Import pages
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Login from './[features]/auth/pages/Login';
import Register from './[features]/auth/pages/CreateAccount';
import ForgotPassword from './[features]/auth/pages/ForgotPassword';
import SetNewPassword from './[features]/auth/pages/SetNewPassword';
import ProfilePage from './[features]/auth/pages/ProfilePage';

import ShopHome from './[features]/shop/pages/ShopHome';
import ProductDetails from './[features]/shop/pages/ProductDetails';
import Cart from './[features]/shop/pages/Cart';
import Checkout from './[features]/shop/pages/Checkout';
import RedeemStore from './[features]/shop/pages/RedeemStore';
import CartSidebar from './[features]/shop/components/CartSidebar';

import Feed from './[features]/feed/pages/Feed';
import Notification from './components/Shop/Notification';

import ChallengesHome from './[features]/challenges/pages/ChallengesHome';
import AddChallenge from './[features]/challenges/pages/AddChallenge';
import ViewChallenge from './[features]/challenges/pages/ViewChallenge';
import SubmitChallenge from './[features]/challenges/pages/SubmitChallenge';

import LeaderboardHome from './[features]/leaderboard/pages/LeaderboardHome';

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      localStorage.setItem('lastPath', location.pathname);
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate, location]);

  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? children : null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Public Route Wrapper
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/feed" replace /> : children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Main App Routing Component
function AppRoutes() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/p"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Shop */}
        <Route
          path="/shop/*"
          element={
            <ProtectedRoute>
              <ShopHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop/redeem"
          element={
            <ProtectedRoute>
              <RedeemStore />
            </ProtectedRoute>
          }
        />

        {/* Challenges */}
        <Route
          path="/challenges"
          element={
            <ProtectedRoute>
              <ChallengesHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges/add"
          element={
            <ProtectedRoute>
              <AddChallenge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges/view/:challengeId"
          element={
            <ProtectedRoute>
              <ViewChallenge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges/submit/:challengeId"
          element={
            <ProtectedRoute>
              <SubmitChallenge />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Persistent UI elements */}
      <CartSidebar />
      <Notification />
    </div>
  );
}

export default AppRoutes;
