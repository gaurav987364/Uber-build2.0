import React from "react";
import { useNavigate } from "react-router-dom";
import PickupSpotPage from '../Maps/PickupSpotMap'
const ConfirmPickupSpot = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <PickupSpotPage/>
    </div>
  );
};

export default ConfirmPickupSpot;
