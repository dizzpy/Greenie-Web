export const getCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { items: [], appliedPoints: 0 };
};

export const saveCartToStorage = (cart, appliedPoints) => {
  localStorage.setItem('cart', JSON.stringify({ items: cart, appliedPoints }));
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
