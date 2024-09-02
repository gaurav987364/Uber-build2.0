import React, { createContext, useContext, useState } from "react";

// Create Context
const RideContext = createContext();

// Custom Hook to use the Ride Context
export const useRideContext = () => useContext(RideContext);

// Provider Component
export const RideProvider = ({ children }) => {
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [dropoffTime, setDropoffTime] = useState(null);
  return (
    <RideContext.Provider
      value={{
        pickupDate,
        setPickupDate,
        pickupTime,
        setPickupTime,
        setDropoffDate,
        setDropoffTime,
        dropoffDate,
        dropoffTime,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};
