import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const goto = () => {
    navigate("/homepage");
  };
  return (
    <div className="h-screen mx-auto flex flex-col justify-center items-center text-center px-8">
      <div className="logo  w-36">
        <img
          className=" w-full h-full object-cover"
          src="/Uber_logo.svg"
          alt="logo.svg"
        />
      </div>
      <div>
        <span className=" flex items-center justify-center">
          <img
            src="https://mobile-content.uber.com/launch-experience/ride.png"
            alt="car_logo"
          />
        </span>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing the
          page or come back later.
        </Typography>
        <Button
          onClick={goto}
          className="w-full px-4 md:w-[8rem] bg-black text-xl"
        >
          Back home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
