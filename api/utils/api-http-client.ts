import { getStorageItem } from "@/lib/storage";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const MOBILE_API_BASE_URL = process.env.EXPO_PUBLIC_API_MOBILE_BASE_URL;

export async function get(endpoint: string) {
    try {
        const token = await getStorageItem("token");

        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await res.json();

        return responseData;
    } catch (err) {
        console.error("Error fetching data: ", err);
        throw err;
    }
}
export async function post(endpoint: string, data: {}) {
    try {
        const token = await getStorageItem("token");
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const responseData = await res.json();
        return responseData;
    } catch (err) {
        console.error("Error posting data:", err);
        throw err;
    }
}

export async function getMobile(endpoint: string) {
    try {
        const token = await getStorageItem("token");

        const res = await fetch(`${MOBILE_API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await res.json();

        return responseData;
    } catch (err) {
        console.error("Error fetching data: ", err);
        throw err;
    }
}

export async function postMobile(endpoint: string, data: {}) {
    try {
        const token = await getStorageItem("token");
        const res = await fetch(`${MOBILE_API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const responseData = await res.json();
        return responseData;
    } catch (err) {
        console.error("Error posting data:", err);
        throw err;
    }
}
