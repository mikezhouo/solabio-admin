<template>
  <div class="homePage">
    <el-container>
      <!-- 头部 -->
      <el-header style="height:50px;">
        <div class="logo">
          <img src=".././assets/logo2.png" alt="" />
        </div>
        <div class="header-title">
          <span>索莱宝商城后台</span>
        </div>
        <div class="btns">
          <el-button type="info" icon="iconfont icon-adminer"
            >欢迎{{username}}登录</el-button
          >
          <el-button type="info" @click="LogOut" icon="iconfont icon-dianyuan"
            >退出</el-button
          >
        </div>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="flag ? '' : '200px'">
          <el-menu
            :default-active="receiveColor"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#d60b15"
            :collapse="flag"
            :collapse-transition="false"
            router
          >
            <!-- 控制折叠 -->
            <div class="controlSection" @click="change">
              <span>|||</span>
            </div>
            <!-- 第一级导航 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in muneListDate"
              :key="item.id"
            >
              <!-- 第一级导航标题 -->
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 第一级导航子选项-->
              <el-menu-item
                :index="'/home/' + value.path"
                v-for="value in item.children"
                :key="value.id"
                @click="chooseColor('/home/' + value.path)"
              >
                <i :class="'iconfont ' + iconlist[item.id]"></i>
                <span class="distance">{{ value.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 内容区 -->
        <el-main>
          <!-- 子路由内容为止 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      // 导航菜单数据
      // 图标数据
      iconlist: {
        125: "icon-adminer",
        126: "icon-mimasuo",
        127: "icon-daibanrenwu",
        128: "icon-riqi",
        129: "icon-yanzhengma"
      },
      flag: false,
      receiveColor:'',
      username:'',
      muneListDate:[]
    };
  },
  created() {
    this.muneListDate = this.muneRights;
    this.username = this.loginName;
    this.receiveColor = window.sessionStorage.getItem('choose');
  },
  computed:{
    ...mapState(['muneRights','loginName'])
  },
  methods: {
    // 登录接口
    LogOut() {
      // 清空vuex，sessionStorage中数据
      window.sessionStorage.clear();
      location.reload();
      this.$router.push("/login");
    },
    change() {
      this.flag = !this.flag;
    },
    chooseColor(choose) {
      window.sessionStorage.setItem('choose',choose)
      this.receiveColor = choose;
      console.log(this.receiveColor)
    }
  }
};
</script>

<style lang="less" scoped>
.homePage {
  background-color: #fff;
  height: 100%;
  .el-menu {
    border-right: none;
  }
}
.controlSection {
  font-size: 15px;
  color: #ccc;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  background: rgba(254, 0, 39, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .header-title {
    color: #f9fffc;
    font-weight: bold;
  }
  .btns {
    .el-button {
      background: rgba(254, 0, 39, 0.7);
      border: none;
    }
  }
}
.el-aside {
  background-color: #2d2d2d;
}
.el-main {
  background-color: #f0f0f0;
}
.distance {
  margin-left: 6px;
}
</style>
