import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AddVoucher = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="h-screen p-4 bg-white">
      <div className="flex items-center">
        <div onClick={goBack}>
          <IoMdArrowBack className="text-2xl cursor-pointer" />
        </div>
        <h1 className="flex-grow text-2xl font-bold text-center">
          Add voucher code
        </h1>
      </div>
      <div className="mt-10">
        <input
          type="text"
          placeholder="Enter voucher code"
          className="w-full p-4 text-lg border border-gray-300 rounded-lg"
        />
        <p className="mt-2 text-gray-500">
          Enter the code in order to claim and use your voucher
        </p>
      </div>
      <button className="w-full py-4 mt-10 text-lg font-semibold text-white bg-gray-300 rounded-lg">
        Continue
      </button>
    </div>
  );
};

export default AddVoucher;
