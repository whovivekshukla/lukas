import axios from "axios";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: "https://dev.flytbase.com/ros/",
    headers: {
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
    console.error("Error:", error);
  }
};

export const armDrone = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/arm");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const disarmDrone = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/disarm");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const takeOff = async () => {
  try {
    const response = await customAxios.post("flytos/navigation/take_off", {
      takeoff_alt: 50,
    });

    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const land = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/land", {
      data: {
        async: true,
      },
    });

    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const positionHold = async () => {
  try {
    const response = await customAxios.get("flytos/navigation/position_hold");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};
