'use client'

import React, { useState } from 'react';
import Terminal from '@/components/Terminal';
import { performInspection } from '@/lib/api';

const HomePage = () => {
  const [logs, setLogs] = useState([]);
  const [isInspecting, setIsInspecting] = useState(false);

  const position = [{
  "frame": 1,
  "command": 16,
  "is_current": true,
  "autocontinue": true,
  "param1": 1.5,
  "param2": 2.5,
  "param3": 3.5,
  "param4": 4.5,
  "x_lat": 38.9037,
  "y_long": -77.0374,
  "z_alt": 200
},
{
  "frame": 1,
  "command": 16,
  "is_current": true,
  "autocontinue": true,
  "param1": 1.5,
  "param2": 2.5,
  "param3": 3.5,
  "param4": 4.5,
  "x_lat": 38.9037,
  "y_long": -77.0374,
  "z_alt": 200
}]

  const startInspection = async () => {
    setIsInspecting(true);
    setLogs([]);
    try {
      await performInspection(position, (log) => {
        setLogs((prevLogs) => [...prevLogs, log]);
      });
      setLogs((prevLogs) => [...prevLogs, 'Inspection completed successfully']);
    } catch (error) {
      setLogs((prevLogs) => [...prevLogs, `Error: ${error}`]);
    } finally {
      setIsInspecting(false);
    }
  };

  return (
    <div>
      {/* Your other components */}
      <button
        onClick={startInspection}
        disabled={isInspecting}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${isInspecting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isInspecting ? 'Performing Inspection...' : 'Start Inspection'}
      </button>

      <Terminal logs={logs} />
    </div>
  );
};

export default HomePage;
