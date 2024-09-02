import React from "react";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { BiSearch } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        if (data.user) {
          toast.success("Login successful");
          navigate("/homepage"); // Navigate to the home page
        }
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
      });
  };
  return (
    <div className=" bg-gray-200 w-full h-screen flex flex-col">
      <div className=" bg-red-300 flex-[3]">
        <img
          className=" w-full h-full object-cover"
          src="/public/Uber_login2.jpg"
          alt="login_pic"
        />
      </div>

      <div className=" bg-blue-200 flex-[7]">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full text-center">
          <h2 className="text-lg font-semibold mb-4">
            Enter your mobile number
          </h2>
          <div className="flex items-center mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
              alt="India Flag"
              className="w-10 h-auto mr-2 "
            />
            <input
              type="number"
              placeholder="+91 989898989"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button className="ml-2 text-xl">&#128100;</button>
          </div>
          <button className="bg-black w-full text-center text-white font-semibold text-lg rounded-md p-2 hover:bg-gray-600">
            Continue
          </button>
          <div className="text-gray-500 mb-4 ">or</div>
          <button
            onClick={signIn}
            className="bg-gray-200 w-full text-center text-black font-semibold text-lg rounded-md p-2 hover:bg-gray-600  flex items-center justify-center gap-1"
          >
            <FcGoogle size={26} />
            Continue with Google
          </button>
          {/* <button className="bg-gray-200 w-full text-center text-black font-semibold text-lg rounded-md p-2 hover:bg-gray-600 mt-2 flex items-center justify-center gap-1">
            <ImAppleinc size={26} />
            Continue with Apple
          </button> */}
          <button className="w-full bg-gray-200 text-black py-2 rounded mb-4 mt-2 flex items-center justify-center gap-2 font-semibold text-lg">
            <MdEmail size={26} />
            Continue with Email
          </button>
          <div className="text-gray-500">or</div>
          <button className="w-full text-black underline mb-4 flex items-center justify-center gap-1 font-semibold text-lg">
            <BiSearch size={25} /> <span>Find my account</span>
          </button>
          <p className="text-xs text-gray-500">
            By proceeding, you consent to get calls, WhatsApp or SMS messages,
            including by automated means, from Uber and its affiliates to the
            number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
