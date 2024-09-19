import { getStorageItem } from "@/lib/storage";
import axios from "axios";

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
export async function del(endpoint: string, data: {}) {
    try {
        const token = await getStorageItem("token");
        await axios.delete(`${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: data,
        });
        // await fetch(`http://192.168.1.39:5012/api/admin${endpoint}`, {
        //     method: "DELETE",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //     },
        //     body: JSON.stringify(data),
        // });

        // if (res) {
        //     const responseData = await res.json();
        //     return responseData;
        // }
    } catch (err) {
        console.error("Error posting data:", err);
        throw err;
    }
}
export async function postFormData(endpoint: string, data: {}) {
    try {
        const token = await getStorageItem("token");
        const res = await axios.post(
            // `http://192.168.1.39:5012/api/admin${endpoint}`,
            `${API_BASE_URL}${endpoint}`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res;
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
