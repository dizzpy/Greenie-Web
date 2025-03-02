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
            <div className="mt-4 max-h-96 overflow-y-auto">
              {isLoading ? (
                <p className="text-center py-4">Loading...</p>
              ) : filteredProducts.length === 0 ? (
                <p className="text-center py-4">No products found</p>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.productID}
                      onClick={() => handleProductClick(product.productID)}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-bg-light cursor-pointer"
                    >
                      <img
                        src={product.imgURL}
                        alt={product.productName}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-medium">{product.productName}</h3>
                        <p className="text-sm text-text-gray">
                          Rs {product.price}
                        </p>
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
