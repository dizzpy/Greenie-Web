import ShopNav from '../components/ShopNav';
import ProductCard from '../components/ProductCard';
import sortIcon from '../../assets/icons/sort.svg';

// Sample Product Data
const products = [
  {
    id: 1,
    image: 'https://via.placeholder.com/300',
    name: 'Eco-Friendly Bottle',
    description: 'Reusable stainless steel bottle',
    points: 120,
    price: 4300,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/300',
    name: 'Bamboo Toothbrush',
    description: 'Biodegradable with soft bristles',
    points: 80,
    price: 1200,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/300',
    name: 'Organic Cotton Tote',
    description: 'Durable organic shopping bag',
    points: 150,
    price: 3500,
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/300',
    name: 'Solar Power Bank',
    description: 'Portable solar device charger',
    points: 200,
    price: 7500,
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/300',
    name: 'Eco Notebooks',
    description: '100% recycled paper notebooks',
    points: 50,
    price: 900,
  },
  {
    id: 6,
    image: 'https://via.placeholder.com/300',
    name: 'Reusable Metal Straw Set',
    description: 'Set of 3 stainless steel straws',
    points: 60,
    price: 1100,
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/300',
    name: 'Beeswax Wraps',
    description: 'Eco-friendly alternative to plastic',
    points: 130,
    price: 2900,
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/300',
    name: 'Plant-Based Soap',
    description: 'Handmade soap with essential oils',
    points: 40,
    price: 700,
  },
  {
    id: 9,
    image: 'https://via.placeholder.com/300',
    name: 'Coconut Bowls',
    description: 'Handcrafted coconut shell bowls',
    points: 100,
    price: 2500,
  },
  {
    id: 10,
    image: 'https://via.placeholder.com/300',
    name: 'Compost Bin',
    description: 'Compact kitchen compost bin',
    points: 300,
    price: 8900,
  },
];

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
      <div className="inline-flex items-center bg-white p-4 rounded-full border border-outline mt-4">
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
