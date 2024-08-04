const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function get(endpoint: string) {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`);
        const responseData = await res.json();

        return responseData;
    } catch (err) {
        console.error("Error fetching data: ", err);
        throw err;
    }
}
export async function post(endpoint: string, data: {}) {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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