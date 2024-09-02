import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { RideProvider } from "./context/RideContext";
import { AddressProvider } from "./context/AddressContext";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SetLocationPage from "./Pages/SetLocationPage";
import ConfirmLocationPage from "./Pages/ConfirmLocationPage";
import ServicePage from "./Pages/ServicePage";
import ActivityPage from "./Pages/ActivityPage";
import AccountPage from "./Pages/AccountPage";
import LoginPage from "./Pages/LoginPage";
import RentalsPage from "./Pages/RentalsPage";
import ReservePage from "./Pages/ReservePage";
import IntercityPage from "./Pages/IntercityPage";
import PickupTripPage from "./Pages/PickupTripPage";
import DropOffTripPage from "./Pages/DropOffTripPage";
import SetIntercityLocation from "./Pages/SetIntercityLocation";
import AddlocationforMePage from "./Pages/AddLocationforMePage";
import ConfirmPickupSpot from "./Pages/ConfirmPickupSpot";
import InitialUberPage from "./Pages/InitialUberPage";
import SettingsPage from "./Pages/SettingsPage";
import PickupSpotMap from "./Maps/PickupSpotMap";
import EnterDestination from "./Pages/EnterDestination";
import SavedPlaces from "./components/SavedPlaces";
import PaymentCompo from "./components/PaymentCompo";
import AddPaymentpage from "./components/AddPaymentpage";
import AddVoucher from "./components/AddVoucher";
import PrivateRoute from "./Pages/privateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { CarProvider } from "./context/CarDataContext";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";
import NotFoundPage from "./Pages/NotFoundPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDetails = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };
        setIsAuthenticated(true);
        setUserDetails(userDetails);

        // Store user details in localStorage
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
      } else {
        setIsAuthenticated(false);
        setUserDetails(null);

        // Remove user details from localStorage
        localStorage.removeItem("userDetails");
      }
      setLoading(false); // Firebase has finished checking the auth status
    });

    return () => unLogin();
  }, []);

  if (loading) {
    return (
      <div className=" w-full h-screen flex justify-center items-center">
        <CircularProgress color="inherit" />
      </div>
    ); // Show a loading screen until Firebase checks the auth state
  }

  return (
    <>
      <AddressProvider>
        <CarProvider>
          <RideProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<InitialUberPage />} />
                <Route
                  path="/homepage"
                  element={<HomePage userDetails={userDetails} />}
                />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path='/signup' element={<SignUp/>} /> */}

                <Route
                  path="/setlocationpage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <SetLocationPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <ServicePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/activity"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <ActivityPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <AccountPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/rentalspage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <RentalsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reservepage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <ReservePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/intercitypage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <IntercityPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/pickuptrippage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <PickupTripPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dropofftrippage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <DropOffTripPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/setintercitylocation"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <SetIntercityLocation />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/confirmlocationpage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <ConfirmLocationPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/savedplaces"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <SavedPlaces />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/addlocationformepage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <AddlocationforMePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/confirmpickupspot"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <ConfirmPickupSpot />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/paymentcompo"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <PaymentCompo />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/addpaymentpage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <AddPaymentpage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/addvoucher"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <AddVoucher />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/settingspage"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <SettingsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/enterdestination"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <EnterDestination />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/pickupspotmap"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <PickupSpotMap />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/success"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Success />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cancel"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <Cancel />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                      <NotFoundPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </RideProvider>
        </CarProvider>
      </AddressProvider>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
