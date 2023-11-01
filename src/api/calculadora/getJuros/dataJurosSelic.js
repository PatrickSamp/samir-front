import { axios_calculadora } from "../Api_axios_calculadora";

export async function getDataMaisAtualParaCampoAtualizarAte(){
    try {
        const res = await axios_calculadora.get("/juros");
        if (!res.data) {
            return Promise.reject(new Error("Erro ao buscar as datas selic para verificaçao"));
        } else {
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}