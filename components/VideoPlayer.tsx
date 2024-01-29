import React from "react";
import YouTube from "react-youtube";

const Video = ({ videoUrl }) => {
  if (!videoUrl) {
    return <div>...loading</div>;
  }
  // Extracting video ID from the URL
  const videoId = videoUrl.split("v=")[1];

  // Options for the YouTube player
  const opts = {
    height: "400",
    width: "400",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default Video;
