import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import searchIcon from '../../../assets/icons/search.svg';
import shoppingCart from '../../../assets/icons/shopping-cart.svg';
import IconButton from '../../../components/Buttons/IconButton';
import SearchBar from './SearchBar';

function ShopNav() {
  const { setIsCartOpen, getCartItemsCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const itemCount = getCartItemsCount();

  return (
    <>
      <div className="flex flex-row space-x-3 justify-end items-center">
        {/* User Points Count */}
        <IconButton icon={searchIcon}>
          <p className="ml-3 text-text-gray">365 Points</p>
        </IconButton>

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
