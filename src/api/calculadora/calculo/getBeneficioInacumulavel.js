import { axios_calculadora } from "../Api_axios_calculadora";

export async function getcalculoBeneficioinacumulavel(informationBeneficioPrincpal){
    try {
        const res = await axios_calculadora.post("/calculo/beneficioAcumulado", informationBeneficioPrincpal);
        if (!res.data) {
            return Promise.reject(new Error("erro ao executar calculo de beneficio inacumulavel"));
        } else {
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}