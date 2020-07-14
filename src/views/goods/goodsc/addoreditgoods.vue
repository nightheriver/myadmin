<template>
<div class="addoreditgoods">
  <!-- <dialogs ref="dia" :goodsmsgs='goodsmsgs' @msgs='reset'>

  </dialogs> -->
  <!-- <dialogsallot ref="allot" :goodsmsgs='goodsmsgs'  @msgss='reset' > -->

  <!-- </dialogsallot> -->
   <div class="bmb">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
  </div>
  <el-card class="box-card">
    <el-alert
    title="添加商品信息"
    type="info"
    show-icon>
  </el-alert>
  <el-steps :active="active" finish-status="success"
   align-center
  >
  <el-step title="基本信息"></el-step>
  <el-step title="商品参数"></el-step>
  <el-step title="商品属性"></el-step>
  <el-step title="商品图片"></el-step>
  <el-step title="商品内容"></el-step>
  <el-step title="完成"></el-step>
  
</el-steps>
<!-- style="height: 200px;" -->
<el-tabs tab-position="left" :before-leave="tabtoggle" >
    <el-tab-pane label="基本信息">

      <el-form :model="goodForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="goodForm.goods_name"></el-input>
        </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="goodForm.goods_price" type='number'></el-input>
        </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight"  >
          <el-input v-model="goodForm.goods_weight" type='number'></el-input>
        </el-form-item>
          <el-form-item label="商品数量" prop="goods_number"  >
          <el-input v-model="goodForm.goods_number" type='number'></el-input>
        </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
          ref="cas"
          v-model="value"
          :options="catlists"
          :props="props"
          @change ='getarr'
          clearable></el-cascader>
        </el-form-item>
  
  <!-- <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item> -->
</el-form>

    </el-tab-pane>
    <el-tab-pane label="商品参数">


      <el-form   ref="manyForm"  class="manylist" label-position="top">
        <el-form-item :label="item.attr_name" prop="goods_name" v-for="item in manylist" :key="item.attr_id">
          <el-checkbox  checked  :label="itemc" border v-for="(itemc,index) in item.attr_vals" :key="itemc" 
          
          @change='changes(index,item.attr_vals)'></el-checkbox>
           <!-- <el-tag   closable @close="handleClose()">{{itemc}}</el-tag> -->
        </el-form-item>
      </el-form>
      
     
    </el-tab-pane>
    <el-tab-pane label="商品属性">
    <el-form  ref="onlyForm"   class="onlylist">
        <el-form-item   :label="item.attr_name" prop="goods_name" v-for="item in onlylist" :key="item.attr_id">
           <!-- <el-tag v-for="(itemc,index) in item.attr_vals" :key="index"  closable @close="handleClose()">{{itemc}}</el-tag> -->
            <el-input v-model="item.attr_vals"></el-input>
        </el-form-item>
      </el-form>

      </el-tab-pane>
    <el-tab-pane label="商品图片">
      <el-upload
  class="upload-demo"
  
  action="http://127.0.0.1:8888/api/private/v1/upload"
  :on-preview="handlePreview"
  :headers = "input"
  :on-remove="handleRemove"
  :on-success ="imgsuccess"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-tab-pane>
    <el-tab-pane label="商品内容">
      <Editor @input="inputss" :inputs="inputs"></Editor>
      <el-button @click="addagoods">添加商品</el-button>
       <!-- goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs -->
    </el-tab-pane>
  </el-tabs>


</el-card>
</div>
  

</template>

<script>
// @ is an alias to /src
// import dialogs from './dialoggoods/dialogs'
                       
