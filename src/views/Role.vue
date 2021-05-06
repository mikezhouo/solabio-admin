<template>
  <div class="rolePage">
    <!-- 面包屑导航 -->
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户按钮 -->
    <el-row class="addUser">
      <el-col :span="6">
        <el-button type="primary">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="rolesList">
        <el-table-column type="expand" #default="propsIndo">
          <el-row
            v-for="(item1, index) in propsIndo.row.children"
            :key="item1.id"
            :class="[
              'bd-bottom',
              index == 0 ? 'bd-top' : '',
              'vertical_center'
            ]"
          >
            <!-- 一级权限 -->
            <el-col :span="5">
              <el-row>
                <el-tag type="success" closable>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-row>
            </el-col>
            <!-- 二三级权限 -->
            <el-col :span="19">
              <el-row
                v-for="(item2, index2) in item1.children ? item1.children : []"
                :key="item2.id"
                :class="[
                  index2 == item1.children.length - 1 ? '' : 'bd-bottom',
                  'vertical_center'
                ]"
              >
                <!-- 二级权限 -->
                <el-col :span="5">
                  <el-row>
                    <el-tag type="success" closable>{{
                      item2.authName
                    }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-row>
                </el-col>
                <!-- 三级权限 -->
                <el-col :span="19">
                  <el-row
                    v-for="item3 in item2.children ? item2.children : []"
                    :key="item3.id"
                  >
                    <el-tag type="info" closable>{{ item3.authName }}</el-tag>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" #default="propsIndo">
          <el-tooltip
            effect="dark"
            :enterable="false"
            content="分配权限"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="controlRole(propsIndo.row)"
            ></el-button>
          </el-tooltip>
          <el-button
            type="warning"
            icon="el-icon-share"
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog title="权限列表" :visible.sync="roleDialogVisible" width="50%" @close="deleteCheckNodeArr">
      <!-- 权限树形结构 -->
      <el-tree
        :data="treeList"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkNodeArr"
        :default-expand-all="true"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmChoose"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<style lang="less">
.addUser {
  margin-bottom: 10px;
}
.el-tag {
  margin: 10px 0;
}
.bd-top {
  border-top: 1px solid #ebeef5;
}
.bd-bottom {
  border-bottom: 1px solid #ebeef5;
}
.vertical_center {
  display: flex;
  align-items: center;
}
</style>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      // 角色列表数据
      rolesList: [],
      roleDialogVisible: false,
      treeList: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      checkNodeArr:[],
      rowRight:null
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 获取角色列表数据
    async getRolesList() {
      var { data: res } = await this.$http.get("/Roles/roles.json");
      console.log(res.data);
      if (res.meta.status != 200) {
        return this.$message({
          type: "error",
          message: "获取角色列表失败"
        });
      }
      // 获取角色列表数据成功
      this.rolesList = res.data;
    },
    // 控制分配权限按钮
    async controlRole(res) {
        console.log(res,111)
    // 每一行数据备份
      this.rowRight = res;
      //   发送树结构数据请求
      var { data: treeDate } = await this.$http.get("/TreeList/treeList.json");
      if (!treeDate.meta == 200) {
        return this.$message({
          type: "error",
          message: "获取树数据失败"
        });
      }
      this.treeList = treeDate.data;
    //   获取每一行选中权限
      this.getCheckNodeArr(this.rowRight,this.checkNodeArr)
      console.log(this.checkNodeArr,22222)
      this.roleDialogVisible = true;
    },
    // 获取树中选中节点数组
    getCheckNodeArr(node,arr) {
       if(!node.children) {
          return arr.push(node.id)
       }
       node.children.forEach(item => {
           this.getCheckNodeArr(item,arr)
       })
    },
    deleteCheckNodeArr() {
        this.checkNodeArr = []
    },
  async confirmChoose() {
        
       var confirm = await this.$confirm('此操作将修改权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).catch(err => err)
        if(confirm !== 'confirm') return this.$message({
            type:'error',
            message:'修改权限失败',
            center: true
        })
        this.$message({
            type:'success',
            message:'修改权限成功',
            center: true
        })
        this.roleDialogVisible = false;
    }

  }
};
</script>
