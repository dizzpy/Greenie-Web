import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/shop/product/${product.id}`} className="group">
      <div className="h-auto bg-bg-light p-4 rounded-2xl">
        {/* Product Image */}
        <div className="h-52 sm:h-60 bg-outline rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Title */}
        <p className="text-text-gray text-lg sm:text-xl font-medium mt-3">
          {product.name}
        </p>

        {/* Product Description */}
        <p className="text-text-gray text-sm sm:text-base mt-1">
          {product.description}
        </p>

        {/* Price + Points */}
        <div className="flex space-x-3 mt-3 items-center">
          <p className="text-text-gray text-sm sm:text-base">
            🎯 {product.points} Points
          </p>

          <div className="h-1 w-1 bg-text-gray rounded-full my-2"></div>

          <p className="text-text-gray text-sm sm:text-base">
            Rs {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}

// props validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
