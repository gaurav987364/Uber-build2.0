import React, { useEffect, useState } from "react";
import { HiArrowRight, HiMiniArrowUturnDown } from "react-icons/hi2";
import { LuArrowDownToDot, LuArrowUpFromDot } from "react-icons/lu";
import { RiMapPin2Fill } from "react-icons/ri";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useRideContext } from "../context/RideContext";
import { set } from "date-fns";

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [tripLocation, setTripLocation] = useState("");
  const [roundTripLocation, setRoundTripLoaction] = useState("");
  // const location = useLocation();
  const { pickupDate, pickupTime } = useRideContext();
  const { dropoffDate, dropoffTime } = useRideContext();


  //searchparams se locaton nikalkr set krna jo user ne di hai or display krn usko
  const [searchParams] = useSearchParams();
  //const place = searchParams.get('to'); //this is from setintercitylocationpage
  const place = searchParams.get('to'); //this is from enterdestination page
  //now update with useeffct
  

  // Format date and time for display
  const formattedDate = pickupDate
    ? new Date(pickupDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "Not Set";
  const formatedDropOffDate = dropoffDate
    ? new Date(dropoffDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "Not Set";

  const formattedTime = pickupTime || "Not Set";
  const formatedDropOfftime = dropoffTime || " NOt Set";
 

  //now there is nowork of thses 2 handler because we use useeffct below
  const handelLocationChange = (e) => {
    setTripLocation(place);
  };
  const handleRoundTripLocationChange = (e) => {
    setRoundTripLoaction(e.target.value);
  };
  

   // Set location on mount if present in query params
   useEffect(() => {
    if (place) {
      setTripLocation(place);
      setRoundTripLoaction(place);
    }
  }, [place]);

  return (
    <div className="w-full max-w-md mx-auto mt-8 ">
      <div className="relative flex items-center justify-between border-b border-gray-300 bg-gray-200 rounded-2xl">
        {/* Tabs */}
        <div
          className={`flex-1 text-center py-3 cursor-pointer transition-colors duration-300 ${
            activeTab === "tab1"
              ? "text-black font-semibold"
              : "text-gray-800 text-lg font-semibold"
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          One way
        </div>

        <div
          className={`flex-1 text-center py-3 cursor-pointer transition-colors duration-300 ${
            activeTab === "tab2"
              ? "text-black font-semibold"
              : "text-gray-800 text-lg font-semibold"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Round trip
        </div>

        {/* Animated Underline */}
        <div
          className={`absolute border-[2px] border-black h-full rounded-xl transition-transform duration-300 ease-in-out ${
            activeTab === "tab1"
              ? "transform translate-x-0"
              : "transform translate-x-full"
          }`}
          style={{ width: "50%" }}
        ></div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "tab1" && (
          <div className="text-center">
            <div className="mt-6 w-full space-y-1">
              <div className="relative w-full">
                <Link to="/enterdestination">
                  <input
                    type="text"
                    value={tripLocation}
                    onChange={handelLocationChange}
                    className=" bg-gray-200 w-full rounded-2xl px-12 text-lg sm:text-xl text-gray-900 py-4 sm:py-5 font-thin  mt-2"
                    placeholder="Enter destination"
                  />
                  <RiMapPin2Fill
                    size={24}
                    className="absolute top-6 left-4 sm:top-4 text-gray-900"
                  />
                </Link>
              </div>

              <Link to="/pickuptrippage">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={
                      pickupDate && pickupTime
                        ? `${formattedDate} at ${formattedTime}`
                        : "Pickup date and time"
                    }
                    readOnly
                    className=" bg-gray-200 w-full rounded-2xl px-12 text-lg sm:text-xl text-gray-900 py-4 sm:py-5 font-thin  mt-2"
                    placeholder="Pickup date and time"
                  />
                  <LuArrowUpFromDot
                    size={24}
                    className="absolute top-6 left-4 sm:top-4 text-gray-900"
                  />
                </div>
              </Link>
            </div>

            <Link
              to={`/setlocationpage?gotoLocation=${encodeURIComponent(tripLocation)}`}
              className="sticky bottom-0 bg-black text-center text-white font-semibold text-2xl sm:text-xl md:text-2xl rounded-md p-2 sm:p-3 hover:bg-gray-600 mt-5 flex items-center justify-center gap-2"
            >
              Find rides <HiArrowRight className="mt-1" />
            </Link>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="text-center">
            <div className="mt-6 w-full space-y-1">
              <div className="relative w-full">
                <Link to="/enterdestination">
                  <input
                    type="text"
                    value={roundTripLocation}
                    onChange={handleRoundTripLocationChange}
                    className=" bg-gray-200 w-full rounded-2xl px-12 text-lg sm:text-xl text-gray-900 py-4 sm:py-5 font-thin  mt-2"
                    placeholder="Enter destination"
                  />
                  <RiMapPin2Fill
                    size={24}
                    className="absolute top-6 left-4 sm:top-4 text-gray-900"
                  />
                </Link>
              </div>

              <div className="relative w-full flex justify-evenly gap-2 rounded-2xl ">
                <Link
                  to="/pickuptrippage"
                  className=" w-1/2 mt-3 flex items-center justify-center bg-gray-200 gap-3 rounded-2xl "
                >
                  <span>
                    <LuArrowUpFromDot size={28} />
                  </span>
                  <h3 className=" text-lg text-left  font-normal">
                    {pickupDate && pickupTime
                      ? `${formattedDate} ${formattedTime}`
                      : `Pickup  Date &  time`}
                  </h3>
                </Link>

                <Link
                  to="/dropofftrippage"
                  className=" w-1/2 mt-3 flex items-center justify-center bg-gray-200 gap-3 rounded-2xl "
                >
                  <span>
                    <LuArrowDownToDot size={28} />
                  </span>
                  <h3 className=" text-lg  text-left font-normal">
                    {dropoffDate && dropoffTime
                      ? `${formatedDropOffDate}  ${formatedDropOfftime}`
                      : `Dropoff  Date &  time`}
                  </h3>
                </Link>
              </div>
            </div>

            <Link
              to={`/setlocationpage?gotoLocation=${encodeURIComponent(roundTripLocation)}`}
              className="sticky bottom-0 bg-black text-center text-white font-semibold text-2xl sm:text-xl md:text-2xl rounded-md p-2 sm:p-3 hover:bg-gray-600 mt-5 flex items-center justify-center gap-2"
            >
              Find rides <HiArrowRight className="mt-1" />
            </Link>

            <div className=" flex items-center mt-5 gap-3 p-2 bg-blue-100 rounded-2xl">
              <HiMiniArrowUturnDown size={30} />
              <span className=" text-2xl font-semibold">
                Keep the car with you for the <hr /> entire journey when you{" "}
                <hr /> book a round trip.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabBar;
