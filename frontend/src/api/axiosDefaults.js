import axios from "axios";

//axios.defaults.baseURL = "https://virtualclassapi-47c98bf9be9a.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();