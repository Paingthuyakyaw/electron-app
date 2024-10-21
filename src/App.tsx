import React from "react";
import UseDeviceUUID from "./hook/use-device-uuid";

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

  const {uuid} = UseDeviceUUID()

  return (
    <div>
      <h1>Your Machine UUID</h1>
      <p>{uuid ? uuid : "Loading..."}</p>
      <p>Hello wolrd</p>
      {/* <Button>Button</Button> */}
    </div>
  );
};

export default App;
