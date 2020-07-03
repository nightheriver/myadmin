<template>
<div class="navs">
    <slot></slot>
</div>
 
</template>

<script>
export default {
  name: 'myhead',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navs{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex: 12;
    height: 100%;
}
</style>
