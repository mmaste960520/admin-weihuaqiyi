<template>
  <div
    class="list content-top-line user-list"
    v-loading="fullscreenLoading"
    element-loading-text="拼命加载中"
  >
    <el-row
      class="btn-group"
      :gutter="24"
    >
      <el-col
        :span="4"
        class="pull-left alignleft"
      >
        <el-button
          type="primary"
          size="mini"
          @click="showDialog"
        >
          添加
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="deleteBatch"
        >
          <!-- :disabled="resCode === 502 ? true:false" -->
          删除
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="exportUserList"
        >导出
        </el-button>
      </el-col>
      <el-col
        :span="20"
        class="pull-right alignright"
      >

        <MySearch
          class="pull-right search"
          :formData="searchFormData"
          :formItem="searchFormItem"
          @submit="searchSubmit"
        >
        </MySearch>
      </el-col>
    </el-row>
    <MyTable
      size="mini"
      :stripe="false"
      :border="false"
      :multiple="true"
      :operation="operation"
      :column="column"
      :data="data"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      :showImgColumn="true"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @delete="deleteConfirm"
      @update="update"
      @select="handleSelectionChange"
    >
    </MyTable>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      top="10vh"
      width="50%"
      :before-close="handleClose"
    >
      <MyForm
        :form="form"
        ref="myform"
        :formData="formData"
        :formItem="formItem"
        @selectChange="getselectChange"
        @submit="submit"
      > </MyForm>
    </el-dialog>
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    >
    </MyConfirm>
  </div>
</template>
<script>
import API from "@/api/api_user.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";

