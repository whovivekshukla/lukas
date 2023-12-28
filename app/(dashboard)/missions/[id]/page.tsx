"use client";

import MissionDetails from "@/components/MissionData";
import Terminal from "@/components/Terminal";
import {
  getInspectionLog,
  getSingleMission,
  performInspection,
} from "@/lib/api";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MissionsPage = ({ params }) => {
  const router = useRouter();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logData, setLogData] = useState(null);

  const getAllData = async (missionId) => {
    setLoading(true);
    try {
      const mission = await getSingleMission(missionId);
      if (!mission) {
        router.push("/not-found");
      }
      setMission(mission);
      const log = await getInspectionLog(missionId);
      if (!log.log.data) {
        setLogData(null);
      }
      setLogData(log.log.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData(params.id);
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
              {mission?.name}
            </h1>
            <Link href={`/missions/update/${params.id}`}>
              <button className="btn btn-primary">Update Mission</button>
            </Link>
          </div>
          <div>
            <MissionDetails missionData={mission} />
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
