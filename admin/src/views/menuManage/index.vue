<template>
  <div class="app-container">
    <el-row
      type="flex"
      justify="start"
      class="row-button marginbottom10"
    >
      <el-button
        type="primary"
        @click="showDialog()"
      >新增菜单</el-button>
    </el-row>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      top="10vh"
      width="50%"
      :before-close="handleClose"
    >
      <MyTwoColumForm
        :form="form"
        ref="myform"
        :formData="formData"
        :formItem="formItem"
        @submit="submit"
      > </MyTwoColumForm>
    </el-dialog>
    <tree-table
      :data="data"
      :eval-func="func"
      :eval-args="args"
      :expand-all="expandAll"
      @handleSelectionChange="handleSelectionChange"
      stripe
      border
    >
      <el-table-column
        label="菜单id"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="父级id"
        width="70"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.parentid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        width="50"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.sortnum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="菜单图标"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否显示"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.hidden }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="菜单路径"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="资源地址"
        align="center"
      >
        <!-- width="300" -->
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.component }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:sandybrown">{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="210"
        align="center"
      >
        <template slot-scope="scope">
          <el-button @click="showDialog(scope.row)">添加</el-button>
          <el-button @click="update(scope.row)">编辑</el-button>
          <el-button @click="deleteConfirm(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
  </div>
</template>

<script>
/**
  Auth: wangyifan
  Created: 2019/7/3-14:54
*/
import API from "@/api/api_menu";
import treeTable from "@/components/TreeTable";
import treeToArray from "@/components/eval.js";

import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";

export default {
  name: "MenuTreeTableDemo",
  components: { treeTable },
  data() {
    // 表单配置
    var form = {
      title: "",
      ref: "addmenu",
      showTitle: false,
      showUploadImg: true,
      labelWidth: px2rem(500),
      labelPositon: "left",
      width: "80%",
      style: "notprepend",
      column: 1,
      hasSubmit: true,
      imgPath: "",
      submitText: "提交",
      cancleText: "取消"
    };
    return {
      func: treeToArray,
      dialogTitle: "新增菜单",
      dialogVisible: false,
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该菜单, 是否继续?",
      form: form,
      formItem: [],
      formData: {},
      expandAll: false,
      sels: [],
      data: [
        {
          id: 1,
          title: "菜单名称1",
          parentid: 0,
          path: 100,
          remark: "无菜单一",
          children: [
            {
              id: 2,
              title: "菜单名称2",
              path: 10,
              remark: "无2",
              parentid: 1
            },
            {
              id: 3,
              title: "菜单名称3",
              path: 90,
              remark: "无",
              parentid: 1,

              children: [
                {
                  id: 4,
                  title: "菜单名称4",
                  path: 5,
                  remark: "无",
                  parentid: 3
                },
                {
                  id: 5,
                  title: "菜单名称5",
                  path: 10,
                  remark: "无222",
                  parentid: 3
                }
              ]
            }
          ]
        },
        {
          id: 2,
          title: "MUX SSS",
          parentid: 0,
          path: 100,
          remark: ""
        }
      ],
      args: [null, null, "title"],
      ids: ""
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    showDialog(row) {
      this.dialogTitle = "添加菜单";
      this.formInit();
      this.formData.parentid = !!row ? row.id : 0;
      this.dialogVisible = true;
    },
    update(row) {
      this.dialogTitle = "编辑菜单";
      this.formData = row;
      this.formData.parentid = !!row ? row.id : 0;
      this.dialogVisible = true;
    },
    //选中行，选择项发生改变时触发
    handleSelectionChange(val) {
      this.sels = val;
    },
    getMenuList() {
      let that = this;
      API.findMenuList()
        .then(function(res) {
          if (!!res && res.code == 20000) {
            that.data = res.data;
          }
        })
        .catch(function(error) {});
    },

    // 删除
    delete() {
      var _this = this;
      API.delMenu({ id: _this.ids })
        .then(res => {
          this.$notify({
            title: "提示",
            duration: "1000",
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "error"
          });
          if (!!res && res.code === 20000) {
            this.ids = null;
            this.getMenuList();
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    // 批量.删除
    deleteBatch() {
      var id = [];
      this.multipleSelection.forEach(item => {
        id.push(item.id);
      });
      this.ids = id.join();
      if (id.length > 0) {
        this.deleteConfirm({ id: this.ids });
      } else {
        this.$message({
          message: "请至少选择一个选项",
          type: "warning"
        });
      }
    },
    // 删除确认
    deleteConfirm(row) {
      var _this = this;
      _this.ids = row.id;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.delete, _this.cancle);
      }, 100);
    },
    // 取消删除
    cancle() {
      this.ids = null;
    },
    submit() {
      let params = this.formData;
      params.hidden = !!this.formData.hidden ? "0" : "1"; //hidden:true为0
      API.addMenu(params).then(res => {
        this.dialogVisible = false;
        this.$notify({
          title: "提示",
          duration: "1000",
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
        if (!!res && res.code === 20000) {
          this.getMenuList();
        }
      });
    },
    formInit(type, row) {
      this.formItem = getFormField("menu", "item");
      this.formData = !!row ? row : getFormField("menu", "data");
    },
    // 弹框关闭时的回调函数
    handleClose(done) {
      done();
    }
  }
};
</script>