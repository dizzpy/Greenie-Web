import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductById, getAllProducts } from '../../../services/shopService';
import ShopNav from '../components/ShopNav';
import cartIcon from '../../../assets/icons/shopping-cart.svg';
import CartButton from '../components/CartButton';
import { LuArrowRight } from 'react-icons/lu';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../../../context/CartContext';
import NavBar from '../../../components/Shared/NavBar';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();

  // Get current cart quantity for this product
  const currentCartQuantity =
    cartItems.find((item) => item.productID === product?.productID)?.quantity ||
    0;

  // Calculate remaining available quantity
  const availableQuantity = product
    ? product.quantity - currentCartQuantity
    : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch current product
        const productData = await getProductById(id);
        setProduct(productData);

        // Fetch all products for related section
        const allProducts = await getAllProducts();
        const filtered = allProducts
          .filter((p) => p.productID !== productData.productID)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setRelatedProducts(filtered);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load product details');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const incrementQuantity = () => {
    if (quantity < availableQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-medium">{error || 'Product not found'}</h2>
        <button
          onClick={() => navigate('/shop')}
          className="text-primary-green hover:underline"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Shop', link: '/shop' },
    { label: product.productName },
  ];

  return (
    <div className="max-w-screen-xl container mx-auto px-4 md:px-0">
      <NavBar />

      {/* shop nav */}
      <ShopNav />

      <div className="my-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Product content */}
      <div className="container mx-auto py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          {/* Product Image */}
          <div className="md:col-span-5 bg-bg-light rounded-3xl overflow-hidden">
            <img
              src={product.imgURL}
              alt={product.productName}
              className="w-full h-[300px] md:h-[500px] rounded-lg object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="md:col-span-7 bg-bg-light p-6 md:p-10 rounded-3xl">
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
                {availableQuantity > 0 ? (
                  <>
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center bg-bg-light rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="text-base text-text-gray font-normal w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      disabled={quantity >= availableQuantity}
                      className="w-8 h-8 flex items-center justify-center bg-bg-light rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <p className="text-lightred">Out of stock</p>
                )}
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

            {/* <CartButton
              className="mt-3 md:mt-5"
              onClick={handleAddToCart}
              icon={<LuArrowRight />}
              text="Redeem Green Points"
            /> */}
          </div>
        </div>

        {/* Related products */}
        <div className="mt-12 md:mt-24">
          <h2 className="text-xl md:text-2xl font-medium text-text-gray mb-4 md:mb-6">
            You may also like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.productID} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
