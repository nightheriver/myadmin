<template>
  <div class="dialog">
<el-dialog
  @closed='closed'
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">

             <el-form :model="usermsg" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm from">
                <el-form-item  label="用户名称" prop="username" >
                    <el-input  v-model="usermsg.username" :disabled="isadd"></el-input>
                </el-form-item>
                <el-form-item  label="用户密码" prop="password"  v-if="!isadd">
                    <el-input v-model="usermsg.password" type="password" ></el-input>
                </el-form-item>
                 <el-form-item  label="邮箱" prop="email"  >
                    <el-input v-model="usermsg.email" type="email" ></el-input>
                </el-form-item>
                 <el-form-item  label="手机号" prop="mobile"  >
                    <el-input v-model="usermsg.mobile" ></el-input>
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
import {adduser} from 'network/api'
import {regMobile} from 'uitl/regxTools'
import {updateUser} from 'network/api'
export default {
  name: 'dialoguser',
  props: {
    usermsgs: {
        type:Object,
        default(){return {}} 

    }
  },
   data() {
      return {
        dialogVisible: false,
         usermsg: {
          username: '',
          password:'',
          email:'',
          mobile:'',
        },
        id:'',
        isf:true,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ],
         email:[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            mobile: [
            { validator: regMobile, trigger: 'blur' },
    
          ],
        }
      };
    },
    methods: {
        //X ,取消，确定方法
        closed(){

             this.$emit('msgs')
            this.$refs['ruleForm'].resetFields();
        },
        qx(){
             this.$refs['ruleForm'].validate((valid) => {
                        if (valid) {
                          alert('submit!');
                        } else {
                          console.log('error submit!!');
                          return false;
                        }
                 });
           this.$emit('msgs')
            this.$refs['ruleForm'].resetFields();
           this.dialogVisible = false 
      
        
           
        },
        async qd(){
        this.$refs['ruleForm'].validate((valid) => {

       if (valid) {
           
         this.isf = true
                       } else {
            console.log('error submit!!')
            this.isf = false
            return false;
          }
                  
                })
   if(this.isf){
     
  


            if(!this.id){
    
               const data = await adduser(this.usermsg) 
            if(data.meta.status !== 201){
             this.$message.error(data.meta.msg)
             return
        }
        this.$message.success(data.meta.msg)
               
            }else{
             
            const {email,mobile} = this.usermsg
            const result = await updateUser(this.id,{email,mobile})
      
        if(result.meta.status !== 200){
             this.$message.error(result.meta.msg)
             return
        }
        this.$message.success(result.meta.msg)


            }
             this.$emit('msgs')
            this.usermsg = ''
             this.$refs['ruleForm'].resetFields();
           this.dialogVisible = false ;
           
        
         }
    
                },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
           
            
          if (!valid) {
              this.$message.error('请正确填写表单')
              return
          } else {
           const data = await logins(this.loginmsg)
           
            if(data.meta.status === 200){
                const {token} = data.data
                window.sessionStorage.setItem('token',token)
                this.$router.replace('/home')
            }
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
  
      }
    },
    computed: {
        isadd(){
      
            
            return this.id?true:false
        }
    },
    watch: {
        usermsgs(newV){
            const {username,mobile,email,id} = newV
            this.usermsg = {username,mobile,email,password:''}
            this.id = id
     
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
