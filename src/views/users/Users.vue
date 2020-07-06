<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div class="bmb">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
  </div>

  <el-table 
      border
      :data="userdata"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
       >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色"
        width="">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="状态"
       >
       <template slot-scope="scope">
         <el-switch
        v-model="scope.row.mg_state"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change = 'dos'>
        </el-switch>
      </template>
     

      </el-table-column>
      <el-table-column
        prop="create_time"
        label="操作"
        >
        
        <el-row :gutter="4">
            <el-col :span="8">
                 <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                      <el-button type="primary" icon="el-icon-edit"></el-button>  
                </el-tooltip>
               
            </el-col>
           
            <el-col :span="8">
                <el-tooltip class="item" effect="dark" content=" 删除" placement="top">
                    <el-button type="danger" icon="el-icon-delete"></el-button>
                </el-tooltip>
                
            </el-col>
             <el-col :span="8">
                  <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                       <el-button type="warning" icon="el-icon-setting"></el-button>
                </el-tooltip>
                
            </el-col>
            
            
        </el-row>
     
      </el-table-column>
    </el-table>
<div class="block"> 
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</el-card>

</template>

<script>
// @ is an alias to /src

import {getUser} from 'network/api'

export default {
  name: 'Users',
  components: {

  },
  data() {
    return {
      isCollapse:false,
      menulist:[],
      userdata: [],
        total:0,
        pagenum:1,
        pagesize:2
    }
  },
  methods: {
    async getUsers(){
      const data = await getUser({
      pagenum:this.pagenum,
      pagesize:this.pagesize
    })
    if(data.meta.status!==200){
        return
    }
    const {total,pagenum,users} = data.data
    this.userdata = users
    this.total = total
    this.pagenum = pagenum
     console.log(data); 
     return data

    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = +val
        this.getUsers()

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum =+val
        this.getUsers()
      },
      dos(){
          console.log(11);
          
      }
  },

  created(){
     this.getUsers()
  }
}
</script>
<style lang="less" >
.bmb{
    margin-bottom: 12px;
}
 .el-button{
     padding: 6px 10px;
 }
//  .el-button+.el-button {
//     margin-left: 4px;
// }
</style>