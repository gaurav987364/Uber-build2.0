// import React, { useState, useCallback } from "react";
// import debounce from "lodash.debounce";
// import { RiMapPin2Fill } from "react-icons/ri";
// const myKey = `c3a2175dbfe14dca8055b974528b8ea8`;

// const AutoSearch = ({ onSelect }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Define the debounced function
//   const fetchSuggestions = useCallback(
//     debounce(async (input) => {
//       if (input.length > 2) {
//         setLoading(true);
//         try {
//           const response = await fetch(
//             `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
//               input
//             )}&limit=20&lang=de&apiKey=${myKey}`
//           );

//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }

//           const data = await response.json();
//           console.log(data); // For debugging purposes

//           setSuggestions(data.features || []);
//         } catch (error) {
//           console.error("Error fetching suggestions:", error);
//           setSuggestions([]);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setSuggestions([]);
//       }
//     }, 300), // Debounce delay (in milliseconds)
//     []
//   );

//   const handleInputChange = (e) => {
//     const input = e.target.value;
//     setQuery(input);
//     fetchSuggestions(input); // Call the debounced function
//   };

//   const handleSelect = (suggestion) => {
//     setQuery(suggestion.properties.name);
//     onSelect(suggestion.properties.name); // Pass the selected suggestion to the parent component
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   return (
//     <div className=" w-full">
//       <input
//         type="text"
//         value={query}
//         onChange={handleInputChange}
//         placeholder="Search for a place"
//         className="input-style border border-gray-300 rounded-md p-2 focus:outline-none focus:border-black w-full" // Add your custom styling
//       />
//       {loading && <p>Loading...</p>}
//       <ul className="suggestions-list">
//         {suggestions.map((suggestion, index) => (
//           <li
//             onClick={() => handleSelect(suggestion)}
//             className=" flex items-center gap-3 px-8 text-lg font-semibold border-b border-gray-300"
//             key={index}
//           >
//             {" "}
//             <RiMapPin2Fill size={24} className=" text-gray-900" />
//             {suggestion.properties.name}
//           </li> // Customize based on response structure
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AutoSearch;
