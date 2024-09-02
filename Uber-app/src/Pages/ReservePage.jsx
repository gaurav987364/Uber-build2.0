import React from 'react'
import { FaHourglassStart } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';
import { HiArrowLeft } from 'react-icons/hi2';
import { MdOutlineCarCrash, MdWallet } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'

const ReservePage = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
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
        src="/public/Airport-rides.webp"
        alt="Car Image"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="p-4 w-full h-1/2 flex flex-col">
      <h1 className="text-5xl font-bold mb-4">Reserve</h1>

      <div className=" p-4 mt-5">
        <div className=" flex items-center gap-5 mt-3 border-b border-gray-600">
          <span className="mr-2">
            {" "}
            <FaBagShopping size={24} />
          </span>
          <span className=" font-semibold text-2xl">
          Choose your pickup time up to 90 days in advance.
          </span>
        </div>
        <div className=" flex items-center gap-5 mt-3 border-b border-gray-600">
          <span className="mr-2">
          <FaHourglassStart size={24} /> 
          </span>
          <span className=" font-semibold text-2xl">
          Extra wait time included to meet your ride.
          </span>
        </div>
        <div className=" flex items-center gap-5 mt-3 border-b border-gray-600">
          <span className="mr-2">
            <MdWallet size={26} />
          </span>
          <span className=" font-semibold text-2xl">
          Cancel at no charge up to 60 minutes in advance.
          </span>
        </div>
      </div>
    </div>

    <Link
      to="/setlocationpage"
      className="sticky bg-black text-center text-white font-semibold text-2xl rounded-md p-2 m-4 hover:bg-gray-600 mt-5 "
    >
      Reserve a ride
    </Link>
  </div>
  )
}

export default ReservePage