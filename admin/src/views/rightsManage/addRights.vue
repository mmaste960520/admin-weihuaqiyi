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
          <el-form
            :model="roleInfo"
            :rules="rules"
            ref="roleForm"
            label-position="left"
            label-width="120px"
          >
            <el-form-item
              label="角色名称："
              prop="rolename"
            >
              <el-input
                v-model="roleInfo.rolename"
                @focus="myFocus()"
                @blur="myBlur()"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="角色描述："
              prop="roleremark"
            >
              <el-input v-model="roleInfo.roleremark"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-if=" !!item.radio && item.radio.length > 0 && index===1">
          <el-row class="rights-radio-bg">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选（超级管理员）</el-checkbox>
            <!--  &nbsp;&nbsp; 全部查看（一般用户） -->
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
        @click="addRightsSubmit('roleForm')"
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
      rolenameStatus: false,
      roleInfo: {
        rolename: "",
        roleremark: ""
      },
      checkAll: false,
      isIndeterminate: true,
      fullscreenLoading: false,
      submitData: {},
      roleid: "",
      pageItem: [
        {
          title: "角色信息",
          imgIcon: require("@/assets/img/rights/rights.png"),
          radio: [
            { label: "1", name: "role", value: "超级管理员" },
            { label: "2", name: "role", value: "一般管理员" },
            { label: "3", name: "role", value: "普通用户" }
          ],
          radioValue: !!this.$route.query.roleid
            ? this.$route.query.roleid + ""
            : "-1",
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
          title: "权限授权",
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
      ],
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ],
        roleremark: [
          { required: true, message: "请填写角色描述", trigger: "blur" }
        ]
      }
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
      this.pageItem[0].radioValue = !!val.roleid ? val.roleid + "" : "-1";
    }
  },
  created() {
    this.roleid = this.pageItem[0].radioValue;
    this.roleInfo.rolename = this.$route.query.rolename;
    this.roleInfo.roleremark = this.$route.query.roleremark;

    this.findPermissionListById();
  },
  methods: {
    myBlur() {
      this.checkRole();
    },
    myFocus() {
      // console.log("获取焦点");
    },
    checkRole() {
      // 检查菜单是否已存在
      API.checkRole({ rolename: this.roleInfo.rolename }).then(res => {
        if (!!res && res.code === 20000) {
          this.rolenameStatus = res.data.length > 0 ? false : true;
        }
      });
    },
    gotoUrl(path, query) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    },
    addRightsSubmit(roleForm) {
      if (!!this.roleInfo.rolename) {
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
          role: {
            roleid: !!this.$route.query.roleid ? this.$route.query.roleid : "",
            rolename: this.roleInfo.rolename,
            roleremark: this.roleInfo.roleremark
          },
          tbMenus: menuArr
        };
        // 修改流程
        if (!!params.role.roleid) {
          API.checkRole({ rolename: this.roleInfo.rolename }).then(res => {
            if (!!res && res.code === 20000) {
              if (
                res.data.length == 0 ||
                res.data[0].roleid == params.role.roleid
              ) {
                this.rolenameStatus = true; //修改角色是本身，已存在
              } else {
                this.rolenameStatus = false;
              }

              if (this.rolenameStatus == false) {
                this.$message({
                  message: "角色名已存在,请重新填写。",
                  type: "warning"
                });
                return;
              } else {
                this.fullscreenLoading = true;
                API.addAPI(params).then(res => {
                  this.fullscreenLoading = false;
                  this.$message({
                    message:
                      !!res &&
                      res.code === 20001 &&
                      this.pageItem[0].radioValue == "1"
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
                  this.$store.dispatch("GetUserInfo");
                  if (!!res && res.code === 20000) {
                    this.$router.go(-1);
                  }
                });
              }
            }
          });
        } else {
          if (this.rolenameStatus == false) {
            this.$message({
              message: "角色名已存在,请重新填写。",
              type: "warning"
            });
            return;
          }
          this.fullscreenLoading = true;
          API.addAPI(params).then(res => {
            this.fullscreenLoading = false;
            this.$store.dispatch("GetUserInfo");
            this.$message({
              message:
                !!res &&
                res.code === 20001 &&
                this.pageItem[0].radioValue == "1"
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
        }
      } else {
        if (!this.roleInfo.rolename) {
          this.$message({
            message: "请输入角色名称",
            type: "warning"
          });
          return false;
        }
      }
    },
    findPermissionListById() {
      this.pageItem[1].formInfo[0].options = [];
      this.pageItem[1].formInfo[0].options.length = 0;
      API.findPermissionList({
        roleid:
          !!this.roleid && this.roleid !== "undefined" ? this.roleid : "-1"
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
