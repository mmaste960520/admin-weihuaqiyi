<template>
  <div
    class="content-top-line rights-box"
    v-loading="fullscreenLoading"
  >
    <div
      class="grid-content bg-purple"
      v-for="(item,index) in pageItem"
      :key="index"
    >
      <el-row class="alignleft">
        <img
          style="vertical-align:middle;"
          :src="item.imgIcon"
          alt="图片加载失败"
        > {{item.title}}
      </el-row>
      <el-row
        class="border-all-grey"
        :class="{ 'first-row': index===0}"
      >
        <template v-if=" !!item.radio && item.radio.length > 0 && index===0">
          <el-row class="rights-radio-bg">
            <el-radio-group v-model="item.radioValue">
              <el-radio
                v-for="(radioitem,index) in item.radio"
                style="margin:0px 10px;"
                :key="index"
                :value="radioitem.value"
                :label="radioitem.label"
                :disabled="radioitem.disabled"
              >{{radioitem.value}}</el-radio>
            </el-radio-group>
          </el-row>
        </template>
        <template v-if=" !!item.radio && item.radio.length > 0 && index===1">
          <el-row class="rights-radio-bg">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选（超级管理员） &nbsp;&nbsp; 全部查看（一般用户）</el-checkbox>
          </el-row>
        </template>
        <el-row
          :gutter="24"
          class="main-conent-input200"
        >
          <MySearch
            v-if="index===1"
            class="search"
            :formData="item.formData"
            :formItem="item.formInfo"
          ></MySearch>
        </el-row>
      </el-row>
    </div>
    <el-row
      :gutter="20"
      style="margin:50px 0px;"
    >
      <el-button
        size="small"
        type="danger"
        @click="addRightsSubmit"
      >提交</el-button>
      <i style="margin:0px 20px;"></i>
      <el-button
        size="small"
        type="danger"
        @click="$router.go(-1)"
      >返回</el-button>
    </el-row>
  </div>
</template>
<script>
import API from "@/api/api_rights";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { constants } from "fs";
export default {
  name: "addRights",
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      fullscreenLoading: false,
      submitData: {},
      roleid: "",
      pageItem: [
        {
          title: "权限设置",
          imgIcon: require("@/assets/img/rights/rights.png"),
          radio: [
            { label: "1", name: "role", value: "超级管理员" },
            { label: "2", name: "role", value: "一般管理员" },
            { label: "3", name: "role", value: "普通用户" }
          ],
          radioValue: !!this.$route.query.roleid
            ? this.$route.query.roleid + ""
            : "2",
          formInfo: [],
          formData: {
            buttonShow: false,
            userName: !!this.$route.query.userName
              ? this.$route.query.userName
              : "",
            passwd: "",
            departmentid: !!this.$route.query.departmentid
              ? this.$route.query.departmentid
              : ""
          }
        },
        {
          title: "操作权限管理",
          imgIcon: require("@/assets/img/rights/operator.png"),
          radio: [
            {
              label: "全选（超级管理员）",
              name: "operator",
              value: "全选（超级管理员）"
            },
            {
              label: "全部查看（一般用户）",
              name: "operator",
              value: "全部查看（一般用户）"
            }
          ],
          radioValue: "",
          formData: {
            buttonShow: false,
            tbMenusFilter: []
          },
          formInfo: [
            {
              type: "checkbox",
              name: "tbMenusFilter",
              label: "操作权限筛选:",
              show: true,
              value: [],
              options: []
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  computed: {
    setPermissionId() {
      return this.pageItem[0].radioValue;
    },
    setUserName() {
      return this.$route.query;
    }
  },
  watch: {
    setPermissionId(val) {
      this.roleid = val;
      this.findPermissionListById();
    },
    setUserName(val) {
      this.pageItem[0].radioValue = !!val.roleid ? val.roleid + "" : "2";
    }
  },
  created() {
    this.roleid = this.pageItem[0].radioValue;
    this.findPermissionListById();
  },
  methods: {
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    },
    addRightsSubmit() {
      var menuArr = [];
      var optionsArr = this.pageItem[1].formInfo[0].options;
      var checkidArr = this.pageItem[1].formData.tbMenusFilter;
      for (let j = 0; j < checkidArr.length; j++) {
        for (let i = 0; i < optionsArr.length; i++) {
          if (checkidArr[j] == optionsArr[i].id) {
            optionsArr[i].isflag = true;
            menuArr.push(optionsArr[i]);
          }
        }
      }
      var params = {
        user: {
          id: !!this.$route.query.id ? this.$route.query.id : "",
          roleid: this.pageItem[0].radioValue
        },
        tbMenus: menuArr
      };
      this.fullscreenLoading = true;
      API.addAPI(params).then(res => {
        this.fullscreenLoading = false;
        this.$message({
          message:
            !!res && res.code === 20001 && this.pageItem[0].radioValue == "1"
              ? "超级管理员权限添加失败,系统可能已有超级管理员！"
              : !!res &&
                res.code === 20001 &&
                this.pageItem[0].radioValue == "2"
              ? "一般管理员权限添加失败！"
              : !!res &&
                res.code === 20001 &&
                this.pageItem[0].radioValue == "2"
              ? "普通用户权限添加失败！"
              : res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
        if (!!res && res.code === 20000) {
          this.$router.go(-1);
        }
      });
    },
    findPermissionListById() {
      this.pageItem[1].formInfo[0].options = [];
      this.pageItem[1].formInfo[0].options.length = 0;
      API.findPermissionList({
        roleid:
          !!this.roleid && this.roleid !== "undefined"
            ? this.roleid
            : "2"
      }).then(res => {
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
        if (!!res && res.code === 20000) {
          var permissionArr = [];
          for (var i = 0; i < res.data.length; i++) {
            permissionArr.push({
              menuId: res.data[i].menuId,
              value: res.data[i].id,
              id: res.data[i].menuId,
              name: res.data[i].title,
              title: res.data[i].title,
              label: res.data[i].name,
              parentid: res.data[i].parentid,
              isflag: res.data[i].isflag,
              href: res.data[i].href,
              perms: res.data[i].perms,
              icon: res.data[i].icon
            });
          }
          this.pageItem[1].formInfo[0].options = permissionArr;
          this.pageItem[1].formData.tbMenusFilter = [];
          this.pageItem[1].formData.tbMenusFilter.length = 0;
          for (var i = 0; i < permissionArr.length; i++) {
            if (permissionArr[i].isflag === true) {
              this.pageItem[1].formData.tbMenusFilter.push(permissionArr[i].id);
            }
          }
        } else {
          this.$notify({
            title: "提示",
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "warning"
          });
        }
      });
    },
    handleCheckAllChange(val) {
      for (var i = 0; i < this.pageItem[1].formInfo[0].options.length; i++) {
        this.pageItem[1].formInfo[0].options[i].isflag = val;
        if (this.pageItem[1].formInfo[0].options[i].isflag === true) {
          this.pageItem[1].formData.tbMenusFilter.push(
            this.pageItem[1].formInfo[0].options[i].id
          );
        } else {
          this.pageItem[1].formData.tbMenusFilter = [];
          this.pageItem[1].formData.tbMenusFilter.length = 0;
        }
      }
      this.isIndeterminate = false;
    }
  }
};
</script>
<style>
.border-all-grey {
  border: 1px solid #ececec;
  padding: 10px 20px;
  margin-top: 10px;
  margin-bottom: 25px;
}

.rights-radio-bg {
  background: #ececec;
  height: 35px;
  line-height: 35px;
}
</style>
