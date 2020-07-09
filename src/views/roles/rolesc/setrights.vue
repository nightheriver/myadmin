<template>


<div>
<el-dialog
  @closed='closed'
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">  
<el-tree
  :data="rightstree"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :default-checked-keys ="defultarr"	
  :props="defaultProps">
</el-tree>

    <el-button @click="qx">取 消</el-button>
    <el-button type="primary" @click="qd">确 定</el-button>
</el-dialog>   
</div> 
</template>
<script>
import {getRight,getRoles,allotrights} from 'network/api';

  export default {
       name: 'setrights',
  props:{
      roleslist:{
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
        dialogVisible: false,
        checkAll: false,
        checkedCities: [],
        rightslist: [],
    
        narr:[],

        rightstree:[],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        list:{},
        defultarr:[],

      };
    },
   async created() {
        const data = await getRight('list')
        const datas = await getRight('tree')
        // this.rightslist = data.data
       
        console.log(datas.data);
        this.rightstree = datas.data
        this.narr = data.data.map((item,index)=>{
                return item = item.authName
          })
        // const datass = await  getRoles()
        // console.log(datass.data);
            this.list = this.roleslist
        console.log(this.list);
    
        
    },
    methods: {
    // 获取需要设置的权限
    getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys([],true));
        console.log(111);
        
      },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      closed(){
        this.defultarr = [];
        
        this.$emit('deletarr') 
        this.$refs.tree.setCheckedKeys([])
        },
      qx(){
           this.dialogVisible = false  
        },
      async qd(){
       const {getCheckedKeys,getHalfCheckedKeys} = this.$refs.tree;
       let  newarr = [ ...getCheckedKeys(),...getHalfCheckedKeys()].join(',')
       const roleId = this.roleslist.id;
       const rids = newarr;
        const data = await allotrights(roleId,rids)
               if(data.meta.status !== 200){
             this.$message.error(data.meta.msg)
             return
        }
        this.$message.success(data.meta.msg)
        this.dialogVisible = false  
        this.$emit('update')
        },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([]);
      },
      getdefkey(obj,arr){
          if(!obj.children){     
              arr.push(obj.id)

            return arr
          }
            obj.children.forEach(item => {
              this.getdefkey(item,arr)
            });
      }
    },
    watch: {
        roleslist(newv){
            this.list = newv;
            let arr = []
            this.getdefkey(newv,arr)
            this.defultarr = arr
            
        },
    
     
  
      
    },
    computed:{
    }
  };

</script>
<style lang="less">
.rolesr{
 .el-row{
padding: 6px;
   display: flex;
   align-items: center;
   border-bottom: 1px solid #eee;
 } 
 .row1:last-child{
     border-bottom:none;
 }
  .row{
      border-bottom:none;
  }
  .rows{
    border-top:1px solid #eee ;
  }
  .cz{
      border-bottom:none;
  }
  }
  .boxs{
      border: 1px solid rebeccapurple;
  }
   .boxs>div{
      border: 1px solid red;
  }
   .boxs>div>div{
        border: 1px solid gold;
   }
</style>