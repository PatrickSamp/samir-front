import axios from "axios";
import { baseApiUrl  } from "../../global";

export const axios_calculadora = axios.create({
    baseURL: baseApiUrl,
})

