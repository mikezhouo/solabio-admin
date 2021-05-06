<template>
  <div class="rightPage">
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="rightsList" style="width: 100%" stripe border>
        <el-table-column type="index" width="80" label="#" align="center"> </el-table-column>
        <el-table-column prop="authname" label="权限名称" width="200" align="center">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="220" align="center">
        </el-table-column>
        <el-table-column prop="level" label="级别" #default="scopeProps" align="center">
          <el-tag type="primary" plain v-if="scopeProps.row.level == 1">一级</el-tag>
          <el-tag type="success" plain v-else-if="scopeProps.row.level == 2">二级</el-tag>
          <el-tag type="info" plain v-else>三级</el-tag>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    // 获取权限列表数据
    async getRightsList() {
      var { data: res } = await this.$http.get("/Rights/rights.json");
      console.log(res);
      if (res.meta.status != 200) {
        return this.$message({
          type: "error",
          message: "请求权限列表失败"
        });
      }
      //   请求成功
      this.rightsList = res.data;
    }
  }
};
</script>

<style lang="less" scoped></style>
