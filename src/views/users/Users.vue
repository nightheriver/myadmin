<template>
<div>
  <dialogs ref="dia" :usermsgs='usermsgs' @msgs='reset'>

  </dialogs>
   <div class="bmb">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
  </div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-row>
      <el-col :span="14">
           <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="ss"></el-button>
          </el-input>
      </el-col>
       <el-col :span="4">
        <el-button type="primary"  class="btss" @click="addUser">添加用户</el-button> 
      </el-col>
    </el-row>
   
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
        prop="mg_state,id"
        label="状态"
       >
       <template slot-scope="scope">
         <el-switch
        v-model="scope.row.mg_state"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change = 'dos(scope.row.mg_state,scope.row.id)'>
        </el-switch>
      </template>
     

      </el-table-column>
      <el-table-column
        prop="id"
        label="操作"
        >
         <template slot-scope="scope">
        <el-row :gutter="4">
            <el-col :span="8">
                 <el-tooltip class="item" effect="dark" content="编辑" placement="top" >
                   
                      <el-button type="primary" icon="el-icon-edit" @click="editUser(scope.row)"></el-button>  
                    
                </el-tooltip>
               
            </el-col>
           
            <el-col :span="8">
                <el-tooltip class="item" effect="dark" content=" 删除" placement="top">
                    <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row)" ></el-button>
                </el-tooltip>
                
            </el-col>
             <el-col :span="8">
                  <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                       <el-button type="warning" icon="el-icon-setting"></el-button>
                </el-tooltip>
                
            </el-col>
            
            
        </el-row>
      </template>
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
</div>
  

</template>

<script>
// @ is an alias to /src
import dialogs from 'components/dialoguser/dialogs'
import {getUser} from 'network/api'
import {updateStatus} from 'network/api'
import {deleUser} from 'network/api'
export default {
  name: 'Users',
  components: {
    dialogs
  },
  data() {
    return {
      isCollapse:false,
      menulist:[],
      userdata: [],
        total:0,
        pagenum:1,
        pagesize:2,
        query:'',    
      // 传给子组件的数据
        usermsgs:{}
    }
  },
  methods: {
    //子组件方法
    reset(){
      this.usermsgs = {}
      this.getUsers()
    },
    //删除一个用户
    async delUser(row){
     await deleUser(row.id)
      this.getUsers()
      
    },
    //编辑用户信息
    editUser(row){
      this.$refs.dia.dialogVisible = true;
      console.log(row);
      
      this.usermsgs=row
    },
    addUser(){
      console.log(this.$refs.dia.dialogVisible = true);
    }
    ,
    async getUsers(){
      const data = await getUser({
      pagenum:this.pagenum,
      pagesize:this.pagesize,
       query:this.query
    })
    if(data.meta.status!==200){
        return
    }
    const {total,pagenum,users} = data.data
    this.userdata = users
    if(users.length == 0&&pagenum!==1){
    this.pagenum = pagenum -1
    }else{
 this.pagenum = pagenum
    }
    this.total = total
   
     console.log(data); 
     return data

    },
    input3(){},
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = +val
        this.getUsers()

      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pagenum =+val
        this.getUsers()
      },
     async dos(st,id){
        console.log(st,id);
       const data = await updateStatus(st,id)
        console.log(data);
        if(data.meta.status!==200){
          this.$message.error(data.meta.msg)
        }
        this.$message.success(data.meta.msg)
    
      },
      //搜索
      ss(){
        this.pagenum = 1
        this.getUsers(); 
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
.el-row{
  display: flex;

  align-items: center;
}
.btss{
  height: 36px;
  padding: 2px 10px;
}
</style>