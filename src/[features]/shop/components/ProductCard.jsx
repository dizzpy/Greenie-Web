import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import coinIcon from '../../../assets/icons/coin.svg';

function ProductCard({ product }) {
  return (
    <Link to={`/shop/product/${product.productID}`} className="group">
      <div className="h-auto bg-bg-light p-4 rounded-2xl">
        <div className="h-52 sm:h-60 bg-outline rounded-2xl overflow-hidden">
          <img
            src={product.imgURL}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-text-gray text-lg sm:text-xl font-medium mt-3">
          {product.productName}
        </p>

        <p className="text-text-gray text-sm sm:text-base mt-1">
          {product.shortDescription}
        </p>

        <div className="flex space-x-3 mt-3 items-center">
          <div className="flex items-center text-text-gray text-sm sm:text-base">
            <img src={coinIcon} alt="Points" className="w-5 h-5 mr-1" />
            <span>{product.numberOfPoints} Points</span>
          </div>

          <div className="h-1 w-1 bg-text-gray rounded-full my-2"></div>

          <p className="text-text-gray text-sm sm:text-base">
            Rs {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    productID: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imgURL: PropTypes.string.isRequired,
    numberOfPoints: PropTypes.number.isRequired,
    shortDescription: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
