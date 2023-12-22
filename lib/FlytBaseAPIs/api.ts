import axios from "axios";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: `${process.env.FLY_URL}/api/flytbase/ros/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.FLYTBASE_AUTHORIZATION,
      VehicleID: process.env.FLYTBASE_VEHICLEID,
    },
  });
  return instance;
};

const customAxios = createAxiosInstance();

export const getNameSpace = async () => {
  try {
    const response = await customAxios.get("get_global_namespace");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const accessRequest = async () => {
  try {
    const response = await customAxios.post(
      "flytos/navigation/access_request",
      {
        enable_access: true,
      }
    );

    console.log("API Response:", response.data);
  } catch (error) {
    return error.message;
  }
};

export const armDrone = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/arm");
    // console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Error:", error);
    return error.message;
  }
};

export const disarmDrone = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/disarm");
    // console.log("API Response Data:", response.data);
    return response.data.message;
  } catch (error) {
    // console.error("Error:", error);
    return error.message;
  }
};

export const takeOff = async () => {
  try {
    const response = await customAxios.post("flytos/navigation/take_off", {
      takeoff_alt: 10,
    });

    // console.log("API Response Data:", response.data.message);
    return response.data.message;
  } catch (error) {
    // console.error("Error:", error);
    return error.message;
  }
};

export const land = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/land", {
      data: {
        async: true,
      },
    });

    // console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Error:", error);
    return error.message;
  }
};

export const positionHold = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/position_hold");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    // console.log(error);
    return error.message;
  }
};

export const positionSetPoint = async ({
  x,
  y,
  z,
  yaw,
  tolerance,
  async,
  relative,
  yaw_valid,
  body_frame,
}) => {
  try {
    const response = await customAxios.post(
      "https://dev.flytbase.com/ros/flytos/navigation/position_set",
      { x, y, z, yaw, tolerance, async, relative, yaw_valid, body_frame }
    );
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    // console.log(error);
    return error.message;
  }
};

export const setWayPoint = async (waypoints) => {
  try {
    const response = await customAxios.post("flytos/navigation/waypoint_set", {
      waypoints: waypoints.map((waypoint) => ({
        frame: waypoint.frame,
        command: waypoint.command,
        is_current: waypoint.is_current,
        autocontinue: waypoint.autocontinue,
        param1: waypoint.param1,
        param2: waypoint.param2,
        param3: waypoint.param3,
        param4: waypoint.param4,
        x_lat: waypoint.x_lat,
        y_long: waypoint.y_long,
        z_alt: waypoint.z_alt,
      })),
    });
    // console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    return error.message;
  }
};

export const getWayPoint = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/waypoint_get");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    // console.log(error);
    return error.message;
  }
};

export const executeWayPoints = async () => {
  try {
    const response = await customAxios.get(
      "flytos/navigation/waypoint_execute"
    );
    // console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    return error.message;
  }
};

export const clearWayPoint = async () => {
  try {
    const response = await customAxios.post(
      "ros/flytos/navigation/waypoint_clear"
    );
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    // console.log(error);
    return error.message;
  }
};

export const setCurrentWayPoint = async () => {
  try {
    const response = await customAxios.post(
      "flytos/navigation/waypoint_set_current",
      {
        wp_seq: 1,
      }
    );
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    // console.log(error);
    return error.message;
  }
};

export const setRTL = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/rtl");
    // console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    return error.message;
  }
};
