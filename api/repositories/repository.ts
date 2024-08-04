import { get } from "../utils/api-http-client";

export async function getDashboard() {
    try {
        const res = await get("/dashboard");

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function getHospitals() {
    try {
        const res = await get("/hospitals");

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function getServiceType() {
    try {
        const res = await get("/serviceType");

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}
