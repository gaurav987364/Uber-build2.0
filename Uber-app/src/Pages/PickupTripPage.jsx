import React, { useState } from "react";
import { FaArrowLeft, FaBolt, FaCalendarAlt, FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useRideContext } from "../context/RideContext";

const PickupTripPage = () => {
  const [rideOption, setRideOption] = useState("now");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [autoMatch, setAutoMatch] = useState(true);

  const {setPickupDate, setPickupTime} = useRideContext();

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const handleContinue = () => {
    setPickupDate(selectedDate);
    setPickupTime(selectedTime.format("HH:mm"));
    navigate(-1); // Navigate back
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-4 bg-white text-gray-900 font-sans">
      {/* Header with Back Arrow */}
      <div className="flex items-center mb-4">
        <button onClick={goBack} className="mr-2">
          <FaArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold mt-3">When do you want to leave?</h1>
      <span className="text-lg font-medium text-gray-600 mt-2">
        From 67, East Chawla Colony
      </span>

      {/* Options */}
      <div className="space-y-4 mt-5">
        {/* Leave Now Option */}
        <div
          className={`flex items-center p-4 border-b border-gray-400 cursor-pointer ${
            rideOption === "now" ? "border-black" : "border-gray-400"
          }`}
          onClick={() => setRideOption("now")}
        >
          <FaBolt className="w-6 h-6 text-gray-800 mr-4" />
          <div className="flex-1">
            <p className="text-xl font-semibold">Leave now</p>
            <p className="text-md text-gray-600">
              Get a ride in the next few mins
            </p>
          </div>
          <input
            type="radio"
            name="rideOption"
            className="w-6 h-6 text-black"
            checked={rideOption === "now"}
            readOnly
          />
        </div>

        {/* Reserve a Ride Option */}
        <div
          className={`flex items-center p-4 border-b border-gray-400 cursor-pointer ${
            rideOption === "reserve" ? "border-black" : "border-gray-400"
          }`}
          onClick={() => setRideOption("reserve")}
        >
          <FaCalendarAlt className="w-6 h-6 text-gray-800 mr-4" />
          <div className="flex-1">
            <p className="text-xl font-semibold">Reserve a ride</p>
            <p className="text-md text-gray-600">Book up to 90 days in advance</p>
          </div>
          <input
            type="radio"
            name="rideOption"
            className="w-6 h-6 text-black"
            checked={rideOption === "reserve"}
            readOnly
          />
        </div>

        {/* Additional options for "Reserve a Ride" */}
        {rideOption === "reserve" && (
          <div className="space-y-6 mt-4">
            {/* Date Picker */}
            <div className="text-center border-b border-gray-400">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="EEE, MMM d"
                className="w-full py-2 px-3 text-center text-2xl mb-2"
              />
            </div>

            {/* Material-UI Time Picker */}
            <div className="text-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={(newValue) => setSelectedTime(newValue)}
                  slotProps={{
                    textField: {
                      className: "w-1/2 text-center text-lg",
                      InputProps: { style: { textAlign: "center" } },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>

            {/* Auto Match Option */}
            <div className="flex items-center p-4 border rounded-lg border-gray-300 bg-gray-100">
              <FaSyncAlt className="w-6 h-6 text-gray-800 mr-4" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  Match with a new driver if yours will be late due to slow
                  progress.
                </p>
              </div>
              <input
                type="checkbox"
                className="w-6 h-6 text-black"
                checked={autoMatch}
                onChange={() => setAutoMatch(!autoMatch)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="mt-auto w-full py-3 bg-black text-white text-2xl font-medium rounded-lg"
      >
        Continue
      </button>
    </div>
  );
};

export default PickupTripPage;
