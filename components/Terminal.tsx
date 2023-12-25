import React, { useRef, useEffect } from "react";

const Terminal = ({ logs }) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-black text-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Inspection Logs</h2>

      <div
        ref={terminalRef}
        className="h-96 overflow-y-auto border border-gray-600 p-4 bg-gray-900"
      >
        {logs.map((log, index) => (
          <div key={index} className="mb-2">
            {JSON.stringify(log)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
