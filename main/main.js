import { execSync } from "child_process";
import { readFileSync } from "fs";
import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDeviceUUID() {
  const platform = os.platform();
  try {
    if (platform === "win32") {
      const output = execSync("wmic csproduct get UUID").toString("utf8");
      return output.split("\n")[1].trim();
    } else if (platform === "darwin") {
      const output = execSync("ioreg -rd1 -c IOPlatformExpertDevice").toString(
        "utf8"
      );
      const match = output.match(/UUID" = "([^"]+)"/);
      if (match) {
        return match[1];
      }
    } else if (platform === "linux") {
      const uuid = readFileSync(
        "/sys/class/dmi/id/product_uuid",
        "utf8"
      ).trim();
      return uuid;
    } else {
      console.error("Unsupported platform:", platform);
    }
  } catch (error) {
    console.error("Error retrieving UUID:", error);
  }
  return "";
}

ipcMain.handle("get-uuid", () => {
  return getDeviceUUID();
});

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

// const url = "http://localhost:5173";

const url = "https://capella-os.vercel.app/";

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      webSecurity: true,
      sandbox: true,
    },
    title: "Capella OS",
    autoHideMenuBar: true,
    icon: path.join(__dirname, "public/capella-os-icon.png"),
  });

  win.loadURL(url);

  win.webContents.on("did-fail-load", (e, code, desc) => {
    win.webContents.reloadIgnoringCache();
  });
};

app.on("ready", () => {
  createWindow().catch((error) => {
    console.error("Error creating window:", error);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
