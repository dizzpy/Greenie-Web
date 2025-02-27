/* eslint-disable no-unused-vars */
import React from 'react';

import { FaRegComments } from 'react-icons/fa';
import { MdOutlineLeaderboard } from 'react-icons/md';
import { RiShoppingBagLine, RiSettings3Line } from 'react-icons/ri';
import { BiGift, BiHomeAlt2 } from 'react-icons/bi';
import SlideBarItems from './SlideBarItems';
import logo from '../../assets/icons/greenlogo.svg';

const SlideBar = () => {
  return (
    <div className=" h-screen w-72 p-3 fixed left-6 top-0 flex flex-col">
      {/* Logo */}
      <div className="text-xl font-bold text-primary-green">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
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
