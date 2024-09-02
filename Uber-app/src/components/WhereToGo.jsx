import React from "react";
import { BiSearch, BiSolidTime } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

const WhereToGo = () => {
  return (
    <div className=" h-18 bg-gray-200 text-2xl p-4 rounded-full mt-6">
      <div className=" flex items-center justify-between gap-2 text-2xl font-semibold">
        <div className=" flex items-center gap-2">
          <BiSearch size={30} />
          <span className=" font-bold">Where to?</span>
        </div>
        <div className=" flex items-center gap-2 px-4 py-1 bg-white  rounded-full ">
          <BiSolidTime />
          <span className=" flex items-center gap-2 text-lg">Now <MdKeyboardArrowDown /> </span>
        </div>
      </div>
    </div>
  );
};

export default WhereToGo;
