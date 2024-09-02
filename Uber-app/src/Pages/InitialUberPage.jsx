import React from "react";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UberScreen = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    toast.success("Welcome to the Uber.")
    navigate("/login");
  };
  return (
    <div className="w-full h-screen bg-blue-900 flex flex-col justify-between">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className=" w-full h-full">
          <span className=" absolute text-6xl text-white px-3 font-semibold text-left">
            Uber
          </span>
          <img
            src="/public/pixlr-image-generator-ef3a2c33-1111-4811-a1bf-7ed04e1997c3.png"
            alt="Uber Car"
            className="w-full h-full"
          />
        </div>
      </div>
      <div className=" bg-gray-200 text-black p-4">
        <h1 className="text-3xl font-semibold">Get started with Uber</h1>
        <button onClick={goToHome} className="flex items-center justify-center w-full p-4 mt-4 bg-gray-900 text-white rounded-xl text-2xl font-semibold">
          Continue <span><IoArrowForward className="ml-2 mt-2" /></span>
        </button>
      </div>
    </div>
  );
};

export default UberScreen;
