import {
  armDrone,
  takeOff,
  setWayPoint,
  executeWayPoints,
  setRTL,
  land,
  disarmDrone,
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

export const performScheduledInspection = async (mission) => {
  const user = await getUserFromClerkId();
  const checkInspectionLog = await prisma.inspectionLog.findFirst({
    where: {
      missionId: mission.id,
      mission: {
        userId: user.id,
      },
    },
  });

  if (checkInspectionLog) {
    return NextResponse.json({ log: checkInspectionLog });
  }
  await prisma.mission.update({
    where: {
      id: mission.id,
    },
    data: {
      status: "inprogress",
    },
  });

  const resArray = [];
  const result = await performInspection(mission.waypoints, async (log) => {
    resArray.push(log);
  });

  const newInspection = await prisma.inspectionLog.create({
    data: {
      missionId: mission.id,
      data: resArray,
    },
  });

  await prisma.mission.update({
    data: {
      status: "completed",
    },
    where: {
      id: mission.id,
    },
  });

  return newInspection;
};
