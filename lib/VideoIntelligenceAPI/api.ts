const keyFilename = "C://Users/vivek//Desktop/lukas-412609-4be886ea6fc0.json";

import Video from "@google-cloud/video-intelligence";

// export const 

export async function analyzeVideo() {
  // Imports the Google Cloud Video Intelligence library
  const result: any = [];
  // Creates a client
  const video = new Video.VideoIntelligenceServiceClient({ keyFilename });

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  const gcsUri = "gs://lukas-demo-video/demo.mp4";

  const request = {
    inputUri: gcsUri,
    features: ["OBJECT_TRACKING"],
    //recommended to use us-east1 for the best latency due to different types of processors used in this region and others
    locationId: "us-east1",
  };
  // Detects objects in a video
  const [operation] = await video.annotateVideo(request);
  const results = await operation.promise();
  console.log("Waiting for operation to complete...");
  //Gets annotations for video
  const annotations = results[0].annotationResults[0];
  const objects = annotations.objectAnnotations;
  objects.forEach((object) => {
    result.push(object.entity.description);
  });
  return result;
}

// Call the function to analyze the video
// analyzeVideo();
