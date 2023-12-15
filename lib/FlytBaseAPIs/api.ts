import axios from "axios";

const customAxios = () => {
  const instance = axios.create({
    baseURL: "https://dev.flytbase.com/ros/",
    headers: {
      Authorization: process.env.FLYTBASE_AUTHORIZATION,
      VehicleID: process.env.FLYTBASE_VEHICLEID,
    },
  });

  return instance;
};

const axiosInstance = customAxios();

export const getNameSpace = async () => {
  try {
    const response = await axiosInstance.get("get_global_namespace");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const accessRequest = async () => {
  try {
    const response = await axiosInstance.post(
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
    const response = await axiosInstance.get("flytos/navigation/arm");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const disarmDrone = async () => {
  try {
    const response = await axiosInstance.get("flytos/navigation/disarm");
    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const takeOff = async () => {
  try {
    const response = await axiosInstance.post("flytos/navigation/take_off", {
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
    const response = await axiosInstance.get("flytos/navigation/land");

    console.log("API Response Data:", response.data);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
