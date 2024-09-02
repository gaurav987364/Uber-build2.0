import React, { useEffect, useState, useCallback } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { RiMapPin2Fill } from "react-icons/ri";
import { useAddressContext } from "../context/AddressContext";

const myKey = `c3a2175dbfe14dca8055b974528b8ea8`;

const AddlocationforMePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const locationType = searchParams.get("type") || "home"; // Get type from URL (home, work, etc.);
  const {setAddress} = useAddressContext(); //it is callback which update state on context page


  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState("");
  const [cityName, setCityName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get the user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setFromLocation({ lat: latitude, lng: longitude });

        // Fetch the city name from the coordinates
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${myKey}`
        );
        const data = await response.json();
        const city = data.features[0].properties.city || data.features[0].properties.name;
        
        setCityName(city);

        // Set the location input to the city name
        setToLocation(city);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  // Fetch nearby locations based on the user's input
  const fetchSuggestions = useCallback(
    debounce(async (input) => {
      if (input.length > 2) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&limit=7&apiKey=${myKey}`
          );
          const data = await response.json();
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
    }, 300),
    []
  );

  // Handle location input change
  const handleToLocationChange = (e) => {
    const input = e.target.value;
    setToLocation(input);
    fetchSuggestions(input);
  };

  // Handle selection from suggestions
  const handleSelect = (suggestion) => {
    setToLocation(suggestion.properties.name);
    setSuggestions([]); // Clear suggestions after selection
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    if (!fromLocation || !toLocation) return;
    console.log(`From Location: ${cityName}, To Location: ${toLocation}`);
    
    // Set the address based on the type (home, work, etc.)
    setAddress(locationType, toLocation);

    // Navigate back to saved places
    navigate("/savedplaces");
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
          <SlLocationPin size={20} color="red" />
          <input
            type="text"
            placeholder="Hold on... Fetching your location..."
            value={toLocation}
            onChange={handleToLocationChange}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black w-full"
          />
        </div>
      </div>

      <div className="w-full h-[70rem] mt-3 overflow-scroll">
        {loading && <p>Loading...</p>}
        <ul className="suggestions-list w-full overflow-x-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              onClick={() => handleSelect(suggestion)}
              className="flex items-center gap-3 py-1 text-lg font-semibold border-b border-gray-300 cursor-pointer"
              key={index}
            >
              <RiMapPin2Fill size={22} className="text-gray-900" />
              {suggestion.properties.name}
            </li>
          ))}
        </ul>
      </div>

      {fromLocation && toLocation ? (
        <Link
          onClick={handleConfirm}
          to={`/savedplaces?from=${encodeURIComponent(cityName)}&to=${encodeURIComponent(toLocation)}`}
          className="bg-black text-center text-white font-semibold text-lg rounded-md p-2 hover:bg-gray-600 mt-5"
        >
          Add Place
        </Link>
      ) : (
        <div className="text-center text-lg font-semibold mt-5">Please select a location</div>
      )}
    </div>
  );
};

export default AddlocationforMePage;
