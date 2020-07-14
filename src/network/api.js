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

// ### 1.3.7. 分配用户角色

// - 请求路径：users/:id/role
// - 请求方法：put
// - 请求参数

// | 参数名 | 参数说明 | 备注                       |
// | ------ | -------- | -------------------------- |
// | id     | 用户 ID  | 不能为空`参数是url参数:id` |
// | rid    | 角色 id  | 不能为空`参数body参数`     |
export const allotRoles =(id,rid)=>{
    return requset1({
        url:`users/${id}/role`,
        method:'put',
        data:{
            rid
        }
    }
    )  
}
// ### 1.5.1. 角色列表
// - 请求路径：roles
// - 请求方法：get
export const getRoles =()=>{
    return requset1({
        url:`roles`,
        method:'get',
    }
    )  
}
// ### 1.5.7. 删除角色指定权限

// - 请求路径：roles/:roleId/rights/:rightId

// - 请求方法：delete

// - 请求参数

//   | 参数名   | 参数说明 | 备注                  |
//   | -------- | -------- | --------------------- |
//   | :roleId  | 角色 ID  | 不能为空`携带在url中` |
//   | :rightId | 权限 ID  | 不能为空`携带在url中` |
export const deleRoles =(roleId,rightId)=>{
    return requset1({
        url:`roles/${roleId}/rights/${rightId}`,
        method:'delete',
    }
    )  
}
// ### 1.4.1. 所有权限列表

// - 请求路径：rights/:type
// - 请求方法：get
// - 请求参数

// | 参数名 | 参数说明 | 备注                                                         |
// | ------ | -------- | ------------------------------------------------------------ |
// | type   | 类型     | 值 list 或 tree , list 列表显示权限, tree 树状显示权限,`参数是url参数:type` |
export const getRight =(type)=>{
    return requset1({
        url:`rights/${type}`,
        method:'get',
    }
    )  
}
// ### 1.5.6. 角色授权

// - 请求路径：roles/:roleId/rights
// - 请求方法：post
// - 请求参数：通过 `请求体` 发送给后端

// | 参数名  | 参数说明               | 备注                                                         |
// | ------- | ---------------------- | ------------------------------------------------------------ |
// | :roleId | 角色 ID                | 不能为空`携带在url中`                                        |
// | rids    | 权限 ID 列表（字符串） | 以 `,` 分割的权限 ID 列表（获取所有被选中、叶子节点的key和半选中节点的key, 包括 1，2，3级节点） |
export const allotrights =(roleId,rids)=>{
    return requset1({
        url:`roles/${roleId}/rights`,
        method:'post',
        data:{rids}
    }
    )  
}
// ### 1.5.5. 删除角色

// - 请求路径：roles/:id
// - 请求方法：delete
// - 请求参数

// | 参数名 | 参数说明 | 备注                  |
// | ------ | -------- | --------------------- |
// | :id    | 角色 ID  | 不能为空`携带在url中` |
export const deleteroles =(id)=>{
    return requset1({
        url:`roles/${id}`,
        method:'delete'
    }
    )  
}

// ### 1.5.2. 添加角色

// - 请求路径：roles
// - 请求方法：post
// - 请求参数

// | 参数名   | 参数说明 | 备注     |
// | -------- | -------- | -------- |
// | roleName | 角色名称 | 不能为空 |
// | roleDesc | 角色描述 | 可以为空 |
export const addroles =(roleName,roleDesc)=>{
    return requset1({
        url:`roles`,
        method:'post',
        data:{roleName,roleDesc}
    }
    )  
}

// ### 1.5.4. 编辑提交角色

// - 请求路径：roles/:id
// - 请求方法：put
// - 请求参数

// | 参数名   | 参数说明 | 备注                  |
// | -------- | -------- | --------------------- |
// | :id      | 角色 ID  | 不能为空`携带在url中` |
// | roleName | 角色名称 | 不能为空              |
// | roleDesc | 角色描述 | 可以为空              |
export const editroles =(id, roleName,roleDesc)=>{
    return requset1({
        url:`roles/${id}`,
        method:'post',
        data:{roleName,roleDesc}
    }
    )  
}


// ### 1.6.1. 商品分类数据列表
// - 请求路径：categories
// - 请求方法：get
// - 请求参数

// | 参数名   | 参数说明           | 备注                                                         |
// | -------- | ------------------ | ------------------------------------------------------------ |
// | type     | [1,2,3]            | 值：1，2，3 分别表示显示一层二层三层分类列表<br />【可选参数】如果不传递，则默认获取所有级别的分类 |
// | pagenum  | 当前页码值         | 【可选参数】如果不传递，则默认获取所有分类                   |
// | pagesize | 每页显示多少条数据 | 【可选参数】如果不传递，则默认获取所有分类                   |
export const getcategories =(pagenum,pagesize)=>{
    return requset1({
        url:`categories`,
        method:'get',
        params:{pagenum,pagesize}
    }
    )  
}
// ### 1.6.4. 编辑提交分类

