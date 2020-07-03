import {requset1} from 'network/request';
export const logins =({username,password})=>{
    return requset1({
        url:'login',
        method:'post',
        data:{ username,password} 
    }
    )  
}
