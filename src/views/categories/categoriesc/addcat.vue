<template>
    <div class="addcat">
        <el-dialog
        @closed='closed'
        title="编辑分类"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">

                    <el-form   ref="ruleForm" label-width="80px" class="demo-ruleForm from">
                        <el-form-item  label="分类名称"  >
                            <el-input  v-model="catname" ></el-input>
                        </el-form-item> 
                        <el-form-item>
                            <div class="block">
                                    <span class="demonstration">单选选择任意一级选项</span>
                                    <el-cascader
                                        ref="cas"
                                        :options="adddatas"
                                        :props="props"
                                        @change ='getarr'
                                        clearable></el-cascader>
                                </div>
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
import {addcategories} from 'network/api'
export default {
  name: 'addcat',
  props:{
      adddata:{
           type:Array,
          default(){
              return []
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
          adddatas:[],
          checked:[],
          catname:'',
          dialogVisible:false,
     
           props:{
               checkStrictly:true,
               value:'cat_id',
               label:'cat_name'
           }
      }
    },
   created() {
    },
    methods: {
        getarr(data){
            console.log(data);
            this.checked = data
        },
       async editcat(id){
        //    const data = await editcategories(id,cat_name)
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
           const length = this.checked.length
           const cat_pid = length===0? `0`:this.checked[length-1]
           const cat_name = this.catname 
           console.log(cat_name);
           
           const cat_level =''+length
          const data = await addcategories(cat_pid,cat_name,cat_level)
          console.log(data);
          

           
            if(data.meta.status !== 201){
                this.$message.error(data.meta.msg)
                return
            }
            this.$message.success(data.meta.msg)
            this.dialogVisible = false 
            this.$emit('update') 
        },
        closed(){
            // this.adddatas =[]
             this.$emit('msgs')
             this.$refs.cas.$refs.panel.clearCheckedNodes()
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
        adddata(newv){
            let arrs = JSON.parse(JSON.stringify(newv))
            arrs.forEach(item => {
                item.children.forEach(itemc => {
                    itemc.children=null
                });
            });
            
            this.adddatas = arrs
            
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