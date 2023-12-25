"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import SelectNewComponent from "@/components/SelectNewComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import { createMission } from "@/lib/api";
import { MissionWayPointExample } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const CreateMissionsPage = () => {
   const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Create a function to get all the data from the below form and then log it to console

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const mission = {
        name: e.target.name.value,
        waypoints: JSON.parse(e.target.waypoints.value),
        altitude: parseInt(e.target.altitude.value),
        speed: parseInt(e.target.speed.value),
      };
      // console.log(mission);

      const res = await createMission({ missionData: mission });
      // console.log(res);
      if (res) {
        toast.success("Mission Created Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        router.push("/missions");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-8 bg-slate-200">
      <div className="my-8">
        <h2 className="text-2xl">Create Mission</h2>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <InputComponent
            labelName={"Mission name:"}
            type={"text"}
            name={"name"}
            value={"Drone Investigation"}
          />
          <TextAreaComponent
            label={"Waypoints"}
            value={MissionWayPointExample}
            name={"waypoints"}
          />
          <InputComponent
            labelName={"Altitude:"}
            type={"number"}
            name={"altitude"}
            value={0}
          />
          <InputComponent
            labelName={"Speed:"}
            value={0}
            type={"number"}
            name={"speed"}
          />
          <div className="mt-4">
            <ButtonComponent disabled={loading} label={"Submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateMissionsPage;
