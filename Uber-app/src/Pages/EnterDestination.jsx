import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { CircularProgress } from "@mui/material";
import { HiBadgeCheck } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2F1cmF2MXBuZHQiLCJhIjoiY20wZXYybWs0MGJiZDJqczdsb242NnNqMiJ9.m_kE-F7sphFNVbWI8_e3Gg";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [location, setLocation] = useState(null); // Start as null
  const [dragTimeout, setDragTimeout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [yourLocation, setYourLocation] = useState("");
  const navigate = useNavigate();
  const goBack = ()=>{
    navigate(-1);
  }

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
            setLoading(true); // Set loading true when fetching location
          },
          (error) => {
            console.error("Error getting location:", error);
            // Default to a fallback location if geolocation fails
            setLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco as default fallback
            setLoading(true); // Set loading true when fetching location
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // Default to a fallback location if geolocation is not supported
        setLocation({ lat: 37.7749, lng: -122.4194 }); // San Francisco as default fallback
        setLoading(true); // Set loading true when fetching location
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!map.current && location) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [location.lng, location.lat],
        zoom: 12,
      });

      map.current.on("load", () => {
        if (location) {
          map.current.setCenter([location.lng, location.lat]);
          setLoading(false); // Stop loading once the map is initialized
        }
      });

      map.current.on("dragstart", () => {
        if (dragTimeout) {
          clearTimeout(dragTimeout);
        }
        setLoading(true); // Set loading true when fetching location
      });

      map.current.on("dragend", () => {
        setDragTimeout(
          setTimeout(() => {
            const center = map.current.getCenter();
            setLocation({
              lat: center.lat,
              lng: center.lng,
            });
            setLoading(true);
          }, 500) // delay of 3 seconds
        );
      });
    } else if (location && map.current) {
      map.current.setCenter([location.lng, location.lat]);
    }
  }, [location]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (location) {
        try {
          const response = await fetch(
            `https://us1.locationiq.com/v1/reverse?key=pk.9b9eb8abd0224774e4a874d2632ff4fd&lat=${location.lat}&lon=${location.lng}&format=json&`
          );
          const data = await response.json();
          setYourLocation(data.display_name);
          setLoading(false); // Stop loading once address is fetched
         // console.log(data.display_name)
        } catch (error) {
          console.error("Error fetching address:", error);
          setLoading(false); // Stop loading once address is fetched
        }
      }
    };

    fetchAddress();
  }, [location]);

  return (
    <div style={{ position: "relative", height: "70vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      <button
        className=" absolute top-[2%] left-[3%] flex items-center gap-2 mb-4 cursor-pointer"
        onClick={goBack}
      >
        <HiArrowLeft size={30} />
      </button>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        <img className=" w-[4rem]" src="/public/pin.png" alt="" />
      </div>

      <div className="w-full flex flex-col justify-between p-4">
        <span className="flex-1 text-center p-2 text-xl font-semibold border-b-[2px] border-gray-300">
          Specify a location
        </span>

        <div className="flex-1 w-full flex items-center justify-between p-2 mt-3">
          <span className="text-lg font-semibold w-[80%] overflow-scroll">
            {yourLocation ? yourLocation : "Set location by drag map"}
          </span>
          <span>{yourLocation ? <HiBadgeCheck size={30} /> : <CircularProgress color="inherit"/>}</span>
        </div>

        <Link to={`/intercitypage?to=${encodeURIComponent(yourLocation)}`} className="flex-1 mt-8 w-full py-3 bg-black text-white text-2xl font-semibold rounded-xl text-center">
          Confirm
        </Link>
      </div>
    </div>
  );
};

export default MapComponent;


