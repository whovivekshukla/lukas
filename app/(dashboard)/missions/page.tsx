"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import SelectComponent from "@/components/SelectComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import { createMission } from "@/lib/api";

let MissionWayPointExample = [
  {
    name: "Drone Investigation",
    status: "pending",
    waypoints: [
      {
        frame: 1,
        command: 16,
        is_current: true,
        autocontinue: true,
        param1: 1.5,
        param2: 2.5,
        param3: 3.5,
        param4: 4.5,
        x_lat: 38.9037,
        y_long: -77.0374,
        z_alt: 200.0,
      },
    ],
    altitude: 6,
    speed: 6,
  },
];

const MissionsPage = async () => {
  // Create a function to get all the data from the below form and then log it to console

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const mission = {
        name: e.target.name.value,
        status: e.target.status.value,
        waypoints: e.target.waypoints.value,
        altitude: e.target.altitude.value,
        speed: e.target.speed.value,
      };
      console.log(mission);
    } catch (error) {
      console.log(error);
    }
    // const res = await createMission(mission);
    // console.log(res);
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
          />
          <InputComponent labelName={"Speed:"} type={"number"} name={"speed"} />
          <div className="mt-4">
            <ButtonComponent label={"Submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default MissionsPage;
