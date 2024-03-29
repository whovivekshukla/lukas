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
import DateTimeComponent from "@/components/DateTimeComponent";

const UpdateMissionsPage = ({ params }) => {
  const router = useRouter();
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateButtonLoading, setUpdateButtonLoading] = useState(false);

  const getData = async () => {
    try {
      const mission = await getSingleMission(params.id);

      if (mission.err === "Mission Not Found") {
        router.push("/not-found");
        return;
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
        return;
      }

      setMissionData({
        id: params.id,
        name: mission.name,
        status: mission.status,
        waypoints: mission.waypoints,
        InspectionTime: new Date(mission.InspectionTime),
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mission data:", error);
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
        status: missionData.status,
        waypoints: JSON.parse(e.target.waypoints.value),
        InspectionTime: new Date(e.target.InspectionTime.value).toISOString(),
      };

      const res = await updateMission({ missionData: mission });
      console.log(res);

      if (res) {
        toast.success(res.message, {
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
          {loading && !missionData ? (
            <div className="flex items-center justify-center">
              <progress className="progress w-56"></progress>
            </div>
          ) : (
            "Update Mission"
          )}
        </h2>
      </div>

      {!loading && missionData && (
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
            <DateTimeComponent
              labelName={"Inspection Time:"}
              name={"InspectionTime"}
            />

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
