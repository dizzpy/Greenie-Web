import ShopNav from '../components/ShopNav';
import ProductCard from '../components/ProductCard';
import sortIcon from '../../assets/icons/sort.svg';
import { products } from '../data/products';

function ShopHome() {
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
        <select className="font-medium bg-transparent outline-none cursor-pointer">
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
