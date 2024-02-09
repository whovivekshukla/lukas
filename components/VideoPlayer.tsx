import React from "react";
import ReactPlayer from "react-player";

const Video = ({ videoUrl }) => {
  if (!videoUrl) {
    return <div>...loading</div>;
  }

  return (
    <div>
      <ReactPlayer
        width="500px"
        height="400px"
        url={videoUrl}
        controls={true}
        // light is usefull incase of dark mode
        light={false}
        // picture in picture
        pip={true}
      />
    </div>
  );
};

export default Video;
