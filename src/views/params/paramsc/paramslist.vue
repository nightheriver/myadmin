<template>
<div>
<el-button  type="primary" @click="addparams" >{{issel?'添加参数':'添加属性'}}</el-button>
<el-dialog
  :title="isadd"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">


  <el-form :model="fromdata" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item :label="issel?'动态参数':'静态属性'" prop="attr_name">
    <el-input v-model="fromdata.attr_name"></el-input>
  </el-form-item>

  <el-form-item >
      <el-button type="primary" @click="submitForm('ruleForm',fromdata.attrId)">确定</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
  </el-form-item>
</el-form>



  <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span> -->
</el-dialog>
 <el-table 
      border
      :data="paramslist"
      style="width: 100%">
      <el-table-column
      type="expand"
       >
       <template slot-scope="props">
           <el-tag v-for="(item,index) in props.row.attr_vals" :key="index"  closable @close="handleClose(props.row,index)">{{item}}</el-tag>
           <el-input
  class="input-new-tag"
  v-if="props.row.inputVisible"
  v-model="props.row.inputValue"
  ref="saveTagInput"
  size="mini"
  
  @keyup.enter.native="handleInputConfirm(props.row)"
  @blur="handleInputConfirm(props.row)"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput(props.row)">+ New Tag</el-button>
       {{props.row}}
      </template>
      </el-table-column>
        <el-table-column
      type="index"
       >
      </el-table-column>
      <el-table-column
        prop="attr_name"
        :label="issel?'参数名称':'属性名称'"
        >
      </el-table-column>
      <el-table-column
        prop="id"
        label="操作"
        width="300"
        >
         <template slot-scope="scope">
        <el-row :gutter="4" class="row">
            <el-col :span="8">
                 
                   
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="editparams(scope.row)">编辑</el-button>  
          
            </el-col>
 
            <el-col :span="8">
                  <el-popconfirm
                  @onConfirm ="delparams(scope.row)"
  confirmButtonText='好的'
  cancelButtonText='不用了'
  icon="el-icon-info"
  iconColor="red"
  title="这是一段内容确定删除吗？"
>
                      <el-button type="danger" icon="el-icon-delete"
                       slot="reference"  size="mini">删除</el-button>
                                </el-popconfirm>   
            </el-col> 
        </el-row>
      </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
// @ is an alias to /src
import {getcatparams,editcatparams,addcatparams,editparams,deletcatparams} from 'network/api'

export default {
  name: 'paramslist',
  components: {

  },
  props:{
      paramslist:{
          type:Array,
          default(){
              return []
          }
      },
      catid:{

      },
      sel:{

      }
      
  },
  data() {
    return {
      dialogVisible:false,
      rules: {
          attr_name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]
          
          },
          fromdata:{
            attr_name:'',
            attrId:''
          }
    }
  },
  created(){
      

  },
  computed: {
        issel(){
         return this.sel==='many'?true:false
       },
       isadd(){
         if(this.issel){
           return this.fromdata.attrId ===''?'添加参数':'修改参数'
         }else{
           return this.fromdata.attrId ===''?'添加属性':'修改属性'
         }

       }
  
  },
  methods: {
    //删除属性
     async delparams(row){
        const id = this.catid;
        const attrId = row.attr_id
        console.log(1112);
        const data = await deletcatparams(id,attrId)
        console.log(data);
          this.$emit('updatap')
    },
      //删除标签tag
     async handleClose(row,index){
          row.attr_vals.splice(index,1);
        const id = this.catid;
        const attrId = row.attr_id
        const attr_name = row.attr_name
        const attr_sel = this.sel
        const attr_vals = row.attr_vals.join(' ');
        console.log(attr_vals);
        const data = await editcatparams({id,attrId,attr_name,attr_sel,attr_vals})
        console.log(data);
      },
      //添加属性值
    async handleInputConfirm(row){
     let inputValue = row.inputValue;
    if (inputValue) {
          row.attr_vals.push(inputValue);
        }
        const id = this.catid;
        const attrId = row.attr_id
        const attr_name = row.attr_name
        const attr_sel = this.sel
        const attr_vals = row.attr_vals.join(' ');
        console.log(attr_vals);
        const data = await editcatparams({id,attrId,attr_name,attr_sel,attr_vals})
        console.log(data);
        row.inputVisible = false;
        row.inputValue = '';
     },
     
     showInput(row){
        row.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
     },
     //添加属性
     addparams(){
       this.fromdata.attr_name = ''
        this.dialogVisible = true
     },
      submitForm(formName){
       this.$refs[formName].validate(async (valid) => {
          if (valid) {
           console.log(this.fromdata.attr_name);
          const id = this.catid;
          const attrId = this.fromdata.attrId
          const attr_name = this.fromdata.attr_name
          const attr_sel = this.sel
         

          console.log(attrId);
          if(attrId ===''){
            console.log(id,attr_name,attr_sel);
             const data = await addcatparams({id,attr_name,attr_sel})
             console.log(data);
              this.$emit('updatap')
           this.$refs[formName].resetFields();
            this.dialogVisible = false
          }else{ 
               const attr_vals = this.fromdata.attr_vals.join(' ');
              const data = await editcatparams({id,attrId,attr_name,attr_sel,attr_vals})
              console.log(data);
               this.$emit('updatap')
           this.$refs[formName].resetFields();
           this.dialogVisible = false
          }

        
          } else {
            console.log('error submit!!');
            return false;
          }
        });
     },
       resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogVisible = false
      },
     //编辑属性
     editparams(row){
        this.fromdata.attrId = row.attr_id
        this.fromdata.attr_name = row.attr_name
        this.fromdata.attr_vals =row.attr_vals
        this.dialogVisible = true
     }
   
  },
    watch: {

     },
}
</script>
<style lang="less">
.params{
 .box-card{
     margin-top: 12px;
 }
   .el-tag + .el-tag {
    margin-left: 10px;
  }
  .el-tag{
       margin-top: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}


</style>