import React from 'react';
import { FaEdit } from 'react-icons/fa';

function LocationErrorPage() {
  return (
    <div className="relative h-screen w-full bg-gray-800 text-white">
      {/* Map background with overlay */}
      <div className="absolute inset-0 opacity-50">
        <img src="path_to_your_map_image.jpg" alt="Map background" className="w-full h-full object-cover" />
      </div>

      {/* Error message container */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
        <div className="bg-black bg-opacity-75 p-4 rounded-lg">
          <h1 className="text-xl font-bold mb-2">Location error</h1>
          <p>The location you entered is within city limits or outside Intercity service area. Try exploring other ride options or re-enter location.</p>
        </div>

        {/* Buttons */}
        <div className="mt-4 w-full flex flex-col items-stretch space-y-2">
          <button className="flex items-center justify-center bg-black p-4 rounded-lg">
            <FaEdit className="mr-2" />
            Edit location
          </button>
          <button className="bg-transparent border border-white p-4 rounded-lg">
            Choose other ride options
          </button>
        </div>
      </div>

      {/* Footer navigation placeholder */}
      <div className="absolute bottom-0 w-full">
        <div className="p-4 bg-black bg-opacity-50 text-center">Footer Navigation</div>
      </div>
    </div>
  );
}

export default LocationErrorPage;