export const CART_STORAGE_KEY = 'greenie_cart';

export const getCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) {
      const initialCart = { items: [], appliedPoints: 0 };
      saveCartToStorage(initialCart);
      return initialCart;
    }

    const parsedCart = JSON.parse(savedCart);
    return {
      items: Array.isArray(parsedCart.items) ? parsedCart.items : [],
      appliedPoints: Number(parsedCart.appliedPoints) || 0,
    };
  } catch (error) {
    console.error('Error reading cart from storage:', error);
    return { items: [], appliedPoints: 0 };
  }
};

export const saveCartToStorage = (cart) => {
  try {
    const cartData = {
      items: cart.items || [],
      appliedPoints: cart.appliedPoints || 0,
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};

export const calculateItemsCount = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};
