import { axios_controleUsuario } from "../Api_axios";

export async function cadastraUsuario(body) {
    try {
        
        const res =  await axios_controleUsuario.post("users", body);
        if (!res.data) {
            return Promise.reject(new Error("Usuario invalido apara cadastro"));
        } else {
            return Promise.resolve();
        }

    } catch (err) {
        return Promise.reject(err);
    }
}