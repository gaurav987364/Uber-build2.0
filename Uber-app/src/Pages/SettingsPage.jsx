import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import {
  IoIosArrowBack,
  IoMdHome,
  IoMdAdd,
  IoIosLock,
  IoMdSettings,
  IoIosDocument,
} from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function SettingsPage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="bg-white min-h-screen">
      <button
        className="  px-2 py-2  flex items-center gap-2 cursor-pointer"
        onClick={goBack}
      >
        <HiArrowLeft size={30} />
      </button>
      <div className="p-4 border-b-[3px] border-gray-300">
        <h1 className="text-5xl font-semibold my-2">Settings</h1>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="rounded-full bg-gray-700 mix-blend-multiply w-[4rem] h-[4rem] overflow-hidden">
            <img
              className=" w-full h-full object-cover"
              src="https://cdn.vectorstock.com/i/500p/83/12/creative-of-default-avatar-vector-21118312.avif"
              alt=""
            />
          </div>
          <div className=" w-full flex items-center justify-between">
            <div>
              <h2 className="font-semibold ml-2 text-xl">Gaurav Sharma</h2>
              <p className=" ml-2 text-gray-600">+91 96546 07006</p>
              <p className=" ml-2 text-gray-600">sharmagaurav9654@gmail.com</p>
            </div>
            <div>
              <IoIosArrowBack
                size={20}
                className="transform rotate-180 text-gray-600"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between w-full h-[4rem]">
            <h3 className="font-semibold flex items-center text-xl gap-3">
              <IoMdHome size={28} className="mr-2" /> Home
            </h3>
            <IoIosArrowBack
              size={20}
              className="transform rotate-180 text-gray-600"
            />
          </div>
          <div className="flex items-center justify-between w-full h-[4rem]">
            <h3 className="font-semibold flex items-center text-xl gap-3">
              <IoMdAdd size={28} className="mr-2" /> Add Work
            </h3>
            <IoIosArrowBack
              size={20}
              className="transform rotate-180 text-gray-600"
            />
          </div>
          <div className="flex items-center justify-between w-full h-[4rem]">
            <h3 className="font-semibold flex items-center text-xl gap-3">
              <IoIosLock size={28} className="mr-2" /> Privacy
            </h3>
            <IoIosArrowBack
              size={20}
              className="transform rotate-180 text-gray-600"
            />
          </div>
          <div className="flex items-center justify-between w-full h-[4rem]">
            <h3 className="font-semibold flex items-center text-xl gap-3 ">
              <IoMdSettings size={28} className="mr-2" /> Appearance
            </h3>
            <IoIosArrowBack
              size={20}
              className="transform rotate-180 text-gray-600"
            />
          </div>
          <div className="flex items-center justify-between w-full h-[4rem]">
            <h3 className="font-semibold flex items-center text-xl gap-3 ">
              <IoIosDocument size={28} className="mr-2" /> Invoice information
            </h3>
            <IoIosArrowBack
              size={20}
              className="transform rotate-180 text-gray-600"
            />
          </div>
          <div className="flex items-center justify-between w-full h-[4rem]">
            <h3 className="font-bold flex items-center text-xl gap-3 text-red-600">
              <TbLogout2 size={28} className="mr-2" /> Signout
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
