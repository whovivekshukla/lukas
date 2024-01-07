import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { clerkClient, useSession } from "@clerk/nextjs";

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

export enum Status {
  Pending = "pending",
  InProgress = "inprogress",
  Completed = "completed",
}

export async function getToken() {
  const {session} = useSession();
  const sessionId = session?.id;
  const template = "Postman";
  const token = await clerkClient.sessions.getToken(sessionId, template);
  return token;
}

export function generateScheduleProperty(utcTimestamp) {
  const date = new Date(utcTimestamp);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return {
    timezone: "UTC",
    expiresAt: changedDateFormat(utcTimestamp),
    hours: [hours],
    mdays: [date.getUTCDate()],
    minutes: [minutes],
    months: [date.getUTCMonth() + 1],
    wdays: [date.getUTCDay()],
  };
}

export function changedDateFormat(inputDate) {
  const dateObject = new Date(inputDate);

  // Add 1 hour to the date
  dateObject.setUTCHours(dateObject.getUTCHours() + 1);

  const year = dateObject.getUTCFullYear();
  const month = ("0" + (dateObject.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getUTCDate()).slice(-2);
  const hours = ("0" + dateObject.getUTCHours()).slice(-2);
  const minutes = ("0" + dateObject.getUTCMinutes()).slice(-2);
  const seconds = ("0" + dateObject.getUTCSeconds()).slice(-2);

  const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

  return formattedDate;
}
