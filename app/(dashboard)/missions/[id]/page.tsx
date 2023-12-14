"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import SelectUpdateComponent from "@/components/SelectUpdateComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import { getSingleMission, updateMission } from "@/lib/api";
import { MissionWayPointExample } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateMissionsPage = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [missionData, setMissionData] = useState({
    name: "",
    status: "pending",
    waypoints: MissionWayPointExample,
    altitude: 0,
    speed: 0,
  });

  const getData = async () => {
    try {
      const mission = await getSingleMission(params.id);
      setMissionData({
        name: mission.name,
        status: mission.status,
        waypoints: mission.waypoints,
        altitude: mission.altitude,
        speed: mission.speed,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []); // Run only once on component mount

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const mission = {
        name: e.target.name.value,
        status: e.target.status.value,
        waypoints: JSON.parse(e.target.waypoints.value),
        altitude: parseInt(e.target.altitude.value),
        speed: parseInt(e.target.speed.value),
      };
      // console.log(mission);

      const res = await updateMission({ missionData: mission });
      // console.log(res);
      if (res) {
        toast.success("Mission Updated Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
        <h2 className="text-2xl">Update Mission</h2>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <InputComponent
            labelName={"Mission name:"}
            type={"text"}
            name={"name"}
            value={missionData.name}
          />
          <SelectUpdateComponent
            label={"Mission Status:"}
            options={["pending", "inprogress", "completed"]}
            name={"status"}
            defaultValue={missionData.status}
          />

          <TextAreaComponent
            label={"Waypoints"}
            value={missionData.waypoints}
            name={"waypoints"}
          />
          <InputComponent
            labelName={"Altitude:"}
            type={"number"}
            name={"altitude"}
            value={missionData.altitude}
          />
          <InputComponent
            labelName={"Speed:"}
            value={missionData.speed}
            type={"number"}
            name={"speed"}
          />
          <div className="mt-4">
            <ButtonComponent disabled={loading} label={"Update"} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateMissionsPage;
