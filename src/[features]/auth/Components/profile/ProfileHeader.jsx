import { useAuth } from '@/context/AuthContext';
import coverImg from '../../../assets/profile/coverImg.jpg';
import { Link } from 'react-router-dom';
import defaultProfileImg from '../../../assets/profile/profile.jpeg';

const ProfileHeader = () => {
  const { user } = useAuth();

  // Fallback to default profile image if not present or not base64
  const profileImage =
    user?.profileImgUrl && user.profileImgUrl.startsWith('data:image/')
      ? user.profileImgUrl
      : defaultProfileImg;

  // Fallback to default cover image if not present or not base64
  const coverImage =
    user?.coverImgUrl && user.coverImgUrl.startsWith('data:image/')
      ? user.coverImgUrl
      : coverImg;

  return (
    <div className="bg-white shadow-s pb-2 rounded-lg overflow-hidden">
      {/* Cover Image */}
      <div className="relative">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.src = coverImg;
          }}
        />

        {/* Profile Details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between px-6 pt-4 pb-2 bg-white">
          <div className="flex items-center gap-4 -mt-12 sm:-mt-14">
            {/* Profile Image */}
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              onError={(e) => {
                e.target.src = defaultProfileImg;
              }}
            />

            {/* Name and Username */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mt-10">
                {user?.fullName || 'Anonymous'}
                <span className="w-3 h-3 rounded-full bg-primary-green inline-block"></span>
              </h2>
              <p className="text-gray-500 text-sm">
                @{user?.username || 'unknown'}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-4 sm:mt-0">
            <Link to="/profile/edit">
              <button className="text-sm bg-gray-200 hover:bg-primary-green hover:text-bg-light px-4 py-2 rounded-md">
                ✎ Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
