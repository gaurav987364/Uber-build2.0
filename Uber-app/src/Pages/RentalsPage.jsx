import React from "react";
import { FaHourglass } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { HiArrowLeft } from "react-icons/hi2";
import { MdOutlineCarCrash } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const RentalsPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className=" w-full h-screen bg-gray-200 text-black flex flex-col">
      <div className="relative flex-[4]">
        <button
          className=" bg-gray-200 px-2 py-2 border-gray-800 border rounded-full absolute z-[999] left-[3%] top-[5%] flex items-center gap-2 mb-4 cursor-pointer"
          onClick={goBack}
        >
          <HiArrowLeft size={30} />
        </button>
        <img
          src="/public/hourly_illustration.png"
          alt="Car Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 w-full h-1/2 flex flex-col">
        <h1 className="text-5xl font-bold mb-4">Uber Rentals</h1>

        <div className=" p-4 mt-5">
          <div className=" flex items-center gap-5 mt-3 border-b border-gray-600">
            <span className="mr-2">
              {" "}
              <FaHourglass size={24} />
            </span>
            <span className=" font-semibold text-2xl">
              Keep a car and driver for up to 12 hours
            </span>
          </div>
          <div className=" flex items-center gap-5 mt-3 border-b border-gray-600">
            <span className="mr-2">
              <FaBagShopping size={24} />
            </span>
            <span className=" font-semibold text-2xl">
              Ideal for business meetings, tourist travel and multiple stop
              trips
            </span>
          </div>
          <div className=" flex items-center gap-5 mt-3 border-b border-gray-600">
            <span className="mr-2">
              <MdOutlineCarCrash size={26} />
            </span>
            <span className=" font-semibold text-2xl">
              Book for now or reserve for later
            </span>
          </div>
        </div>
      </div>

      <Link
        to="/setlocationpage"
        className="sticky bg-black text-center text-white font-semibold text-2xl rounded-md p-2 m-4 hover:bg-gray-600 mt-5 "
      >
        Get started
      </Link>
    </div>
  );
};

export default RentalsPage;
