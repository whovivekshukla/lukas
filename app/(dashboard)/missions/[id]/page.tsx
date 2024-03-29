"use client";

import MissionDetails from "@/components/MissionDetails";
import Terminal from "@/components/Terminal";
import { getInspectionLog, getSingleMission } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Status } from "@/lib/utils";
import Video from "@/components/VideoPlayer";

const MissionsPage = ({ params }) => {
  const router = useRouter();
  const [currentMission, setCurrentMission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logData, setLogData] = useState(null);

  const fetchData = async (missionId) => {
    setLoading(true);
    try {
      const mission = await getSingleMission(missionId);

      if (mission.err === "Mission Not Found") {
        router.push("/not-found");
        return;
      }
      setCurrentMission(mission);
      const inspectionLog = await getInspectionLog(missionId);
      if (!inspectionLog.log || !inspectionLog.log.data) {
        setLogData(null);
      } else {
        setLogData(inspectionLog.log);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params.id);
  }, [params.id, router]);

  return (
    <div className="container mx-auto">
      {loading ? (
        <div className="flex items-center justify-center">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 flex-grow">
              {currentMission?.name}
            </h1>

            {currentMission?.status === Status.Pending ? (
              <Link href={`/missions/update/${params.id}`}>
                <button className="btn btn-primary">Update Mission</button>
              </Link>
            ) : (
              <Link href={``}>
                <button className="btn btn-primary" disabled>
                  Update Mission
                </button>
              </Link>
            )}
          </div>
          <div>
            <MissionDetails missionData={currentMission} logData={logData} />
          </div>
          <div>
            {logData ? (
              <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="flex-1 lg:mr-4">
                  <Terminal logs={logData} />
                </div>
                <div className="flex-1 flex items-center justify-center mt-4 lg:mt-0">
                  <Video videoUrl={logData.videoURL} />
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionsPage;
