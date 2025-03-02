import { useState } from 'react';

const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      alert('Password changed successfully!');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light: #F8F8F8">
      <div className="w-full max-w-md p-8 bg white  rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Set New Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg primary-green: #1BAC5F"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
