import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import coverImg from '@/assets/profile/coverImg.jpg';
import coin from '@/assets/icons/coin.svg';
import NavBar from '../../../components/Shared/NavBar';
import { API_CONFIG } from '../../../config/api.config';
import Poster from '../../../[features]/feed/components/Poster';

const defaultProfileImage = 'https://www.example.com/default-profile.jpg';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setPostsLoading(true);

        let endpoint = API_CONFIG.ENDPOINTS.POSTS?.GET_ALL || '/api/posts/all';
        const response = await axios.get(endpoint);
        const allPosts = response.data || [];

        // Filter posts to only include posts from the current profile user
        const userPosts = allPosts.filter((post) => {
          const postUserId = post.userId || post.author;
          return postUserId === user?.id;
        });

        const sortedPosts = [...userPosts].sort((a, b) => {
          const dateA = new Date(a.timestamp || a.createdAt || a.date || 0);
          const dateB = new Date(b.timestamp || b.createdAt || b.date || 0);
          return dateB - dateA;
        });

        // Add debug logging to see the structure of posts
        console.log('User posts:', sortedPosts);

        if (sortedPosts.length > 0) {
          console.log(
            'First post image data:',
            sortedPosts[0].image
              ? sortedPosts[0].image.substring(0, 50) + '...'
              : 'No image',
          );
        }

        setPosts(sortedPosts);
      } catch (err) {
        console.error('❌ Error fetching posts:', err);
        setError(`Failed to load posts: ${err.message}`);
      } finally {
        setPostsLoading(false);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  // Handle post deletion
  const handleDeletePost = async (postId) => {
    try {
      // Show confirmation dialog
      if (!window.confirm('Are you sure you want to delete this post?')) {
        return;
      }

      // Get the delete endpoint from API_CONFIG or use default
      let endpoint = API_CONFIG.ENDPOINTS.POSTS?.DELETE || '/api/posts/delete';
      endpoint = `${endpoint}/${postId}`;

      await axios.delete(endpoint);

      // Remove the deleted post from state
      setPosts(posts.filter((post) => (post.postId || post.id) !== postId));

      // Show success message (optional)
      alert('Post deleted successfully');
    } catch (err) {
      console.error('❌ Error deleting post:', err);
      alert(`Failed to delete post: ${err.message}`);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Error: User not found or not logged in.
      </div>
    );

  return (
    <div className="bg-bg-light min-h-screen">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="relative">
            <img
              src={coverImg}
              alt="Cover"
              className="w-full h-40 object-cover"
              onError={(e) => (e.target.src = coverImg)}
            />
            <div className="absolute -bottom-10 left-6 flex items-center">
              <img
                src={user.avatar || defaultProfileImage}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
                onError={(e) => (e.target.src = defaultProfileImage)}
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
          </div>
          <div className="mt-14 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <div className="flex space-x-6 text-sm font-medium text-gray-600">
              <button className="hover:text-primary-green">About</button>
              <button
                onClick={() => navigate('/challenges')}
                className="hover:text-primary-green"
              >
                Challenges
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="hover:text-primary-green"
              >
                Order History
              </button>
            </div>
            <button
              onClick={() => navigate('/profile/edit')}
              className="bg-gray-200 hover:bg-primary-green hover:text-white px-4 py-2 rounded-md text-sm"
            >
              ✎ Edit Profile
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="sm:col-span-1">
            <div className="sticky top-20 space-y-6 max-h-screen overflow-y-auto pb-8">
              {/* Badges */}
              {/* Badges */}
              <div className="bg-white rounded-lg shadow-md p-4 flex justify-center flex-wrap gap-2">
                {[
                  {
                    id: '1',
                    name: 'Quick Starter',
                    icon: 'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png',
                    isUnlocked: true,
                  },
                  {
                    id: '2',
                    name: 'Pull Shark',
                    icon: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png',
                    isUnlocked: true,
                  },
                  {
                    id: '3',
                    name: 'Galaxy Brain',
                    icon: 'https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png',
                    isUnlocked: true,
                  },
                  {
                    id: '4',
                    name: 'YOLO',
                    icon: 'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png',
                    isUnlocked: true,
                  },
                  {
                    id: '5',
                    name: 'Locked Badge 1',
                    icon: 'https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png',
                    isUnlocked: false,
                  },
                  {
                    id: '6',
                    name: 'Locked Badge 2',
                    icon: 'https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png',
                    isUnlocked: false,
                  },
                ].map((badge) => (
                  <img
                    key={badge.id}
                    src={badge.icon}
                    alt={badge.name}
                    title={badge.name}
                    className={`w-10 h-10 rounded-full object-cover ${
                      badge.isUnlocked === true
                        ? 'border-2 border-green-500'
                        : 'opacity-50'
                    }`}
                  />
                ))}
              </div>

              {/* About */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  About
                </h3>
                <p className="text-sm text-gray-600">
                  {user.bio ? user.bio : 'No bio set yet.'}
                </p>
              </div>

              {/* Email */}
              <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-700">{user.email}</p>
              </div>

              {/* Points */}
              <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-2">
                <p className="text-gray-700 font-semibold">
                  Points You Earned:
                </p>
                <p className="text-green-600 font-bold">{user.points ?? 0}</p>
                <img src={coin} alt="Coin" className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="sm:col-span-2 space-y-4">
            {postsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-green"></div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-red-500">{error}</p>
              </div>
            ) : posts.length > 0 ? (
              posts.map((post) => {
                let postImage = null;
                if (post.image) {
                  postImage = post.image.startsWith('data:image')
                    ? post.image
                    : `data:image/jpeg;base64,${post.image}`;
                }

                const postId = post.postId || post.id;

                return (
                  <div key={postId} className="relative">
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeletePost(postId)}
                      className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md transition-colors duration-200"
                      title="Delete post"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>

                    <Poster
                      postId={postId}
                      userId={post.userId || post.author}
                      fullName={user.name}
                      viewerUserId={user?.id}
                      content={
                        post.description || post.content || post.text || ''
                      }
                      image={postImage}
                      profileImage={user.avatar || defaultProfileImage}
                      likes={post.likes}
                      commentCount={post.commentCount}
                      timestamp={post.timestamp || post.createdAt}
                    />
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <p className="mt-2 text-gray-500">No posts available yet.</p>
                <button
                  className="mt-4 px-4 py-2 bg-primary-green text-white rounded-md hover:bg-green-600"
                  onClick={() => navigate('/create-post')}
                >
                  Create Your First Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
