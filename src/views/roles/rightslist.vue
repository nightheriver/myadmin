<template>
  <div class="Roles" >
    <setrights ref="allotr"></setrights>
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
    </el-row>
     
  </div>
  <el-table 
      border
      :data="rightslist"
      style="width: 100%">
        <el-table-column
      type="index"
       >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        >
      </el-table-column>
        <el-table-column
        prop="path"
        label="路径"
        >
      </el-table-column>
      <el-table-column
        prop="level"
        label="权限等级"
        width=""
        >
      
         <template slot-scope="scope">
       <el-tag :type="levelc[scope.row.level].tag" >
          {{levelc[scope.row.level].name}}
        </el-tag>
      </template>
      </el-table-column>
    </el-table>
</el-card>

  </div>
</template>

<script>
// @ is an alias to /src
import {getRight} from 'network/api'
import rolesrights from './rolesc/rolesrights'

import setrights from './rolesc/setrights'
export default {
  name: 'rightslist',
  components: {
    rolesrights,setrights
  },
    data() {
      return {
        rightslist:[],
        levelc:{
          '0':{tag:'',name:'一级'},
          '1':{tag:'success',name:'二级'},
          '2':{tag:'warning',name:'三级'}
        }
      }
    },
   async created() {
    const data =  await  getRight('list')
    console.log(data);
    this.rightslist = data.data
    },
    methods: {
    //   //删除权限
    // async delright(roleId,rightId){
    //       console.log(roleId,rightId);  
    //       const data = await deleRoles(roleId,rightId);
    //       console.log(data);
          
    //      roleslist = data.data
    //   },
      //更新权限
      updaterights(){
        // let datas =[];
        // this.$on('updaterights',(data)=>{
        //   console.log(data);
        //   datas = data
        // })
        //   this.roleslist = datas
        console.log(111);
        
      
      },
      editUser(row){
        console.log(row);
      },
      allotr(){
      this.$refs.allotr.dialogVisible = true
    },
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