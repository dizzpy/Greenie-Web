const ProfilePage = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="relative">
          <img
            src="/src/assets/ppp.jpeg"
            alt="Banner"
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="absolute left-4 -bottom-8 flex items-center">
            <img
              src="/src/assets/CCC.svg"
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div className="ml-4">
              <h2 className="text-xl text-white font-bold">Alpha Online</h2>
              <p className="text-gray-500">@alpha123</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-3 gap-4 mt-10">
        {/* Static Sidebar (Pinned to Top-Left) */}
        <div className="col-span-1 bg-white shadow-md rounded-lg p-4 sticky top-4 h-fit">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-500 text-sm mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at
            suscipit nulla.
          </p>
          <p className="text-gray-500 mt-2 text-sm">alpha123@gmail.com</p>
          <div className="mt-2">
            <span className="text-green-500 font-bold">Points Earned: 80%</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Feed Section (Now Full Page Scrolls) */}
        <div className="col-span-2 space-y-4 p-2">
          {[1, 2, 3, 4, 5].map((post) => (
            <div key={post} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Nikitha Nuwan Wijesuriya</h4>
                  <p className="text-gray-500 text-sm">@nikitha</p>
                </div>
              </div>
              <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="w-full h-40 bg-gray-200 rounded-lg mt-2"></div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <p>1.7K Likes</p>
                <p>1.7K Comments</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
