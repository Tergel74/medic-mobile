import * as SecureStore from "expo-secure-store";

export async function setStorageItem(key: string, value?: string | null) {
    if (value) {
        await SecureStore.setItemAsync(key, value);
    } else {
        await SecureStore.deleteItemAsync(key);
    }
}

export async function getStorageItem(key: string) {
    const value = await SecureStore.getItem(key);

    if (value) {
        return value;
    } else {
        throw new Error(`No value stored in ${key}!`);
    }
}
