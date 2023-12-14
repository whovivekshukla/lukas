"use client";


import { getAllMissions } from "@/lib/api";
import Link from "next/link";
import MissionCard from "@/components/MissionCardComponent";


const Missions = () => {
  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 flex-grow">Missions</h1>
        <Link href={"/missions/create"}>
          <button className="btn btn-primary">Create Mission</button>
        </Link>
      </div>

    </div>
  );
};

export default Missions;
