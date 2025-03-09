import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { API_CONFIG } from '../../../config/api.config';
import searchIcon from '../../../assets/icons/search.svg';
import coinIcon from '../../../assets/icons/coin.svg';
import shoppingCart from '../../../assets/icons/shopping-cart.svg';
import IconButton from '../../../components/Buttons/IconButton';
import SearchBar from './SearchBar';

function ShopNav() {
  const { setIsCartOpen, getCartItemsCount } = useCart();
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const itemCount = getCartItemsCount();

  useEffect(() => {
    const fetchPoints = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(
            API_CONFIG.ENDPOINTS.USER.GET_POINTS(user.id),
          );
          setPoints(response.data.points);
        } catch (error) {
          console.error('Error fetching points:', error);
        }
      }
    };

    fetchPoints();
  }, [user?.id]);

  return (
    <>
      <div className="flex flex-row space-x-3 justify-end items-center">
        {/* User Points Count - Updated with coin icon */}
        <div className="bg-bg-light p-4 rounded-full inline-flex items-center">
          <img src={coinIcon} alt="Points" className="w-6 h-6" />
          <p className="text-primary-green font-medium ml-2">{points} Points</p>
        </div>

        {/* search icon */}
        <IconButton icon={searchIcon} onClick={() => setIsSearchOpen(true)} />

        {/* shopping cart icon */}
        <div
          onClick={() => setIsCartOpen(true)}
          className="cursor-pointer relative"
        >
          <IconButton
            icon={shoppingCart}
            className="hover:opacity-80 transition-opacity"
          />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      </div>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default ShopNav;
