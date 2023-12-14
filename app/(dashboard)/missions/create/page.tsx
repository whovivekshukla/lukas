"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import SelectComponent from "@/components/SelectComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import { createMission } from "@/lib/api";
import { MissionWayPointExample } from "@/lib/utils";

const CreateMissionsPage = async () => {
  // Create a function to get all the data from the below form and then log it to console

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const mission = {
        name: e.target.name.value,
        status: e.target.status.value,
        waypoints: JSON.parse(e.target.waypoints.value),
        altitude: parseInt(e.target.altitude.value),
        speed: parseInt(e.target.speed.value),
      };
      // console.log(mission);

      const res = await createMission({ missionData: mission });
      console.log(res);
    } catch (error) {
      console.log(error);
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
          <SelectComponent
            label={"Mission Status:"}
            props={["pending", "inprogress", "completed"]}
            name={"status"}
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
            value={6}
          />
          <InputComponent
            labelName={"Speed:"}
            value={1}
            type={"number"}
            name={"speed"}
          />
          <div className="mt-4">
            <ButtonComponent label={"Submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateMissionsPage;
