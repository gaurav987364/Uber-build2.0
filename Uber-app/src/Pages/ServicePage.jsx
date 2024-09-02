import React from "react";
import BottomNav from "../components/BottomNav";
import ActionButton2 from "../components/ActionButton2";
import { Link } from "react-router-dom";

const ServicePage = () => {
  return (
    <div className=" w-full h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-6xl font-bold mb-3">Services</h1>

        <h2 className="text-2xl font-semibold mb-4">
          Go anywhere, get anything
        </h2>
        <div className="gap-4 mb-6">
          <div className=" w-full flex items-center justify-evenly">
            <Link to='/setlocationpage' className=" w-[10rem] h-[10rem] relative bg-gray-200 rounded-lg shadow p-4 text-center">
              <img
                src="/public/ride (1).png"
                alt="Ride"
                className="mx-auto mb-2 w-[6.2rem] mix-blend-multiply relative left-[30%] bottom-[20%]"
              />
              <p className=" absolute font-semibold text-lg">Ride</p>
            </Link>

            <div className="bg-gray-200 w-[10rem] h-[10rem] rounded-lg shadow p-4 text-center relative">
              <img
                src="/public/package_UberXL_new_2022.png"
                alt="Shuttle"
                className="mx-auto mb-2 w-[6.2rem] mix-blend-multiply relative left-[30%] bottom-[20%]"
              />
              <p className=" absolute font-semibold text-lg">Shuttle</p>
            </div>
          </div>
          <ActionButton2 />
        </div>

        <hr className=" border-[2px] border-gray-300 w-full" />

        <h2 className="text-2xl font-semibold mb-4">Get anything done</h2>
        <div className="flex w-full items-center mt-5 gap-2 justify-evenly">
          <div className=" w-[10rem] h-[10rem] relative bg-gray-200 rounded-lg shadow p-4 text-center">
            <img
              src="/public/package.png"
              alt="Ride"
              className="mx-auto mb-2 w-[6.2rem] mix-blend-multiply relative left-[30%] bottom-[20%]"
            />
            <p className=" absolute font-semibold text-lg">Package</p>
          </div>

          <div className="bg-gray-200 w-[10rem] h-[10rem] rounded-lg shadow p-4 text-center relative">
            <img
              src="/public/package_UberXL_new_2022.png"
              alt="Shuttle"
              className="mx-auto mb-2 w-[6.2rem] mix-blend-multiply relative left-[30%] bottom-[20%]"
            />
            <p className=" absolute font-semibold text-lg">Store Pickup</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ServicePage;
