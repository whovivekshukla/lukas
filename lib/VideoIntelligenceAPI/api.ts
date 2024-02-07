const keyFilename = "C://Users/vivek//Desktop/lukas-412609-4be886ea6fc0.json";

import Video from "@google-cloud/video-intelligence";

export async function analyzeVideo(
  gcsUri,
  features = ["OBJECT_TRACKING"],
  locationId = "us-east1"
) {
  const result = new Set();
  const video = new Video.VideoIntelligenceServiceClient({ keyFilename });

  const request = {
    inputUri: gcsUri,
    features,
    locationId,
  };

  try {
    const [operation] = await video.annotateVideo(request);
    const results = await operation.promise();
    console.log("Waiting for operation to complete...");

    const annotations = results[0].annotationResults[0];
    const objects = annotations.objectAnnotations;
    objects.forEach((object) => {
      result.add(object.entity.description);
    });

    return Array.from(result);
  } catch (error) {
    console.error("Error analyzing video:", error.message);
    throw error;
  }
}

const axios = require("axios");
const { Storage } = require("@google-cloud/storage");

// Google Cloud Storage credentials
const storage = new Storage({
  projectId: "lukas-412609",
  keyFilename,
});

export async function saveVideoToStorage(
  endpoint,
  bucketName,
  destinationFileName
) {
  try {
    const response = await axios.get(endpoint, { responseType: "arraybuffer" });

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destinationFileName);

    await file.save(response.data, {
      metadata: {
        contentType: "video/mp4",
      },
    });

    const gsLink = `gs://${bucketName}/${destinationFileName}`;
    return gsLink;
  } catch (error) {
    console.error("Error saving video:", error.message);
  }
}
