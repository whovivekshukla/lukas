import { accessRequest, armDrone } from "@/lib/FlytBaseAPIs/api";

const Test = async () => {
  const arm = await accessRequest();
  console.log(arm);
  
  return <div>Test</div>;
};
export default Test;
