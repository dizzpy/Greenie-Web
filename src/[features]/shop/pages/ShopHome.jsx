import { useState, useEffect } from 'react';
import ShopNav from '../components/ShopNav';
import ProductCard from '../components/ProductCard';
import sortIcon from '../../../assets/icons/sort.svg';
import { getAllProducts } from '../../../services/shopService';

function ShopHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load products:', error);
      setError(`Failed to load products: ${error.message}`);
      setLoading(false);
    }
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sortedProducts = [...products];

    switch (value) {
      case 'low-to-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-to-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => b.productID - a.productID);
        break;
      default:
        sortedProducts = [...products];
    }

    setProducts(sortedProducts);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-screen-xl container mx-auto px-4">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-4 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      {/* Shop nav */}
      <ShopNav />

      {/* Filter nav */}
      <div className="inline-flex items-center bg-white p-4 rounded-full border border-outline sm:mt-0 mt-5">
        <img src={sortIcon} alt="Sort Icon" className="w-6 h-6 mr-2" />
        <p className="mr-2">Sort by</p>
        <select
          className="font-medium bg-transparent outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="popular">Most Popular</option>
          <option value="low-to-high">Lowest Price</option>
          <option value="high-to-low">Highest Price</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Shop item grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ShopHome;
