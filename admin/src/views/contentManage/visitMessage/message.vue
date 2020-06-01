<template>
  <div
    class="list content-top-line"
    v-loading="fullscreenLoading"
    element-loading-text="拼命加载中"
  >
    <!-- 按钮操作 -->
    <el-row
      class="btn-group"
      :gutter="24"
    >
      <el-col
        :span="8"
        class="pull-left alignleft"
      >
      </el-col>
      <el-col
        :span="16"
        class="pull-right alignright"
      >
        <MySearch
          class="search"
          :formData="searchFormData"
          :formItem="searchFormItem"
          @submit="searchSubmit"
        ></MySearch>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
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
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
      @audit="audit"
      @select="handleSelectionChange"
    ></MyTable>
    <!-- @delete="deleteConfirm" -->
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
        @submit="submit"
      > </MyForm>
    </el-dialog>
    <!-- myconfirm -->
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
  </div>
</template>

<script>
import API from "@/api/api_message.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";
export default {
  name: "convenienceSearchList",
  data() {
    // 表单配置
    var form = {
      title: "",
      ref: "form1",
      showTitle: false,
      showUploadImg: false,
      labelWidth: px2rem(1100),
      labelPositon: "right",
      width: "80%",
      style: "prepend",
      column: 1,
      hasSubmit: true,
      imgPath: "",
      submitText: "提交",
      cancleText: "取消"
    };
    // 表格操作配置
    var operation = {
      nowPage: "convenienceSearchList",
      show: true,
      fixed: false,
      size: "mini",
      width: 120 + rem2px(px2rem(160)),
      minWidth: 100,
      label: "操作",
      btns: [
        // {
        //   type: "text",
        //   size: "mini",
        //   content: "删除",
        //   icon: "el-icon-delete",
        //   handle: "delete",
        //   class: "button-operator"
        // },
        {
          type: "text",
          size: "mini",
          content: "审核",
          icon: "el-icon-check",
          handle: "audit",
          class: "button-operator"
        }
      ]
    };
    return {
      fullscreenLoading: false,
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      dialogTitle: "添加",
      multipleSelection: [],
      ids: null,
      operation: operation, // 操作按钮
      column: [],
      data: [],
      form: form,
      formItem: [],
      formData: {},
      dialogTitle: "留言审核",
      dialogVisible: false,
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: "addhongselvyou",
      searchFormData: {},
      searchFormItem: [],
      menuId: this.$route.query.menuId
    };
  },
  created() {
    this.fieldInit();
    this.searchFormInit();
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 审核是否通过提交
    submit() {
      API.auditMessage(this.formData)
        .then(res => {
          if (!!res && res.code === 20000) {
            this.ids = null;
            this.dialogVisible = false;
            this.getData();
          } else {
            this.$notify({
              title: "提示",
              duration: "1000",
              message: res.message,
              type: !!res && res.code === 20000 ? "success" : "error"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    formInit(row) {
      this.formItem = getFormField("messageAudit", "item");
      this.formData = !!row ? row : getFormField("messageAudit", "data");
      this.formData.status = !!this.formData.status
        ? this.formData.status
        : "0";
    },
    // 弹框关闭时的回调函数
    handleClose(done) {
      done();
    },
    // 删除确认
    deleteConfirm(row) {
      var _this = this;
      _this.ids = row.id;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.delete, _this.cancle);
      }, 100);
    },

    // 删除
    delete() {
      var _this = this;
      API.delAPI({ id: _this.ids })
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
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    audit(row) {
      this.formInit(row);
      this.dialogTitle = "留言审核";
      this.dialogVisible = true;
    },
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    },
    fieldInit() {
      // 获取字段
      var column = getField("messageList");
      column.forEach(item => {
        if (!!item.width && item.width != "auto") {
          item.width = rem2px(px2rem(item.width));
        }
      });
      column = this._.filter(column, function(o) {
        return !(o.prop === "replyMessage" || o.prop === "replyStatusName");
      });
      this.column = column;
    },
    // 搜索表单数据初始化
    searchFormInit() {
      this.searchFormItem = getSearchField("visitMessage", "item");
      this.searchFormData = getSearchField("visitMessage", "data");
    },
    // 获取数据
    getData() {
      var _this = this;
      var config = {
        start: _this.currentPage,
        size: _this.pageSize
      };
      // 添加查询字段
      config = $.extend(config, this.searchFormData);
      window.sessionStorage.setItem("responseType", "json");
      this.fullscreenLoading = true;
      // 接口调用
      API.findMessageList(config)
        .then(res => {
           this.fullscreenLoading = false;
          if (
            !!res &&
            res.code === 20000 &&
            !!res.data &&
            res.data[0].countNum !== 0
          ) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].statusName =
                res.data[i].status == "1" ? "通过" : "未通过";
              if(res.data[i].status == null){//未审核
                res.data[i].statusName = "未审核"
              }
            }
            this.data = res.data;
            this.total = !res.data[0] ? 0 : res.data[0].countNum;
          } else {
            this.$message({
              message:
                !!res && res.data[0].countNum === 0
                  ? "查询成功，暂无相关数据"
                  : res.message,
              type: !!res && res.code === 20000 ? "success" : "warning"
            });
          }

        })
        .catch(err => {
           this.fullscreenLoading = false;
          console.log(err);
        });
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
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";
</style>
