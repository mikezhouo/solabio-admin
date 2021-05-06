<template>
  <div class="loginContain">
    <div class="loginBox">
      <!-- logo部分 -->
      <div class="logoImage">
        <img src=".././assets/logo.png" alt="" />
      </div>
      <!-- 登录表单部分 -->
      <el-form
        label-width="0"
        :model="loginRuleForm"
        ref="loginValidateForm"
        :rules="loginRules"
        class="loginRuleForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginRuleForm.username"
            autocomplete="off"
            prefix-icon="iconfont icon-adminer"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            autocomplete="off"
            v-model="loginRuleForm.password"
            prefix-icon="iconfont icon-mimasuo"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="formBtn">
          <el-button type="primary" @click="formSubmit">提交</el-button>
          <el-button @click="formReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { getDynamicRouterStyle } from '@/router';
export default {
  data() {
    return {
      loginRuleForm: {
        username: "康熙",
        password: "123456"
      },
      loginRules: {
        username: [{ required: true, message: "用户名不能为空" }],
        password: [{ required: true, message: "密码不能为空" }]
      }
    };
  },
  methods: {
    ...mapMutations(['getMuneRights','getLoginUserName']),
    formReset() {
      this.$refs.loginValidateForm.resetFields();
      console.log(111);
    },
    formSubmit() {
      this.$refs.loginValidateForm.validate(vaildate => {
        if (!vaildate) return;
        this.$http
          .post("login", this.loginRuleForm)
          .then(({ data }) => {
            console.log(data,6666)
            var { status, token, message, rights, name } = data;
            // 登录成功
            if (status === 200) {
              // 传递菜单权限列表数据
              this.getMuneRights(rights);
              // 传递登录成功用户名
              this.getLoginUserName(name);
              getDynamicRouterStyle();
              window.sessionStorage.setItem("token", token);
              // 跳转到主页home
              this.$router.push('/home')
              return this.$message({
                type: "success",
                message,
                center: true
              });
            } else {
              // 登录失败
              this.$message({
                type: "error",
                message,
                center: true
              }); 
            }
          })
          .catch(err => {
            alert("请求失败");
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.loginContain {
  background: url(".././assets/solarbio.jpg") no-repeat top;
  background-size: cover;
  height: 100%;
  .loginBox {
    width: 450px;
    height: 300px;
    border-radius: 4px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .logoImage {
      width: 100px;
      height: 80px;
      padding: 2px;
      box-shadow: 2px 2px 2px #ccc;
      border: 1px solid #ccc;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      background-color: #fff;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .loginRuleForm {
      width: 100%;
      padding: 0 50px;
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);
      .formBtn {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
