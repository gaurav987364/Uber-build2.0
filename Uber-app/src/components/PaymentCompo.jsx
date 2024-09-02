import React, { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const PaymentCompo = () => {
  const [selectedTab, setSelectedTab] = useState("personal");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [isUberCashEnabled, setIsUberCashEnabled] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-4 text-black">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-between mb-4"
      >
        <AiOutlineClose className="text-2xl" />
      </button>

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">Payment options</h1>

      {/* Toggle Personal/Business */}
      <div className="flex gap-4 mb-6">
        <button
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold ${
            selectedTab === "personal"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => setSelectedTab("personal")}
        >
          <IoPersonSharp />
          Personal
        </button>
        <button
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold ${
            selectedTab === "business"
              ? "bg-gray-200 text-gray-500"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={() => setSelectedTab("business")}
        >
          <BsFillBriefcaseFill />
          Business
        </button>
      </div>

      {/* Uber Cash Section */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <span className=" bg-black text-white px-1 py-1">Uber</span>
        </div>
        <div className=" w-full">
          <p className="font-semibold text-lg">Uber Cash</p>
          <p className="text-gray-500">₹0.00</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isUberCashEnabled}
            onChange={() => setIsUberCashEnabled(!isUberCashEnabled)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-black"></div>
          <span className="absolute left-1 top-0.5 bg-white w-5 h-5 rounded-full transition-transform transform peer-checked:translate-x-5"></span>
        </label>
      </div>

      {/* Payment Method Section */}
      <div className="mb-6">
        <p className="font-semibold mb-4 text-lg">Payment Method</p>
        <div
          className={`flex items-center justify-between p-3 border rounded-lg ${
            selectedPaymentMethod === "cash"
              ? "border-black"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedPaymentMethod("cash")}
        >
          <div className="flex items-center gap-4">
            <img className=" w-[2.2rem]" src="/public/cash_3x.png" alt="" />
            <p className="font-semibold">Cash</p>
          </div>
          {selectedPaymentMethod === "cash" && (
            <span className="text-black font-semibold">✔</span>
          )}
        </div>
      </div>

      {/* Add Payment Method */}
      <Link to="/addpaymentpage">
        <div className="mb-6">
          <button className="flex items-center gap-2 text-black text-xl font-semibold">
            + Add payment method
          </button>
        </div>
      </Link>

      {/* Vouchers Section */}
      <Link to="/addvoucher" className="mb-6">
        <p className="font-semibold mb-4 text-lg">Vouchers</p>
        <button className="flex items-center gap-2 text-black text-xl font-semibold">
          + Add voucher code
        </button>
      </Link>
    </div>
  );
};

export default PaymentCompo;
