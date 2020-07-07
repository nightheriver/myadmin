<template>
  <div class="home" >
      <el-container>
        <el-header><div class="logos"><img class="imgs" src="~assets/logo.png" alt="">电商后台</div> 
        <el-button @click="outs"> 退出</el-button></el-header>
        <el-container>
          <el-aside :width="isCollapse?'60px':'200px'">
            <el-row class="tac">
                <el-col :span="24">
                  <el-menu
                    unique-opened
                    :default-active="activePath"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                  background-color='#333744'
                  text-color	='#ffffff'
                    >
                    <el-button class="bts" @click="toggles"  background-color='#333744'
                  text-color	='#ffffff'>|||</el-button>
                    <!-- <el-submenu index="1">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                      </template>
                        <el-menu-item index="1-1">用户列表</el-menu-item>
                    </el-submenu> -->
                    <el-submenu v-for="item in menulist"  :index="item.path" :key="item.id+''">
                       <template slot="title">
                        <i :class="iconarr[item.id]"></i>
                        <span>{{item.authName}}</span>
                      </template>
                      <el-menu-item v-for="citem in item.children" :key="citem.id" :index="'/'+citem.path">{{citem.authName}}</el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-col>
              </el-row>



          </el-aside>
          <el-main>
            <div v-if="this.$route.path ==='/home'?false:true">
              <router-view ></router-view>
            </div>
            
            <p v-else>
              home
            </p>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import {getUser,getMenus} from 'network/api'

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      isCollapse:false,
      menulist:[],
      iconarr:{125:'el-icon-user-solid',103:'el-icon-menu',145:'el-icon-data-line',101:'el-icon-shopping-bag-2',102:'el-icon-s-order'},

    
    }
  },
  computed: {
    activePath(){
      const arr = []
      this.menulist.forEach(item => {
        item.children.forEach(itemc => {
        arr.push(itemc.path)
      });
      });

      console.log(arr);
      const datas =  arr.find((item)=>{
        return  this.$route.path.indexOf(item)>=0
      })
      return '/'+datas
    }
  
  },
  methods: {
    outs(){
      window.sessionStorage.clear();
      this.$router.push('/login')
    },
    handleOpen(index){
    },
    handleClose(index){
    },
    toggles(){
      this.isCollapse = !this.isCollapse
    },
    async getUsers(){
      const data = await getUser({
      pagenum:1,
      pagesize:2
    })
    // console.log(data);
     return data
    },
      async getMenus1(){
      const data = await getMenus()
      //  console.log(data);
       if(data.meta.status!==200){
         console.log(data.data);
         
         this.$message.error('错了哦，这是一条错误消息');
         return 
       }
       this.menulist = data.data
    }
  },
  // | pagenum  | 当前页码     | 不能为空 |
//| pagesize | 每页显示条数 | 不能为空 |
  created(){
     this.getUsers()
     this.getMenus1()
  }
}
</script>
<style lang="less">
.home{
height: 100%;
  .el-container{
    height: 100%;
  }
 .el-header{
   display: flex;
   justify-content: space-between;
    background-color: #373d41;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    align-items: center;
    .logos{
      display: flex;
     align-items: center;
      .imgs{
        width: 60px;
        height: 60px;
      }
      
    }
  
    }
    .el-aside {
    text-align: center;
    height: 100%;
       background-color:#333744 ;
    .bts{
      width: 100%;
      background-color:#333744 ;
        color: white;
        border: 1px solid rebeccapurple;
    }
  }
  
  .el-main {
    background-color: #E9EEF3;
    text-align: center;
        height: 100%;
  }
}


</style>