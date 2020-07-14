<template>
<div class="goods">
  <!-- <dialogs ref="dia" :goodsmsgs='goodsmsgs' @msgs='reset'>

  </dialogs> -->
  <!-- <dialogsallot ref="allot" :goodsmsgs='goodsmsgs'  @msgss='reset' > -->

  <!-- </dialogsallot> -->
   <div class="bmb">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
  </div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-row>
      <el-col :span="14">
           <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="ss"></el-button>
          </el-input>
      </el-col>
       <el-col :span="4">
        <el-button type="primary"  class="btss" @click="addgoods">添加商品</el-button> 
      </el-col>
    </el-row>
   
  </div>
 
<el-row></el-row>
<el-col></el-col>
  <el-table 
      border
      :data="goodsdata"
      style="width: 100%">
        <el-table-column
      type="index"
       >
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        min-width="500"
        >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
       >
      </el-table-column>
         <el-table-column
        prop="goods_weight"
        label="商品重量"
       >
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        width="120"
        >
         <template slot-scope="scope">
             {{scope.row.add_time}}
             {{
                
             }}
         </template>
   
      </el-table-column>
      <el-table-column
        prop="id"
        label="操作"
        >
         <template slot-scope="scope">
        <el-row :gutter="4">
            <el-col :span="8">
                 <el-tooltip class="item" effect="dark" content="编辑" placement="top" >
                   
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="editgoods(scope.row)"></el-button>  
                    
                </el-tooltip>
            </el-col>
 
            <el-col :span="8">
            

                <el-tooltip class="item" effect="dark" content=" 删除" placement="top" >
                  <el-popconfirm
                  @onConfirm ="delgoods(scope.row)"
  confirmButtonText='好的'
  cancelButtonText='不用了'
  icon="el-icon-info"
  iconColor="red"
  title="这是一段内容确定删除吗？"
>
  <!-- @click="delgoods(scope.row)"  -->
                      <el-button type="danger" icon="el-icon-delete"
                     
                       slot="reference"  size="mini"></el-button>
                                </el-popconfirm>   
                </el-tooltip>
      
            </el-col>
             
           
            
            
        </el-row>
      </template>
      </el-table-column>
    </el-table>
<div class="block"> 
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</el-card>
</div>
  

</template>

<script>
// @ is an alias to /src
// import dialogs from './dialoggoods/dialogs'
                                    
import {getgoodslist,deletgoods} from 'network/api'
import  {datesc} from 'uitl/datetool'
export default {
  name: 'goods',
  components: {
    
    
    
  },
  data() {
    return {
      isCollapse:false,
      menulist:[],
      goodsdata: [],
        total:0,
        pagenum:1,
        pagesize:5,
        query:'',    
      // 传给子组件的数据
        goodsmsgs:{}
    }
  },
  methods: {
    //子组件方法
    reset(){
      this.goodsmsgs = {}
      this.getgoods()
    },
    //删除
    async delgoods(row){
      const id = row.goods_id
     const data = await deletgoods(id)
     console.log(data);
      this.getgoods()
      
    },
    //编辑
    editgoods(row){
      console.log(row);
      const id = row.goods_id
      this.$router.push({
        path:'/goods/addoreditgoods',
        query:{
              id
        }
      })
      this.goodsmsgs=row
    },
    //添加
    addgoods(){
     this.$router.push('/goods/addoreditgoods')
    }
    ,

    //获取角色列表
    async getgoods(){
      const data = await getgoodslist({
      pagenum:this.pagenum,
      pagesize:this.pagesize,
       query:this.query
    })
    if(data.meta.status!==200){
        return
    }
    console.log(data);
    const {total,pagenum,goods} = data.data
    
    goods.forEach(item => {
           
           item.add_time = datesc(item.add_time)

//         if (boolean) {
//             return year + '/' + month + '/' + date + '';
//         } else {
//             return year + '/' + month + '/' + date + '.' + hour + ':' + min + ':' + sec;
//         }
    })
        

    this.goodsdata = goods
    if(goods.length == 0&&pagenum!==1){
    this.pagenum =  pagenum -1
    }else{
 this.pagenum = + pagenum
    }
    this.total = total
   
     return data

    },
    
    input3(){},
    //翻页
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = +val
        this.getgoods()

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum =+val
        console.log(this.pagenum);
        this.getgoods()
      },
      //更新状态
     async dos(st,id){
        console.log(st,id);
       const data = await updateStatus(st,id)
        console.log(data);
        if(data.meta.status!==200){
          this.$message.error(data.meta.msg)
        }
        this.$message.success(data.meta.msg)
    
      },
      //搜索
      ss(){
        this.pagenum = 1
        this.getgoods(); 
      }
  },
    computed: {
        times(){
//             let minutes = 1000*60
// let hours = minutes*60
// let days = hours*24
// let years = days*365


// let y = time/years
//             return y
        }
    },
  created(){
     this.getgoods()
  }
}
</script>
<style lang="less"  scoped>
.bmb{
    margin-bottom: 12px;
}
 .goods{
     .el-table{
         font-size: 12px;
     }
 }
</style>