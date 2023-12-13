"use client";
import { useEffect, useState } from "react";
import { getAllMissions } from "@/lib/api";

const MissionCard = ({ mission }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-md shadow-md">
      <p className="text-xl font-bold mb-2">{mission.name}</p>
      <p className="text-gray-600">{mission.status}</p>
      <p className="text-gray-600">{mission.waypoints}</p>
      <p className="text-gray-600">{mission.altitude}</p>
      <p className="text-gray-600">{mission.speed}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{mission.createdAt}</span>
        <button className="text-blue-500 hover:underline">Delete</button>
      </div>
    </div>
  );
};

const Missions = () => {
  const [missions, setMissions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllMissions();
        setMissions(res); // Set the response data in the state
      } catch (error) {
        console.error("Error fetching missions:", error);
        // Handle error, you might want to set some state to indicate the error in the component
      }
    };

    fetchData(); // Call the function to initiate data fetching
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Missions</h1>
      <div>
        {missions ? (
          missions.map((mission, index) => (
            <MissionCard key={index} mission={mission} />
          ))
        ) : (
          <p className="text-gray-600">Loading missions...</p>
        )}
      </div>
    </div>
  );
};

export default Missions;
