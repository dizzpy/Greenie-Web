import { useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import shoppingCart from '../../assets/icons/shopping-cart.svg';
import IconButton from '../../components/Buttons/IconButton';
import CartSidebar from './CartSidebar';

function ShopNav() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Temporary cart items for testing
  const cartItems = [
    {
      id: 1,
      name: 'Eco-friendly Water Bottle',
      price: 29.99,
      quantity: 2,
      image: 'https://example.com/bottle.jpg',
    },
  ];

  const handleCartToggle = () => {
    console.log('Toggle cart:', !isCartOpen); // Add this log
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <div className="flex flex-row space-x-3 justify-end items-center">
        {/* User Points Count */}
        <div className="flex items-center">
          <IconButton icon={searchIcon} />
          <p className="ml-3 text-text-gray">365 Points</p>
        </div>

        {/* search icon */}
        <IconButton icon={searchIcon} />

        {/* shopping cart icon */}
        <div onClick={handleCartToggle} className="cursor-pointer">
          <IconButton
            icon={shoppingCart}
            className="hover:opacity-80 transition-opacity"
          />
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
}

export default ShopNav;
