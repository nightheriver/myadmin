import {requset1} from 'network/request';
export const logins =({username,password})=>{
    return requset1({
        url:'login',
        method:'post',
        data:{ username,password} 
    }
    )  
}
// | pagenum  | 当前页码     | 不能为空 |
//| pagesize | 每页显示条数 | 不能为空 |
export const getUser =(params)=>{
    return requset1({
        url:'users',
        method:'get',
        params:params
    }
    )  
}
export const getMenus =(params)=>{
    return requset1({
        url:'menus',
        method:'get',
        params:params
    }
    )  
}
