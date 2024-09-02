import React from "react";
//import GoogleMaps from "../Maps/GoogleMaps";
import Header from "../components/Header";
import ActionButton from "../components/ActionButton";
import WhereToGo from "../components/WhereToGo";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const HomePage = () => {
  return (
    <div className=" App w-full h-screen flex flex-col">
      {/* <div className="map flex-1 bg-red-200">
        <GoogleMaps />
      </div> */}
      <div className="homepage flex-1 p-6 flex-wrap">
        <Header  />
        <Link to='/setlocationpage'><WhereToGo /></Link>
        <ActionButton />
      </div>

      <BottomNav/>
    </div>
  );
};

export default HomePage;
