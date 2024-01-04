"use client";

import { useEffect, useState } from "react";
import { getAllMissions, deleteMission } from "@/lib/api"; // Import the deleteMission function
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MissionCard from "@/components/MissionCardComponent";

const Missions = () => {
  const [missions, setMissions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllMissions();
        if (Array.isArray(res)) {
          setMissions(res);
        } else {
          console.error("Invalid response format. Expected an array:", res);
        }
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteMission = async (missionId) => {
    try {
      const deletedMission = await deleteMission(missionId);
      console.log(deletedMission);

      if (deletedMission) {
        toast.error(`${deletedMission.msg}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setMissions((prevMissions) =>
          prevMissions.filter((mission) => mission.id !== missionId)
        );
      }
    } catch (error) {
      console.error("Error deleting mission:", error);
    }
  };

 return (
   <div className="container mx-auto mt-8">
     <div className="flex flex-row justify-between items-center mb-8">
       <h1 className="text-3xl font-bold mb-4 flex-grow">Missions</h1>
       <Link href={"/missions/create"}>
         <button className="btn btn-primary">Create Mission</button>
       </Link>
     </div>

     <div>
       {missions && missions.length > 0 ? (
         missions.map((mission, index) => (
           <MissionCard
             key={index}
             mission={mission}
             onDelete={() => handleDeleteMission(mission.id)}
           />
         ))
       ) : missions === null ? (
         <div className="flex items-center justify-center">
           <progress className="progress w-56"></progress>
         </div>
       ) : (
         <p className="text-center text-gray-500">No missions found</p>
       )}
     </div>
   </div>
 );

};

export default Missions;
