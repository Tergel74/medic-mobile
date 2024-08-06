import { get, getMobile } from "../utils/api-http-client";

export async function getDashboard(
    date: string,
    serviceType: string,
    hospitalId: number
) {
    try {
        const formatedDate = date.slice(0, -2) + "01";
        const res = await getMobile(
            `/dashboard?date=${formatedDate}&servicetype=${serviceType}&hospital=${hospitalId}`
        );

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
