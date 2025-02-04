import { app, BrowserWindow } from "electron";
import path from "path";
import "./ipc-handler";

export let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        },
        icon: path.join(__dirname, "../public/favicon.ico"),
        autoHideMenuBar: true,
        titleBarOverlay: false
    });
    mainWindow.loadFile(path.join(__dirname, "../public/index.html"));
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};

app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
