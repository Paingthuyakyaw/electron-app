import React, { useEffect, useState } from "react";

// Define a custom interface for the Electron API
interface ElectronAPI {
  getUUID: () => Promise<string>;
}

// Extend the Window interface to include the ElectronAPI
declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

const App: React.FC = () => {
  const [uuid, setUuid] = useState<string | null>(null);

  useEffect(() => {
    const fetchUUID = async () => {

      if (window.electron) {
        const machineUUID = await window.electron.getUUID();        
        setUuid(machineUUID);
      } else {
        setUuid("Electron is not available.");
      }
    };

    fetchUUID();
  }, []);

  return (
    <div>
      <h1>Your Machine UUID</h1>
      <p>{uuid ? uuid : "Loading..."}</p>
      <p>Hello wolrd</p>
    </div>
  );
};

export default App;
