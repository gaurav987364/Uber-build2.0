import React from "react";
import BottomNav from "../components/BottomNav";
import { PiArrowsLeftRightFill } from "react-icons/pi";
import { FaLongArrowAltRight } from "react-icons/fa";

const ActivityPage = () => {
  return (
    <div className=" bg-white">
      <div className="p-4">
        <h1 className="text-6xl font-bold mb-4">Activity</h1>

        <h2 className="text-2xl font-semibold mb-2">Upcoming</h2>
        <div className="bg-gray-100 border-[1px] border-gray-400 rounded-lg shadow p-4 flex justify-between items-center mb-6">
          <div>
            <p className="font-bold text-xl">You have no upcoming trips</p>
            <p className="text-gray-800 text-lg flex items-center gap-2 mt-2">Reserve your ride<FaLongArrowAltRight className=" mt-1"/> </p>
          </div>
          <img
            src="/public/Comfort.jpeg"
            alt="Upcoming"
            className="w-16 h-auto"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-2">Past</h2>
        <div className="flex justify-between items-center">
          <p className=" text-lg font-semibold text-gray-700">
            You don't have any recent activity
          </p>
          <button className="text-xl flex items-center">
            <PiArrowsLeftRightFill size={30} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ActivityPage;
