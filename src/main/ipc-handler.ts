import { ipcMain } from "electron";
import { attachProcess, detachProcess, getInstalledPackages, getProcessList, spawnProcess } from "./frida";

ipcMain.handle("get-process-list", async (_event) => {
    return await getProcessList();
});
ipcMain.handle("get-installed-packages", async (_event) => {
    return await getInstalledPackages();
});
ipcMain.handle("attach-process", async (_event, pid) => {
    return await attachProcess(pid);
});
ipcMain.handle("spawn-process", async (_event, packageName) => {
    return await spawnProcess(packageName);
});
ipcMain.handle("detach-process", async (_event) => {
    return await detachProcess();
});