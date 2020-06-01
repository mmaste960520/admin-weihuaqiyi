
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      :fullscreenLoading="fullscreenLoading"
      @submit="submitcontent"
      @imgPath="getImgPath"
      @goBack="goBackFun"
    ></my-uepage>
  </el-row>
</template>
<script>
import API from "@/api/api_abstract";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      fullscreenLoading: false,
      ticketForm: {
        title: "",
        imgPath: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        content: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    goBackFun() {
      this.getData();
    },
    submitcontent(params) {
      this.ticketForm.content = params.content;
      window.sessionStorage.setItem("responseType", "json");
      API.addServerInfo(this.ticketForm).then(res => {
        this.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
        });
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getData() {
      this.fullscreenLoading = true;
      API.findfuwuzhinan({ menuId: this.ticketForm.menuId }).then(res => {
        if (!!res && res.code === 20000) {
          this.ticketForm = !!res.data.rows[0]
            ? res.data.rows[0]
            : this.ticketForm;
        }
        var that = this;
        setTimeout(() => {
          if (res.code !== 20000) {
            that.$message({
              type: !!res && res.code === 20000 ? "success" : "warning",
              message: res.message
            });
          }
          that.fullscreenLoading = false;
        }, 1000);
      });
    }
  }
};
</script>