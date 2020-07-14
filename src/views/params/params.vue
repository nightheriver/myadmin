<template>
  <div class="params" >
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
      <!-- <el-col :span="4"><el-button  size="medium" type="primary" @click="addroles">添加角色</el-button></el-col> -->
         <el-alert
            show-icon
            title="注意：只允许为第三级分类设置相关参数！"
            type="warning">
        </el-alert>
    </el-row>
    <el-cascader
    ref="cas"
    v-model="value"
    :options="catlists"
    :props="props"
    @change ='getarr'
    clearable></el-cascader>
    <el-tabs v-model="activeName"  @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="first">
        <paramslist :paramslist="paramslist" :catid="catid" :sel='sel' @updatap="getflparams"></paramslist>
    </el-tab-pane>
    <el-tab-pane label="静态属性" name="second">
         <paramslist :paramslist="paramslist" :catid="catid" :sel='sel' @updatap="getflparams">
    </paramslist>
    </el-tab-pane>
  </el-tabs>
     
  </div>
  </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import {getcategories,getcatparams} from 'network/api'
import paramslist from './paramsc/paramslist'
export default {
  name: 'params',
  components: {
      paramslist
  },
  data() {
    return {
     props:{
               checkStrictly:true,
               value:'cat_id',
               label:'cat_name',
           },
    
    catlists:[],
    checked:0,
    value:[],
    sel:'many',
    paramslist:[],
    catid:0,
    activeName:'first'
    }
  },
  created(){
      this.getfenlei()

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
  
       getarr(arr){
          if(arr.length!==3)
          { 
              this.value = []
              return
              }
        this.getflparams()
      },
      async getflparams(){
        console.log(1);
        const sel = this.sel;
       this.catid  = this.value[2]
        const id = this.value[2]
        const data = await  getcatparams(id,sel);
        console.log(data);
        data.data.forEach(item => {
          console.log( );
          if(!!item.attr_vals){
              item.attr_vals = item.attr_vals.split(' ')
           console.log(item.attr_vals);
           item.inputVisible = false ;
           item.inputValue =''
          }else{
             item.attr_vals = []
          }
         
            
        });
        console.log(data);
        this.paramslist =  data.data
      },
       async getfenlei(){
           
           const data = await getcategories()
          //  console.log(data.data);
            this.catlists = data.data
        //    this.total = data.data.total
        },
        //切换标签页
    handleClick(tab, event) {
        console.log(tab.index, event);
         this.sel = tab.index === '0'?'many':'only'
         console.log(this.sel);
          this.getflparams()
      }
  }
}
</script>
<style lang="less">
.params{
 .box-card{
     margin-top: 12px;
 }
}


</style>