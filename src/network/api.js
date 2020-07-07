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


export const adduser =(data)=>{
    return requset1({
        url:'users',
        method:'post',
        data
    }
    )  
}
//  修改用户状态

export const updateStatus =(type,id)=>{
    return requset1({
        url:`users/${id}/state/${type}`,
        method:'put',
    }
    )  
}

           
export const updateUser =(id,data)=>{
    return requset1({
        url:`users/${id}`,
        method:'put',
        data
    }
    )  
}
// ### 1.3.6. 删除单个用户

// - 请求路径：users/:id
// - 请求方法：delete
// - 请求参数

// | 参数名 | 参数说明 | 备注                       |
// | ------ | -------- | -------------------------- |
// | id     | 用户 id  | 不能为空`参数是url参数:id` |

// - 响应参数
// - 响应数据
export const deleUser =(id)=>{
    return requset1({
        url:`users/${id}`,
        method:'delete',
    }
    )  
}