import { useState } from 'react';
import NavBar from '../../../components/Shared/NavBar';

function AddChallenge() {
  const [formData, setFormData] = useState({
    challengeName: '',
    points: 256,
    description: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  }

  async function handleSubmit() {
    setLoading(true);
    setMessage('');
    const formDataToSend = new FormData();
    formDataToSend.append('challengeName', formData.challengeName);
    formDataToSend.append('points', formData.points);
    formDataToSend.append('description', formData.description);
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }

    try {
      const response = await fetch('https://api.example.com/challenges', {
        method: 'POST',
        body: formDataToSend,
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('Challenge successfully added');
        setMessageType('success');
      } else {
        setMessage("Error! Can't add challenge");
        setMessageType('error');
      }
      console.log('Success:', result);
    } catch (error) {
      setMessage("Error! Can't add challenge");
      setMessageType('error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
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

        <button className="text-text-gray  text-xl flex items-center mb-4">
          ← Add Challenge
        </button>
        <div className="bg-white border border-gray-300 rounded-lg h-40 flex items-center justify-center cursor-pointer">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="text-text-gray">Upload Photos and Videos</span>
        </div>
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
        <div className="flex justify-end mt-6">
          <button
            className="mt-4 bg-primary-green text-white px-4 py-2 rounded w-1/3"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Challenge'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddChallenge;
