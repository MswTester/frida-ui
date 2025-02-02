import { ipcMain } from "electron";
import * as frida from "frida";
import { readFileSync } from "fs";
import path from "path";

const log = (...args: any[]) => ipcMain.emit("log", args);

const agentPath = path.join(__dirname, "../public", "agent.js");

let device: frida.Device | null = null;
let session: frida.Session | null = null;

// 실행 중인 프로세스 목록 가져오기
export async function getProcessList(): Promise<[string, [string, number][]]> {
    try {
        if (!device) device = await frida.getUsbDevice();
        const processes = await device.enumerateProcesses();
        return ["[*] Successfully loaded process list.",
            processes.map((process) => [process.name, process.pid])
        ];
    } catch (error) {
        return ["[*] Failed to load process list.", []];
    }
}

// 설치된 패키지 목록 가져오기
export async function getInstalledPackages(): Promise<[string, [string, string][]]> {
    try {
        if (!device) device = await frida.getUsbDevice();
        const packages = await device.enumerateApplications();
        return ["[*] Successfully loaded installed packages.",
            packages.map((pkg) => [pkg.identifier, pkg.name])
        ];
    } catch (error) {
        return ["[*] Failed to load installed packages.", []];
    }
}

// 실행 중인 프로세스에 Attach
export async function attachProcess(pid: number): Promise<[string]> {
    try {
        if (!device) device = await frida.getUsbDevice();
        session = await device.attach(pid);
        const agent = await session.createScript(readFileSync(agentPath, "utf8"));
        await agent.load();
        session?.detached.connect(() => {
            session = null;
            return [`[*] Detached from ${pid}`]
        })
        return [`[*] Attached to ${pid}`]
    } catch (error) {
        return [`[*] Failed to attach to ${pid}: ${error}`]
    }
}

// 설치된 패키지 앱을 Spawn 후 후킹
export async function spawnProcess(packageName: string): Promise<[string]> {
    try {
        if (!device) device = await frida.getUsbDevice();
        const pid = await device.spawn(packageName);
        session = await device.attach(pid);
        const agent = await session.createScript(readFileSync(agentPath, "utf8"));
        await agent.load();
        await device.resume(pid);
        session?.detached.connect(() => {
            session = null;
            return [`[*] Detached from ${packageName}`]
        })
        return [`[*] Spawned ${packageName} with pid ${pid}`];
    } catch (error) {
        return [`[*] Failed to spawn ${packageName}: ${error}`];
    }
}
