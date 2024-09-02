import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import {  useNavigate } from "react-router-dom";
import Tabbar from '../components/Tabbar'

const IntercityPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-screen bg-white p-4 flex flex-col relative">
      <button
        className=" px-2 py-2 absolute z-[999] left-3 top-3 flex items-center gap-2 cursor-pointer"
        onClick={goBack}
      >
        <HiArrowLeft size={25} className="font-bold" />
      </button>
      <h1 className="text-5xl font-bold mt-20">Plan your trip</h1>

      <Tabbar/>
    </div>
  );
};

export default IntercityPage;
