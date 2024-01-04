import {
  armDrone,
  takeOff,
  setWayPoint,
  executeWayPoints,
  setRTL,
  land,
  disarmDrone,
  accessRequest,
} from "./FlytBaseAPIs/api";
import { prisma } from "./db";
import { getUserFromClerkId } from "./auth";
import { getEdgePolyfilledModules } from "next/dist/build/webpack/plugins/middleware-plugin";

const createURL = (path) => {
  return window.location.origin + path;
};

export const createMission = async ({ missionData }) => {
  try {
    const res = await fetch(
      new Request(createURL("/api/missions/create"), {
        method: "POST",
        body: JSON.stringify(missionData),
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllMissions = async () => {
  try {
    const res = await fetch(
      new Request(createURL("/api/missions"), {
        method: "GET",
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleMission = async (missionId) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/missions/${missionId}`), {
        method: "GET",
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateMission = async ({ missionData }) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/missions/${missionData.id}`), {
        method: "PATCH",
        body: JSON.stringify(missionData),
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteMission = async (missionId) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/missions/${missionId}`), {
        method: "DELETE",
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInspectionLog = async (missionId) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/inspection/log/${missionId}`), {
        method: "GET",
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const performInspection = async (position, logCallback) => {
  let resArray = [];
  try {
    resArray.push(" Access Request");
    logCallback(" Access Request...");
    const accessRequestRes = await accessRequest();
    logCallback(accessRequestRes);

    resArray.push("Starting Inspection...");
    logCallback("Starting Inspection...");
    const armDroneRes = await armDrone();
    logCallback(armDroneRes);

    resArray.push("Taking Off...");
    logCallback("Taking Off...");
    const takeOffRes = await takeOff();
    logCallback(takeOffRes);

    resArray.push("Setting Waypoint...");
    logCallback("Setting Waypoint...");
    const setWayPointRes = await setWayPoint(position);
    logCallback(setWayPointRes);

    resArray.push("Executing Waypoints...");
    logCallback("Executing Waypoints...");
    const executeWayPointsRes = await executeWayPoints();
    logCallback(executeWayPointsRes);

    resArray.push("Returning to Launch...");
    logCallback("Returning to Launch...");
    const setRTLRes = await setRTL();
    logCallback(setRTLRes);

    resArray.push("Landing...");
    logCallback("Landing...");
    const landRes = await land();
    logCallback(landRes);

    resArray.push("Disarming...");
    logCallback("Disarming...");
    const disarmDroneRes = await disarmDrone();
    logCallback(disarmDroneRes);

    return { result: "Inspection completed successfully", logs: resArray };
  } catch (error) {
    resArray.push(`Error: ${error}`);
    logCallback(`Error: ${error}`);
    throw error;
  }
};

export const scheduleInspection = async (missionId) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/inspection/${missionId}`), {
        method: "GET",
      })
    );

    if (res.ok) {
      const data = await res.json();
      console.log(data);

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
