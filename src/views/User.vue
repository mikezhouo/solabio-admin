<template>
  <div class="userPage">
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索区 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <div>
            <el-input
              placeholder="请输入内容"
              v-model="searchInfo"
              class="input-with-select"
              clearable
              @clear="clearSearch"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addClient" v-permit="{action:'add'}">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户表格区域 -->
      <el-row>
        <el-table :data="tabList" style="width: 100%" :stripe="true">
          <el-table-column type="index" width="50" label="#"> </el-table-column>
          <el-table-column prop="username" label="用户名" width="100">
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" width="100">
          </el-table-column>
          <el-table-column prop="eamil" label="邮箱"> </el-table-column>
          <el-table-column label="当前状态" width="100" #default="propsObj">
            <el-switch
              v-model="propsObj.row.ng_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch"
            >
            </el-switch>
          </el-table-column>
          <el-table-column prop="role_name" label="权限" width="100">
          </el-table-column>
          <el-table-column label="操作" #default="dataInfo">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-permit="{action:'post',effect:'disabled'}"
            ></el-button>
            <!-- 删除用户按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeClient(dataInfo.row.id)"
              v-permit="{action:'delete',effect:'disabled'}"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="assignRole(dataInfo.row)"
                v-permit="{action:'put',effect:'disabled'}"
              ></el-button>
            </el-tooltip>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页区域 -->
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 用户添加的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addClientDisplay" width="50%">
      <!-- 表单验证 -->
      <el-form
        :model="addClientForm"
        status-icon
        :rules="addClientRules"
        ref="addRuleForm"
        label-width="80px"
        hide-required-asterisk
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="addClientForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input
            v-model.number="addClientForm.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="eamil">
          <el-input
            type="eamil"
            v-model="addClientForm.eamil"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="restForm">取 消</el-button>
        <el-button type="primary" @click="checkOutClient">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="assginDialogVisible" width="50%">
      <p>当前用户：{{ info.username }}</p>
      <p>当前角色: {{ info.role }}</p>
      <!-- 选择角色区域 -->
      <el-select v-model="RoleValue" placeholder="请选择">
        <el-option
          v-for="item in tabList"
          :key="item.id"
          :label="item.role_name"
          :value="item.role_name"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assginDialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmAssign">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.el-pagination {
  margin-top: 15px;
}
.el-dialog {
  .el-input {
    width: 85%;
  }
}
</style>
<script>
// 引入验证规则
import { validatePass, validatePass2 } from ".././assets/tool.js";
export default {
  data() {
    return {
      searchInfo: "",
      tabList: [],
      total: 0,
      currentPage: null,
      addClientDisplay: false,
      addClientForm: {
        username: "",
        mobile: "",
        eamil: ""
      },
      addClientRules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        mobile: [{ validator: validatePass2, trigger: "blur" }],
        eamil: [{ required: true, message: "请输入邮箱名", trigger: "blur" }]
      },
      assginDialogVisible: false,
      info: {
        username: "",
        role: ""
      },
      RoleValue: "",
      rowDate: null
    };
  },
  created() {
    this.createTab();
  },
  methods: {
    // 发起用户表单数据请求
    async createTab() {
      var { data: tab } = await this.$http.get("TableList/tableList.json");
      console.log(tab, 1112);
      //   获取数据成功存储到tabList
      if (tab.meta.status == 200) {
        this.tabList = tab.data.users;
        this.total = tab.data.total;
        this.currentPage = tab.data.pagenum;
        return;
      }
      return this.$message({
        type: "error",
        message: "获取用户接口失败",
        center: true
      });
    },
    // pageSize 改变时会触发
    handleSizeChange(newsize) {
      console.log("newsize" + newsize);
    },
    // currentPage 改变时会触发
    handleCurrentChange(currentvalue) {
      console.log("currentvalue" + currentvalue);
    },
    // 修改开关状态
    changeSwitch() {
      //  发送请求修改接口
      this.$message({
        type: "success",
        message: "更改状态成功",
        center: true
      });
    },
    // 搜索功能
    search() {
      this.tabList = this.tabList.filter(
        item =>
          item.username.includes(this.searchInfo) ||
          item.role_name.includes(this.searchInfo)
      );
    },
    // 清空搜索框
    clearSearch() {
      this.createTab();
    },
    // 添加用户按钮,弹出框出现
    addClient() {
      this.addClientDisplay = true;
    },
    // 重置表单
    restForm() {
      this.addClientDisplay = false;
      this.$refs.addRuleForm.resetFields();
    },
    // 确定创建用户
    checkOutClient() {
      this.$refs.addRuleForm.validate(vaild => {
        console.log(vaild);
      });
      this.restForm();
    },
    // 删除消息提示
    async removeClient(id) {
      console.log(id);
      var resultInfo = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      console.log(resultInfo);
      if (resultInfo != "confirm")
        return this.$message({
          type: "info",
          message: "已取消删除"
        });
      // 确定删除
      var removeIndex = this.tabList.findIndex(item => item.id == id);
      console.log(removeIndex);
      this.tabList.splice(removeIndex, 1);
      return this.$message({
        type: "success",
        message: "删除成功!"
      });
    },
    // 分配角色
    assignRole(res) {
      // 备份数据
      this.rowDate = res;
      console.log(res, 4444);
      this.info.username = res.username;
      this.info.role = res.role_name;
      this.RoleValue = res.role_name;
      this.assginDialogVisible = true;
    },
    // 确认分配角色修改
    async confirmAssign() {
      if (this.RoleValue && this.RoleValue != this.rowDate.role_name) {
        var confirm = await this.$confirm(
          "此操作将修改角色信息, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).catch(err => err);
        console.log(confirm);
        if (confirm === "confirm") {
           this.$message({
            type: "success",
            message: "分配角色成功",
            center: true
          });
          this.assginDialogVisible = false;
        } else {
          this.assginDialogVisible = false;
        }


        return;
      }
      this.$message({
        type: "error",
        message: "分配角色失败",
        center: true
      });
      this.assginDialogVisible = false;
    }
  }
};
</script>
