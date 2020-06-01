<template>
  <div
    class="content-top-line"
    v-loading="fullscreenLoading"
  >
    <div class="banner-list">
      <div
        class="demo-menu"
        v-for="(menuItem,ind) in menuInfo"
        :key="ind"
      >
        <el-row :gutter="24">
          <el-col
            :span="4"
            style="min-width:100px;"
          > {{!!menuItem.label?menuItem.label:"导航栏菜单标题："}}</el-col>
          <el-col
            :span="20"
            class="alignleft"
          >
            <el-input
              placeholder="请输入菜单标题"
              :disabled="showEditButton"
              v-model="menuItem.name"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col
            :span="4"
            style="min-width:100px;"
          >&nbsp;</el-col>
          <el-col
            :span="20"
            class="alignleft"
            style="margin: 20px 0px 0px;"
          >
            <div style="margin-top: 15px;display:inline-block;">
              <el-input
                v-for="(item,index) in !!menuItem.children?menuItem.children:menuItem.menuList"
                :key="index"
                class="child-menu-input"
                placeholder="子菜单标题"
                :disabled="showEditButton"
                v-model="item.name"
              >
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-button
          v-show="!showEditButton"
          type="danger"
          @click="submitSite()"
        >提交</el-button>
        <el-button
          v-show="showEditButton"
          type="danger"
          @click="showEditButtonFun()"
        >编辑</el-button>
      </el-row>
    </div>
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
  </div>
</template>

<script>
import API from "@/api/api_site.js";

export default {
  name: "Site",
  data() {
    return {
      Userflag: true,
      deleteParentMenu: "",
      deleteParentMenuInd: "",
      showEditButton: true,
      fullscreenLoading: false,
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      siteForm: {
        copyRight: "",
        skillSupport: "",
        contactAddress: "",
        contactPhone: ""
      },
      ids: "",
      menuInfo: [
        {
          name: "",
          label: "菜单标题：",
          parentid: "0",
          menuType: 1, //底部菜单传2，导航栏菜单传1
          children: [{ name: "" }]
        }
      ]
    };
  },
  methods: {
    showEditButtonFun() {
      this.showEditButton = !this.showEditButton;
    },
    findMenu() {
      this.fullscreenLoading = true;
      window.sessionStorage.setItem("responseType", "json");
      var that = this;
      API.findMenuList().then(res => {
        that.fullscreenLoading = false;
        if (!!res && res.code === 20000) {
          that.menuInfo = !!res.data
            ? that._.filter(res.data, { parentid: "0" })
            : "";
        }
      });
    },
    submitSite() {
      for (let i = 0; i < this.menuInfo.length; i++) {
        for (let j = 0; j < this.menuInfo[i].children.length; j++) {
          if (this.Userflag == true) {
            this.submitAPI(this.menuInfo[i]);
            this.submitAPI(this.menuInfo[i].children[j]);
          }
        }
      }
    },
    submitAPI(params) {
      if (!!this.Userflag) {
        API.addMenu(params).then(res => {
          if (!!res && res.code === 20000) {
            this.findMenu();
            this.showEditButton = true;
          } else {
            this.Userflag = false;
            this.$message({
              message: res.message,
              type: !!res && res.code === 20000 ? "success" : "warning"
            });
            return false;
          }
        });
      }
    }
  },
  created() {
    this.findMenu();
  }
};
</script>

<style  lang="scss" scoped>
.banner-list {
  text-align: center;
  margin: 0px 80px 15px;
  .demo-menu {
    margin-bottom: 15px;
    position: relative;
    background: #ececec;
    padding: 15px 5px;
    .el-input {
      max-width: 800px;
    }
    i.delete-menu {
      position: absolute;
      right: 3px;
      top: 3px;
      cursor: pointer;
      color: #d43537;
    }
    .child-menu-btn {
      background: #fff;
      color: #000;
      border-color: #fff;
      margin: 0px;
      padding: 10px 30px; // cursor: crosshair;
      position: relative;
    }
  }
  button.el-button.child-menu-btn.el-button--default:first-child {
    margin-left: 0px;
  }
  .site-bottom {
    margin: 20px 0px;
    padding: 6px;
    border: 1px solid #ececec;
    i {
      font-size: 20px;
      vertical-align: middle;
      color: #d43537;
      margin-right: 5px;
    }
    span {
      cursor: pointer;
    }
  }
}
</style>
