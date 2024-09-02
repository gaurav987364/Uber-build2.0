import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";
import { useRideContext } from "../context/RideContext";

const ReturnTripPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(dayjs("21:40", "HH:mm"));
  const navigate = useNavigate();
  const {setDropoffDate,setDropoffTime} = useRideContext();

  const goBack = () => navigate(-1);

  const handleContinue = () => {
    // You can send the selected date and time to the next page
    navigate(-1, { state: { returnDate: selectedDate }});
    setDropoffDate(selectedDate);
    setDropoffTime(selectedTime.format("HH:mm"));
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-4 bg-white text-gray-900 font-sans">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={goBack} className="mr-2">
          <FaArrowLeft className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <h1 className="text-4xl font-bold mt-3">When do you want to be back?</h1>
      <span className="text-lg font-medium text-gray-600 mt-2">
        From 67, East Chawla Colony
      </span>

      <div className="text-center border-b border-gray-400 mt-6">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="EEE, MMM d"
          className="w-full py-2 px-3 text-center text-2xl mb-2"
        />
      </div>

      {/* Material-UI Time Picker */}
      <div className="text-center mt-10">
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

export default ReturnTripPage;
