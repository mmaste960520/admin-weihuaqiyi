
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :showMp4="true"
      :defaultMsg="ticketForm.content"
      :fullscreenLoading="fullscreenLoading"
      :showEditButtonView="pageType!='查看'?false:true"
      @submit="submitcontent"
      @imgPath="getImgPath"
      @goBack="goBackFun"
      @uploadPath="getMp4Path"
    ></my-uepage>
  </el-row>
</template>
<script>
import API from "@/api/api_weihuajiangtang";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      pageType: "",
      fullscreenLoading: false,
      ticketForm: {
        title: "",
        menuId: !!this.$route.query.menuId
          ? this.$route.query.menuId + ""
          : this.$route.name,
        description: "",
        content: "",
      }
    };
  },
  created() {
    if (!!this.$route.query.id) {
      this.getUpdate();
    }
    this.pageType = this.$route.query.pageType;
  },
  methods: {
    goBackFun() {
      this.getUpdate();
    },
    submitcontent(params) {
      this.ticketForm.content = params.content;
      window.sessionStorage.setItem("responseType", "json");
      API.addServerInfo(this.ticketForm).then(res => {
        this.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
        });
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 1000);
        }
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getMp4Path(val) {
      this.ticketForm.uploadPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getUpdate() {
      this.fullscreenLoading = true;
      let params = {
        menuId: this.$route.query.menuId,
        id: this.$route.query.id
      };
      API.getDetailById(params).then(res => {
        this.ticketForm = res.data[0];
      });
      var that = this;
      setTimeout(() => {
        that.fullscreenLoading = false;
      }, 100);
    }
  }
};
</script>