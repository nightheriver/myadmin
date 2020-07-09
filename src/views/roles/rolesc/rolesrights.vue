<template>
<div class="rolesr">
    <el-row  class="rows" v-for=" item in roleslists" :key="item.id">
            <el-col :span="6">
                <el-tag closable @close='delright(id,item.id)'>{{item.authName}}</el-tag>
            </el-col>
           <el-col :span="18">
                        <el-row v-for=" itemc in item.children" :key="itemc.id" class="row1">
                          <el-col :span="6">
                              <el-tag closable type="success"  @close='delright(id,itemc.id)'>{{itemc.authName}}</el-tag>
                          </el-col>
                          <el-col :span="18" >             
                                      <el-tag 
                                       closable 
                                       type="warning"
                                        @close='delright(id,itemcc.id)'
                                        v-for=" itemcc in itemc.children" 
                                        :key="itemcc.id">{{itemcc.authName}}</el-tag>
                          </el-col>
                              
                        </el-row>
           </el-col>
        
          </el-row>
</div>
           
    
</template>

<script>
// @ is an alias to /src
import {getRoles,deleRoles} from 'network/api'
export default {
  name: 'rolesrights',
  props:{
      roleslist:{
          type:Object,
          default(){
              return {}
          }
      }
  },
  components: {

  },
    data() {
      return {
        roleslists:[],
        list:[],
        id:''
        
      }
    },
    created() {
    // const data =  await  getRoles()
    // console.log(data);
    // this.roleslist = data.data
    this.id = this.roleslist.id
     this.roleslists = this.roleslist.children
    console.log(this.roleslists);
    },
    methods: {
      //删除权限
    async delright(roleId,rightId){ 
        console.log(roleId,rightId);
          const data = await deleRoles(roleId,rightId);
          console.log(data.data);
         this.roleslists = data.data
         this.roleslist.children = data.data
         this.$emit('updaterights',this.roleslist)
      }
     
    },
 
    watch: {
        
    },
}
</script>
<style lang="less">
.rolesr{
 .el-row{
padding: 6px;
   display: flex;
   align-items: center;
   border-bottom: 1px solid #eee;
 } 
 .row1:last-child{
     border-bottom:none;
 }
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