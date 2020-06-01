<template>
  <div class="usercenter margintop50">
    <MyTwoColumForm
      :form="form"
      ref="adduserForm"
      :formData="formData"
      :formItem="formItem"
      @imgPath="getImgPath"
      @editorFun="getEditorFun"
      @returnFun="getReturnFun"
      @submit="submit"
    > </MyTwoColumForm>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import API from "@/api/api_user.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
export default {
  computed: {
    ...mapGetters(["sidebar", "name", "avatar", "device", "introduction"])
  },
  data() {
    var form = {
      showFormBorder: false,
      title: "用户管理-添加",
      ref: "twocolumform",
      showTitle: false,
      disabled: true,
      showUploadImg: false,
      showImg: true,
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
      showReturnBtn: true,
      returnButtonText: "返回",
      disabeledButtonText: "编辑",
      submitText: "确认修改",
      cancleText: "取消"
    };
    return {
      form: form,
      formItem: [],
      formData: {},
      rolename: ["", "admin", "校长", "教务", "教师", "学员", "会员", "粉丝"],
      userNoImg: require("@/assets/img/noImg.png")
    };
  },
  created() {
    this.showDialog();
  },
  methods: {
    getEditorFun() {
      this.form.disabled = false;
    },
    getReturnFun() {
      this.form.disabled = true;
    },
    getImgPath(val) {
      this.formData.imgPath = val;
      this.formData.avatar = val;
    },
    formInit() {
      this.formItem = getFormField("user", "item");
      this.getAllRole(this.formItem[3], "");
      this.$store.dispatch("GetUserInfo").then(res => {
        let userInfo = res.data.data.user;
        this.userInfo = userInfo;
        console.log(userInfo);
        userInfo.role = userInfo.roleid + "&&" + userInfo.rolename;
        this.formData = !!userInfo ? userInfo : getFormField("user", "data");
        this.form.imgPath = userInfo.imgPath;
        if (userInfo.roleid == 1) {
          this.formItem[3].disabled = false;
        } else {
          this.formItem[3].disabled = true;
        }
      });
    },
    showDialog() {
      this.formInit();
      this.type = "updateUserInfo";
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
    }
  }
};
</script>
<style lang="scss" scoped>
.usercenter {
  width: 90%;
  margin: 50px auto 10px;
}
</style>