import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import coverImg from '../../../assets/profile/coverImg.jpg';
import coin from '@/assets/icons/coin.svg';
import NavBar from '../../../components/Shared/NavBar';
import { API_CONFIG } from '../../../config/api.config';
import Poster from '../../../[features]/feed/components/Poster';

const defaultProfileImage = 'https://www.example.com/default-profile.jpg';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [challengesLoading, setChallengesLoading] = useState(false);
  const [error, setError] = useState(null);
  // Active tab state: 'posts', 'challenges', or 'orders'
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    if (user) {
      if (activeTab === 'posts') {
        fetchUserPosts();
      } else if (activeTab === 'orders') {
        fetchUserOrders();
      } else if (activeTab === 'challenges') {
        fetchUserChallenges();
      }
    }
  }, [user, activeTab]);

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
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching posts:', err);
      setError(`Failed to load posts: ${err.message}`);
    } finally {
      setPostsLoading(false);
    }
  };

  const fetchUserOrders = async () => {
    try {
      setOrdersLoading(true);

      // Get all orders from API
      const endpoint = API_CONFIG.ENDPOINTS.ORDERS?.GET_ALL || '/api/order/all';
      const response = await axios.get(endpoint);
      const allOrders = response.data || [];

      // Filter orders to only include orders from the current user
      const userOrders = allOrders.filter((order) => order.userId === user?.id);

      // Sort orders by creation date (newest first)
      const sortedOrders = [...userOrders].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });

      console.log('User orders:', sortedOrders);
      setOrders(sortedOrders);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching orders:', err);
      setError(`Failed to load order history: ${err.message}`);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchUserChallenges = async () => {
    try {
      setChallengesLoading(true);

      // Get all challenges from API
      const endpoint =
        API_CONFIG.ENDPOINTS.CHALLENGES?.GET_ALL || '/api/admin/challenges/all';
      const response = await axios.get(endpoint);
      const allChallenges = response.data || [];

      // Filter challenges to only include challenges from the current user
      // You may need to adjust this filter based on how challenges are associated with users
      const userChallenges = allChallenges.filter(
        (challenge) =>
          challenge.userId === user?.id ||
          challenge.participants?.includes(user?.id) ||
          challenge.createdBy === user?.id,
      );

      // Sort challenges by creation date (newest first)
      const sortedChallenges = [...userChallenges].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.startDate || 0);
        const dateB = new Date(b.createdAt || b.startDate || 0);
        return dateB - dateA;
      });

      console.log('User challenges:', sortedChallenges);
      setChallenges(sortedChallenges);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching challenges:', err);
      setError(`Failed to load challenges: ${err.message}`);
    } finally {
      setChallengesLoading(false);
    }
  };

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

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper function to get order status badge
  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'pending') {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
          Pending
        </span>
      );
    } else if (statusLower === 'active') {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
          Active
        </span>
      );
    } else if (statusLower === 'completed') {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
          Completed
        </span>
      );
    } else if (statusLower === 'cancelled' || statusLower === 'failed') {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
          Cancelled
        </span>
      );
    } else if (statusLower === 'shipped') {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
          Shipped
        </span>
      );
    } else if (statusLower === 'delivered') {
      return (
        <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
          Delivered
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full">
        {status || 'Unknown'}
      </span>
    );
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

  // Render the challenges content
  const renderChallenges = () => {
    if (challengesLoading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-green"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    if (challenges.length === 0) {
      return (
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
          <p className="mt-2 text-gray-500">No challenges found.</p>
          <button
            className="mt-4 px-4 py-2 bg-primary-green text-white rounded-md hover:bg-green-600"
            onClick={() => navigate('/challenges')}
          >
            Explore Challenges
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id || challenge.challengeId}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Challenge Header */}
            <div className="relative">
              {challenge.image ? (
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/400x150?text=Challenge';
                  }}
                />
              ) : (
                <div className="w-full h-40 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <h2 className="text-white text-xl font-bold">
                    {challenge.title}
                  </h2>
                </div>
              )}
              <div className="absolute top-2 right-2">
                {getStatusBadge(challenge.status)}
              </div>
            </div>

            {/* Challenge Body */}
            <div className="p-4">
              <h3 className="text-lg font-bold">{challenge.title}</h3>

              <div className="flex justify-between items-center my-2 text-sm text-gray-600">
                <div>
                  <p>
                    Started:{' '}
                    {formatDate(challenge.startDate || challenge.createdAt)}
                  </p>
                  {challenge.endDate && (
                    <p>Ends: {formatDate(challenge.endDate)}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-semibold text-green-600">
                    {challenge.points || 0} Points
                  </span>
                </div>
              </div>

              <p className="text-gray-700 my-2">{challenge.description}</p>

              {/* Challenge Details */}
              {challenge.rules && (
                <div className="mt-3">
                  <h4 className="font-semibold text-gray-800">Rules:</h4>
                  <p className="text-sm text-gray-600">{challenge.rules}</p>
                </div>
              )}

              {/* Challenge Progress */}
              {challenge.status === 'active' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>
                      {challenge.currentProgress || 0}/
                      {challenge.targetProgress || 100}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-green h-2.5 rounded-full"
                      style={{
                        width: `${((challenge.currentProgress || 0) / (challenge.targetProgress || 100)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Challenge Actions */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() =>
                    navigate(
                      `/challenges/${challenge.id || challenge.challengeId}`,
                    )
                  }
                  className="px-4 py-2 bg-primary-green text-white rounded-md hover:bg-green-600 text-sm"
                >
                  View Details
                </button>

                {challenge.status === 'active' && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
                    Update Progress
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render the order history content
  const renderOrderHistory = () => {
    if (ordersLoading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-green"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    if (orders.length === 0) {
      return (
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <p className="mt-2 text-gray-500">No orders found.</p>
          <button
            className="mt-4 px-4 py-2 bg-primary-green text-white rounded-md hover:bg-green-600"
            onClick={() => navigate('/shop')}
          >
            Visit Shop
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{order.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(order.createdAt)}</p>
              </div>
              <div>{getStatusBadge(order.status)}</div>
            </div>

            {/* Order Items */}
            <div className="p-4">
              <h3 className="font-medium mb-2">Items</h3>
              <div className="space-y-2">
                {order.cartItems &&
                  order.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b pb-2"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-4 bg-gray-50 border-t">
              <div className="flex justify-between mb-1">
                <p className="text-sm">Subtotal</p>
                <p className="font-medium">₹{order.subtotal}</p>
              </div>
              {order.pointsApplied > 0 && (
                <div className="flex justify-between mb-1">
                  <p className="text-sm">Points Applied</p>
                  <p className="font-medium text-green-600">
                    -₹{order.pointsApplied}
                  </p>
                </div>
              )}
              <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                <p className="font-bold">Total</p>
                <p className="font-bold">₹{order.totalAmount}</p>
              </div>
            </div>

            {/* Shipping Details */}
            {order.shippingAddress && (
              <div className="p-4 border-t">
                <h3 className="font-medium mb-1">Shipping Address</h3>
                <p className="text-sm text-gray-700">
                  {order.shippingAddress.name}, {order.shippingAddress.street},{' '}
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zipCode},{' '}
                  {order.shippingAddress.country}
                  {order.shippingAddress.phone &&
                    `, Phone: ${order.shippingAddress.phone}`}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render the posts content
  const renderPosts = () => {
    if (postsLoading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-green"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
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
            onClick={() => navigate('/feed')}
          >
            Create Your First Post
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {posts.map((post) => {
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
                content={post.description || post.content || post.text || ''}
                image={postImage}
                profileImage={user.avatar || defaultProfileImage}
                likes={post.likes}
                commentCount={post.commentCount}
                timestamp={post.timestamp || post.createdAt}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-bg-light min-h-screen">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-12">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="relative">
            <img
              src={
                user.coverImgUrl && user.coverImgUrl.includes('base64')
                  ? user.coverImgUrl
                  : coverImg
              }
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
                <h2 className="text-x1 font-bold text-gray-900">{user.name}</h2>
                <p className="text-sm font-bold text-gray-500">
                  @{user.username}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-14 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <div className="flex space-x-6 text-sm font-medium text-gray-600">
              <button
                className={`${activeTab === 'posts' ? 'text-primary-green font-bold' : 'hover:text-primary-green'}`}
                onClick={() => setActiveTab('posts')}
              >
                Posts
              </button>
              <button
                className={`${activeTab === 'challenges' ? 'text-primary-green font-bold' : 'hover:text-primary-green'}`}
                onClick={() => setActiveTab('challenges')}
              >
                Challenges
              </button>
              <button
                className={`${activeTab === 'orders' ? 'text-primary-green font-bold' : 'hover:text-primary-green'}`}
                onClick={() => setActiveTab('orders')}
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
                  {user?.bio || 'No bio set yet.'}
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

          {/* Dynamic Content (Posts or Order History) */}
          <div className="sm:col-span-2 space-y-7">
            {activeTab === 'posts'
              ? renderPosts()
              : activeTab === 'orders'
                ? renderOrderHistory()
                : activeTab === 'challenges'
                  ? renderChallenges()
                  : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
