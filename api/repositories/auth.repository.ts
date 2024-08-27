import { post } from "../utils/auth-api-http-client";

export async function signIn(email: string, password: string) {
    try {
        const res = await post("/login", {
            email: email,
            password: password,
        });

        // throw error from backend and correct the message

        if (!res.error) {
            return res;
        } else {
            throw new Error(res.error);
        }
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}
