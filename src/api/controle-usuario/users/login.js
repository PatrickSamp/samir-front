import {
    validateRequiredFields
} from "../../../util/validation/validationFields";
import {
    axios_controleUsuario
} from "../Api_axios";

export async function login(body) {
    const requiredFields = ["userName", "password"];

    try {
        await validateRequiredFields(body, requiredFields);

        const res = await axios_controleUsuario.post("users/login", body);
        if (!res.data) {
            return Promise.reject(new Error("Login invalido"));
        } else {
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("authRefreshToken", res.data.refreshToken);
            return Promise.resolve();
        }
        

    } catch (err) {
        return Promise.reject(err);
    }
}