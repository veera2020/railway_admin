import Axios from "axios";

//const site = process.env.REACT_APP_BASE_URL;
//const site = "http://192.168.1.52:8000/";
const site = "http://13.232.35.180:8080/";

const instance = Axios.create({
  baseURL: site,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
