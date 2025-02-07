# 🛍️ Shop Module Documentation

## 📌 folder and file structure

```
📂 shop
 ┣ 📂 components
 ┃ ┣ 📜 CartItem.jsx        # Single cart item component
 ┃ ┣ 📜 ProductCard.jsx     # Single product display component
 ┃ ┣ 📜 RedeemPoints.jsx    # Component to show user's redeem points
 ┃ ┣ 📜 SearchBar.jsx       # Search bar for products
 ┃ ┗ 📜 ShopNavbar.jsx      # Navbar specific to shop page
 ┣ 📂 pages
 ┃ ┣ 📜 Cart.jsx            # Shopping cart page
 ┃ ┣ 📜 Checkout.jsx        # Checkout page
 ┃ ┣ 📜 ProductDetails.jsx  # Single product details page
 ┃ ┣ 📜 RedeemStore.jsx     # Redeem points store page
 ┃ ┗ 📜 Shop.jsx            # Main shop landing page (list of products)
 ┣ 📂 services
 ┃ ┣ 📜 cartService.js      # API calls related to cart actions
 ┃ ┣ 📜 productService.js   # API calls related to products
 ┃ ┗ 📜 redeemService.js    # API calls related to redeem points
 ┣ 📂 store
 ┃ ┣ 📜 cartSlice.js        # Redux/Zustand state management for cart
 ┃ ┣ 📜 productSlice.js     # Redux/Zustand state management for products
 ┃ ┗ 📜 redeemSlice.js      # Redux/Zustand state management for redeem points
 ┗ 📜 index.jsx             # Entry point to export shop-related components
```

## 📌 Route Paths for Shop

| Route Path          | Page Component       | Description                          |
| ------------------- | -------------------- | ------------------------------------ |
| `/`                 | `ShopHome.jsx`       | Shop landing page (product listings) |
| `/shop`             | `ShopHome.jsx`       | Alias for the shop page              |
| `/shop/product/:id` | `ProductDetails.jsx` | Single product details page          |
| `/shop/cart`        | `Cart.jsx`           | Shopping cart page                   |
| `/shop/checkout`    | `Checkout.jsx`       | Checkout process                     |
| `/shop/redeem`      | `RedeemStore.jsx`    | Redeem points store                  |
| `*`                 | `NotFound.jsx`       | 404 page for unmatched routes        |

## 📝 Notes

- The `/shop` route serves as an alias for the main shop landing page.
- Dynamic product details pages are handled with `/shop/product/:id`.
- The wildcard `*` route ensures a 404 page is displayed for invalid paths.
