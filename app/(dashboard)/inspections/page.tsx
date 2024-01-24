"use client";

import InspectionCard from "@/components/InspectionCard";
import { getPastInspections } from "@/lib/api";
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PastInspections = () => {
  const [loading, setLoading] = useState(true);
  const [pastInspections, setPastInspections] = useState([]);
  useEffect(() => {
    const getPastInspectionData = async () => {
      try {
        const data = await getPastInspections(); // Assuming getPastInspections is your API call function
        setPastInspections(data.mission);
      } catch (error) {
        console.error("Error fetching past inspections:", error);
        toast.error(`${error}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } finally {
        setLoading(false);
      }
    };

    getPastInspectionData();
  }, []);

  return (
    <div className="container mx-auto ">
      <div className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 flex-grow">Past Inspections</h1>
      </div>
      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <progress className="progress w-56"></progress>
          </div>
        ) : pastInspections.length === 0 ? (
          <p>No past inspections available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastInspections.map((mission) => (
              <InspectionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default PastInspections;
