"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import { createMission, scheduleInspection } from "@/lib/api";
import { MissionWayPointExample } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import DateTimeInputComponent from "@/components/DateTimeComponent";

const CreateMissionsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Create a function to get all the data from the below form and then log it to console

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const inspectionTimeCheck = new Date(
        e.target.InspectionTime.value
      ).toISOString();

      // Check if InspectionTime is in the past
      const currentTime = new Date().toISOString();
      if (inspectionTimeCheck < currentTime) {
        toast.error("Error: The inspection time is in the past.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setLoading(false);
        return;
      }

      const mission = {
        name: e.target.name.value,
        waypoints: JSON.parse(e.target.waypoints.value),
        InspectionTime: inspectionTimeCheck,
      };

      // Make the API call
      const res = await createMission({ missionData: mission });

      if (res && res.message) {
        toast.success(`${res.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        router.push("/missions");
      } else {
        toast.error(
          `Failed to create mission. ${JSON.stringify(res.errors[0])}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (error) {
      // Handle any unexpected errors

      toast.error(`An error occurred: ${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
          />
          <TextAreaComponent
            label={"Waypoints"}
            value={MissionWayPointExample}
            name={"waypoints"}
          />

          <DateTimeInputComponent
            labelName={"Inspection Time:"}
            name={"InspectionTime"}
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
