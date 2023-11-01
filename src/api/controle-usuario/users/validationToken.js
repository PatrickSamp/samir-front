import { axios_controleUsuario } from "../Api_axios";

export async function validationToken(){
    try {
        const res = await axios_controleUsuario.get("users");
        if (!res.data) {
            return Promise.reject(new Error("usuario nao logado"));
        } else {
            return Promise.resolve();
        }

    } catch (err) {
        return Promise.reject(err);
    }
}