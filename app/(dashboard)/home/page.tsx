import { getNameSpace, accessRequest, armDrone, disarmDrone } from "@/lib/FlytBaseAPIs/api";
const Home = async () => {
  await disarmDrone();
  return <div>Home</div>;
};
export default Home;
