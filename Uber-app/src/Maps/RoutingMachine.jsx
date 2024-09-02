import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  var control = L.Routing.control({
    waypoints: [
      L.latLng(3.102739, 101.598077),
      L.latLng(3.101861, 101.599037)
    ],
    router: new L.Routing.openrouteservice('5b3ce3597851110001cf62488a1db8194c024a3f9e88b76c40ebfda9')
    // routeWhileDragging: true
  }).addTo(this.mymap);

};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;


