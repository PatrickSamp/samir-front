import axios from "axios";
import { samirControle  } from "../../global";

export const axios_controleUsuario = axios.create({
    baseURL: samirControle,
    headers: {
        'authorization': `bearer ${localStorage.getItem("authToken")}`
    }
    
})
axios_controleUsuario.interceptors.response.use(response => {
    return response
}, err => {
    return (async(resolve, reject) =>{
        const originalReq = await err 
        if (originalReq.response.status === 401 && err.config && !err.config._retry && localStorage.getItem("authRefreshToken") != null && localStorage.getItem("authRefreshToken") != "") {
            let refreshToken = localStorage.getItem("authRefreshToken");
            originalReq._retry == true;
            let res = await axios_controleUsuario.post("auth", {
                refreshToken: refreshToken
            }).then(async res => {
                localStorage.setItem("authToken", res.data.token);
                localStorage.setItem("authRefreshToken", res.data.refreshToken);

                originalReq.config.headers['authorization'] = await `Bearer ${res.data.token}`

                return await axios(originalReq.config).then((response) => {
                    return response;
                }).catch(err => {
                    return err;
                });
            }).catch(err => {
                reject(err);
            })
            resolve(res);
        } else if ((originalReq.response.status === 401 && err.config && err.config._retry)) {
            localStorage.setItem("authToken", "");
            localStorage.setItem("authRefreshToken", "");
        } else {
            reject(err)
        }
    })
})