import 'react';
import {
  ChartColumnBig,
  House,
  Settings,
  ShoppingBag,
  Swords,
} from 'lucide-react';
import SlideBarItems from './SlideBarItems';
import logo from '../../../assets/icons/greenlogo.svg';

const SlideBar = () => {
  return (
    <div className="h-screen w-72 p-3 fixed left-6 top-0 flex flex-col">
      {/* Logo */}
      <div className="text-xl font-bold text-primary-green">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-3 mt-12">
        <SlideBarItems icon={<House />} text="Feed" to="/feed" />
        <SlideBarItems icon={<ShoppingBag />} text="Shop" to="/shop" />
        <SlideBarItems
          icon={<ChartColumnBig />}
          text="Leaderboard"
          to="/leaderboard"
        />
        <SlideBarItems icon={<Swords />} text="Challenges" to="/challenges" />
        <SlideBarItems icon={<Settings />} text="Settings" to="/settings" />
      </nav>
    </div>
  );
};

export default SlideBar;
