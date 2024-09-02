import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io'; // Importing a cancel icon from React Icons

const PaymentCancelPage = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-[url(https://plus.unsplash.com/premium_vector-1716429407775-5f5a91805b83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8MXwwfHx8MA%3D%3D)] bg-no-repeat bg-center bg-cover">
    {/* Overlay */}
    <div className="absolute inset-0 bg-black opacity-50"></div>

    {/* Content */}
    <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-sm w-full z-10">
      <div className="flex items-center justify-center mb-4">
        <IoMdCloseCircle className="text-red-500 text-6xl" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
      <p className="text-gray-600 mb-4">
        Unfortunately, your payment was not successful. Please try again or contact support if the issue persists.
      </p>
      <button
        onClick={() => window.location.href = '/homepage'}
        className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Go to Homepage
      </button>
    </div>
  </div>
  );
};

export default PaymentCancelPage;
