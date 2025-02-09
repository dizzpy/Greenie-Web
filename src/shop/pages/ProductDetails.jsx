import { useParams } from 'react-router-dom';
import { useState } from 'react'; // Add this import
import { products } from '../data/products';
import ShopNav from '../components/ShopNav';
import cartIcon from '../../assets/icons/shopping-cart.svg';
import CartButton from '../components/CartButton';
import { LuArrowRight } from 'react-icons/lu';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.productID === parseInt(id));
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

  // Get 3 random products excluding current product
  const getRandomProducts = () => {
    const otherProducts = products.filter((p) => p.id !== parseInt(id));
    return otherProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  const relatedProducts = getRandomProducts();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-screen-xl container mx-auto px-4 md:px-0">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-3 md:my-5 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      {/* shop nav */}
      <ShopNav />

      {/* Product content */}
      <div className="container mx-auto py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          {/* Product Image */}
          <div className="md:col-span-5 bg-bg-light/50 rounded-3xl overflow-hidden">
            <img
              src={product.imgURL}
              alt={product.productName}
              className="w-full h-[300px] md:h-[500px] rounded-lg object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="md:col-span-7 bg-bg-light/50 p-6 md:p-10 rounded-3xl">
            {/* product name */}
            <h1 className="text-2xl md:text-3xl font-medium text-text-gray mb-2">
              {product.productName}
            </h1>
            <p className="text-sm md:text-base text-lightred">
              Only {product.quantity} units left
            </p>

            {/* price section */}
            <div className="mt-4 md:mt-5">
              <p className="text-lg md:text-xl text-text-gray">
                Rs {product.price}
              </p>
              <p className="text-sm md:text-base text-primary-green">
                {product.numberOfPoints} Points
              </p>
              <p className="text-xs md:text-sm text-text-gray">
                or you can redeem green points
              </p>
            </div>

            {/* product description */}
            <div className="mt-4 md:mt-5">
              <h2 className="text-base font-medium">Description</h2>
              <p className="text-sm md:text-base text-text-gray">
                {product.fullDescription}
              </p>
            </div>

            {/* quantity */}
            <div className="mt-4 md:mt-5">
              <h2 className="text-base font-medium">Quantity</h2>
              <div className="flex items-center space-x-4 mt-2 mb-4 md:mb-6 bg-white w-fit p-2 rounded-full">
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
            </div>

            {/* button section */}
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
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
              className="mt-3 md:mt-5"
              onClick={handleAddToCart}
              icon={<LuArrowRight />}
              text="Redeem Green Points"
            />
          </div>
        </div>

        {/* Related products */}
        <div className="mt-12 md:mt-24">
          <h2 className="text-xl md:text-2xl font-medium text-text-gray mb-4 md:mb-6">
            You may also like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
