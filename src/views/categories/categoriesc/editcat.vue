<template>
    <div class="editcat">
        <el-dialog
        @closed='closed'
        title="编辑分类"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">

                    <el-form :model="editdatas" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm from">
                        <el-form-item  label="分类名称" prop="cat_name" >
                            <el-input  v-model="editdatas.cat_name" ></el-input>
                        </el-form-item>
                     
                            <el-form-item   >
        
                            <el-button @click="qx">取 消</el-button>
                            <el-button type="primary" @click="qd">确 定</el-button>


            </el-form-item>
                    </el-form>

        </el-dialog>

    </div>
</template>



<script>
// @ is an alias to /src
import {editcategories} from 'network/api'
export default {
  name: 'editcat',
  props:{
      editdata:{
           type:Object,
          default(){
              return {}
          }
         
      }
  },
  components: {
    
  },
    data() {
      return {
          cdata:[],
          pagenum:1,
          pagesize:5,
          editdatas:{},
          dialogVisible:false,
           rules:{}
      }
    },
   created() {
    },
    methods: {
       async editcat(id){
           const data = await editcategories(id,cat_name)
        },
        deletcat(id){
            // deletecategories()
        },
        //获取分类数据
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       async qd(){
            
             const {cat_name,id} = this.editdatas
           const data = await editcategories(id,cat_name)
           console.log(data);
           
            if(data.meta.status !== 200){
                this.$message.error(data.meta.msg)
                return
            }
            this.$message.success(data.meta.msg)
            this.dialogVisible = false 
            this.$emit('update') 
        },
        closed(){
            this.editdatas ={}
             this.$emit('msgs')
            this.$refs['ruleForm'].resetFields();
        },
        qx(){
             this.$refs['ruleForm'].validate((valid) => {
                        if (valid) {
                         console.log();
                        } else {
                          console.log('error submit!!');
                          return false;
                        }
                 });
            this.$refs['ruleForm'].resetFields();
           this.dialogVisible = false 
      
        
           
        },
    },
    watch: {
        editdata(newv){
            this.editdatas = newv
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