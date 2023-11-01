import { axios_calculadora } from "../../calculadora/Api_axios_calculadora"

export async function AtualizarTaxaSelic(body){
    try {
        console.log("CHEGOU O BODY "+ JSON.stringify(body))
        const res = await axios_calculadora.post("/juros", body);
        console.log("RESULTADO " + JSON.stringify(res))
        if (!res.data) {
            return Promise.reject(new Error("erro ao atualizar a taxa"));
        } else {
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}