// - 请求路径：categories/:id
// - 请求方法：put
// - 请求参数

// | 参数名   | 参数说明 | 备注                             |
// | -------- | -------- | -------------------------------- |
// | :id      | 分类 ID  | 不能为空`携带在url中`            |
// | cat_name | 分类名称 | 不能为空【此参数，放到请求体中】 |

// - 响应数据
export const editcategories =(id,cat_name)=>{
    return requset1({
        url:`categories/${id}`,
        method:'put',
        data:{cat_name}
    }
    )  
}
// ### 1.6.5. 删除分类

// - 请求路径：categories/:id
// - 请求方法：delete
// - 请求参数

// | 参数名 | 参数说明 | 备注                  |
// | ------ | -------- | --------------------- |
// | :id    | 分类 ID  | 不能为空`携带在url中` |

// - 响应数据
export const deletecategories =(id)=>{
    return requset1({
        url:`categories/${id}`,
        method:'delete'
    }
    )  
}
// ### 1.6.2. 添加分类

// - 请求路径：categories
// - 请求方法：post
// - 请求参数

// | 参数名    | 参数说明  | 备注                                                        |
// | --------- | --------- | ----------------------------------------------------------- |
// | cat_pid   | 分类父 ID | 不能为空，如果要添加1级分类，则父分类Id应该设置为  `0`      |
// | cat_name  | 分类名称  | 不能为空                                                    |
// | cat_level | 分类层级  | 不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类 |
export const addcategories =(cat_pid,cat_name,cat_level)=>{
    return requset1({
        url:`categories`,
        method:'post',
        data:{cat_pid,cat_name,cat_level}
    }
    )  
}
// ### 1.7.1. 参数列表

// - 请求路径：categories/:id/attributes
// - 请求方法：get
// - 请求参数

// | 参数名 | 参数说明    | 备注                                                      |
// | ------ | ----------- | --------------------------------------------------------- |
// | :id    | 分类 ID     | 不能为空`携带在url中`                                     |
// | sel    | [only,many] | 不能为空,通过 only 或 many 来获取分类静态参数还是动态参数 |
export const getcatparams =(id,sel)=>{
    return requset1({
        url:`categories/${id}/attributes`,
        method:'get',
        params:{
            sel
        }
    }
    )  
}
// ### 1.7.5. 编辑提交参数

// - 请求路径：categories/:id/attributes/:attrId
// - 请求方法：put
// - 请求参数

// | 参数名    | 参数说明               | 备注                       |
// | --------- | ---------------------- | -------------------------- |
// | :id       | 分类 ID                | 不能为空`携带在url中`      |
// | :attrId   | 属性 ID                | 不能为空`携带在url中`      |
// | attr_name | 新属性的名字           | 不能为空，携带在`请求体`中 |
// | attr_sel  | 属性的类型[many或only] | 不能为空，携带在`请求体`中 |
// | attr_vals | 参数的属性值           | 可选参数，携带在`请求体`中 |
export const editcatparams =({id,attrId,attr_name,attr_sel,attr_vals})=>{
    return requset1({
        url:`categories/${id}/attributes/${attrId}`,
        method:'put',
        data:{
            attr_name,attr_sel,attr_vals
        }
    }
    )  
}
export const editparams =({id,attrId,attr_name,attr_sel})=>{
    return requset1({
        url:`categories/${id}/attributes/${attrId}`,
        method:'put',
        data:{
            attr_name,attr_sel
        }
    }
    )  
}
// ### 1.7.2. 添加动态参数或者静态属性

// - 请求路径：categories/:id/attributes
// - 请求方法：post
// - 请求参数

// | 参数名    | 参数说明                                   | 备注                  |
// | --------- | ------------------------------------------ | --------------------- |
// | :id       | 分类 ID                                    | 不能为空`携带在url中` |
// | attr_name | 参数名称                                   | 不能为空              |
// | attr_sel  | [only,many]                                | 不能为空              |
// | attr_vals | 如果是 many 就需要填写值的选项，以逗号分隔 | 【可选参数】          |

export const addcatparams =({id,attr_name,attr_sel})=>{
    return requset1({
        url:`categories/${id}/attributes`,
        method:'post',
        data:{
            attr_name,attr_sel
        }
    }
    )  
}

// ### 1.7.3. 删除参数

// - 请求路径： categories/:id/attributes/:attrid
// - 请求方法：delete
// - 请求参数

