import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getCartFromStorage,
  saveCartToStorage,
  calculateCartTotal,
  calculateItemsCount,
} from '../hooks/useCartUtils';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState(() => getCartFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Save cart whenever it changes
  useEffect(() => {
    saveCartToStorage(cartState);
  }, [cartState]);

  const addToCart = (product, quantity) => {
    setCartState((prevState) => {
      const existingItem = prevState.items.find(
        (item) => item.productID === product.productID,
      );

      let newItems;
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.quantity) {
          setNotificationMessage(`Only ${product.quantity} items available`);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
          return prevState;
        }

        newItems = prevState.items.map((item) =>
          item.productID === product.productID
            ? { ...item, quantity: newQuantity }
            : item,
        );
      } else {
        if (quantity > product.quantity) {
          setNotificationMessage(`Only ${product.quantity} items available`);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
          return prevState;
        }
        newItems = [...prevState.items, { ...product, quantity }];
      }

      return {
        ...prevState,
        items: newItems,
      };
    });

    setNotificationMessage(`${product.productName} added to cart`);
    setShowNotification(true);
    setIsCartOpen(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const removeFromCart = (productId) => {
    setCartState((prevState) => {
      const newItems = prevState.items.filter(
        (item) => item.productID !== productId,
      );

      // Reset points if cart becomes empty
      if (newItems.length === 0) {
        return {
          items: [],
          appliedPoints: 0,
        };
      }

      return {
        ...prevState,
        items: newItems,
      };
    });
  };

  const applyPoints = (points) => {
    setCartState((prevState) => ({
      ...prevState,
      appliedPoints: points,
    }));
  };

  const removePoints = () => {
    setCartState((prevState) => ({
      ...prevState,
      appliedPoints: 0,
    }));
  };

  const clearCart = () => {
    setCartState({
      items: [],
      appliedPoints: 0,
    });
    setNotificationMessage('Cart cleared');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const value = {
    cartItems: cartState.items,
    appliedPoints: cartState.appliedPoints,
    isCartOpen,
    showNotification,
    notificationMessage,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    applyPoints,
    removePoints,
    clearCart,
    getCartTotal: () => calculateCartTotal(cartState.items),
    getCartItemsCount: () => calculateItemsCount(cartState.items),
    getFinalTotal: () =>
      Math.max(
        0,
        calculateCartTotal(cartState.items) - cartState.appliedPoints,
      ),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Move hook to a separate export
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
