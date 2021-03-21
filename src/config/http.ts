import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL; //'http://192.168.29.111:3002'; //Config.API_URL; // local yapi ip and port in dev env//

// request interceptor
axios.interceptors.request.use((request) => {
    console.log('request intercepter', request);
    /*
    in prod, we get token from localstorage and add it to the request header
    request.headers = {
        token: localstorage.get('token'),
    }
    */
    return request;
}, (error) => {
    console.log('error message:', error);
    return Promise.reject(error);
});

// response interceptor
axios.interceptors.response.use((response) => {
    console.log('response interceptor', response);
    return response.data;
}, (error) => {
    return Promise.reject(error);
});