import React from "react";
import { Link } from "react-router-dom";

const ActionButton = () => {
  return (
    <div className="  w-full  h-[7rem] mt-7 flex gap-2 flex-wrap">
      <Link
        to="/intercitypage"
        className=" cursor-pointer bg-gray-200 flex-1 rounded-lg transform hover:scale-105 transition"
      >
        <span className=" flex flex-col items-center justify-center">
          <img
            src="/UberX.jpeg"
            className=" mix-blend-multiply w-[6.2rem] mt-5"
            alt="car_logo"
          />
          <h2 className=" text-lg font-semibold">Intercity</h2>
        </span>
      </Link>
      <Link
        to="/rentalspage"
        className=" cursor-pointer bg-gray-200 flex-1 rounded-lg transform hover:scale-105 transition"
      >
        <span className=" flex flex-col items-center justify-center">
          <img
            className="w-[6.2rem] mt-5  mix-blend-multiply"
            src="/UberXL.jpeg"
            alt="bike_logo"
          />
          <h2 className=" text-lg font-semibold">Rentals</h2>
        </span>
      </Link>
      <Link
        to="/reservepage"
        className=" cursor-pointer bg-gray-200 flex-1 rounded-lg transform hover:scale-105 transition"
      >
        <span className=" flex flex-col items-center justify-center">
          <img
            className=" w-[4.2rem] mt-2  mix-blend-multiply"
            src="/public/reserve_clock.png"
            alt="car_logo"
          />
          <h2 className=" text-lg font-semibold">Reserve</h2>
        </span>
      </Link>
    </div>
  );
};

export default ActionButton;
