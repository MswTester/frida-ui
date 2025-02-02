declare global {
    interface Window {
        API: Record<string, Function>;
    }
}

export async function getProcessList(): Promise<[string, [string, number][]]> {
    return await window.API.getProcessList();
}
export async function getInstalledPackages(): Promise<[string, [string, string][]]> {
    return await window.API.getInstalledPackages();
}
export async function attachProcess(pid: number): Promise<[string]> {
    return await window.API.attachProcess(pid);
}
export async function spawnProcess(packageName: string): Promise<[string]> {
    return await window.API.spawnProcess(packageName);
}