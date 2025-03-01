import Breadcrumb from '../components/Breadcrumb';
import ShopNav from '../components/ShopNav';

const RedeemStore = () => {
  return (
    <div className="max-w-screen-xl container mx-auto px-4">
      {/* Global nav */}
      <div className="bg-green-300 py-4 mx-auto my-4 rounded-lg">
        <p className="text-center">Global Nav</p>
      </div>

      <ShopNav />

      <div className="my-4">
        <Breadcrumb
          items={[{ label: 'Shop', link: '/shop' }, { label: 'Redeem Store' }]}
        />
      </div>

      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Redeem Points Store</h1>
      </div>
    </div>
  );
};

export default RedeemStore;
