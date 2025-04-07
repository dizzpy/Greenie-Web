import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../../components/Shared/NavBar';
import { ImageUp } from 'lucide-react';
import { API_CONFIG } from '../../../config/api.config';
import { useAuth } from '../../../context/AuthContext';

function SubmitChallenge() {
  const { challengeId } = useParams(); // ✅ Now matches route param name
  const { user } = useAuth(); // ✅ user.id, user.username

  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [challengeName, setChallengeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  // ✅ Fetch challenge name
  useEffect(() => {
    if (!challengeId) return;

    async function fetchChallengeName() {
      try {
        const res = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHALLENGES.GET_BY_ID(challengeId)}`,
        );
        const data = await res.json();
        console.log('Fetched challenge:', data);
        setChallengeName(data.challengeName || '');
      } catch (err) {
        console.error('Failed to fetch challenge name:', err);
      }
    }

    fetchChallengeName();
  }, [challengeId]);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleUploadClick() {
    fileInputRef.current.click();
  }

  async function handleSubmit() {
    console.log('Submitting...');
    console.log('Challenge ID:', challengeId);
    console.log('Challenge Name:', challengeName);
    console.log('User:', user);

    if (
      !description ||
      !image ||
      !challengeId ||
      !challengeName ||
      !user?.id ||
      !user?.username
    ) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const base64Image = reader.result;

      const formData = {
        challengeID: challengeId,
        challengeName: challengeName,
        userId: user.id,
        username: user.username,
        description,
        imageUrl: base64Image,
      };

      console.log('Sending formData:', formData);

      try {
        const response = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROOF.SUBMIT}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          },
        );

        if (!response.ok) throw new Error('Failed to submit proof');

        const data = await response.json();
        setMessage(`✅ Submission Successful! Status: ${data.status}`);
        setDescription('');
        setImage(null);
        setPreview(null);
      } catch (error) {
        setMessage('❌ ' + error.message);
      } finally {
        setLoading(false);
      }
    };
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white w-full max-w-2xl md:max-w-md sm:max-w-sm p-6 border rounded-lg shadow-lg">
          <button className="text-gray-600 flex text-lg items-center mb-4">
            <span className="mr-2">&larr;</span> Submit Challenge
          </button>

          {message && (
            <div className="p-3 mb-4 text-center bg-green-100 text-green-700 border border-green-400 rounded-lg">
              {message}
            </div>
          )}

          <div className="mb-4 mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Say Something"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-4 mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              Upload an image <span className="text-red-500">*</span>
            </label>
            <div
              className="border-2 h-32 p-6 flex flex-col items-center justify-center rounded-lg cursor-pointer"
              onClick={handleUploadClick}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <>
                  <ImageUp className="text-gray-500 text-2xl" />
                  <p className="text-gray-500 text-sm">
                    Upload Photos and Videos
                  </p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
              onClick={handleSubmit}
              disabled={loading || !challengeName}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitChallenge;
