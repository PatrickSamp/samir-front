import { axios_controleUsuario } from "../Api_axios";

export async function salvarInformationForCalculoList(body){
    try {
        const res = await axios_controleUsuario.post("informationsForCalcule/list", body);
        console.log("body1:", body)
        if (!res.data) {
            return Promise.reject(new Error("erro ao salvar as informações para calculo"));
        } else {
            return Promise.resolve();
        }

    } catch (err) {
        return Promise.reject(err);
    }
}