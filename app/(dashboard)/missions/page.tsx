'use client'
import { useEffect, useState } from "react";
import { getAllMissions } from "@/lib/api";
import Link from "next/link";
import MissionCard from "@/components/MissionCardComponent";

const Missions = () => {
  const [missions, setMissions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllMissions();
        Array.isArray(res)
          ? setMissions(res)
          : console.error("Invalid response format. Expected an array:", res);
      } catch (error) {
        console.error("Error fetching missions:", error);
        // Handle error (set state, show an error message, etc.)
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 flex-grow">Missions</h1>
        <Link href="/missions/create">
          <button className="btn btn-primary">Create Mission</button>
        </Link>
      </div>

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
