import { useState } from 'react';
import axios from 'axios';
import NavBar from '../../../components/Shared/NavBar';
import { API_CONFIG } from '../../../config/api.config';
import { useNavigate } from 'react-router-dom';

function AddChallenge() {
  const [formData, setFormData] = useState({
    challengeName: '',
    points: '',
    description: '',
    photoUrl: '',
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (
      !formData.challengeName ||
      !formData.points ||
      !formData.description ||
      !formData.photoUrl
    ) {
      alert('Please fill in all fields');
      return;
    }

    setMessage('');

    try {
      const token = localStorage.getItem('token'); // ✅ Get JWT token from localStorage

      const response = await axios.post(
        API_CONFIG.ENDPOINTS.CHALLENGES.CREATE,
        {
          challengeName: formData.challengeName,
          points: formData.points,
          description: formData.description,
          photoUrl: formData.photoUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // ✅ Attach token
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        setMessage('Challenge successfully added');
        setMessageType('success');
        setFormData({
          challengeName: '',
          points: '',
          description: '',
          photoUrl: '',
        });
      } else {
        throw new Error("Error! Can't add challenge");
      }
    } catch (err) {
      setMessage("Error! Can't add challenge");
      setMessageType('error');
      console.error('Error:', err);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-2xl mx-auto p-6">
        {message && (
          <div
            className={`p-3 mb-4 text-white rounded ${messageType === 'success' ? 'bg-primary-green' : 'bg-lightred'}`}
          >
            {message}
          </div>
        )}

        <button
          onClick={() => navigate('/challenges')}
          className="text-text-gray text-xl flex items-center mb-4 hover:text-black transition"
        >
          <span className="mr-2">&larr;</span> Back to Challenges
        </button>

        {/* Image URL Input Section */}
        <div className="mb-4 mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload an Image <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="photoUrl"
            className="w-full border border-gray-300 p-2 text-center h-32 rounded"
            placeholder="Upload Photos and Videos"
            value={formData.photoUrl}
            onChange={handleChange}
          />

          {/* Image Preview */}
          {formData.photoUrl && (
            <div className="mt-4">
              <img
                src={formData.photoUrl}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="mt-6">
          <label className="block text-text-gray mb-1">
            Challenge name <span className="text-lightred">*</span>
          </label>
          <input
            type="text"
            name="challengeName"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Challenge name"
            value={formData.challengeName}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-text-gray mb-1">
            No of points <span className="text-lightred">*</span>
          </label>
          <input
            type="number"
            name="points"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.points}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-text-gray mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 p-2 rounded h-24"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            className="mt-4 bg-primary-green text-white px-4 py-2 rounded w-1/3 hover:bg-green-600 transition"
            onClick={handleSubmit}
          >
            Add Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddChallenge;
