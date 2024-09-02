import React from 'react';
import { IoMdArrowRoundBack, IoMdArrowForward } from 'react-icons/io';

function WelcomeBack() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-xl font-semibold mb-4">Welcome back, Gaurav.</h1>
        <p className="mb-4">Enter the 4-digit code sent to you at: <br />
          <a href="mailto:sharmagaurav9654@gmail.com" className="text-blue-500">sharmagaurav9654@gmail.com</a>
        </p>
        <input type="text" className="form-input w-full mb-4 p-2 border rounded" placeholder="____" />
        <p className="text-sm text-gray-600 mb-4">Tip: Make sure to check your inbox and spam folders</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Resend
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4">
          More options
        </button>
        <div className="flex justify-between w-full mt-4">
          <IoMdArrowRoundBack className="text-2xl" />
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default WelcomeBack;