<template>
  <div class="welcome">
    <div class="logo">
      <img src=".././assets/logo2.png" alt="" />
    </div>
    <div class="title">
      <p>索莱宝商城后台</p>
      <p>欢迎使用</p>
    </div>
  </div>
</template>
<style lang="less">
.el-main {
  position: relative;
  .welcome {
    position: absolute;
    top: 20%;
    left: 40%;
    .logo {
      width: 350px;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      text-align: center;
      font-family: "华文楷体";
      color: #fc0000;
      font-size: 25px;
    }
  }
}
</style>
<script>
export default {};
</script>