export default {
  name: "userList",
  data() {
    // 表单配置
    var form = {
      title: "",
      ref: "form1",
      showTitle: false,
      showUploadImg: true,
      labelWidth: px2rem(550),
      labelPositon: "right",
      width: "80%",
      style: "notprepend",
      column: 1,
      hasSubmit: true,
      imgPath: "",
      submitText: "提交",
      cancleText: "取消"
    };
    // 表格操作配置
    var operation = {
      nowPage: "userList",
      show: true,
      fixed: false,
      size: "mini",
      width: 120 + rem2px(px2rem(160)),
      minWidth: 500,
      label: "操作",
      btns: [
        {
          type: "text",
          size: "mini",
          content: "编辑",
          icon: "el-icon-edit-outline",
          handle: "update",
          class: "button-operator"
        },
        {
          type: "text",
          size: "mini",
          content: "删除",
          icon: "el-icon-delete",
          handle: "delete",
          class: "button-operator"
        }
      ]
    };
    return {
      user: JSON.parse(window.sessionStorage.getItem("access-user")),
      resCode: "",
      imgPath: "",
      // 加载loading初始化
      fullscreenLoading: false,
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该数据, 是否继续?",
      dialogTitle: "添加用户",
      dialogVisible: false,
      multipleSelection: [],
      ids: null,
      form: form,
      operation: operation, // 操作按钮
      column: [],
      data: [],
      formItem: [],
      formData: {},
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: "saveTask",
      searchFormData: {},
      searchFormItem: [],
      initFormData: {
        id: "",
        roleid: "",
        userName: "",
        sex: "男",
        passwd: "",
        phone: "",
        email: "",
        imgPath: ""
      }
    };
  },
  created() {
    this.fieldInit();
    this.formInit("add");
    this.searchFormInit();
    this.getData();
  },
  mounted() {
    this.resetForm();
  },
  methods: {
    getselectChange(val) {
      this.$set(this.formData, "role", val);
      this.getAllRole(this.formItem[3], "");
      this.formData.role = val;
    },
    // 每页显示条数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    fieldInit() {
      var column = getField("user");
      column.forEach(item => {
        if (!!item.width && item.width != "auto") {
          item.width = rem2px(px2rem(item.width));
        }
      });
      this.column = column;
    },
    formInit(type, row) {
      this.formItem = getFormField("user", "item");
      this.getAllRole(this.formItem[3], "");
      this.formData = !!row ? row : getFormField("user", "data");
      this.formItem[3].disabled = false;
    },
    searchFormInit() {
      this.searchFormItem = getSearchField("user", "item");
      this.getAllRole(this.searchFormItem[2], "searchtype");
      setTimeout(() => {
        var user = JSON.parse(window.sessionStorage.getItem("access-user"));
      }, 700);
      this.getDeviceType(this.searchFormItem[3]);
      this.searchFormData = getSearchField("user", "data");
    },
    initFormDataFun() {
      this.initFormData = {
        id: "",
        roleid: "",
        userName: "",
        sex: "男",
        passwd: "",
        phone: "",
        email: "",
        imgPath: ""
      };
    },
    // 添加数据
    showDialog() {
      this.formInit("add");
      this.initFormDataFun();
      this.formData = this.initFormData;
      this.dialogTitle = "添加用户";
      this.type = "addUser";
      this.dialogVisible = true;
    },
    // 更新数据
    update(row) {
      API.readPass({ pass: row.passwd }).then(res => {
        if (!!res && res.code === 20000 && !!res.data) {
          row.passwd = res.data;
        } else {
          row.passwd = row.passwd;
        }
        row.role = row.roleid + "&&" + row.rolename;
        this.formInit("update", row);
        this.dialogTitle = "编辑用户";
        this.type = "updateUserInfo";
        this.dialogVisible = true;
      });
    },
    // 提交数据
    submit() {
      window.sessionStorage.setItem("responseType", "json");
      var a = this.formData.imgPath;
      this.formData.imgPath = !!a ? a.replace(/\\/g, "/") : "";
      this.formData.sex = this.formData.sex === "女" ? "2" : "1";
      this.formData.roleid = this.formData.role.split("&&")[0];
      this.formData.rolename = this.formData.role.split("&&")[1];
      this.formData.deviceType = !!this.formData.deviceType
        ? this.formData.deviceType
        : "4";
      this.formData.userName = !!this.formData.userName
        ? this.formData.userName
        : "未命名";
      API[this.type](this.formData).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        //权限不足
        if (!!res && res.code === 20000) {
          this.dialogVisible = false;
          var that = this;
          setTimeout(function() {
            that.getData();
            that.formData = this._.forEach(this.formData, function(value, key) {
              value = "";
            });
          }, 1000);
        }
      });
    },
    // 弹框关闭时的回调函数
    handleClose(done) {
      done();
      this.data = JSON.parse(sessionStorage.getItem("userRow"));
    },
    // 获取用户类型列表
    getAllRole(obj, type) {
      if (type == "searchtype") {
        obj.options = [
          {
            value: "",
            label: "全部",
            id: ""
          }
        ];
      } else {
        obj.options = [];
      }
      API.findAllRole({}).then(res => {
        if (!!res && res.code === 20000) {
          for (var i = 0; i < res.data.length; i++) {
            let valuei = res.data[i].roleid + "&&" + res.data[i].rolename;
            obj.options.push({
              value: valuei,
              label: res.data[i].rolename,
              id: res.data[i].roleid,
              name: res.data[i].rolename
            });
          }
        }
      });
    },
    // 获取用户来源选项
    getDeviceType(obj) {
      obj.options = [
        {
          value: "0",
          label: "全部",
          id: "0"
        }
      ];
      API.getDeviceType().then(res => {
        if (!!res && res.code === 20000) {
          for (var i = 0; i < res.data.length; i++) {
            obj.options.push({
              value: res.data[i].id,
              label: res.data[i].name,
              id: res.data[i].id
            });
          }
        }
      });
    },
    // 获取数据
    getData() {
      var _this = this;
      var config = {
        page: _this.currentPage,
        size: _this.pageSize
      };
      // 添加查询字段
      config = $.extend(config, this.searchFormData);
      config.roleid = !!config.role ? parseInt(config.role.split("&&")[0]) : "";
      config.deviceType = !config.deviceType ? "0" : config.deviceType + "";
      this.fullscreenLoading = true;
      var user = JSON.parse(window.sessionStorage.getItem("access-user"));
      // if (!!user.roleid && user.roleid == "2") {
      //   config.roleid = "3";
      // }
      window.sessionStorage.setItem("responseType", "json");
      console.log(API);
      API.findUserList(config)
        .then(res => {
          this.resCode = res.code;
          if (!!res && res.code === 20011) {
            //登录已过期
            sessionStorage.removeItem("access-user");
            sessionStorage.removeItem("token");
            var that = this;
            setTimeout(function() {
              that.$router.push({ path: "/login" });
            }, 2000);
            return;
          }
          if (!!res && res.code === 20000 && res.data.total !== 0) {
            for (var i = 0; i < res.data.rows.length; i++) {
              res.data.rows[i].sexName =
                res.data.rows[i].sex == "2" ? "女" : "男";
              // res.data.rows[i].roleid =
              //   res.data.rows[i].roleid == 1
              //     ? "超级管理员"
              //     : res.data.rows[i].roleid == 2
              //     ? "一般管理员"
              //     : "普通用户";
              //用户来源 1.pc  2.ios  3.安卓 4.未识别
              res.data.rows[i].deviceTypeName =
                res.data.rows[i].deviceType == "1"
                  ? "pc"
                  : res.data.rows[i].deviceType == "2"
                  ? "ios"
                  : res.data.rows[i].deviceType == "3"
                  ? "android"
                  : "--";
            }
            window.sessionStorage.setItem(
              "userRow",
              JSON.stringify(res.data.rows)
            );
            this.data = res.data.rows;
            this.total = res.data.total;
          } else {
            this.$message({
              message:
                !!res && res.data.total === 0
                  ? "查询成功，暂无相关数据"
                  : res.message,
              type: !!res && res.code === 20000 ? "success" : "warning"
            });
          }
          this.fullscreenLoading = false;
        })
        .catch(err => {
          this.fullscreenLoading = false;
        });
    },
    // 删除
    delete() {
      var _this = this;
      API.delUser({ id: _this.ids })
        .then(res => {
          this.$notify({
            title: "提示",
            duration: "1000",
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "error"
          });
          if (!!res && res.code === 20000) {
            this.ids = null;
            this.getData();
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
    // 表单重置
    resetForm() {
      if (this.$refs["myform"] != undefined) {
        this.$refs["myform"].resetForm();
      }
    },
    // 获取选中行
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页切换
    handleCurrentChange(index) {
      this.currentPage = index;
      this.getData();
    },
    // 搜索
    searchSubmit() {
      this.currentPage = 1;
      this.getData();
    },
    exportUserList() {
      var id = [];
      this.multipleSelection.forEach(item => {
        id.push(item.id);
      });
      var ids = id.length > 0 ? id.join() : "";
      window.open(
        "http://221.11.60.14:9014/syx/user/downloadexcel?token=" +
          window.token +
          "&idList=" +
          ids
      );
    }
  }
};
</script> 
<style lang = "scss" scoped >
@import "@/assets/base/variables.scss";

button.el-button.pull-right.el-button--default {
  margin-top: 6px;
  margin-left: 10px;
  color: #fff;
}
.user-list .el-input-group__prepend {
  min-width: 60px;
}
.user-list label.el-form-item__label {
  text-align: center;
  min-width: 114px;
}
.avatar-uploader {
  margin-bottom: 20px;
  /* text-align: left; */
}
.el-form-item__content {
  /* text-align:left; */
}
</style > 
