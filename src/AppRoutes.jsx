import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import all pages
import ShopHome from './[features]/shop/pages/ShopHome';
import ProductDetails from './[features]/shop/pages/ProductDetails';
import Cart from './[features]/shop/pages/Cart';
import Checkout from './[features]/shop/pages/Checkout';
import RedeemStore from './[features]/shop/pages/RedeemStore';
import NotFound from './pages/NotFound';
import HomePage from './pages/HomePage';
import Feed from './[features]/feed/pages/Feed';
import ChallengesHome from './[features]/challenges/pages/ChallengesHome';
import Login from './[features]/auth/pages/Login';
import Register from './[features]/auth/pages/CreateAccount';
import ForgotPassword from './[features]/auth/pages/ForgotPassword';
import SetNewPassword from './[features]/auth/pages/SetNewPassword';
import ProfilePage from './[features]/auth/pages/ProfilePage';
import LeaderboardHome from './[features]/leaderboard/pages/LeaderboardHome';
import CartSidebar from './[features]/shop/components/CartSidebar';
import Notification from './components/Shop/Notification';
import AddChallenge from './[features]/challenges/pages/AddChallenge';
import ViewChallenge from './[features]/challenges/pages/ViewChallenge';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function AppRoutes() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
          path="/shop"
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
          path="/challenges/view/:id"
          element={
            <ProtectedRoute>
              <ViewChallenge />
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
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
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

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartSidebar />
      <Notification />
    </div>
  );
}

export default AppRoutes;
