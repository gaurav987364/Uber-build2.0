 we use the openstreent map and leaflet;
switch street and sattelite mode
for sattelite view we use mapTiler satellite map with api key;

tech stack -=> reactjs, firebase , tailwind, openstreetmap+leaflet, 
router-dom, react icons, react tooltip, shadcn modal window , etc... 

now we make;;
make homepage where we click go to search page
from serach page confirm location click we are go to confirm ride by page,
where user can select the car or bike and after select this show path on map

//find point based upon input
1. Data Needed:
Current Location: Coordinates (latitude and longitude) of the user's current location.
Destination Location: Coordinates (latitude and longitude) of the selected destination.
Route Data: The path from the current location to the destination, which is typically provided by a routing API.
2. Required Libraries:
Leaflet: For map rendering.
Leaflet Routing Machine: For drawing the route on the map.
Geolocation API: To get the user's current location.
3. Implementation Steps:
Get User’s Current Location: Use the browser's Geolocation API to retrieve the current coordinates.
Add Destination Marker: Allow the user to select or input a destination, and place a marker on that location.
Draw Route: Use Leaflet Routing Machine to draw the route from the current location to the destination.

npm install leaflet-routing-machine leaflet-control-geocoder leaflet-routing-machine-openrouteservice

this is the openRouteservice api key which help us to get directions 
5b3ce3597851110001cf62488a1db8194c024a3f9e88b76c40ebfda9



geofyapi for getting address data - c3a2175dbfe14dca8055b974528b8ea8 key
const apiKey = "c3a2175dbfe14dca8055b974528b8ea8";
const address = "38 Upper Montagu Street, Westminster W1H 1LJ, United Kingdom";
const geocodingUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

console.log(geocodingUrl);

//we create ui ok
we create pages and components ok
we set routes ok
we create map ok using leaflet + openstreetmap ok
we create street view, map Tiler view + satellite map view with toggle ok
we create confirm page where we set pickUp location and drop location funtionality ok and send it to map
we create Location Markers funtionality ok
we create dynamic markers set funtionality  using props coordinates ok

now we set the zoom on the marker using leaflet fitbound
 note on fitbound {
    To automatically adjust the map view to fit all markers within the viewport, you can use the fitBounds method from Leaflet. You can achieve this by calculating the bounds of all marker positions and applying them to the map.

Here’s how you can do that:

Collect All Marker Coordinates: You’ll gather all the latitude and longitude pairs of the markers.
Calculate Bounds: Use the L.latLngBounds method to calculate the bounding box for all markers.
Use the fitBounds Method: This method will adjust the map’s view to ensure all markers are visible.
 }

we done with fitBounds ok
next we do this , get the positions from the input of confirm page and set them into url so thta basis we set the positions

setting the query parametrr into link and get thse values using searchparams into whre you wanna use done ok

done with swap the input fields ok
now working with the ride seletcor items

//sign up with uber devlopers for getting apki key and we need now the product details
https://api.uber.com/v1.2/products 
8Nsxejc3h-TgxwP62ZQcwRHNAKFYAMvoCH4d6LKQ key 

**but avobe is not working so we make json of product and we use that**
json server install kiya and src me data.json banaiyi
we make data json form car, bike.json for bike , and now we make auto jsnon also

//also we set the from location to the user currnet loction and make api call so that we get the city name from cordinates 


//now our task is that 
calculate fare price, time, distance, based upon car type ,
https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62488a1db8194c024a3f9e88b76c40ebfda9&start=8.681495,49.41461&end=8.687872,49.420318

currnecy api fca_live_DLALN2bV4mtmtt3agV5ZRmcXQwsKel9qr0JKoBld  freecurrncyapi.in

using api to calculate all stuff but we use simple way later we use this
Example Usage
1. Fetching Distance and Duration Using OpenRouteService:

Here's an example of how you can make a request to the OpenRouteService API to get the distance and duration between two locations:

const axios = require('axios');

const apiKey = 'YOUR_API_KEY';
const url = 'https://api.openrouteservice.org/v2/directions/driving-car';

const fromLocation = '8.681495,49.41461'; // Start point: longitude,latitude
const toLocation = '8.687872,49.420318'; // End point: longitude,latitude

async function getRouteInfo() {
  try {
    const response = await axios.get(url, {
      params: {
        start: fromLocation,
        end: toLocation,
        api_key: apiKey
      }
    });

    const { distance, duration } = response.data.routes[0];
    console.log(`Distance: ${distance / 1000} km`);
    console.log(`Duration: ${duration / 60} minutes`);
    
    return { distance, duration };
  } catch (error) {
    console.error('Error fetching route info:', error);
  }
}

