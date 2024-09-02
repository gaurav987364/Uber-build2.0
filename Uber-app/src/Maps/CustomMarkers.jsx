import React from "react";
import { HiLocationMarker } from "react-icons/hi";

const CustomMarker = ({ label, pickUpLabel, dropOffLabel }) => {
  const renderIcon = () => {
    if (label === pickUpLabel) {
      return (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          data-testid="pickup-icon"
        >
          <title>Pickup</title>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            fill="currentColor"
          />
        </svg>
      );
    } else if (label === dropOffLabel) {
      return (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          data-testid="drop-icon"
        >
          <title>Dropoff</title>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 2H2v20h20V2Zm-7 7H9v6h6V9Z"
            fill="currentColor"
          />
        </svg>
      );
    } else {
      // Default icon (can use the HiLocationMarker or any other)
      return <HiLocationMarker size={30} />;
    }
  };

  return (
    <div className=" relative">
      {renderIcon()}
      <span className="  absolute w-[7rem] h-[2rem] bg-white flex items-center justify-center overflow-hidden text-nowrap text-xs font-semibold left-[2.5rem] top-[0.5rem]">
        <span className="  animate-scroll">{label}</span>
      </span>
    </div>
  );
};

export default CustomMarker;
