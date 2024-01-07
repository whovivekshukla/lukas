import { changedDateFormat, generateScheduleProperty } from "@/lib/utils";

const TestPage = () => {
  const someDate = new Date().toISOString();
  console.log(generateScheduleProperty(someDate));
  

  return <div>TestPage</div>;
};
export default TestPage;
