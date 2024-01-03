"use client";

import ButtonComponent from "@/components/ButtonComponent";
import InputComponent from "@/components/InputComponent";
import SelectUpdateComponent from "@/components/SelectUpdateComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import { getSingleMission, updateMission } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Status } from "@/lib/utils";

const UpdateMissionsPage = ({ params }) => {
  const router = useRouter();
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);

  const getData = async () => {
    try {
      const mission = await getSingleMission(params.id);
      if (!mission) {
        router.push("/not-found");
      }
     
      if (
        mission.status === Status.Completed ||
        mission.status === Status.InProgress
      ) {
        toast.error(
          "Mission is either in progress or completed, Cannot update now!",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        router.push(`/missions/${params.id}`);
      }
      setMissionData({
        id: params.id,
        name: mission.name,
        status: mission.status,
        waypoints: mission.waypoints,
        altitude: mission.altitude,
        speed: mission.speed,
        InspectionData: mission.InspectionData,
      });
      setLoading(false);
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
      setUpdateButtonLoading(true);
      const mission = {
        id: params.id,
        name: e.target.name.value,
        waypoints: JSON.parse(e.target.waypoints.value),
        altitude: parseInt(e.target.altitude.value),
        speed: parseInt(e.target.speed.value),
        InspectionTime: e.target.InspectionTime.value,
      };

      const res = await updateMission({ missionData: mission });
      if (res) {
        toast.success("Mission Updated Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getData();
        router.push(`/missions/${params.id}`);
      }
    } catch (error) {
      toast.error(`Something went wrong ${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      console.log(error);
    } finally {
      setUpdateButtonLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-slate-200">
      <div className="my-8">
        <h2 className="text-2xl">
          {loading ? (
            <div className="flex items-center justify-center">
              <progress className="progress w-56"></progress>
            </div>
          ) : (
            "Update Mission"
          )}
        </h2>
      </div>

      {!loading && (
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
            <label className="label cursor-pointer form-control w-full max-w-xs">
              <input
                type="datetime-local"
                name="InspectionTime"
                className="input input-bordered input-primary"
                defaultValue={missionData.InspectionTime}
                required
              />
            </label>
            <div className="mt-4">
              <ButtonComponent
                disabled={updateButtonLoading}
                label={"Update"}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateMissionsPage;
