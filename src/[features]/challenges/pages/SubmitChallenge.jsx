import { useState, useRef } from 'react';
import NavBar from '../../../components/Shared/NavBar';
import { ImageUp } from 'lucide-react';

function SubmitChallenge() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
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
    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetch('https://your-api-endpoint.com/challenges', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit challenge');
      }

      alert('Challenge submitted successfully!');
      setDescription('');
      setImage(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen  flex items-center justify-center bg-white p-4">
        <div className="bg-white  w-full max-w-2xl md:max-w-md sm:max-w-sm">
          <button className="text-text-gray flex  text-lg items-center mb-4">
            <span className="mr-2">&larr;</span> Submit Challenge
          </button>
          <div className="mb-4 mt-10 w-full">
            <label className="block text-text-gray font-medium mb-2">
              Description <span className="text-lightred">*</span>
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
            <label className="block text-text-gray font-medium mb-2">
              Upload an image <span className="text-lightred">*</span>
            </label>
            <div
              className="border-2 h-32 p-6 flex flex-col items-center justify-center rounded-lg cursor-pointer"
              onClick={handleUploadClick}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <>
                  <ImageUp className="text-text-gray text-2xl" />
                  <p className="text-text-gray text-sm">
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
              className="bg-primary-green text-white py-2 mt-10 w-1/3 rounded-lg  hover:bg-green-600 transition disabled:bg-gray-400"
              onClick={handleSubmit}
              disabled={loading}
            >
              {' '}
              Add Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitChallenge;
