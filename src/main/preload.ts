import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("API", {
    on: (channel: string, listener: (_e:any, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
    eval: (code: string) => ipcRenderer.invoke("eval", code),

    getProcessList: () => ipcRenderer.invoke("get-process-list"),
    getInstalledPackages: () => ipcRenderer.invoke("get-installed-packages"),
    attachProcess: (pid: number) => ipcRenderer.invoke("attach-process", pid),
    spawnProcess: (packageName: string) => ipcRenderer.invoke("spawn-process", packageName),
    detachProcess: () => ipcRenderer.invoke("detach-process"),
    killProcess: () => ipcRenderer.invoke("kill-process"),

    readMemory: (address: string, type: number) => ipcRenderer.invoke("read-memory", address, type),
    getMemoryProtect: (address: string) => ipcRenderer.invoke("get-memory-protect", address),

    getRanges: () => ipcRenderer.invoke("get-ranges"),
    getModules: () => ipcRenderer.invoke("get-modules"),

    scanRanges: (idxs: number[], pattern: string) => ipcRenderer.invoke("scan-ranges", idxs, pattern),
    scanModules: (idxs: number[], pattern: string) => ipcRenderer.invoke("scan-modules", idxs, pattern),
    nextScan: (ptrs: string[], pattern: string) => ipcRenderer.invoke("next-scan", ptrs, pattern),
});
