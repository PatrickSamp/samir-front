import { axios_calculadora } from "../Api_axios_calculadora";


export async function getBeneficios(){
    try {
        const res = await axios_calculadora.get("/beneficio/listar");
        console.log("getBeneficios")
        console.log(res)
        if (!res.data) {
            return Promise.reject(new Error("erro ao pegar os beneficios"));
        } else {
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}