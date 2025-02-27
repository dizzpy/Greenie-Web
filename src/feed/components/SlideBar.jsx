/* eslint-disable no-unused-vars */
import React from 'react';

import { FaRegComments } from 'react-icons/fa';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { RiShoppingBagLine, RiSettings3Line } from 'react-icons/ri';
import { BiGift, BiHomeAlt2 } from 'react-icons/bi';
import SlideBarItems from './SlideBarItems';

const SlideBar = () => {
  return (
    <div className="bg-white h-screen w-72 p-3 shadow-md fixed left-6 top-0 flex flex-col">
      {/* Logo */}
      <div className="text-xl font-bold text-primary-green">
        <span className="text-black">logo</span>-ipsum
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-3 mt-12">
        <SlideBarItems icon={<BiHomeAlt2 />} text="Feed" active />
        <SlideBarItems icon={<FaRegComments />} text="Shop" />
        <SlideBarItems icon={<MdOutlineLeaderboard />} text="Leaderboard" />
        <SlideBarItems icon={<BiGift />} text="Challenges" />
        <SlideBarItems icon={<RiShoppingBagLine />} text="Settings" />
        {/* <SlideBarItems icon={<RiSettings3Line />} text="Settings" /> */}
      </nav>
    </div>
  );
};

export default SlideBar;
