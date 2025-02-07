// import React from 'react';
import searchIcon from '../../assets/icons/search.svg';
import shoppingCart from '../../assets/icons/shopping-cart.svg';
import IconButton from '../../components/Buttons/IconButton';

function ShopNav() {
  return (
    <div className="flex flex-row space-x-3 justify-end">
      {/* User Points Count */}
      <IconButton icon={searchIcon}>
        <p className="ml-3 text-text-gray">365 Points</p>
      </IconButton>

      {/* search icon */}
      <IconButton icon={searchIcon} />

      {/* shopping cart icon */}
      <IconButton icon={shoppingCart} />
    </div>
  );
}

export default ShopNav;
