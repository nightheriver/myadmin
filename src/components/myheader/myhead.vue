<template>
<div class="header" :style="{ backgroundColor:bgc}">
  <div class="logo">
      <slot name="imgs"></slot>
  </div>
  <div class="names"  :style="{ color:fc}">
      <slot name="names"></slot>
  </div>
  
</div>
 
</template>

<script>
export default {
  name: 'myhead',
  props: {
    bgc: {
      type:String,
      default:'aqua'
    },
     fc: {
      type:String,
      default:'white'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
    height: 80px;
    background: aqua;
    display: flex;
    justify-content: center;
    align-items: center;
}
.header .logo img{
    height: 80px;
    
}
.header .logo{
 flex: 1;
}
.header .names{
  flex: 5;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
