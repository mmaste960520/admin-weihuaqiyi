
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      :showAuthor="true"
      :fullscreenLoading="fullscreenLoading"
      :showMp4="true"
      :showDownloadPath="true"
      @submit="submitcontent"
      @imgPath="getImgPath"
      @uploadPath="getMp4Path"
      @goBack="goBackFun"
    ></my-uepage>
  </el-row>
</template>
<script>
import API from "@/api/api_dangxingjiaoyu";
import myUEpage from "@/components/myUEpage";
export default {
  name: "partyEducationAdd",
  components: { "my-uepage": myUEpage },
  data() {
    return {
      fullscreenLoading: false,
      ticketForm: {
        title: "",
        imgPath: "",
        author: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        downloadPath: "",
        uploadPath: "",
        content: ""
      }
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    goBackFun() {
      this.getData();
    },
    submitcontent(params) {
      this.ticketForm.content = params.content;
      window.sessionStorage.setItem("responseType", "json");
      API.addAPI(this.ticketForm).then(res => {
        this.$notify({
          title: "提示",
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
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 1500);
        }
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getData() {
      this.fullscreenLoading = true;
      this.ticketForm = this.$route.query;
      var that = this;
      setTimeout(() => {
        that.fullscreenLoading = false;
      }, 100);
    },
    getMp4Path(val) {
      this.ticketForm.uploadPath = !!val ? val.replace(/\\/g, "/") : "";
      this.ticketForm.downloadPath = !!val ? val.replace(/\\/g, "/") : "";
    }
  }
};
</script>