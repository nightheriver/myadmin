<template>
  <div class="Roles" >
      <el-container>
        <el-header><div class="logos"><img class="imgs" src="~assets/logo.png" alt="">电商后台</div> <el-button> 退出</el-button></el-header>
        <el-container>
          <el-aside width="200px">
            <el-row class="tac">
                <el-col :span="24">
                  <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-submenu index="1">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                      </template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-col>
              </el-row>



          </el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Roles',
  components: {

  }
}
</script>
<style lang="less">
.Roles{
height: 100%;
  .el-container{
    height: 100%;
  }
 .el-header{
   display: flex;
   justify-content: space-between;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    align-items: center;
    .logos{
      .imgs{
        width: 60px;
        height: 60px;
      }
      
    }
  
    }
    .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
        height: 100%;
  }
}
   
</style>