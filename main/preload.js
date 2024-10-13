const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getUUID: () => ipcRenderer.invoke("get-uuid"),
});
