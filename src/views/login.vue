<template>
    <div class="login">
        <div class="lg">
            <div class="imgd">
                <img class="imgs" src="~assets/logo.png" alt="">
            </div>
            <el-form :model="loginmsg" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm from">
                <el-form-item  prop="username" >
                    <el-input v-model="loginmsg.username"></el-input>
                </el-form-item>
                <el-form-item  prop="password"  >
                    <el-input v-model="loginmsg.password" type="password" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>

<!-- ruleForm -->

        </div>
    </div>
</template>
<script>
import {logins} from 'network/api'
export default {
    name:'login',
    data() {
      return {
        loginmsg: {
          username: '',
          password:''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
           
            
          if (!valid) {
              this.$message.error('请正确填写表单')
              return
          } else {
           const data = await logins(this.loginmsg)
            console.log(data);
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
        console.log(formName)
      }
    }
}
</script>
<style lang="less">
.login{
    width: 500px;
    height: 300px;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
    background: white;
    border-radius: 6px;
     .lg{
         .imgd{
             position: absolute;
             left: 50%;
             transform: translate(-50%,-50%);
             width: 130px;
            height: 130px;
            border: 1px solid white;
            border-radius: 50%;
            overflow: hidden;
            padding: 10px;
            background: white;
            box-shadow: white 0 0 6px 0;
             .imgs{
            border-radius: 50%;
            width: 100%;
            height: 100%;
            background: #eee;
            }
        
         }
        .from{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding-right:30px ;
            .els{
                margin-left:30px ;
            }
        }
        
    }
}
   
</style>
