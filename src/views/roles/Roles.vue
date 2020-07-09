<template>
  <div class="Roles" >
    <setrights ref="allotr"   :roleslist='list' @deletarr = "deletarr" @update = 'getrole'></setrights>
    <addoreditroles ref="addoredit" :roles='roles' @update = 'getrole' @msgs ='reset'></addoreditroles>
   <div class="bmb">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
  </div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-row class="cz">
      <el-col :span="4"><el-button  size="medium" type="primary" @click="addroles">添加角色</el-button></el-col>
   
    </el-row>
     
  </div>
  <el-table 
      border
      :data="roleslist"
      style="width: 100%">
      <el-table-column
      type="expand"
       >
       <template slot-scope="props">
       
     <rolesrights :roleslist="props.row" @updaterights = "updaterights" ></rolesrights>
      </template>


      </el-table-column>
        <el-table-column
      type="index"
       >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        >
      </el-table-column>
        <el-table-column
        prop="roleDesc"
        label="角色描述"
        >
      </el-table-column>
      <el-table-column
        prop="id"
        label="操作"
        width="300"
        >
         <template slot-scope="scope">
        <el-row :gutter="4" class="row">
            <el-col :span="8">
                 
                   
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row)">编辑</el-button>  
          
            </el-col>
 
            <el-col :span="8">
                  <el-popconfirm
                  @onConfirm ="delUser(scope.row)"
  confirmButtonText='好的'
  cancelButtonText='不用了'
  icon="el-icon-info"
  iconColor="red"
  title="这是一段内容确定删除吗？"
>
                      <el-button type="danger" icon="el-icon-delete"
                     
                       slot="reference"  size="mini">删除</el-button>
                                </el-popconfirm>   
            </el-col>
             <el-col :span="8">
                       <el-button size="mini" type="warning" icon="el-icon-setting"
                       
                         @click="allotr(scope.row)">分配权限</el-button>  
                         
            </el-col>  
        </el-row>
      </template>
      </el-table-column>
    </el-table>
</el-card>

  </div>
</template>

<script>
// @ is an alias to /src
import {getRoles,deleRoles,deleteroles} from 'network/api'
import rolesrights from './rolesc/rolesrights'
import addoreditroles from './rolesc/addoreditroles'
import setrights from './rolesc/setrights'
export default {
  name: 'Roles',
  components: {
    rolesrights,setrights,addoreditroles
  },
    data() {
      return {
        roleslist:[],
        list:{},
        roles:{}
        
      }
    },
   created() {
     this.getrole()
    },
    methods: {
      //删除角色
   async delUser(row){
     const id =  row.id 
     console.log(id);
    const data = await deleteroles(id);
       if(data.meta.status !== 200){
             this.$message.error(data.meta.msg)
             return
        }
        this.$message.success(data.meta.msg)
        this.getrole()

   },
      //更新权限
      updaterights(row){
        // let datas =[];
        // this.$on('updaterights',(data)=>{
        //   console.log(data);
        //   datas = data
        //   row.children = datas
        // })
        console.log(row);
  
      
        console.log(111);
        
      
      },
      deletarr(){
          this.list = {}
      },
      editUser(row){
        this.$refs.addoredit.dialogVisible = true
        // console.log(row);
        this.roles = {}
        this.roles = row
      },
      addroles(){
        this.$refs.addoredit.dialogVisible = true
      },
      allotr(row){
      this.$refs.allotr.dialogVisible = true
       this.getrole()
      this.list = {};
      this.list = row
      
      console.log(row);
      
    },
    async getrole(){
      const data =  await  getRoles()
      console.log(data);
      this.roleslist = data.data
    },
    reset(){
      this.roles = {}
    }
    },
    
}
</script>
<style lang="less">
.Roles{
 .bmb{
   margin-bottom: 12px;
 }
 
 .el-row{
padding: 6px;
   display: flex;
   align-items: center;
   border-bottom: 1px solid #eee;
 } 
 .row1:last-child{
     border-bottom:none;
 }
//  .el-col{
//     border-bottom: 1px solid #eee;
//  }
  //  .el-tag{
  //    margin: 10px 10px;
  //  }
  .row{
      border-bottom:none;
  }
  .rows{
    border-top:1px solid #eee ;
  }
  .cz{
      border-bottom:none;
  }
   }
</style>