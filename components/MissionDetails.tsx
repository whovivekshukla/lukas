import React from "react";
import Badge from "./BadgeComponent";
import ReactPlayer from "react-player";

const MissionDetails = ({ missionData, logData }) => {
  if (!missionData) {
    return (
      <div className="flex items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  const { status, waypoints, InspectionTime } = missionData;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong className="">Status: </strong> {<Badge status={status} />}
        </div>

        <div>
          <strong>Inspection Time:</strong>{" "}
          {new Date(InspectionTime).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Waypoints:</h3>
          <div className="max-h-32 overflow-y-auto">
            {waypoints.map((data, index) => (
              <div key={index}>
                {Object.entries(data).map(([key, value]) => (
                  <p key={key}>
                    {key}: {JSON.stringify(value)}
                  </p>
                ))}
                <p>.................</p>
              </div>
            ))}
          </div>
        </div>

        {logData && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Video Objects:</h3>
            {logData.videoObjectDetectionData.map((videoObject, index) => (
              <span key={index}>{videoObject}, </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionDetails;
