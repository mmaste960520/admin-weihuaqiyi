
<template>
  <el-row class="components-container">
    <my-uepage
      :showEditButtonView="pageType!='查看'?false:true"
      :Form="ticketForm"
      :showScenicSpotName="true"
      :showTitle="false"
      :fullscreenLoading="fullscreenLoading"
      :defaultMsg="ticketForm.content"
      @submit="submitcontent"
      @imgPath="getImgPath"
      @goBack="goBackFun"
    ></my-uepage>
  </el-row>
</template>
<script>
import API from "@/api/api_abstract.js";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      pageType: "",
      fullscreenLoading: false,
      ticketForm: {
        imgPath: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        scenicSpotName: "",
        content: ""
      }
    };
  },
  created() {
    if (!!this.$route.query.id) {
      this.getData();
    }
    this.pageType = this.$route.query.pageType;
  },
  methods: {
    goBackFun() {
      this.getData();
    },
    getData() {
      this.fullscreenLoading = true;
      let params = {
        menuId: this.$route.query.menuId,
        id: this.$route.query.id
      };
      API.getDetailById(params).then(res => {
        this.ticketForm = res.data.rows[0];
      });
      var that = this;
      setTimeout(() => {
        that.fullscreenLoading = false;
      }, 100);
    },
    submitcontent(params) {
      this.ticketForm.content = params.content;
      window.sessionStorage.setItem("responseType", "json");
      API.addFormInfo(this.ticketForm).then(res => {
        this.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
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
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 1500);
        }
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    }
  }
};
</script>