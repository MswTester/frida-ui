import * as frida from "frida";
import { readFileSync } from "fs";
import path from "path";
import { mainWindow } from "./main";
import {Observable} from "./utils/observable";

const log = (...args: any[]) => mainWindow?.webContents.send("log", ...args);
const emit = (event: string, ...args: any[]) => mainWindow?.webContents.send(event, ...args);

const agentPath = path.join(__dirname, "../public", "agent.js");

let device: Observable<frida.Device | null> = new Observable(null);
let session: Observable<frida.Session | null> = new Observable(null);
let agent: Observable<frida.Script | null> = new Observable(null);

// 실행 중인 프로세스 목록 가져오기
export async function getProcessList(): Promise<[string, number][]> {
    try {
        if (!device.value) device.value = await frida.getUsbDevice();
        const processes = await device.value.enumerateProcesses();
        log(`[*] Loaded ${processes.length} processes.`);
        return processes.map((process) => [process.name, process.pid])
    } catch (error) {
        log(`[*] Failed to load process list: ${error}`);
        return [];
    }
}

// 설치된 패키지 목록 가져오기
export async function getInstalledPackages(): Promise<[string, string][]> {
    try {
        if (!device.value) device.value = await frida.getUsbDevice();
        const packages = await device.value.enumerateApplications();
        log(`[*] Loaded ${packages.length} installed packages.`);
        return packages.map((pkg) => [pkg.identifier, pkg.name])
    } catch (error) {
        log(`[*] Failed to load installed packages: ${error}`);
        return [];
    }
}

// 실행 중인 프로세스에 Attach
export async function attachProcess(pid: number): Promise<void> {
    try {
        if (!device.value) device.value = await frida.getUsbDevice();
        session.value = await device.value.attach(pid);
        agent.value = await session.value.createScript(readFileSync(agentPath, "utf8"));
        await agent.value.load();
        emit("attach", pid);
        session.value.detached.connect(() => {
            session.value = null;
            agent.value = null;
            emit("detach", pid);
            log(`[*] Detached from ${pid}`);
        })
        log(`[*] Attached to ${pid}`);
    } catch (error) {
        log(`[*] Failed to attach to ${pid}: ${error}`);
    }
}

// 설치된 패키지 앱을 Spawn 후 후킹
export async function spawnProcess(packageName: string): Promise<void> {
    try {
        if (!device.value) device.value = await frida.getUsbDevice();
        const pid = await device.value.spawn(packageName);
        session.value = await device.value.attach(pid);
        agent.value = await session.value.createScript(readFileSync(agentPath, "utf8"));
        await agent.value.load();
        await device.value.resume(pid);
        emit("attach", pid);
        session.value.detached.connect(() => {
            session.value = null;
            agent.value = null;
            emit("detach", pid);
            log(`[*] Detached from ${packageName}`);
        })
        log(`[*] Spawned ${packageName} with pid ${pid}`);
    } catch (error) {
        log(`[*] Failed to spawn ${packageName}: ${error}`);
    }
}

// 프로세스 Detach
export async function detachProcess(): Promise<void> {
    try {
        if (session.value) {
            await session.value.detach();
            session.value = null;
            agent.value = null;
        } else {
            log(`[*] No session to detach.`);
        }
    } catch (error) {
        log(`[*] Failed to detach: ${error}`);
    }
}