import {getagoods,getcategories,getcatparams,addgoods,editgoods} from 'network/api'
import  {datesc} from 'uitl/datetool'
import Editor from 'components/Editor'
export default {
  name: 'addoreditgoods',
  components: {
    Editor
    
    

  },
  props:{
      // id:{
      //     default:926
      // }
  },
  data() {
    return {
   active:0,
   id:'',
   goodForm:{
      goods_name: '',
     goods_number: '',
      goods_price: '',
     goods_weight: '',
   },
      rules: {
          goods_name: [
            { required: true, message: '请输入商品名称 ', trigger: 'blur' },
          ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'change' }
          ],
           goods_number: [
            { required: true, message: '请输入商品数量 ', trigger: 'change' }
          ],

           goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'change' }
          ],
       

        },
       manylist:[],
       onlylist:[],
         catlists:[],
         value:[],
              props:{
               checkStrictly:true,
               value:'cat_id',
               label:'cat_name',
           },
           cat_id:'',
            fileList:[],
            content:null,
            editorOption:{},
            input:'',
            pics:[],
            inputs:'',
            id:'',
            goodsdata:{}

    }
  },

  methods: {
    tabtoggle(activeName, oldActiveName){
      if( !(this.value.length===3||activeName==='0')){
        this.$message.error('请先选择商品分类！')
      }
      return this.value.length===3||activeName==='0'?true:false
      console.log(activeName, oldActiveName);
    }
    ,
        async getflparams(){
        console.log(1);
        let sel = 'many';
      //  this.catid  = this.value[2]
        const id = this.value[2]
        const data = await  getcatparams(id,sel);
        console.log(data);
        data.data.forEach(item => {
          if(!!item.attr_vals){
              item.attr_vals = item.attr_vals.split(' ')
          }else{
            item.attr_vals = []
          }
         
         
        });
          this.manylist =  data.data
       
        sel = 'only'
          const datas = await  getcatparams(id,sel);
        this.onlylist =  datas.data
         console.log(datas);
      },


        getarr(arr){
          if(arr.length!==3)
          { 
              this.value = []
              return
              } 
              this.cat_id = this.value[2]
              console.log(this.cat_id);
               this.getflparams()
              this.goodForm.goods_cat = this.value.join(',') 
      },
     async getfenlei(){
           
           const data = await getcategories()
          //  console.log(data.data);
            this.catlists = data.data
            console.log(data);
        //    this.total = data.data.total
        },
    //子组件方法
    reset(){
      this.goodsmsgs = {}
      this.getgoods()
    },
    //删除一个用户
    async delgoods(row){
     await delegoods(row.id)
      this.getgoods()
      
    },
    //编辑用户信息
    editgoods(row){
      this.$refs.dia.dialogVisible = true;
      console.log(row);
      
      this.goodsmsgs=row
    },

    //获取角色列表
    async getgoods(){
      if(this.id!==''){
      const id = this.id
      const data = await getagoods(id)
      console.log(data);
      this.goodsdata = data.data
      let goods = data.data
       let arr = this.goodsdata.goods_cat.split(',')
       let newarr = arr.map(x=>+x)
       this.value = newarr
       let aid=''
       //显示参数
       goods.attrs.forEach(item => {
          if(item.attr_sel==="many"){
            if(aid!==item.attr_id){
              aid = item.attr_id
            }else{
              return
            }
            if(item.attr_vals){
             item.attr_vals = item.attr_vals.split(' ')
              console.log(item.attr_vals);
            } 
            this.manylist.push(item)
          }else{
             if(aid!==item.attr_id){
              aid = item.attr_id
            }else{
              return
            }
            this.onlylist.push(item)
          }
       });
             //显示图片
      goods.pics.forEach(item => {
        this.fileList.push({
        name:item.pics_id,
        url:item.pics_mid
        })
      });
      //inputs
       this.inputs = goods.goods_introduce
       //
       this.goodForm.goods_name = goods.goods_name
      this.goodForm.goods_number =+goods.goods_number
      this.goodForm.goods_price =+goods.goods_price
      this.goodForm.goods_weight =+goods.goods_weight
         
      }
 
     
      this.getfenlei()


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
      },
      changes(index,attr_vals){
        console.log(index);
        attr_vals.splice(index,1)
      },
      //发送添加请求
     async addagoods(){
        const {goods_name,goods_number,goods_price,goods_weight} = this.goodForm
      const goods_cat = this.value.join(',')
      const pics =this.pics  
      let attrs=[]
       this.manylist.forEach(item => {
         let attr_id =item.attr_id
         if(item.attr_vals.length===0){
           attrs.push({attr_id,attr_value:''})
         }else{
           item.attr_vals.forEach(itemc => {
             let attr_value = itemc
            attrs.push({attr_id,attr_value})
           });
         }
       });
        this.onlylist.forEach(item => {
          let attr_id = item.attr_id
          let  attr_value = item.attr_vals
           attrs.push({attr_id,attr_value})
        });
        let  goods_introduce = this.inputs
            console.log(attrs);
        // goods_introduce,pics,attrs
        if(this.id!==''){
          const id = this.id
          const data =await editgoods({id,goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs})
          console.log(data);
        }else{
          const data =await addgoods({goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs})
        console.log(data);
        }
       
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //获取上传图片的地址
      imgsuccess(f){
        console.log(f);
        this.pics.push(f.data.tmp_path)
      },
      //富文本值
      inputss(v){
        this.inputs = v
        console.log(this.inputs);
      }
  },
    computed: {
        times(){
        }
    },
  created(){ 
    
      let  token =  window.sessionStorage.getItem('token')        
      this.input ={Authorization:token}
      console.log(this.input);
     if(this.$route.query.id){
        this.id = this.$route.query.id
      
     }
      this.getgoods()
     
  },
  computed: {
      isadd(){

      }
  },
  
}
</script>
<style lang="less"  scoped>
.bmb{
    margin-bottom: 12px;
}
 .addoreditgoods{
     .el-table{
         font-size: 12px;
     }
    .el-steps{
      margin-top: 12px;
    }
    .el-tabs--left .el-tabs__nav-scroll{
   height: auto !important;
    }
    .manylist{

      .el-form-item__label{
        display: block !important;
      }
    }
    .onlylist{
       .el-form-item__label{
        display: block !important;
      }
    }
 
    
 }

</style>