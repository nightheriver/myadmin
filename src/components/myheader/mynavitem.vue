<template>
<div class="item"  @click="gos" :style="isac ? {backgroundColor:ac}:{backgroundColor:''}">
 <slot></slot>
</div>
 
</template>

<script>
export default {
  name: 'mynavitem',
  props: {
    paths:{
        type:String,
        default:'/'  
    },
    ac:{
        type:String,
        default:'red'
    } 
  },
  methods: {
      gos(){
          this.$router.push(this.paths)
          console.log(this.paths,this.$route.path)
      }
  },
  computed: {
      isac(){
          return this.$route.path.indexOf(this.paths)>-1
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item{
    flex: 1;
    margin: 0 10px;
    padding: 0 30px;
    height: 100%;
    line-height: 80px;
}

</style>
