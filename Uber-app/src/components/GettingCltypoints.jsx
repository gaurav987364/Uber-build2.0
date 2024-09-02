const geoapifyApiKey = 'c3a2175dbfe14dca8055b974528b8ea8';

export default async function getCoordinates(address1, address2) {
  const url1 = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address1
  )}&apiKey=${geoapifyApiKey}`;

  const url2 = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address2
  )}&apiKey=${geoapifyApiKey}`;

  try {
    const [response1, response2] = await Promise.all([fetch(url1), fetch(url2)]);
    const data1 = await response1.json();
    const data2 = await response2.json();

    let coords1, coords2;

    if (data1.features && data1.features.length > 0) {
      const { lat, lon } = data1.features[0].properties;
      const placeName1 = data1.features[0].properties.formatted;
      coords1 = { latitude: lat, longitude: lon, placeName: placeName1 };
      //console.log(`Coordinates for ${placeName1}: Latitude: ${lat}, Longitude: ${lon}`);
    } else {
      console.error('No results found for the first address');
      coords1 = null;
    }

    if (data2.features && data2.features.length > 0) {
      const { lat, lon } = data2.features[0].properties;
      const placeName2 = data2.features[0].properties.formatted;
      coords2 = { latitude: lat, longitude: lon, placeName: placeName2 };
     // console.log(`Coordinates for ${placeName2}: Latitude: ${lat}, Longitude: ${lon}`);
    } else {
      console.error('No results found for the second address');
      coords2 = null;
    }

    return { coords1, coords2 };
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    return null;
  }
}

// // Example usage:
// getCoordinates(
//   '1600 Pennsylvania Ave NW, Washington, DC 20500',
//   '1 Infinite Loop, Cupertino, CA 95014'
// ).then(coords => {
//   if (coords) {
//     console.log('Geocoded coordinates:', coords);
//   }
// });
