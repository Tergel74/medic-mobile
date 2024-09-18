import { get, getMobile, post, postFormData } from "../utils/api-http-client";

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

export async function getDoctors(hospitalId: number) {
    try {
        const res = await get(
            `/systemusers?role=Эмч&status=Идэвхитэй&hospital=${hospitalId}`
        );

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function getCeItems() {
    try {
        const res = await get("/ceitems");

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function getDeviceModels(
    hospitalId: number,
    serviceTypeId: number
) {
    try {
        const res = await getMobile(
            `/devices?hospital=${hospitalId}&servicetypeid=${serviceTypeId}`
        );

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function getAnalysis(
    startDate: string,
    endDate: string,
    serviceType: number,
    technicianId: number,
    hospitalId: number
) {
    try {
        const res = await get(
            `/customerbooking?offset=0&limit=200&startdate=${startDate}&enddate=${endDate}&servicetype=${serviceType}&status=-1&technician=${technicianId}&hospital=${hospitalId}&searchText=`
        );

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function getBooking(
    startDate: string,
    endDate: string,
    serviceType: number,
    hospitalId: number
) {
    try {
        const res = await get(
            `/prebooking?startdate=${startDate}&enddate=${endDate}&servicetype=${serviceType}&status=-1&hospital=${hospitalId}`
        );

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function postImage(analysisId: string, formData: any) {
    try {
        const res = await postFormData(
            `/booking/image/${analysisId}`,
            formData
        );

        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}
