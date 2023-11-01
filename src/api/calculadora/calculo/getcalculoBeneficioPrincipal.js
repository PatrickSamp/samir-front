import { axios_calculadora } from "../Api_axios_calculadora";

export async function getcalculoBeneficioPrincipal(informationBeneficioPrincpal){
    try {
        const res = await axios_calculadora.post("/calculo/calcular", informationBeneficioPrincpal);
        console.log("RESOSTA " + res.data)
        if (!res.data) {
            return Promise.reject(new Error("erro ao executar calculo"));
        } else {
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}