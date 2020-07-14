<template>
  <div class="categories" >
      <editcat :editdata="editdata" @msg="reset" ref="edit" @update ='getfenlei'> 

      </editcat>
      <addcat  @msg="reset" ref="add" :adddata="adddata" @msgs ="reset" @update ='getfenlei'>

      </addcat>
   <div class="bmb">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
  </div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-row class="cz">
      <el-col :span="4">
          <el-button  size="medium" type="primary"  @click="addcats" >添加分类</el-button>
      
      
      </el-col>
    </el-row>
     <zktable
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="cdata"
      :columns="columns"  
      :selection-type="false" 
      :expand-type="false"
      :show-index="true"
      border
     >
      <template slot="cat_deleted" scope="scope">
    <i class="el-icon-error " v-if="scope.row.cat_deleted" style="color:red"></i>
    <i class="el-icon-success " v-else style="color:lightgreen"></i>
      </template>
      <template slot="cat_level" scope="scope">
        <el-tag v-if="scope.row.cat_level === 0" >一级</el-tag>
        <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
        <el-tag type="warning" v-else>三级</el-tag>
      </template>
       <template slot="cat_id" scope="scope">
        


          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editcats(scope.row.cat_id,scope.row.cat_name)">编辑</el-button>
          <el-popconfirm
  title="这是一段内容确定删除吗？"
  @onConfirm="deletcat(scope.row.cat_id)"
          >
                  <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" >删除</el-button>
          </el-popconfirm>
         
      </template>
     
       <!-- :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :selection-type="props.selectionType"   -->
     </zktable>
  </div>
   <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
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
import {getcategories,editcategories,deletecategories} from 'network/api'
import editcat from './categoriesc/editcat'
import addcat from './categoriesc/addcat'
export default {
  name: 'categories',
  components: {
    editcat,addcat
  },
    data() {
      return {
          cdata:[],
          pagenum:1,
          pagesize:5,
          icon:{
           
          },
          adddata:[],
          total:0,
          editdata:{},
             columns: [
          {
            label: '分类名称',
            prop: 'cat_name',
          
          },
          {
            label: '是否有效',
            prop: 'cat_deleted',
              type: 'template',
            template: 'cat_deleted',
          },
          {
            label: '排序',
            prop: 'cat_level',
             type: 'template',
            template: 'cat_level',
          },
          {
            label: '操作',
            prop: 'cat_id',
            type: 'template',
            template: 'cat_id',
            width:'200'
          },
        ]
      }
    },
   created() {
    this.getfenlei()
    },
    methods: {
        reset(){
            this.editdata ={}     
            this.adddata       
        }, 
        editcats(id,cat_name){
           this.editdata ={id,cat_name}
          this.$refs.edit.dialogVisible = true
        },
        async deletcat(id){
           const data = await deletecategories(id)
            console.log(data);
            this.getfenlei();
            
        },
        //获取分类数据
       async getfenlei(){
            const pagenum = this.pagenum;
            const pagesize = this.pagesize
           const data = await getcategories(pagenum,pagesize)
          //  console.log(data.data);
             this.adddata = this.cdata = data.data.result
           this.total = data.data.total
        },
       handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.getfenlei()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pagenum = val;
        this.getfenlei()
      },
      addcats(){
          this.$refs.add.dialogVisible = true
      }
    },
    
}
</script>
<style lang="less">
.categories{
 .bmb{
   margin-bottom: 12px;
 }
 
}
</style>