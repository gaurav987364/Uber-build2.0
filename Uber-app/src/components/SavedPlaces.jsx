import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";
import { MdHomeFilled, MdWork } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useAddressContext } from "../context/AddressContext";

const SavedPlaces = () => {
  const navigate = useNavigate();
  const { addresses } = useAddressContext();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="p-4 w-full h-screen flex flex-col">
      <button
        className="flex items-center gap-2 mb-4 cursor-pointer border-b-[2px] border-gray-300"
        onClick={goBack}
      >
        <HiArrowLeft size={30} /> <hr />
        <span className="text-4xl font-semibold">Saved places</span>
      </button>

      <div className=" w-full h-auto">
        <Link
          to="/addlocationformepage?type=home"
          className=" flex items-center gap-4 p-2"
        >
          <span>
            <MdHomeFilled size={28} />
          </span>
          <span className="border-b border-gray-300 w-full font-semibold">
            <h1 className=" text-2xl">Add Home</h1>
            <h5 className=" text-blue-600">
              {addresses.home || "No address set"}
            </h5>
          </span>
        </Link>
        <Link
          to="/addlocationformepage?type=work"
          className=" flex items-center gap-4 p-2"
        >
          <span>
            <MdWork size={28} />
          </span>
          <span className=" border-b border-gray-300 w-full font-semibold">
            <h1 className=" text-2xl">Add Work</h1>
            <h5 className=" text-blue-600">
              {addresses.work || "No address set"}
            </h5>
          </span>
        </Link>
        <Link
          to="/addlocationformepage?type=other"
          className=" flex items-center gap-4 p-2"
        >
          <span>
            <IoMdAdd size={28} />
          </span>
          <span className=" border-b border-gray-300 w-full font-semibold">
            <h1 className=" text-2xl">Add new places</h1>
            <h5 className=" text-blue-600">
              {addresses.other || "No address set"}
            </h5>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SavedPlaces;
