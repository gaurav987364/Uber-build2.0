import React from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { HiMiniBuildingOffice } from 'react-icons/hi2';
import { IoPerson } from 'react-icons/io5';
import { PiDotsNineBold } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-300">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <NavLink
          to="/homepage"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-5 group ${
              isActive ? 'text-black' : 'text-gray-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <BiSolidHome size={26} />
              <span
                className={`text-sm mt-1 ${
                  isActive ? 'font-semibold text-black' : 'font-normal text-gray-500'
                }`}
              >
                Home
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-5 group ${
              isActive ? 'text-black' : 'text-gray-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <PiDotsNineBold size={26} />
              <span
                className={`text-sm mt-1 ${
                  isActive ? 'font-semibold text-black' : 'font-normal text-gray-500'
                }`}
              >
                Services
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/activity"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-5 group ${
              isActive ? 'text-black' : 'text-gray-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <HiMiniBuildingOffice size={26} />
              <span
                className={`text-sm mt-1 ${
                  isActive ? 'font-semibold text-black' : 'font-normal text-gray-500'
                }`}
              >
                Activity
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-5 group ${
              isActive ? 'text-black' : 'text-gray-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <IoPerson size={26} />
              <span
                className={`text-sm mt-1 ${
                  isActive ? 'font-semibold text-black' : 'font-normal text-gray-500'
                }`}
              >
                Account
              </span>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
