import {
  analyzeVideo,
  saveVideoToStorage,
} from "@/lib/VideoIntelligenceAPI/api";

const TestPage = async () => {
  // const videoEndpoint =
  //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4";
  // const googleCloudStorageBucket = "lukas-demo-video";
  // const destinationFileName = "test-video";

  //  const gsVideoLink = await saveVideoToStorage(
  //   videoEndpoint,
  //   googleCloudStorageBucket,
  //   destinationFileName
  // );

  const gsLink = "gs://lukas-demo-video/test-video";

   const videoAnalysis = await analyzeVideo(gsLink);
  console.log(videoAnalysis)
  return <div>TestPage</div>;
};
export default TestPage;
