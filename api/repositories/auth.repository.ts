import { post } from "../utils/auth-api-http-client";

export async function signIn(email: string, password: string) {
    try {
        const res = await post("/login", {
            email: email,
            password: password,
        });
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}
