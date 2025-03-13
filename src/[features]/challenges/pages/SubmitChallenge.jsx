import { useState, useRef } from 'react';
import NavBar from '../../../components/Shared/NavBar';
import { ImageUp } from 'lucide-react';

function SubmitChallenge() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

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
    if (!description || !image) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    // Convert image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const base64Image = reader.result;

      const formData = {
        description,
        imageUrl: base64Image, // Sending image as Base64 URL
      };

      try {
        const response = await fetch('http://localhost:8080/api/proof/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit proof');
        }

        const data = await response.json();
        setMessage(`Submission Successful! Status: ${data.status}`);
        setDescription('');
        setImage(null);
        setPreview(null);
      } catch (error) {
        setMessage('Error: ' + error.message);
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
              disabled={loading}
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
