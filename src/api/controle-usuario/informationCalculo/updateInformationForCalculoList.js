/* import { axios_controleUsuario } from "../Api_axios";
import { samirControle } from '../../../global'  */
import axios from "axios";

export async function updateInformationForCalculoList(body){
    try {
        console.log("body: ", body)
        
        const res = await axios.patch('http://10.191.8.198:3015/informationsForCalcule/update', [body], {
            headers: {
              Authorization: "bearer "+localStorage.getItem('authToken'),
            },
          })
        console.log("update:", res)
        if (!res.data) {
            return Promise.reject(new Error("erro ao fazer o update das informações para calculo"));
        } else {
            return Promise.resolve();
        }

    } catch (err) {
        return Promise.reject(err);
    }
}