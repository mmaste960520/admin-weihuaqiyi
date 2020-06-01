<template>
  <div
    class="content-top-line"
    v-loading="fullscreenLoading"
    element-loading-text="拼命加载中"
  >
    <div class="site-list">
      <el-form
        ref="siteForm"
        :model="siteForm"
        label-width="80px"
      >
        <el-form-item
          :label="item.label"
          v-for="(item,index) in siteInfo"
          :key="index"
        >
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input
                v-model="siteForm[item.name]"
                value=""
                :readonly="showEditButton"
                :class="{ 'cursorDisable' : !!showEditButton }"
                :placeholder="item.placeholder"
              ></el-input>
              <!-- :disabled="!siteForm[item.status]" -->
            </el-col>
            <el-col :span="4">
              <el-switch
                :disabled="showEditButton"
                active-color="#F6AB5A"
                inactive-color="#ececec"
                v-model="siteForm[item.status]"
                active-text="启用"
              >
              </el-switch>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
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
  name: "SiteIndex",
  data() {
    return {
      showEditButton: true,
      fullscreenLoading: false,
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除该文件, 是否继续?",
      id: "",
      siteForm: {
        copyright: "",
        tecSupport: "",
        address: "",
        phone: "",
        copyrightStatus: "true",
        tecSupportStatus: "true",
        addressStatus: "true",
        phoneStatus: "true"
      },
      siteInfo: [
        {
          label: "版权声明",
          placeholder: "版权所有 渭华起义纪念馆",
          valueFocus: true,
          status: "copyrightStatus",
          name: "copyright"
        },
        {
          label: "技术支持",
          placeholder: "西安赛云溪信息科技有限公司",
          valueFocus: true,
          name: "tecSupport",
          status: "tecSupportStatus"
        },
        {
          label: "联系地址",
          placeholder: "",
          valueFocus: true,
          name: "address",
          status: "addressStatus"
        },
        {
          label: "联系电话",
          placeholder: "",
          valueFocus: true,
          inputValue: "18409209393",
          name: "phone",
          status: "phoneStatus"
        }
      ]
    };
  },
  methods: {
    resetForm() {
      // this.$refs[formName].resetFields();
      this.siteForm = {
        copyright: "",
        tecSupport: "",
        address: "",
        phone: "",
        copyrightStatus: "true",
        tecSupportStatus: "true",
        addressStatus: "true",
        phoneStatus: "true"
      };
      this.showEditButtonFun();
    },
    showEditButtonFun() {
      this.showEditButton = !this.showEditButton;
    },
    goBack() {
      this.showEditButtonFun();
      this.findSite();
    },
    findSite() {
      window.sessionStorage.setItem("responseType", "json");
      this.fullscreenLoading = true;
      API.findSiteList()
        .then(res => {
          if (!!res && res.code === 20000) {
            var obj = res.data[0];
            obj.addressStatus = obj.addressStatus === "1" ? true : false;
            obj.copyrightStatus = obj.copyrightStatus === "1" ? true : false;
            obj.tecSupportStatus = obj.tecSupportStatus === "1" ? true : false;
            obj.phoneStatus = obj.phoneStatus === "1" ? true : false;
            this.siteForm = obj;
          } else {
            this.$message({
              message: res.message,
              type: !!res && res.code === 20000 ? "success" : "warning"
            });
          }
          this.fullscreenLoading = false;
        })
        .catch(res => {});
    },
    submitSite() {
      var params = {};
      params = this.siteForm;
      params.addressStatus = params.addressStatus === true ? "1" : "0";
      params.copyrightStatus = params.copyrightStatus === true ? "1" : "0";
      params.tecSupportStatus = params.tecSupportStatus === true ? "1" : "0";
      params.phoneStatus = params.phoneStatus === true ? "1" : "0";
      API.addSite(params).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "warning"
        });
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
          this.findSite();
          // this.showEditButtonFun();
        }
      });
    }
  },
  created() {
    this.findSite();
  }
};
</script>

<style  lang="scss" scoped>
.site-list {
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
      margin: 10px;
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
