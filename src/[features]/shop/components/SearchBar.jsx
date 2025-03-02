import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { getAllProducts } from '../../../services/shopService';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const handleProductClick = (productId) => {
    onClose();
    setSearchTerm('');
    navigate(`/shop/product/${productId}`);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed inset-x-0 top-0 bg-white p-4 shadow-lg z-50 animate-slide-down">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4">
            <input
              ref={searchRef}
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 p-3 rounded-xl bg-bg-light outline-none"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-bg-light rounded-full"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mt-6 max-h-[70vh] overflow-y-auto px-2">
              {isLoading ? (
                <p className="text-center py-4">Loading...</p>
              ) : filteredProducts.length === 0 ? (
                <p className="text-center py-4">No products found</p>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.productID}
                      onClick={() => handleProductClick(product.productID)}
                      className="flex items-center gap-6 p-4 rounded-2xl hover:bg-bg-light cursor-pointer transition-colors duration-200"
                    >
                      <img
                        src={product.imgURL}
                        alt={product.productName}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-1">
                          {product.productName}
                        </h3>
                        <p className="text-text-gray mb-2">
                          {product.shortDescription}
                        </p>
                        <div className="flex items-center gap-4">
                          <p className="text-primary-green">
                            🎯 {product.numberOfPoints} Points
                          </p>
                          <p className="text-text-gray">Rs {product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

SearchBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchBar;
