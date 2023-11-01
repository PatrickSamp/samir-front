import { axios_visao } from "../visao/Api_axios_visao";

export async function ValidationTokenSapiens(){

    let body = {
        cpf: `${localStorage.getItem("sapiensCPF")}`,
        senha: `${localStorage.getItem("sapiensSenha")}`
      };

    try{

        //const res = await axios_visao.post("http://10.191.9.2:8080/samir/login",body);
        
        const res = await axios_visao.post("http://localhost:3000/samir/login",body);
            console.log("RRRRRRRRRRRERADSSHBJFDESAFG " +(res.data))
        if ((res.data).trim()=="Acesso negado, verifique se o CPF e a senha est�o corretos!") {
            return Promise.reject(new Error("usuario nao logado"));
        } else {
            return Promise.resolve();
        }

    } catch (err) {
        return Promise.reject(err);
    }


}

