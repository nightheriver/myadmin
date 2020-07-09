<template>
<div class="addoreditroles">
  
    <el-dialog
    @closed='closed'
    :title="isadd"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">

                <el-form :model="rolesmsg" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm from">
                    <el-form-item  label="角色名称" prop="roleName" >
                        <el-input  v-model="rolesmsg.roleName" ></el-input>
                    </el-form-item>
                    <el-form-item  label="角色描述" prop="roleDesc" >
                        <el-input  v-model="rolesmsg.roleDesc" ></el-input>
                    </el-form-item>
                        <el-form-item   >
    
                        <el-button @click="qx">取 消</el-button>
                        <el-button type="primary" @click="qd">确 定</el-button>


        </el-form-item>
                </el-form>

    </el-dialog>




</div>
           
    
</template>

<script>
// @ is an alias to /src
import {editroles,addroles} from 'network/api'
export default {
  name: 'addoreditroles',
  props:{
      roles:{
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
          rolesmsg:{
              roleName:'',
              roleDesc:'',
              id:''
          },
          dialogVisible:false
          ,
        rules: {
            // username: [
            //     { required: true, message: '请输入用户名', trigger: 'blur' },
            //     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            // ],
          
        
          
        }
        
      }
    },
    created() {
     this.rolesmsg = this.roles 
   
  
    console.log(this.rolesmsg);
    },
    methods: {
  
       closed(){
            this.rolesmsg ={}
             this.$emit('msgs')
            this.$refs['ruleForm'].resetFields();
        },
        qx(){
             this.$refs['ruleForm'].validate((valid) => {
                        if (valid) {
                         console.log();
                        } else {
                          console.log('error submit!!');
                          return false;
                        }
                 });
            this.$refs['ruleForm'].resetFields();
           this.dialogVisible = false 
      
        
           
        },
        async qd(){
            console.log(this.rolesmsg.roleName,this.rolesmsg.roleDesc);
             const {roleName,roleDesc} = this.rolesmsg
           const data = await addroles(roleName,roleDesc)
           console.log(data);
           
            if(data.meta.status !== 201){
                this.$message.error(data.meta.msg)
                return
            }
            this.$message.success(data.meta.msg)
            this.dialogVisible = false 
            this.$emit('update') 
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
     
    },
 
    watch: {
        roles(newv){
            const {id,roleName,roleDesc} = newv
            this.rolesmsg ={id,roleName,roleDesc}
        // console.log(newv);
        
        }
    },
    computed: {
        isadd(){
           
            let {id} = this.rolesmsg
            return id?'编辑角色':'添加角色'
        }
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