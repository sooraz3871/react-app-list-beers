import axios from 'axios';


const axiosClient = axios.create({
  baseURL: "https://api.punkapi.com/v2",
//   baseURL: process.env.REACT_APP_BEER_BASE_URL,
});

export default axiosClient;