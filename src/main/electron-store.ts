import Store from "electron-store";

interface SettingsSchema {
    windowBounds?: { width: number; height: number };  // 창 크기 저장
}

const store = new Store<SettingsSchema>();

export function getSetting<T extends keyof SettingsSchema>(key: T): SettingsSchema[T] | undefined {
    return store.get(key);
}

export function setSetting<T extends keyof SettingsSchema>(key: T, value: SettingsSchema[T]): void {
    store.set(key, value);
}

export function deleteSetting<T extends keyof SettingsSchema>(key: T): void {
    store.delete(key);
}

export default store;
