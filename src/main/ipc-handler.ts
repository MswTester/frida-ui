import { ipcMain } from "electron";
import { agent, attachProcess, detachProcess, evaluate, getInstalledPackages, getProcessList, killProcess, spawnProcess } from "./frida";

ipcMain.handle("eval", async (_event, code:string) => {
    return await evaluate(code);
});

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
ipcMain.handle("kill-process", async (_event) => {
    return await killProcess();
});

ipcMain.on("read-memory", async (_event, address, type) => {
    if (!agent.value) return null;
    return agent.value.exports.readMemory(address, type);
});
ipcMain.on("get-memory-protect", async (_event, address) => {
    if (!agent.value) return null;
    return agent.value.exports.getMemoryProtect(address);
});

ipcMain.handle("get-ranges", async (_event) => {
    if (!agent.value) return null;
    return agent.value.exports.getRanges();
});
ipcMain.handle("get-modules", async (_event) => {
    if (!agent.value) return null;
    return agent.value.exports.getModules();
});

ipcMain.handle("scan-ranges", async (_event, idxs, pattern) => {
    if (!agent.value) return null;
    return agent.value.exports.scanRanges(idxs, pattern);
});
ipcMain.handle("scan-modules", async (_event, idxs, pattern) => {
    if (!agent.value) return null;
    return agent.value.exports.scanModules(idxs, pattern);
});
ipcMain.handle("next-scan", async (_event, ptrs, pattern) => {
    if (!agent.value) return null;
    return agent.value.exports.nextScan(ptrs, pattern);
});