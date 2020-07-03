<template>
  <div class="home">
<myhead bgc='#373d41'>
    <template v-slot:imgs>
      <img alt="Vue logo" src="~assets/logo.png"  >
    </template>
    <template v-slot:names>
      <p>电商后台管理系统</p>
    </template>
  </myhead> 
  </div>
</template>

<script>
// @ is an alias to /src
import myhead from 'components/myheader/myhead'
import mynav from 'components/myheader/mynav'
import mynavitem from 'components/myheader/mynavitem'
export default {
  name: 'Home',
  components: {
myhead,mynav,mynavitem
  }
}
</script>
<style lang="less">
    
</style>