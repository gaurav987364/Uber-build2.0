import React, { useEffect, useState, useCallback } from "react";
import { BsCircle } from "react-icons/bs";
import { HiArrowLeft, HiOutlineDotsVertical } from "react-icons/hi";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { IoAddSharp } from "react-icons/io5";
// import { MdSwapVert } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import Select from "../components/Select";
//import AutoSearch from "./AutoSearch";
const myKey = `c3a2175dbfe14dca8055b974528b8ea8`;
import debounce from "lodash.debounce";
import { RiMapPin2Fill } from "react-icons/ri";

const SetIntercityLocation = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [cityName, setCityName] = useState("");

  ///**Swaping the input field funtionlaiy */
  // const handelSwap = ()=>{
  //   if(!fromLocation || !toLocation) return;
  //  setFromLocation(toLocation);
  //  setToLocation(fromLocation);
  // }

  // Set the user's current location when the component mounts
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setFromLocation({ lat: latitude, lng: longitude });
      console.log(`Initial Position: [${latitude}, ${longitude}]`);
    });
  }, []);

  //we get our location in the number form from tht above funtion but we need our location name like city name etc so that we set this into the url taki next page pae fetch hosake name se location;
  useEffect(() => {
    if (!fromLocation) return;
    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${fromLocation.lat}&lon=${fromLocation.lng}&lang=fr&apiKey=c3a2175dbfe14dca8055b974528b8ea8`
    )
      .then((response) => response.json())
      .then((data) => {
        setCityName(data.features[0].properties.city);
      });
  }, [fromLocation]);

  //**!here  is the autocomplete logic */
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define the debounced function
  const fetchSuggestions = useCallback(
    debounce(async (input) => {
      if (input.length > 2) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
              input
            )}&limit=7&lang=de&apiKey=${myKey}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          //console.log(data); // For debugging purposes

          setSuggestions(data.features || []);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300), // Debounce delay (in milliseconds)
    []
  );

  const handleSelect = (suggestion) => {
    setToLocation(suggestion.properties.name);
    setSuggestions([]); // Clear suggestions after selection
  };
  //**!here  is the autocomplete logic */

  const handleFromLocationChange = (e) => {
    //not editabel
  };
  const handleToLocationChange = (e) => {
    const input = e.target.value;
    setToLocation(input);
    fetchSuggestions(input); // Call the debounced function
    setToLocation(e.target.value);
  };
  const goBack = () => {
    navigate(-1);
  };

  const handelConfirm = () => {
    if (!fromLocation || !toLocation) return;
    //console.log(fromLocation, toLocation);
  };

  return (
    <div className="p-4 w-full h-screen flex flex-col">
      <button
        className="flex items-center gap-2 mb-4 cursor-pointer"
        onClick={goBack}
      >
        <HiArrowLeft size={30} />
        <span className="text-2xl font-semibold">Back</span>
      </button>

      <div className="flex flex-col gap-4">
        <div className="relative flex items-center gap-2">
          <BsCircle size={20} color="blue" />
          <input
            type="text"
            placeholder="Fetching your Location ....."
            value={fromLocation ? `Your Location...` : ""}
            onChange={handleFromLocationChange}
            className="border border-gray-300 bg-gray-300 rounded-md p-2 focus:outline-none focus:border-black w-full"
            disabled // Disable the input field
          />
        </div>

        <div className="flex justify-between">
          <span>
            <HiOutlineDotsVertical size={20} />
          </span>
          <div className=" flex items-center gap-2">
            {/* <span className=" px-2 py-1 bg-gray-200 border border-gray-300 rounded-full">
              <MdSwapVert size={20} />
            </span> */}
            <span className=" px-2 py-1 bg-gray-200 border border-gray-300 rounded-full">
              <IoAddSharp size={20} />
            </span>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <SlLocationPin size={20} color="red" />
          {/* <AutoSearch onSelect={handleToLocationChange} /> */}
          <input
            type="text"
            placeholder="To..."
            value={toLocation}
            onChange={handleToLocationChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black w-full"
          />
        </div>
      </div>

      <div className=" w-full h-[70rem] mt-3  overflow-scroll">
        {loading && <p>Loading...</p>}
        <ul className="suggestions-list w-full overflow-x-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              onClick={() => handleSelect(suggestion)}
              className=" flex items-center gap-3 py-1 text-lg font-semibold border-b border-gray-300"
              key={index}
            >
              {" "}
              {suggestion ? (
                <RiMapPin2Fill size={22} className=" text-gray-900" />
              ) : (
                "fetching..."
              )}
              {suggestion.properties.name}
            </li> // Customize based on response structure
          ))}
        </ul>
      </div>

      {fromLocation && toLocation ? (
        <Link
          onClick={handelConfirm}
          to={`/intercitypage?from=${encodeURIComponent(
            cityName
          )}&to=${encodeURIComponent(toLocation)}`}
          className="bg-black text-center text-white font-semibold text-lg rounded-md p-2 hover:bg-gray-600 mt-5 "
        >
          Confirm Date & time
        </Link>
      ) : (
        <Select />
      )}
    </div>
  );
};

export default SetIntercityLocation;
