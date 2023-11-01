import axios from "axios";
import { apiSapiens  } from "../../global";

export const axios_visao = axios.create({
    baseURL: apiSapiens,
})

