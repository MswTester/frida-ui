declare global {
    interface Window {
        API: Record<string, Function>;
    }
}

export async function getProcessList(): Promise<[string, number][]> {
    return await window.API.getProcessList();
}
export async function getInstalledPackages(): Promise<[string, string][]> {
    return await window.API.getInstalledPackages();
}
export async function attachProcess(pid: number): Promise<void> {
    return await window.API.attachProcess(pid);
}
export async function spawnProcess(packageName: string): Promise<void> {
    return await window.API.spawnProcess(packageName);
}
export async function detachProcess(): Promise<void> {
    return await window.API.detachProcess();
}