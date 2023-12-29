// components/MissionDetails.js

import React from "react";

const MissionDetails = ({ missionData }) => {
  if (!missionData) {
    return (
      <div className="flex items-center justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  const {
    status,
    waypoints,
    speed,
    altitude,
    InspectionTime,
    // Add more fields as needed
  } = missionData;


  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Status:</strong> {status}
        </div>
        <div>
          <strong>Speed:</strong> {speed} km/h
        </div>
        <div>
          <strong>Altitude:</strong> {altitude} meters
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

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Waypoints:</h3>
        <div className="max-h-32 overflow-y-auto">
          {/* <p>{JSON.stringify(waypoints)}</p> */}
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

      {/* Add more sections as needed */}
    </div>
  );
};

export default MissionDetails;
