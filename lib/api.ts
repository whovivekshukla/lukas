import {
  armDrone,
  takeOff,
  setWayPoint,
  executeWayPoints,
  setRTL,
  land,
} from "./FlytBaseAPIs/api";

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

export const performInspection = async (position) => {
  let resArray = [];
  try {
    const armDroneRes = await armDrone();
    resArray.push(armDroneRes);
    const takeOffRes = await takeOff();
    resArray.push(takeOffRes);
    const setWayPointRes = await setWayPoint(position);
    resArray.push(setWayPointRes);
    const executeWayPointsRes = await executeWayPoints();
    resArray.push(executeWayPointsRes);
    const setRTLRes = await setRTL();
    resArray.push(setRTLRes);
    return resArray;
  } catch (error) {
    resArray.push(error);
    return resArray;
  }
};
