import axios from 'axios';
export const requset1 = (config)=>{
    const newaxios = axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:6000
    })
    newaxios.interceptors.request.use(config =>{
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    })
    newaxios.interceptors.response.use(response =>{
        return response.data
    })
  return  newaxios(config)
}

