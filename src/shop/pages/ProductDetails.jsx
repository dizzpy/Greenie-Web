import { useParams } from 'react-router-dom';
import { useState } from 'react'; // Add this import
import { products } from '../data/products';
import ShopNav from '../components/ShopNav';
import cartIcon from '../../assets/icons/shopping-cart.svg';
import CartButton from '../components/CartButton';
import { LuArrowRight } from 'react-icons/lu';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Add your cart logic here
    console.log('Adding to cart:', product, 'quantity:', quantity);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-screen-xl container mx-auto">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-5 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      {/* shop nav */}
      <ShopNav />

      {/* Product content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Product Image - 5 columns */}
          <div className="col-span-5 bg-bg-light rounded-3xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] rounded-lg object-cover"
            />
          </div>

          {/* Product Info - 7 columns */}
          <div className="col-span-7 bg-bg-light p-10 rounded-3xl">
            {/* product name */}
            <h1 className="text-3xl font-medium text-text-gray mb-2">
              {product.name}
            </h1>
            <p className="text-lightred">Only 3 units left</p>

            {/* price section */}
            <p className="text-xl mt-5 text-text-gray">${product.price}</p>
            <p className="text-base text-primary-green">
              {product.points} Points
            </p>
            <p className="text-text-gray text-sm">
              or you can redeem green points
            </p>

            {/* priduct description */}
            <h2 className="text-base mt-5 font-medium">Description</h2>
            <p className="text-text-gray text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              suscipit fringilla aliquet. Phasellus vel leo sem. Nunc at congue
              augue. Vestibulum ante ipsum primis ngue quam
            </p>

            {/* quantity */}
            <h2 className="text-base mt-5 font-medium">Quantity</h2>

            <div className="flex items-center space-x-4 mt-2 mb-6 bg-white w-fit p-2 rounded-full">
              <button
                onClick={decrementQuantity}
                className="w-8 h-8 flex items-center justify-center bg-bg-light rounded-full hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <span className="text-base text-text-gray font-normal w-3 text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="w-8 h-8 flex items-center justify-center bg-bg-light rounded-full hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>

            {/* button section */}
            <div className="flex flex-row space-x-4">
              <CartButton
                onClick={handleAddToCart}
                icon={cartIcon}
                text="Add to Cart"
              />

              <CartButton
                onClick={handleAddToCart}
                icon={<LuArrowRight />}
                text="Buy it Now"
              />
            </div>

            <CartButton
              className="mt-5"
              onClick={handleAddToCart}
              icon={<LuArrowRight />}
              text="Redeem Green Points"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
