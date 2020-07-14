<template>
<div class="orders">
    <el-dialog
                    title="提示"
                    :visible.sync="dialogVisibles"
                    width="50%"
                    :before-close="handleClose">
                      <el-timeline >
                        <el-timeline-item
                          v-for="(activity, index) in kuaididata"
                          :key="index"
                          :timestamp="activity.time">
                          {{activity.context}}
                        </el-timeline-item>
                      </el-timeline>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisibles = false">取 消</el-button>
                      <el-button type="primary" @click="dialogVisibles = false">确 定</el-button>
                    </span>
                  </el-dialog>

                  <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                        <el-cascader
                          :options="cityOptions"
                          :value="city"
                          @change="changeProvince"
                          change-on-select
                        >
                        </el-cascader>
                       
<div> 详细地址：<el-input></el-input></div>
                        
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog>
  <!-- <dialogs ref="dia" :ordersmsgs='ordersmsgs' @msgs='reset'>

  </dialogs> -->
  <!-- <dialogsallot ref="allot" :ordersmsgs='ordersmsgs'  @msgss='reset' > -->

  <!-- </dialogsallot> -->
   <div class="bmb">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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
        <el-button type="primary"  class="btss" @click="addorders">添加商品</el-button> 
      </el-col>
    </el-row>
   
  </div>
 
<el-row></el-row>
<el-col></el-col>
  <el-table 
      border
      :data="ordersdata"
      style="width: 100%">
        <el-table-column
      type="index"
       >
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        >
      </el-table-column>
      <el-table-column 
        prop="order_price"
        label="订单价格"
       >
      </el-table-column>
         <el-table-column
        prop="pay_status"
        label="是否付款"
       >
       <template slot-scope="scope">
         <el-tag type="danger" v-if="scope.row.pay_status==='0'?true:false">未付款</el-tag>
         <el-tag type="success" v-else>已付款</el-tag>
       </template>
      
      </el-table-column>
        <el-table-column
        prop="is_send"
        label="是否发货"
       >
        </el-table-column>
      <el-table-column
        prop="create_time"
        label="下单时间"
        width="120"
        >
         <template slot-scope="scope">
             {{scope.row.create_time}}
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
                   
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="editorders(scope.row)"></el-button>  
                    
                </el-tooltip>
            </el-col>
 
            <el-col :span="8">
            

                <el-tooltip class="item" effect="dark" content=" 物流" placement="top" >
                  
                
                      <el-button type="success" icon="el-icon-location"
                     @click="kuaidi(scope.row)"
                        size="mini"></el-button>
                             
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
// import dialogs from './dialogorders/dialogs'
import cityOptions from 'assets/js/city_data2017_element.js'                               
import {getorderslist,deletorders,getkuaidi} from 'network/api'
import  {datesc} from 'uitl/datetool'
export default {
  name: 'orders',
  components: {
    
    
    
  },
  data() {
    return {
      isCollapse:false,
      menulist:[],
      ordersdata: [],
        total:0,
        pagenum:1,
        pagesize:5,
        query:'',    
        ordersmsgs:{},
        dialogVisibles:false,
        dialogVisible:false,
        kuaididata:[],
        cityOptions:cityOptions,
        city:''
    }
  },
  methods: {
    //子组件方法
  
    //
    async kuaidi(row){
      const id = row.order_id
      console.log(row);
     const data = await getkuaidi(1106975712662)
      console.log(data);
      this.kuaididata = data.data
      this.dialogVisibles = true

 
    },
    //编辑
    editorders(row){
      console.log(row);
      this.dialogVisible = true
      
    },
    //添加
    addorders(){
     this.$router.push('/orders/addoreditorders')
    }
    ,

    //获取
    async getorders(){
        console.log(11);
        // const pagenum = this.pagenum
        // const pagesize = this.pagesize
        // const query = this.query
      const data = await getorderslist(
     {pagenum:this.pagenum,pagesize:this.pagesize,query:this.query} 
    )
    console.log(data);
    if(data.meta.status!==200){
        return
    }
    const {total,pagenum,goods} = data.data
    console.log(goods);
    goods.forEach(item => {
           item.create_time = datesc(item.create_time)
    })
        

    this.ordersdata = goods
    if(goods.length == 0&&pagenum!==1){
    this.pagenum =  pagenum -1
    }else{
 this.pagenum = + pagenum
    }
    this.total = total
   
    //  return data

    },
    
    input3(){},
    //翻页
     handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = +val
        this.getorders()

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum =+val
        console.log(this.pagenum);
        this.getorders()
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
        this.getorders(); 
      },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //地址获取
      changeProvince(e){
          console.log(e);
          getorders

      }
  },
    computed: {
        times(){

        }
    },
  created(){
     this.getorders()
  }
}
</script>
<style lang="less"  scoped>
.bmb{
    margin-bottom: 12px;
}
 .orders{
     .el-table{
         font-size: 12px;
     }
 }
</style>