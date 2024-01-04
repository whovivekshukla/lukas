import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export let MissionWayPointExample = [
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
];

export const parseTime = (time) => {
  const InputInspectionTime = new Date(time);

  const year = InputInspectionTime.getFullYear();
  const month = String(InputInspectionTime.getMonth() + 1).padStart(2, "0");
  const day = String(InputInspectionTime.getDate()).padStart(2, "0");
  const hour = String(InputInspectionTime.getHours()).padStart(2, "0");
  const minute = String(InputInspectionTime.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export enum Status {
  Pending = "pending",
  InProgress = "inprogress",
  Completed = "completed",
}
