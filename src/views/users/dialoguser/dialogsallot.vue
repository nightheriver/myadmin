<template>
  <div class="dialogroles">
<el-dialog
  @closed='closed'
  title="分配角色"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
{{usermsgs}}
    
        <p>当前的用户:  {{usermsgs.username}}</p>
        <p>当前的角色:   {{usermsgs.role_name}} </p> 
                   
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in roleslist"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
            </el-option>
    </el-select> 
  <!-- 分配新角色 -->
    <el-button @click="qx">取 消</el-button>
    <el-button type="primary" @click="qd">确 定</el-button>



</el-dialog>
  </div>
</template>

<script>
import {adduser} from 'network/api'

import {updateUser,allotRoles,getRoles} from 'network/api'
export default {
  name: 'dialogsallot',
  props: {
    usermsgs: {
        type:Object,
        default(){return {}} 

    }
  },
   data() {
      return {
        dialogVisible: false,
         rolesmsg: {
          username: '',
          password:'',
          email:'',
          mobile:'',
        },
        usermsg:{},
        id:'',
        value:'',
        roleslist:[]
      };
    },
    methods: {
    //得到roles 列表
     async   getroles(){
       const result =  await  getRoles()
     
       if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
        // this.$message.success(result.meta.msg)
        this.roleslist = result.data
        },
        //X ,取消，确定方法
        closed(){

            //  this.$emit('msgs')
      
        },
        qx(){
         
        //    this.$emit('msgs')
          this.value = ''
           this.dialogVisible = false 
      
        
           
        },
        async qd(){
   
       let id = this.usermsgs.id
       let rid = this.value
       this.value = ''
       const data =  await allotRoles(id,rid)
     
        if(data.meta.status !== 200) return this.$message.error(data.meta.msg)
        this.$message.success(data.meta.msg)
         this.$emit('msgss')
        this.dialogVisible = false 
                },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
     
 
    },
    computed: {
 
    },
    watch: {
        dialogVisible(){
          if(this.dialogVisible === true){
             this.getroles()
          }
        },
        usermsgs(news){
          this.usermsg = news
        }
    },
    created() {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
