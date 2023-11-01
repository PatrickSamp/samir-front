import { axios_controleUsuario } from "../Api_axios";

export async function getInformationsForCalcule(){
    try {
        const res = await axios_controleUsuario.get("informationsForCalcule");
        localStorage.getItem('sapiensCPF')
        localStorage.getItem('sapiensSenha')
        console.log("res: ", res)
        if (!res.data) {
            return Promise.reject(new Error("erro ao salvar as informações para calculo"));
        } else {
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}