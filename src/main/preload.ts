import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("API", {
    on: (channel: string, listener: (_e:any, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
    getProcessList: () => ipcRenderer.invoke("get-process-list"),
    getInstalledPackages: () => ipcRenderer.invoke("get-installed-packages"),
    attachProcess: (pid: number) => ipcRenderer.invoke("attach-process", pid),
    spawnProcess: (packageName: string) => ipcRenderer.invoke("spawn-process", packageName),
    detachProcess: () => ipcRenderer.invoke("detach-process"),
});
