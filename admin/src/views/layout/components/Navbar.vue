<template>
  <div class="navbar">
    <div class="right-menu">
      <div class="topbar-account">
        <span class="user-info">
          <img
            class="user-img"
            :src="avatar"
            alt=""
          >
          <span v-show="userInfo.sex == '2'">您好！ {{name}} 女士</span>
          <span v-show="userInfo.sex != '2'">您好！ {{name}} 先生</span>
        </span>
        <span class="user-set-up">
          <i
            style="font-size:15px;vertical-align:middle;"
            class="fa fa-refresh cursorpointer marginleft5"
            @click="$router.go(0)"
          ></i>
          <i
            style="font-size:15px;vertical-align:middle;"
            @click="gotoUrl('/login')"
            class="fa fa-power-off cursorpointer marginleft5"
          ></i>
        </span>
      </div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      top="10vh"
      width="50%"
      :before-close="handleClose"
    >
      <MyTwoColumForm
        :form="form"
        ref="adduserForm"
        :formData="formData"
        :formItem="formItem"
        @submit="submit"
      > </MyTwoColumForm>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";

import API from "@/api/api_user.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";

export default {
  components: {
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "device", "introduction"])
  },
  data() {
    var form = {
      showFormBorder: false,
      title: "用户管理-添加",
      ref: "twocolumform",
      showTitle: false,
      showUploadImg: false,
      showImg: false,
      showMp4: false,
      showDownloadPath: false,
      title: "",
      ref: "adduserForm",
      showTitle: false,
      showUploadImg: true,
      labelWidth: px2rem(520),
      labelPositon: "right",
      width: "90%",
      style: "notprepend",
      column: 1,
      hasSubmit: true,
      imgPath: "",
      submitText: "提交",
      cancleText: "取消"
    };
    return {
      userInfo: {
        userName: "wangyifan",
        sex: "1"
      },
      form: form,
      dialogTitle: "添加用户",
      dialogVisible: false,
      formItem: [],
      formData: {},
      rolename: ["", "admin", "校长", "教务", "教师", "学员", "会员", "粉丝"],
      userNoImg: require("@/assets/img/noImg.png")
    };
  },
  created() {
    this.formInit();
  },
  methods: {
    gotoUrl(path, query) {
    //    this.$store.dispatch('LogOut').then(() => {
    //      window.sessionStorage.clear();
    //     location.reload()// In order to re-instantiate the vue-router object to avoid bugs
    //   // this.$router.push({
    //   //   path: !!path ? path : "",
    //   //   query: !!query ? query : ""
    //   // });
    //  })
      this.$store.dispatch("FedLogOut").then(() => {
        location.reload()
        // Message.error(err || "Verification failed, please login again");
        // next({ path: "/" });
           // this.$router.push({
    //   //   path: !!path ? path : "",
    //   //   query: !!query ? query : ""
    //   // });
      });
    },
    formInit() {
      this.formItem = getFormField("user", "item");
      this.$store.dispatch("GetUserInfo").then(res => {
        let userInfo = res.data.data;
        this.userInfo = userInfo;
        this.formData = !!userInfo ? userInfo : getFormField("user", "data");
      });
    },
    handleClose(done) {
      done();
    },
    // 添加数据
    showDialog() {
      this.formInit();
      this.dialogTitle = "编辑个人信息";
      this.type = "updateUserInfo";
      this.dialogVisible = true;
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    // 提交数据
    submit() {
      window.sessionStorage.setItem("responseType", "json");
      var submitParams = this.formData;
      API[this.type](submitParams).then(res => {
        //权限不足
        if (!!res && res.code === 20011) {
          this.$message({
            message: res.message + ",请重新登录",
            type: !!res && res.code === 20000 ? "success" : "warning"
          });
          return;
        }
        this.$notify({
          title: "提示",
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        if (!!res && res.code === 20000) {
          this.dialogVisible = false;
          var that = this;
          setTimeout(function() {
            if (!!res.message && res.message === "修改成功") {
              if (
                that.formData.id ===
                JSON.parse(sessionStorage.getItem("access-user")).id
              ) {
                that.$notify({
                  title: "提示",
                  message: "当前登录用户信息已修改，请重新登录",
                  type: "warning",
                  duration: 5000
                });
              }
            }
          }, 1000);
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 100;
  left: 0px;
  background: url("../../../assets/img/access/header_bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 0px;
  height: 65px;
  .topbar-account {
    float: right;
    color: #fff;
    opacity: 0.8;
    padding-right: 12px;
    margin-top: 6px;
    font-size: 14px;
  }
  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
