import { positionHold, positionSetPoint } from "@/lib/FlytBaseAPIs/api";
const position = {
  x: 1.0,
  y: 2.0,
  z: 3.0,
  yaw: 45.0,
  tolerance: 1.0,
  async: true,
  relative: false,
  yaw_valid: true,
  body_frame: true,
};
positionSetPoint(position);
const Home = async () => {
  await positionHold();
  return <div>Home</div>;
};
export default Home;
