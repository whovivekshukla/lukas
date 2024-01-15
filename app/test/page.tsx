import { getCronJob } from "@/lib/CronJobAPIs/api";

const TestPage = async () => {
  console.log(await getCronJob(4805783));

  return <div>TestPage</div>;
};
export default TestPage;