getRouteInfo();


2. Calculate Fare Using Distance and Duration:

Once you have the distance and duration, use your fare calculation logic:

function calculateFare(distance, duration, priceDetails) {
    const {
        cost_per_minute,
        cost_per_distance,
        minimum,
        base
    } = priceDetails;

    const distanceCost = cost_per_distance * (distance / 1000); // Convert meters to kilometers
    const timeCost = cost_per_minute * (duration / 60); // Convert seconds to minutes
    const totalFare = base + distanceCost + timeCost;

    return Math.max(totalFare, minimum); // Ensure minimum fare is met
}

// Example price details
const priceDetails = {
    cost_per_minute: 0.5,
    cost_per_distance: 2.6,
    minimum: 9.5,
    base: 7
};

getRouteInfo().then(({ distance, duration }) => {
    const fare = calculateFare(distance, duration, priceDetails);
    console.log(`Fare: $${fare.toFixed(2)}`);
});


creating anakin.ai to create some login page like items

//intercity page 
first we make tab system to show content based upon tab title
next we create the round trip k liye pickUp and dropof
when click on pick up so it take us to page on which have two option 1; leave now which is current date and time and 2; is reserve the taxi for some date here is again tab like funtionality and we have to show datepicker here

so npm install react-datepicker react-time-picker
Key Enhancements:
Ride Option State: Added state management with rideOption to handle the selected option.
Conditional Rendering: The date and time pickers are displayed only when the "Reserve a ride" option is selected.
Date and Time Pickers: Integrated react-datepicker for date selection and react-time-picker for time selection.
Auto-Match Option: A checkbox to allow the user to choose an automatic driver match if delays occur.

but we use material ui time pick okok

we set up the ride context for update the pickup and dropoff date and time and display on where we want using custom hook

//logic of one way trip 
simple select location and date and time and simply find rides 

//logic of round trip 
ki user ne phle location select kari ki jana kaha hai ye hme location selector page ka use krn hoga and uske bad user select karega pickup date and time means kab jana hai and dropoff date and time means kab return ana hai usko 

mapple pass 121Gau@pndt and eamil main 
 we use geoapify for automatically search feature and for make it scalable we use loadash debounce

 //also create the setintercity location pagenow work on saved places page

 my opencage geocode api so that find local data key 3afcd1fb2e7941fabb14134fa568f5cf
 url => https://api.opencagedata.com/geocode/v1/json?q=28.34509633333333+77.32244833333333&key=3afcd1fb2e7941fabb14134fa568f5cf

 here map 
 3Xo34ee2glMsGX4nLKRN api id
 PqlXDXV6xCvvxqrDCu0lzNDgGS7h8GXnrP4ojH6yu9A api key
 url https://geocode.search.hereapi.com/v1/geocode?q=Ballabgarh&apiKey=PqlXDXV6xCvvxqrDCu0lzNDgGS7h8GXnrP4ojH6yu9A

 The code block uses curl to make a GET request to the HERE API for routing information.
 code for routes
curl -gX GET \ initiates a GET request.
The URL 'https://router.hereapi.com/v8/routes?transportMode=car&amp;origin=52.5308,13.3847&amp;destination=52.5264,13.3686&amp;return=summary&amp;apiKey={YOUR_API_KEY}' specifies the API endpoint and query parameters:
transportMode=car indicates the mode of transport.
origin=52.5308,13.3847 sets the starting coordinates.
destination=52.5264,13.3686 sets the ending coordinates.
return=summary requests a summary of the route.
apiKey={YOUR_API_KEY} is a placeholder for the user's API key.

routing o here map 
https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary&apiKey=PqlXDXV6xCvvxqrDCu0lzNDgGS7h8GXnrP4ojH6yu9A



//saved places logic of page
simply item pe click krne se ur me type save krwa liya then banaya address context jisme state banaiyi jisme ek object me various property hold kri fir banaya ek setter addess function jo recieve krega type, location jiske basis pe hm setadress state me data save krege on the basis of type then vahi adress provider se app ko wrap and useaddrescontext cutsom hook banaya jise saved place page pr adress ko fetch krke render krwa diya..

done with modal window and payments pages okok;

 now make routes fetauters
 const myAPIKey = "YOUR_API_KEY";
