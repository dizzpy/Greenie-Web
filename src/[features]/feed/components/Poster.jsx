/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import CommentPopup from './CommentPopup';
import { API_CONFIG } from '../../../config/api.config';

const Poster = ({ postId, userId, content, image }) => {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [reactions, setReactions] = useState({});
  const [myReaction, setMyReaction] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [showReactionsPopup, setShowReactionsPopup] = useState(false);

  const reactionRef = useRef(null);
  const emojis = ['👍', '❤️', '😂', '😯', '😢', '😡'];

  const [user, setUser] = useState({
    name: 'Unknown',
    username: 'anonymous',
    profileImage: 'https://via.placeholder.com/150',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.ENDPOINTS.POSTS.USER_DETAILS}/${userId}`,
        );
        const userData = response.data;
        setUser({
          name: userData.fullName?.trim() || 'Unknown',
          username: userData.username?.trim() || 'username',
          profileImage:
            userData.profileImage || 'https://via.placeholder.com/150',
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await axios.get(
          API_CONFIG.ENDPOINTS.POSTS.GET_REACTIONS(postId),
        );
        const allReactions = response.data || {};
        setReactions(allReactions);

        const totalLikes = Object.values(allReactions).reduce(
          (sum, list) => sum + list.length,
          0,
        );
        setLikes(totalLikes);

        const currentUserId = localStorage.getItem('userId');
        for (const [emoji, list] of Object.entries(allReactions)) {
          if (list.includes(currentUserId)) {
            setLiked(true);
            setMyReaction(emoji);
            break;
          }
        }
      } catch (err) {
        console.error('Failed to fetch reactions:', err);
      }
    };

    fetchReactions();
  }, [postId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reactionRef.current && !reactionRef.current.contains(event.target)) {
        setShowReactionsPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReact = async (emoji) => {
    const currentUserId = localStorage.getItem('userId');
    try {
      await axios.put(API_CONFIG.ENDPOINTS.POSTS.REACT(postId), {
        emoji,
        userId: currentUserId,
      });

      setReactions((prev) => {
        const updated = { ...prev };
        for (const key in updated) {
          updated[key] = updated[key].filter((id) => id !== currentUserId);
        }
        if (!updated[emoji]) updated[emoji] = [];
        updated[emoji].push(currentUserId);
        return updated;
      });

      setMyReaction(emoji);
      setLiked(true);
      setShowReactionsPopup(false);

      const total = Object.values(reactions).reduce(
        (sum, list) => sum + list.length,
        0,
      );
      setLikes(total);
    } catch (error) {
      console.error('Reaction failed:', error);
    }
  };

  const handleOpenComments = async () => {
    setShowComments(true);
    setCommentsLoading(true);
    try {
      const response = await axios.get(
        API_CONFIG.ENDPOINTS.POSTS.COMMENTS.GET_ALL(postId),
      );
      setComments(response.data || []);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(
          API_CONFIG.ENDPOINTS.POSTS.COMMENTS.COUNT(postId),
        );
        setCommentCount(response.data);
      } catch (err) {
        console.error('Failed to fetch comment count:', err);
      }
    };
    fetchCommentCount();
  }, [postId]);

  const shareLink = `${window.location.origin}/posts/${postId}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopySuccess('Link copied to clipboard!');
      setTimeout(() => setShowSharePopup(false), 1500);
    } catch (err) {
      setCopySuccess('Failed to copy link');
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-2xl mt-4 mx-auto">
      <div className="flex items-center gap-3">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-text-gray font-sans">{user.name}</p>
          <p className="text-sm text-text-gray font-sans">@{user.username}</p>
        </div>
      </div>

      <p className="mt-3 text-text-gray font-sans">{content}</p>

      {image && (
        <div className="mt-3">
          <img
            src={image}
            alt="Post"
            className="w-full rounded-lg object-cover"
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-3 text-sm">
        <div className="relative inline-block" ref={reactionRef}>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setShowReactionsPopup((prev) => !prev)}
          >
            <span className="text-xl">
              {myReaction ? myReaction : <Heart size={18} />}
            </span>
            <span className="text-text-gray">{likes} Like</span>
          </div>

          {showReactionsPopup && (
            <div className="absolute bottom-8 left-0 z-10 bg-white shadow-lg px-2 py-1 rounded-xl flex gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReact(emoji)}
                  className={`text-xl transition-transform duration-200 ${
                    myReaction === emoji
                      ? 'scale-125 border border-primary-green rounded-full'
                      : 'hover:scale-125'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1 text-primary-green cursor-pointer"
            onClick={handleOpenComments}
          >
            <MessageCircle className="text-primary-green" size={18} />
            <span className="text-text-gray">
              {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
            </span>
          </div>

          <div
            className="flex items-center gap-1 text-primary-green cursor-pointer"
            onClick={() => setShowSharePopup((prev) => !prev)}
          >
            <Share2 size={18} />
            <span className="text-sm text-text-gray">Share</span>
          </div>
        </div>
      </div>

      {showComments && (
        <CommentPopup
          postId={postId}
          userId={userId}
          comments={comments}
          onClose={() => setShowComments(false)}
          onCommentAdded={(newComment) => {
            setComments((prev) => [...prev, newComment]);
            setCommentCount((prev) => prev + 1);
          }}
        />
      )}

      {showSharePopup && (
        <div className="mt-4 p-4 bg-gray-100 rounded-xl border border-gray-300">
          <p className="mb-2 font-semibold text-sm text-gray-800">
            Share this post:
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareLink}
              className="flex-1 px-3 py-1 border rounded-md text-sm"
            />
            <button
              onClick={handleCopy}
              className="bg-primary-green text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
            >
              Copy
            </button>
          </div>
          {copySuccess && (
            <p className="text-green-600 mt-2 text-xs">{copySuccess}</p>
          )}
        </div>
      )}
    </div>
  );
};

Poster.propTypes = {
  postId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default Poster;
