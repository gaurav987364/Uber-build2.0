import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaAmazon, FaCreditCard, FaGift, FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddPaymentpage = () => {
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
          Add payment
        </h1>
      </div>
      <div className="mt-10 space-y-6">
        <div className="flex items-center">
          <FaAmazon className="mr-4 text-2xl" />
          <p>Amazon Pay Balance</p>
        </div>
        <div className="flex items-center">
          <FaCreditCard className="mr-4 text-2xl" />
          <p>Credit or Debit Card</p>
        </div>
        <div className="flex items-center">
          <FaMoneyBillAlt className="mr-4 text-2xl" />
          <p>Paytm</p>
        </div>
        <div className="flex items-center">
          <FaGift className="mr-4 text-2xl" />
          <p>Gift Card</p>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentpage;
