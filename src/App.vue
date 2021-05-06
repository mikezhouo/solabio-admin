<template>
  <div id="appLogin">
    <router-view></router-view>
  </div>
</template>

<script>
import { getDynamicRouterStyle } from '@/router';
export default {
  
  created() {
   getDynamicRouterStyle()
  }
}
</script>

<style>

</style>
