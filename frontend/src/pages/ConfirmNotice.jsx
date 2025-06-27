
import React from 'react';

const ConfirmNotice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-600 mb-3">Check Your Email</h2>
        <p className="text-gray-700">
          We've sent a confirmation link to your email address.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Please confirm your email before logging in.
        </p>
      </div>
    </div>
  );
};

export default ConfirmNotice;
