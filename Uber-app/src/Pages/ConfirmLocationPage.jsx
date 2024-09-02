import React, { useEffect, useState } from "react";
import GoogleMaps2 from "../Maps/GoogleMaps2";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SelectCardItem from "../components/SelectCardItem";
import { HiArrowLeft } from "react-icons/hi";
import { useCarContext } from "../context/CarDataContext";
// import CalculateDistance from "../helpers/CalculateDistance";
// import CalculateTime from "../helpers/CalculateTime";

const apiKey = "c3a2175dbfe14dca8055b974528b8ea8";

const ConfirmLocationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [pickUpAddress, setPickUpAddress] = useState(from);
  const [dropOffAddress, setDropOffAddress] = useState(to);
  //const [car, setCar] = useState([]);
  const {car} = useCarContext();

  //**CALCULATE THE FARE, TIME, DISTANCE ETC */
  // Example coordinates
  // const userLocation = pickUpAddress;
  // const destinationLocation = dropOffAddress;

  // const distance = CalculateDistance(
  //   userLocation.lat,
  //   userLocation.lng,
  //   destinationLocation.lat,
  //   destinationLocation.lng
  // );
  // //console.log(Math.floor(distance) + "km");

  // // Estimate time (assuming 50 km/h average speed)
  // const duration = CalculateTime(distance, 80); // Time in hours and 80 is speed
  //console.log(CalculateTimeTohour(duration));

  const pickUpLocation = async () => {
    await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        pickUpAddress
      )}&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const { lat, lon } = data.features[0].properties;
          setPickUpAddress({ lat, lng: lon });
        } else {
          console.log("No location found.");
        }
      })
      .catch((error) => console.error("Error fetching geocoding data:", error));
  };
  const dropOffLocation = async () => {
    await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        dropOffAddress
      )}&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const { lat, lon } = data.features[0].properties;
          setDropOffAddress({ lat, lng: lon });
        } else {
          console.log("No location found.");
        }
      })
      .catch((error) => console.error("Error fetching geocoding data:", error));
  };
  useEffect(() => {
    pickUpLocation();
    dropOffLocation();
  }, []);

  return (
    <div className=" w-full flex h-screen flex-col">
      <button
        className="  absolute z-[999] left-[2.1%] top-[3%] flex items-center gap-2 mb-4 cursor-pointer"
        onClick={goBack}
      >
        <HiArrowLeft size={30} />
      </button>
      <GoogleMaps2 />

      <h1 className=" text-center font-semibold text-gray-500 border-b">
        Choose a ride, or Swipe up for more.
      </h1>
      <div className="selectcars flex-1 p-3 overflow-scroll">
        {car.map((elem) => (
          <SelectCardItem
            key={elem.id}
            elem={elem}
            pickUpAddress={pickUpAddress}
            dropOffAddress={dropOffAddress}
          />
        ))}
      </div>

      <>
        <div className=" sticky bg-black text-center text-white font-semibold text-lg rounded-md p-1 m-4 hover:bg-gray-600 mt-5 ">
          Please select a ride
        </div>
      </>
    </div>
  );
};

export default ConfirmLocationPage;
