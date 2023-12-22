"use client";

import { getSingleMission } from "@/lib/api";
import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const MissionsPage = ({ params }) => {
  const router = useRouter();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMissionData = async () => {
    setLoading(true);
    try {
      const mission = await getSingleMission(params.id);
      if (!mission) {
        router.push("/not-found");
      }
      setMission(mission);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMissionData();
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
            <div>
              <p>Status: {mission?.status}</p>
              <p>Altitude: {mission?.altitude} meters</p>
              <p>Speed: {mission?.speed} m/s</p>
              {/* Add more mission details as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionsPage;
