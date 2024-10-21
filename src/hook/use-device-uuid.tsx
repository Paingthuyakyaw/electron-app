import { useEffect, useState } from "react";


const UseDeviceUUID = () => {
    const [uuid, setUuid] = useState<string | null>(null);

    useEffect(() => {
      const fetchUUID = async () => {
        if (window.electron) {
          const machineUUID = await window.electron.getUUID();
          setUuid(machineUUID);
        } else {
          setUuid("UUID is not available.");
        }
      };
  
      fetchUUID();
    }, []);

    return {uuid}
}

export default UseDeviceUUID
