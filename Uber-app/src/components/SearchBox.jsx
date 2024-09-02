import React, { useCallback, useEffect, useRef, useState } from "react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import debounce from "lodash.debounce";

// Replace with your Mapbox access token
const mapboxAccessToken =
  "pk.eyJ1IjoiZ2F1cmF2MXBuZHQiLCJhIjoiY20wZXYybWs0MGJiZDJqczdsb242NnNqMiJ9.m_kE-F7sphFNVbWI8_e3Gg";

const SearchBox = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [placeName, setPlaceName] = useState("");
  const geocoderRef = useRef(null);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxAccessToken,
      mapboxgl: null, // We are not using mapbox-gl.js
      placeholder: "Where to?",
      types: "poi,place",
    });

    geocoder.on("result", (event) => {
      setPlaceName(event.result.place_name);
      setInputValue(event.result.text);
      if (onSelect) onSelect(event.result.place_name, event.result.text);
    });

    geocoder.on("clear", () => {
      setPlaceName("");
      setInputValue("");
    });

    // Attach the Geocoder to a container
    if (geocoderRef.current) {
      geocoderRef.current.appendChild(geocoder.onAdd());
    }

    // Clean up the Geocoder
    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.innerHTML = "";
      }
    };
  }, [onSelect]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setPlaceName(""); // Clear place name if typing manually
  };

  return (
    <div className="relative w-full">
      {/* Container for the Mapbox Geocoder */}
      <div ref={geocoderRef} className="absolute inset-0"></div>
      <input
        type="text"
        placeholder="Where to?"
        value={inputValue}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black w-full"
      />
      <div className="mt-2 text-xs">
        {inputValue ? (
          <p>
            <strong>Your Select Location:</strong> {inputValue}
          </p>
        ) : (
          "Please select the location..."
        )}
      </div>
    </div>
  );
};

export default SearchBox;
