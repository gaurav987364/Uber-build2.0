import React from "react";
import {useNavigate} from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate();
  const goto = ()=>{
    navigate('/trackride')
  }
  return (
    <div className="bg-gray-100 h-screen w-full">
      <div className="bg-white p-6  md:mx-auto h-[50%]">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="text-lg md:text-2xl  text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for booking a uber ride.Meet the driver at pickup point. <span><strong className=" text-blue-600">Ride {Math.floor(Math.random() * 10)} mins away</strong></span>
          </p>
          <p className=" text-lg font-semibold"> Have a great day😊! </p>
          <button onClick={goto} className="py-10 text-center">
            <span
              className="px-12 bg-black rounded-xl hover:bg-indigo-300 text-white font-semibold py-3"
            >
              GO BACK
            </span>
          </button>
        </div>
      </div>

      <div className=" w-full h-[50%] bg-red-400 ">
        <img className=" w-full h-full object-cover" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_698,w_698/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png" alt="car" />
      </div>
    </div>
  );
};

export default Success;
