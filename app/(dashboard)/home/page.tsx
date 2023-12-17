import {
  armDrone,
  takeOff,
  disarmDrone,
  land,
  positionHold,
  positionSetPoint,
  setWayPoint,
  getWayPoint,
  executeWayPoints,
  clearWayPoint,
  setCurrentWayPoint,
  setRTL,
} from "@/lib/FlytBaseAPIs/api";
const position = [
  {
    frame: 0,
    command: 16,
    is_current: true,
    autocontinue: false,
    param1: 1.5,
    param2: 2.0,
    param3: 3.0,
    param4: 4.5,
    x_lat: 37.7749,
    y_long: -122.4194,
    z_alt: 100.0,
  },
  {
    frame: 1,
    command: 18,
    is_current: true,
    autocontinue: true,
    param1: 2.0,
    param2: 3.5,
    param3: 1.0,
    param4: 4.0,
    x_lat: 40.7128,
    y_long: -74.006,
    z_alt: 150.0,
  },
  {
    frame: 2,
    command: 20,
    is_current: true,
    autocontinue: true,
    param1: 3.0,
    param2: 1.0,
    param3: 2.5,
    param4: 4.0,
    x_lat: 34.0522,
    y_long: -118.2437,
    z_alt: 200.0,
  },
];


// setWayPoint(position);
const Home = async () => {
  // await armDrone();
  // await disarmDrone()
  // await takeOff();
  // await land();
  // await setWayPoint(position);
  // await executeWayPoints();
  // await setCurrentWayPoint();
  // await getWayPoint();
  // await setRTL();
  return <div>Home</div>;
};
export default Home;
