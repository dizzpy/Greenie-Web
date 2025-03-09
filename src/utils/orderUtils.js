export const generateOrderId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Get current count from localStorage or start at 1
  const currentCount =
    parseInt(localStorage.getItem('lastOrderCount') || '0') + 1;
  localStorage.setItem('lastOrderCount', currentCount.toString());

  // Format: ORD-YYYYMMDD-COUNT
  return `ORD-${year}${month}${day}-${String(currentCount).padStart(3, '0')}`;
};
