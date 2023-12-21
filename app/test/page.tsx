"use client";

import { useState, useEffect } from "react";
import {
  armDrone,
  takeOff,
  setWayPoint,
  executeWayPoints,
  setRTL,
} from "@/lib/FlytBaseAPIs/api";

const Home = () => {
  const position = [
    {
      frame: 0,
      command: 16,
      is_current: true,
      autocontinue: false,
      param1: 1.5,
      param2: 2.0,
      param3: 3.0,
      param4: 4.5,
      x_lat: 37.7749,
      y_long: -122.4194,
      z_alt: 100.0,
    },
    {
      frame: 1,
      command: 18,
      is_current: true,
      autocontinue: true,
      param1: 2.0,
      param2: 3.5,
      param3: 1.0,
      param4: 4.0,
      x_lat: 40.7128,
      y_long: -74.006,
      z_alt: 150.0,
    },
    {
      frame: 2,
      command: 20,
      is_current: true,
      autocontinue: true,
      param1: 3.0,
      param2: 1.0,
      param3: 2.5,
      param4: 4.0,
      x_lat: 34.0522,
      y_long: -118.2437,
      z_alt: 200.0,
    },
  ];
  const [terminalOutput, setTerminalOutput] = useState([]);

  const appendToTerminal = (message) => {
    setTerminalOutput((prevOutput) => [...prevOutput, message]);
  };

  const performInspection = async () => {
    try {
      appendToTerminal("Arming drone...");
      const armResponse = await armDrone();
      appendToTerminal(armResponse);

      appendToTerminal("Taking off...");
      const takeOffResponse = await takeOff();
      appendToTerminal(takeOffResponse);

      appendToTerminal("Setting waypoints...");
      appendToTerminal(await setWayPoint(position));

      appendToTerminal("Executing waypoints...");
      appendToTerminal(await executeWayPoints());

      appendToTerminal("Setting RTL...");
      appendToTerminal(await setRTL());

      // ... Continue with other API calls
    } catch (error) {
      const errorMessage = `Error during inspection: ${error.message}`;
      console.error(errorMessage);
      appendToTerminal(errorMessage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await performInspection();
      // Any other synchronous logic after the asynchronous operations
    };

    fetchData();
  }, []); // Run once after initial render

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="h-full bg-gray-900 p-4 rounded-lg overflow-y-auto">
        {terminalOutput.map((line, index) => (
          <div key={index} className="text-green-400">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
