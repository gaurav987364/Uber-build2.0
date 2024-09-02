import React, { useEffect, useRef, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CustomMarker from "./CustomMarkers";
import { useSearchParams } from "react-router-dom";
import getCoordinates from "../components/GettingCltypoints";
import mapboxgl from "mapbox-gl";

const MapboxMap = () => {
  const [searchParams] = useSearchParams();
  const [markers, setMarkers] = useState([]);
  const fromlocation = searchParams.get("from");
  const tolocation = searchParams.get("to");
  const [pickUpLabel, setPickUpLabel] = useState("");
  const [dropOffLabel, setDropOffLabel] = useState("");
  const mapRef = useRef(null);

  const [viewport, setViewport] = useState({
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    zoom: 3,
  });

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZ2F1cmF2MXBuZHQiLCJhIjoiY20wZXYybWs0MGJiZDJqczdsb242NnNqMiJ9.m_kE-F7sphFNVbWI8_e3Gg"; // Replace with your Mapbox token

  useEffect(() => {
    getCoordinates(fromlocation, tolocation).then((cord) => {
      const a = cord.coords1.placeName;
      const b = a.split("-");
      const c = b[0].trim();
      setPickUpLabel(c);

      const x = cord.coords2.placeName;
      const y = x.split("-");
      const z = y[0].trim();
      setDropOffLabel(z);
      if (cord) {
        const fromCoords = {
          latitude: cord.coords1.latitude,
          longitude: cord.coords1.longitude,
          label: c,
        };
        const toCoords = {
          latitude: cord.coords2.latitude,
          longitude: cord.coords2.longitude,
          label: z,
        };

        setMarkers([fromCoords, toCoords]);
      }
    });
  }, [fromlocation, tolocation]);

  const getRoute = async (map, start, end) => {
    try {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_TOKEN}`,
        { method: "GET" }
      );
      const json = await query.json();
      //console.log("API Response:", json); // Log the entire response

      if (!json.routes || json.routes.length === 0) {
        //hame ek toast set krna hoga no routes  find if useer puts long distance location
        console.error("No routes found for the given coordinates.");
        return;
      }
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#1E2A5E",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }

      // Initialize an empty GeoJSON for the animated route
    const animatedGeojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    };

    // // Add the animated black route layer
    if (!map.getLayer("route-animated")) {
      map.addLayer({
        id: "route-animated",
        type: "line",
        source: {
          type: "geojson",
          data: animatedGeojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#000000", // Black color
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }

    // Function to animate the route
    const animateRoute = (reverse = false) => {
      let i = reverse ? route.length - 1 : 0;

      const animateStep = () => {
        if ((!reverse && i < route.length) || (reverse && i >= 0)) {
          if (reverse) {
            animatedGeojson.geometry.coordinates.pop();
          } else {
            animatedGeojson.geometry.coordinates.push(route[i]);
          }

          map.getSource("route-animated").setData(animatedGeojson);

          i = reverse ? i - 1 : i + 1;
          requestAnimationFrame(animateStep);
        } else {
          // Once one direction completes, start the opposite direction after a short delay
          setTimeout(() => {
            animateRoute(!reverse);
          },2000); // Delay before reversing the direction
        }
      };

      animateStep();
    };


    // Start the animation
    animateRoute();
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // //handel bounds
  // const handleMapLoad = (event) => {
  //   const map = event.target;

  //   if (markers.length > 0) {
  //     const bounds = new mapboxgl.LngLatBounds();
  //     markers.forEach((marker) => {
  //       bounds.extend([marker.longitude, marker.latitude]);
  //     });

  //     map.fitBounds(bounds, {
  //       padding: 60,
  //       maxZoom: 18,
  //     });

  //     // Initial route display
  //     getRoute(
  //       map,
  //       [markers[0].longitude, markers[0].latitude],
  //       [markers[1].longitude, markers[1].latitude]
  //     );

  //     // Add starting and ending points to the map
  //     map.addLayer({
  //       id: "start-point",
  //       type: "circle",
  //       source: {
  //         type: "geojson",
  //         data: {
  //           type: "FeatureCollection",
  //           features: [
  //             {
  //               type: "Feature",
  //               properties: {},
  //               geometry: {
  //                 type: "Point",
  //                 coordinates: [markers[0].longitude, markers[0].latitude],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       paint: {
  //         "circle-radius": 10,
  //         "circle-color": "#df3030",
  //       },
  //     });

  //     map.addLayer({
  //       id: "end-point",
  //       type: "circle",
  //       source: {
  //         type: "geojson",
  //         data: {
  //           type: "FeatureCollection",
  //           features: [
  //             {
  //               type: "Feature",
  //               properties: {},
  //               geometry: {
  //                 type: "Point",
  //                 coordinates: [markers[1].longitude, markers[1].latitude],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       paint: {
  //         "circle-radius": 10,
  //         "circle-color": "#f84b4b",
  //       },
  //     });

  //     // Add click event listener for setting the destination
  //     map.on("click", (event) => {
  //       const coords = [event.lngLat.lng, event.lngLat.lat];
  //       const end = {
  //         type: "FeatureCollection",
  //         features: [
  //           {
  //             type: "Feature",
  //             properties: {},
  //             geometry: {
  //               type: "Point",
  //               coordinates: coords,
  //             },
  //           },
  //         ],
  //       };

  //       if (map.getLayer("end")) {
  //         map.getSource("end").setData(end);
  //       } else {
  //         map.addLayer({
  //           id: "end",
  //           type: "circle",
  //           source: {
  //             type: "geojson",
  //             data: end,
  //           },
  //           paint: {
  //             "circle-radius": 10,
  //             "circle-color": "#f30",
  //           },
  //         });
  //       }

  //       // Update the route with the new destination
  //       getRoute(map, [markers[0].longitude, markers[0].latitude], coords);
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (markers.length > 0 && mapRef.current) {
  //     const map = mapRef.current.getMap();
  //     const bounds = new mapboxgl.LngLatBounds();
  //     markers.forEach((marker) => {
  //       bounds.extend([marker.longitude, marker.latitude]);
  //     });

  //     map.fitBounds(bounds, {
  //       padding: 60,
  //       maxZoom: 18,
  //     });

  //     // Initial route display
  //     getRoute(
  //       map,
  //       [markers[0].longitude, markers[0].latitude],
  //       [markers[1].longitude, markers[1].latitude]
  //     );

  //     // Add starting and ending points to the map
  //     map.addLayer({
  //       id: "start-point",
  //       type: "circle",
  //       source: {
  //         type: "geojson",
  //         data: {
  //           type: "FeatureCollection",
  //           features: [
  //             {
  //               type: "Feature",
  //               properties: {},
  //               geometry: {
  //                 type: "Point",
  //                 coordinates: [markers[0].longitude, markers[0].latitude],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       paint: {
  //         "circle-radius": 10,
  //         "circle-color": "#ffffff",
  //       },
  //     });

  //     map.addLayer({
  //       id: "end-point",
  //       type: "circle",
  //       source: {
  //         type: "geojson",
  //         data: {
  //           type: "FeatureCollection",
  //           features: [
  //             {
  //               type: "Feature",
  //               properties: {},
  //               geometry: {
  //                 type: "Point",
  //                 coordinates: [markers[1].longitude, markers[1].latitude],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       paint: {
  //         "circle-radius": 10,
  //         "circle-color": "#f7f7f7",
  //       },
  //     });

  //     // Add click event listener for setting the destination
  //     map.on("click", (event) => {
  //       const coords = [event.lngLat.lng, event.lngLat.lat];
  //       const end = {
  //         type: "FeatureCollection",
  //         features: [
  //           {
  //             type: "Feature",
  //             properties: {},
  //             geometry: {
  //               type: "Point",
  //               coordinates: coords,
  //             },
  //           },
  //         ],
  //       };

  //       if (map.getLayer("end")) {
  //         map.getSource("end").setData(end);
  //       } else {
  //         map.addLayer({
  //           id: "end",
  //           type: "circle",
  //           source: {
  //             type: "geojson",
  //             data: end,
  //           },
  //           paint: {
  //             "circle-radius": 10,
  //             "circle-color": "#2e1ab0",
  //           },
  //         });
  //       }

  //       // Update the route with the new destination
  //       getRoute(map, [markers[0].longitude, markers[0].latitude], coords);
  //     });
  //   }
  // }, [markers]);

  useEffect(() => {
    if (markers.length > 0 && mapRef.current) {
      const map = mapRef.current.getMap();
      const bounds = new mapboxgl.LngLatBounds();

      markers.forEach((marker) => {
        bounds.extend([marker.longitude, marker.latitude]);
      });

      map.fitBounds(bounds, {
        padding: 60,
        maxZoom: 18,
      });

      // Initial route display
      getRoute(
        map,
        [markers[0].longitude, markers[0].latitude],
        [markers[1].longitude, markers[1].latitude]
      );

      // Add starting point to the map, after removing if it exists
      if (map.getLayer("start-point")) {
        map.removeLayer("start-point");
        map.removeSource("start-point");
      }

      map.addLayer({
        id: "start-point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: [markers[0].longitude, markers[0].latitude],
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#ffffff",
        },
      });

      // Add ending point to the map, after removing if it exists
      if (map.getLayer("end-point")) {
        map.removeLayer("end-point");
        map.removeSource("end-point");
      }

      map.addLayer({
        id: "end-point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: [markers[1].longitude, markers[1].latitude],
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#f7f7f7",
        },
      });

      // Add click event listener for setting the destination
      map.on("click", (event) => {
        const coords = [event.lngLat.lng, event.lngLat.lat];
        const end = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: coords,
              },
            },
          ],
        };

        if (map.getLayer("end")) {
          map.getSource("end").setData(end);
        } else {
          map.addLayer({
            id: "end",
            type: "circle",
            source: {
              type: "geojson",
              data: end,
            },
            paint: {
              "circle-radius": 10,
              "circle-color": "#2e1ab0",
            },
          });
        }

        // Update the route with the new destination
        getRoute(map, [markers[0].longitude, markers[0].latitude], coords);
      });
    }
  }, [markers]);

  return (
    <div style={{ height: "50vh" }}>
      <Map
        initialViewState={viewport}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph"
        mapboxAccessToken={MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        //onLoad={handleMapLoad}
        ref={mapRef}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
          >
            <CustomMarker
              pickUpLabel={pickUpLabel}
              dropOffLabel={dropOffLabel}
              label={marker.label}
            />
          </Marker>
        ))}
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
};

export default MapboxMap;
