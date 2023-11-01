import { axios_visao } from "../visao/Api_axios_visao";

export async function VerificarUserSapiens(data){



    try{
        
       // const retorno = await axios_visao.post("http://10.191.9.2:8080/samir/login", data);
       const retorno = await axios_visao.post("http://localhost:3000/samir/login", data);
       
       const resp = (retorno.data).trim() == "Acesso negado, verifique se o CPF e a senha estão corretos!"
      
       return resp ? Promise.reject(new Error()) : Promise.resolve(resp);


        

    }catch( err ){
        return Promise.reject(err);
    }



}

