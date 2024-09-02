import { signOut } from "firebase/auth";
import React from "react";
import { HiLogout } from "react-icons/hi";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ userDetails }) => {
  const navigate = useNavigate();
  const handelSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
      toast.error("Logged out successfully");
    });
  };
  return (
    <div className=" w-full flex justify-between items-center">
      <div className="logo  w-36">
        <img
          className=" w-full h-full object-cover"
          src="/Uber_logo.svg"
          alt="logo.svg"
        />
      </div>
      <div className="profile flex items-center gap-4">
        {/* <h2 className=" text-lg font-semibold">{userDetails?.name}</h2> */}
        <HiLogout size={30} onClick={handelSignOut} />
        <div className=" w-12 h-12 border border-gray-400 p-px rounded-full overflow-hidden">
          <img
            className=" w-full h-full object-cover"
            src={userDetails?.image}
            alt="user"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
