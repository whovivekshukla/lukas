import { analyzeVideo } from "@/lib/VideoIntelligenceAPI/api";

const TestPage = async () => {
  const res = await analyzeVideo();
  console.log(res);

  return <div>TestPage</div>;
};
export default TestPage;