const fromWaypoint = [38.937165,-77.045590]; // latutude, longitude
const toWaypoint = [38.881152,-76.990693]; // latitude, longitude
const url = `https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=drive&lang=en&details=instruction_details&apiKey=${myAPIKey}`;

fetch(url).then(res => res.json()).then(result => {
    console.log(result);
}, error => console.log(err));


modes = [
  "drive","light_truck", "medium_truck" , "truck", "bus", "motorcycle", "scooter", "bicycle", "walk"
]


//mapbox accestoken 
pkeyJ1IjoiZ2F1cmF2MXBuZHQiLCJhIjoiY20wZHJibnJlMGV6dTJqcXJoNXlmM2E1eiJ9.7FZjo1r_iJ3IbyFerWL08g

pk.eyJ1IjoiZ2F1cmF2MXBuZHQiLCJhIjoiY20wZHF3NGx4MGU3dTJqc2NtOXBqam5iMSJ9.RoeQaBFG2UUcQ1hDfw9R5Q working

we use the map box and all their things
our id pas of mapbox is gaurav1pndt pass=GGop121@
we get the visa card details from random vcc generaor


<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" data-testid="drop-icon" data-movable-handle="true"><title>Dropoff</title><path fill-rule="evenodd" clip-rule="evenodd" d="M22 2H2v20h20V2Zm-7 7H9v6h6V9Z" fill="currentColor"></path></svg>

<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" data-testid="pickup-icon" data-movable-handle="true"><title>Radio button selected</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="currentColor"></path></svg>

we set the mapbox search box api, we solve the error of mapbox token, we set the ui to look better, we we the map with custom markers, 

//**/Setting up the firebase 
it is login  with our main account eamil
create new project Uber-App2
register project by going to web (</>)
npm install firebase
now create new file in you project directory => firebasee.js
setup the code in the project and setup the private route.jsx like user only see the aplication homepage but he click to any option it will redirect to login page 


//now our task is {
  route ko animate krna, 
  making loading screen of uber,
  making loading spiiner and add the loading to our app,
  doing error handeling,
  making the toast notification setup in our app and so on 
}

route animation {
Explanation:
Static Gray Route (route-static): This layer displays the entire route in gray as a static base.

Animated Black Route (route-animated): This layer is initially empty and is gradually filled with coordinates to simulate the route being drawn.

Animation Logic:

Forward Animation: The route fills with black from start to end by incrementally adding coordinates.
Reverse Animation: Once the forward animation completes, the route un-fills by removing coordinates, giving the effect of the black route "receding" back to the start.
Looping: After completing the forward and reverse animations, the process repeats with a delay.
Smooth Transition: The requestAnimationFrame ensures that the animation is smooth, and the delay before reversing provides a natural pause before the transition.

Customization:
Transition Timing: Adjust the delay in the setTimeout or modify the step increment in animateStep to control the speed and smoothness of the animation.
Line Appearance: The color, width, and opacity of the lines can be customized in the paint property of the layers.
}


//one of the most important problem of refresh on any page is solve by justloading state
//working
How This Works:
Loading State: The loading state is used to control when the app starts rendering routes. It prevents the app from rendering while Firebase is still determining the user's authentication status.
Auth Status Handling: onAuthStateChanged now sets the loading state to false only after it has determined whether the user is authenticated or not.
Loading Screen: While the auth status is being determined, a loading screen is shown. This avoids any premature rendering that could cause the isAuthenticated state to be incorrectly set to false and redirect users.

<ScaleLoader />


//location iq reverse geocode api  pk.9b9eb8abd0224774e4a874d2632ff4fd
https://us1.locationiq.com/v1/reverse?key=pk.9b9eb8abd0224774e4a874d2632ff4fd&lat=${location.lat}&lon=${location.lng}&format=json&
https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lng}&lang=fr&apiKey=c3a2175dbfe14dca8055b974528b8ea8


// STRIPE payments //
sharmagaurav9654@gmail.com 121Gau@pndt pass nation select US
key = pk_test_51Pu9NVCR7xdE1BYxr5TAqmqkdTxgjSypa3TMTLSPl7B9kzYaBx8R4y9pPeojKpL4LeNvWh0wvoPBai56ctVlS5ON00dYQggBQi

secret key = sk_test_51Pu9NVCR7xdE1BYxyzA2t6Br4eaRwxSwhdbCqoGIUB9H6Bfrf4PoFtGNsjejx1L2Grnh45Q46ifNvA0kG939Sjh8002d7UAO8O

setup 
npm install @stripe/stripe-js @stripe/react-stripe-js
