
import React, { createContext, useState, useContext } from 'react';

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState({
    home: '',
    work: '',
    other: '',
  });

  const setAddress = (type, address) => {
    setAddresses((prev) => ({ ...prev, [type]: address }));
  };

  return (
    <AddressContext.Provider value={{ addresses, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => useContext(AddressContext);
