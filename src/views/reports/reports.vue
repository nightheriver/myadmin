<template>
<div class="reports">
  
  
   <div class="bmb">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb> 
  </div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
  
  </div>
  <div id="main1" style="width: 600px;height:400px;">

  </div>
 


 
</el-card>
</div>
  

</template>

<script>
// @ is an alias to /src
// import dialogs from './dialogorders/dialogs'
 var echarts = require('echarts');                            
import  {datesc} from 'uitl/datetool'

import {getreports} from 'network/api'
export default {
  name: 'reports',
  components: {
    
    
    
  },
  data() {
    return {
    option:{}
    }
  },
  methods: {
  
  },
    computed: {
       
    },
 async created(){
  
  },
 async mounted() {
 var myChart = echarts.init(document.getElementById('main1'));
// 绘制图表
 const data = await getreports()
    console.log(data);
    this.option = data.data

var  option =this.option

 option.title={
        text: '用户来源'
    }
  option.tooltip = {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    console.log(option);
myChart.setOption(option);
  },
}


</script>
<style lang="less"  scoped>
.bmb{
    margin-bottom: 12px;
}
</style>