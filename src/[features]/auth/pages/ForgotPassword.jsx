import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email'); // 'email', 'otp', or 'reset'
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const BASE_URL = 'http://localhost:8080/api/auth';

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStep('otp');
      } else {
        const msg = await response.text();
        setError(msg || 'Failed to send OTP');
      }
    } catch {
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const isValid = await response.json();

      if (response.ok && isValid === true) {
        setStep('reset');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch {
      setError('Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/update-password-with-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword, confirmPassword }),
      });

      if (response.ok) {
        alert(
          'Password reset successful! You can now login with your new password.',
        );
        // Optional: Redirect to login
        window.location.href = '/login';
      } else {
        const msg = await response.text();
        setError(msg || 'Password reset failed');
      }
    } catch {
      setError('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <>
            <h2 className="text-2xl font-normal text-center mb-6">
              Forgot Password
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Enter your email address to receive a verification code
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your account email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          </>
        );

      case 'otp':
        return (
          <>
            <h2 className="text-2xl font-normal text-center mb-6">
              Verify OTP
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Enter the 6-digit code sent to {email}
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-xl tracking-widest"
                required
                maxLength={6}
              />
              <button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOtp('');
                    setIsLoading(false);
                    setStep('email');
                  }}
                  className="text-green-600 hover:text-green-700 text-sm"
                >
                  Change Email
                </button>
                <span className="px-2 text-gray-400">|</span>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setOtp('');
                    handleSendOTP();
                  }}
                  className="text-green-600 hover:text-green-700 text-sm"
                >
                  Resend Code
                </button>
              </div>
            </div>
          </>
        );

      case 'reset':
        return (
          <>
            <h2 className="text-2xl font-normal text-center mb-6">
              Reset Password
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Create a new password for your account
            </p>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {renderStep()}
      </div>
    </div>
  );
};

export default ForgotPassword;
