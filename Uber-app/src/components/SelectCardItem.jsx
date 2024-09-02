import React, { useState } from "react";
import CalculateDistance from "../helpers/CalculateDistance";
import CalculateTime from "../helpers/CalculateTime";
import CalculateFare from "../helpers/CalculateFare";
import { IoPersonSharp } from "react-icons/io5";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoIosArrowForward, IoIosPricetag } from "react-icons/io";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

const currentTime = new Date();
const hours = String(currentTime.getHours()).padStart(2, "0");
const minutes = String(currentTime.getMinutes()).padStart(2, "0");
const timeString = `${hours}:${minutes}`;

const SelectCardItem = ({ elem, pickUpAddress, dropOffAddress }) => {
  const [activeItem, setActiveItem] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handelItemClick = (id, item) => {
    setActiveItem(id);
    setOpen(true);
  };

  //**CALCULATE THE FARE, TIME, DISTANCE ETC */
  // Example coordinates
  const userLocation = pickUpAddress;
  const destinationLocation = dropOffAddress;

  const distance = CalculateDistance(
    userLocation.lat,
    userLocation.lng,
    destinationLocation.lat,
    destinationLocation.lng
  );
  //console.log(Math.floor(distance) + "km");

  // Estimate time (assuming 50 km/h average speed)
  const duration = CalculateTime(distance, 50); // Time in hours and 80 is speed
  // console.log(CalculateTimeTohour(duration));
  const {
    image,
    time_away,
    display_name,
    capacity,
    id,
    description,
    price_details = { cost_per_minute, cost_per_distance, minimum, base },
  } = elem;
  

  const fare = CalculateFare(distance, duration, price_details);
  const amount = fare; // Amount in target currency
  const exchangeRate = 0.05; // Example exchange rate from target currency to USD
  const amountInUSD = (amount * exchangeRate).toFixed(2); // Convert and round to 2 decimal places

  return (
    <>
      <div
        className={` p-1 rideselector h-24 flex items-center justify-between rounded-2xl mb-1 ${
          activeItem === id
            ? "bg-zinc-100 border-[2px] border-black"
            : "bg-zinc-100 "
        }`}
        onClick={() => handelItemClick(id, elem)}
      >
        <div className=" flex w-[6rem] ">
          <img className=" w-full h-full" src={image} alt="ride_logo" />
        </div>
        <div className=" flex flex-col w-[65%]">
          <span className=" text-xl font-semibold flex items-center gap-3">
            {display_name}{" "}
            <span className=" flex items-center font-thin gap-1">
              <IoPersonSharp />
              {capacity}
            </span>
          </span>
          <span className=" text-sm text-blue-600 font-medium">
            <span className=" text-black text-[1rem]">{timeString}</span> •{" "}
            {time_away}
          </span>
        </div>
        <div className=" font-semibold flex items-center">
          <span className=" text-green-700">
            <IoIosPricetag size={28} />
          </span>
          <span className=" text-xl">${amountInUSD}</span>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" w-full h-full">
            <div className=" flex justify-center mt-1">
              <img className=" w-[8rem]" src={image} alt="ridelogo" />
            </div>

            <div className=" flex items-center justify-between mt-1">
              <span className=" text-2xl font-semibold flex items-center gap-2">
                {display_name}{" "}
                <span className=" flex items-center font-thin">
                  <IoPersonSharp size={12} />
                  <span className=" font-normal text-sm">{capacity}</span>
                </span>
              </span>
              <span className=" text-xl font-semibold">$ {amountInUSD}</span>
            </div>

            <div>
              <span className=" text-lg font-thin text-gray-800 flex items-center gap-2">
                {new Date().toLocaleTimeString()} •
                <span className=" text-blue-600 font-semibold">
                  {time_away}
                </span>
              </span>
              <span className=" text-lg font-semibold">{description}</span>
            </div>

            <Link to="/paymentcompo">
              <div className=" flex items-center justify-between gap-2 mt-2 p-1 border border-gray-300 rounded-xl">
                <img className=" w-[2.2rem]" src="/public/cash_3x.png" alt="car" />
                <div className=" w-full">
                  <span className=" font-semibold">Cash/Card</span>
                  <h6 className=" text-green-600 italic">
                    you save ${Math.floor(Math.random() * 10)}0.00
                  </h6>
                </div>
                <IoIosArrowForward size={20} />
              </div>
            </Link>

            <Link
              to={`/confirmpickupspot?name=${display_name}&price=${amountInUSD}&img=${image}&desc=${description}`}
              className=" w-full h-[3rem] text-center flex justify-center items-center gap-1 bg-black text-white text-lg font-semibold mt-2 rounded-lg"
            >
              Choose <span>{display_name}</span>
            </Link>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SelectCardItem;
