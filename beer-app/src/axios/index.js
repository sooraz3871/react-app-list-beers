import axios from 'axios';


const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BEER_BASE_URL,
});

export default axiosClient;