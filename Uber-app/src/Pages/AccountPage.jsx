import React from "react";
import {
  IoSettingsSharp,
  IoMail,
  IoGift,
  IoCarSport,
  IoBusiness,
  IoMap,
} from "react-icons/io5";
import BottomNav from "../components/BottomNav";
import { HiStar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const handelGo = ()=>{
    navigate("/settingspage")
  }
  return (
    <div className="bg-gray-200 text-black min-h-screen">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold w-1/2 py-2">Gaurav Sharma</h1>
          <div className="rounded-full bg-gray-700 mix-blend-multiply w-[6rem] h-[6rem] overflow-hidden">
            <img
              className=" w-full h-full object-cover"
              src="https://cdn.vectorstock.com/i/500p/83/12/creative-of-default-avatar-vector-21118312.avif"
              alt=""
            />
          </div>
        </div>
        <p className="text-xl flex items-center bg-gray-300 w-fit px-1 mt-2">
          <HiStar className="text-gray-700" size={25} /> 5.0
        </p>
        <div className="space-y-4 mt-8">
          <button onClick={handelGo} className="flex items-center gap-4 w-full h-[3rem]">
            <IoSettingsSharp className="text-2xl" />
            <span className=" text-xl ml-2 font-semibold">Settings</span>
          </button>
          <div className="flex items-center gap-4 w-full h-[3rem]">
            <IoCarSport className="text-2xl" />
            <span className=" text-xl ml-2 font-semibold">Rider Insurance</span>
          </div>
          <div className="flex items-center gap-4 w-full h-[3rem]">
            <IoMail className="text-black text-2xl" />
            <span className=" text-xl ml-2 font-semibold text-black">
              Messages
            </span>
          </div>
          <div className="flex items-center gap-4 w-full h-[3rem]">
            <IoGift className="text-2xl" />
            <span className=" text-xl ml-2 font-semibold">Send a gift</span>
          </div>
          <div className="flex items-center gap-4 w-full h-[3rem]">
            <IoCarSport className="text-2xl" />
            <span className=" text-xl ml-2 font-semibold">
              Earn by driving or delivering
            </span>
          </div>
          <div className="flex items-center gap-4 w-full h-[3rem]">
            <IoBusiness className="text-2xl" />
            <span className=" text-xl ml-2 font-semibold">
              Setup your business profile
            </span>
          </div>
          <div className="flex items-center gap-4 w-full h-[3rem]">
            <IoMap className="text-2xl" />
            <span className=" text-xl ml-2 font-semibold">Shuttle Routes</span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default App;
