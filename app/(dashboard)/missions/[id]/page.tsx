"use client";

import MissionDetails from "@/components/MissionDetails";
import Terminal from "@/components/Terminal";
import { getInspectionLog, getSingleMission } from "@/lib/api";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Status } from "@/lib/utils";

const MissionsPage = ({ params }) => {
  const router = useRouter();
  const [currentMission, setCurrentMission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logData, setLogData] = useState(null);

  const fetchData = async (missionId) => {
    setLoading(true);
    try {
      const mission = await getSingleMission(missionId);
      if (!mission) {
        router.push("/not-found");
        return;
      }
      setCurrentMission(mission);
      const inspectionLog = await getInspectionLog(missionId);
      if (!inspectionLog.log.data) {
        setLogData(null);
      }
      setLogData(inspectionLog.log.data);
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
    <div className="container mx-auto mt-8">
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
            <MissionDetails missionData={currentMission} />
          </div>
          <div>
            {logData ? (
              <div>
                <Terminal logs={logData} />
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
