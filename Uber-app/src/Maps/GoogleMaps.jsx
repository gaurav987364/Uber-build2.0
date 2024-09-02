// pickUpAddress, dropOffAddress
// const [position, setPosition] = useState({
//   lat: 28.34509633333333,
//   lng: 77.32244833333333,
// });
//navigator.geolocation.getCurrentPosition((position) => {
//   const { latitude, longitude } = position.coords;
//   setPosition({ lat: latitude, lng: longitude });
   //console.log(`Initial Position: [${latitude}, ${longitude}]`);
// });
//switch to diferent map styles button





import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// const customIcon = new L.Icon({
//   iconUrl: "https://example.com/path/to/icon.png",
//   iconSize: [25, 41], // size of the icon
//   iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
//   popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
// });

const LeafletMapComponent = ({ pickUpAddress, dropOffAddress }) => {
  const [position, setPosition] = useState({
    lat: 28.34509633333333,
    lng: 77.32244833333333,
  });
  //dynamically adding of markers
  const [markers, setMarkers] = useState([]); //store all markers
  const mapRef = useRef(); // Reference to the map

  // Function to add a new marker dynamically
  const addMarker = (lat, lng, label) => {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { lat, lng, label: label || `Marker at [${lat}, ${lng}]` },
    ]);
  };

  //getting otehr marks location
  const [clickedPosition, setClickedPosition] = useState(null);
  //getting my initial position
  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ lat: latitude, lng: longitude });
      //console.log(`Initial Position: [${latitude}, ${longitude}]`);
    });
  }, []);

  // Handle map clicks to set a new marker
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setClickedPosition(e.latlng);
        console.log(`Clicked Position: [${e.latlng.lat}, ${e.latlng.lng}]`);
      },
    });
    return clickedPosition ? (
      <Marker position={clickedPosition}>
        <Popup>
          Clicked Position: <br /> [{clickedPosition.lat}, {clickedPosition.lng}
          ]
        </Popup>
      </Marker>
    ) : null;
  };

  const [mapStyle, setMapStyle] = useState("streets"); // 'streets', 'satellite', or 'maptiler-satellite'

  const toggleMapStyle = () => {
    setMapStyle((prevStyle) =>
      prevStyle === "streets"
        ? "satellite"
        : prevStyle === "satellite"
        ? "maptiler-satellite"
        : "streets"
    );
  };

  // Add markers dynamically based on passed props (optional)
  useEffect(() => {
    if (pickUpAddress?.lat && pickUpAddress?.lng) {
      addMarker(pickUpAddress.lat, pickUpAddress.lng, "Pickup Location");
    }
    if (dropOffAddress?.lat && dropOffAddress?.lng) {
      addMarker(dropOffAddress.lat, dropOffAddress.lng, "Drop-off Location");
    }
  }, [pickUpAddress, dropOffAddress]);

  //fetching all routes
   //fitbounds
  // Automatically fit bounds when markers are updated
  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      const bounds = L.latLngBounds(
        markers.map((marker) => [marker.lat, marker.lng])
      );
      mapRef.current.fitBounds(bounds, {
        padding: [20, 50],
        maxZoom: 10,
      });
    }
  }, [markers]);

  return (
    <div style={{ width: "100%", height: "50vh" }}>
      <MapContainer
        center={position}
        zoom={4}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
        ref={mapRef} // Attach the map reference
      >
        {/* Conditional Rendering of TileLayers */}
        {mapStyle === "streets" ? (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        ) : mapStyle === "satellite" ? (
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
          />
        ) : (
          <TileLayer
            url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=zp2mD0In7ZDBwC3IRuCS"
            attribution='&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>'
          />
        )}

        {/* Marker for initial position */}
        <Marker position={position}>
          <Popup>
            Initial Position: <br /> {`[${position.lat}, ${position.lng}]`}
          </Popup>
        </Marker>

        {/* Dynamically render markers */}
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }}>
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}

        {/* Location Marker added on click */}
        <LocationMarker />

        {/* {our pickup and dropoff markers} */}
        {/* {pickUpAddress?.lat && pickUpAddress?.lng && (
          <Marker position={pickUpAddress}>
            <Popup>
              Pickup Address: <br />{" "}
              {`${pickUpAddress.lat}, ${pickUpAddress.lng}`}
            </Popup>
          </Marker>
        )}

        {dropOffAddress?.lat && dropOffAddress?.lng && (
          <Marker position={dropOffAddress}>
            <Popup>
              Drop-off Address: <br />{" "}
              {`${dropOffAddress.lat}, ${dropOffAddress.lng}`}
            </Popup>
          </Marker>
        )} */}
      </MapContainer>

      {/* Toggle Button */}
      <button
        onClick={toggleMapStyle}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 20px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        {mapStyle === "streets"
          ? "Satellite"
          : mapStyle === "satellite"
          ? "MapTiler Satellite"
          : "Streets"}
      </button>
    </div>
  );
};

export default LeafletMapComponent;




