/_ eslint-disable no-unused-vars _/
import React, { useState } from 'react';
import ProfileHeader from '../Components/profile/ProfileHeader';
import ProfileNavTabs from '../Components/profile/ProfileNavTabs';
import ProfileSidebar from '../Components/profile/ProfileSidebar';
import PostCard from '../Components/profile/PostCard';
import MainNavBar from '../../../components/Shared/MainNavBar';
import Navbar from '../../../components/Shared/NavBar';

const dummyPost = {
content: 'Exploring nature and preserving green life!',
imageUrl: '/src/assets/posts/post-01.jpg', // use real path if needed
likes: '1.7k',
comments: '25',
};

const ProfilePage = () => {
const [activeTab, setActiveTab] = useState('About');

return (
<>
{/_ ✅ Sticky Navbar on top _/}
<Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <ProfileHeader />
        <ProfileNavTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Layout: Sidebar + Tab Content */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ProfileSidebar />

          <div className="sm:col-span-2">
            {activeTab === 'About' && (
              <>
                <PostCard post={dummyPost} />
                <PostCard post={dummyPost} />
              </>
            )}
            {activeTab === 'Challenges' && (
              <div>Challenge content goes here...</div>
            )}
            {activeTab === 'Order History' && (
              <div>Order history content goes here...</div>
            )}
          </div>
        </div>
      </div>
    </>

);
};

export default ProfilePage;