// | 参数名  | 参数说明 | 备注                  |
// | ------- | -------- | --------------------- |
// | :id     | 分类 ID  | 不能为空`携带在url中` |
// | :attrid | 参数 ID  | 不能为空`携带在url中` |
export const deletcatparams =(id,attrid)=>{
    return requset1({
        url:`categories/${id}/attributes/${attrid}`,
        method:'delete'
    }
    )  
}
// ### 1.8.1. 商品列表数据

// - 请求路径：goods
// - 请求方法：get
// - 请求参数

// | 参数名   | 参数说明     | 备注     |
// | -------- | ------------ | -------- |
// | query    | 查询参数     | 可以为空 |
// | pagenum  | 当前页码     | 不能为空 |
// | pagesize | 每页显示条数 | 不能为空 |
export const getgoodslist =({pagenum,pagesize,query})=>{
    return requset1({
        url:`goods`,
        method:'get',
        params:{
            pagenum,pagesize,query
        }
    }
    )  
}

// ### 1.8.3. 根据 ID 查询商品

// - 请求路径：goods/:id
// - 请求方法：get
// - 请求参数

// | 参数名 | 参数说明 | 备注                  |
// | ------ | -------- | --------------------- |
// | id     | 商品 ID  | 不能为空`携带在url中` |

export const getagoods =(id)=>{
    return requset1({
        url:`goods/${id}`,
        method:'get'
    }
    )  
}

// ### 1.8.2. 添加商品

// - 请求路径：goods
// - 请求方法：post
// - 请求参数

// | 参数名          | 参数说明                                          | 备注     |
// | --------------- | ------------------------------------------------- | -------- |
// | goods_name      | 商品名称                                          | 不能为空 |
// | goods_cat       | 以为','分割的分类列表                             | 不能为空 |
// | goods_price     | 价格                                              | 不能为空 |
// | goods_number    | 数量                                              | 不能为空 |
// | goods_weight    | 重量                                              | 不能为空 |
// | goods_introduce | 介绍                                              | 可以为空 |
// | pics            | 上传的图片临时路径（对象）                        | 可以为空 |
// | attrs           | 商品的参数（数组），包含 `动态参数` 和 `静态属性` | 可以为空 |
export const addgoods =({goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs})=>{
    return requset1({
        url:`goods`,
        method:'post',
        data:{
            goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs
        }
    }
    )  
}
// ### 1.8.4. 编辑提交商品

// - 请求路径：goods/:id
// - 请求方法：put
// - 请求参数

// | 参数名          | 参数说明                   | 备注                  |
// | --------------- | -------------------------- | --------------------- |
// | id              | 商品 ID                    | 不能为空`携带在url中` |
// | goods_name      | 商品名称                   | 不能为空              |
// | goods_price     | 价格                       | 不能为空              |
// | goods_number    | 数量                       | 不能为空              |
// | goods_weight    | 重量                       | 不能为空              |
// | goods_introduce | 介绍                       | 可以为空              |
// | pics            | 上传的图片临时路径（对象） | 可以为空              |
// | attrs           | 商品的参数（数组）         | 可以为空              |
export const editgoods =({id,goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs})=>{
    return requset1({
        url:`goods/${id}`,
        method:'put',
        data:{
            goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs
        }
    }
    )  
}
// ### 1.8.5. 删除商品

// - 请求路径：goods/:id
// - 请求方法：delete
// - 请求参数

// | 参数名 | 参数说明 | 备注                  |
// | ------ | -------- | --------------------- |
// | id     | 商品 ID  | 不能为空`携带在url中` |

export const deletgoods =(id)=>{
    return requset1({
        url:`goods/${id}`,
        method:'delete', 
    }
    )  
}

// ### 1.10.1. 订单数据列表

// - 请求路径：orders
// - 请求方法：get
// - 请求参数

// | 参数名               | 参数说明        | 备注     |
// | -------------------- | --------------- | -------- |
// | query                | 查询参数        | 可以为空 |
// | pagenum              | 当前页码        | 不能为空 |
// | pagesize             | 每页显示条数    | 不能为空 |

export const getorderslist =({pagenum,pagesize,query})=>{
    return requset1({
        url:`orders`,
        method:'get', 
        params:{
            pagenum,pagesize,query
        }
    }
    )  
}

// ### 1.10.5. 查看物流信息

// + 请求路径：/kuaidi/:id

// + 请求方法：get

// + 供测试的物流单号：1106975712662

export const getkuaidi =(id)=>{
    return requset1({
        url:`/kuaidi/${id}`,
        method:'get', 
        // params:{
        //     pagenum,pagesize,query
        // }
    }
    )  
}

// ### 1.11.1.  基于时间统计的折线图

// - 请求路径：reports/type/1

// - 请求方法：get
export const getreports =()=>{
    return requset1({
        url:`reports/type/1`,
        method:'get', 
    
    }
    )  
}