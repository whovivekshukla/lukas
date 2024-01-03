import schedule from "node-schedule";

const YourComponent = () => {
  const jobs = schedule.scheduledJobs;
  console.log(jobs);

  return <div>Hello</div>;
};

export default YourComponent;
