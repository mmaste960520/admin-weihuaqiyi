
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :fullscreenLoading="fullscreenLoading"
      :defaultMsg="ticketForm.content"
      @submit="submitcontent"
      @imgPath="getImgPath"
      @goBack="goBackFun"
    ></my-uepage>
  </el-row>
</template>

<script>
import API from "@/api/api_jingqugaikuang";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      fullscreenLoading: true,
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
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getData() {
      this.fullscreenLoading = true;
      API.findFormData({ menuId: this.ticketForm.menuId }).then(res => {
        if (!!res && res.code === 20000 && !!res.data.rows[0]) {
          this.ticketForm = res.data.rows[0];
        }
        var that = this;
        setTimeout(() => {
          that.fullscreenLoading = false;
          if (res.code !== 20000 || !res.data.rows[0]) {
            that.$message({
              type: !!res && res.code === 20000 ? "success" : "warning",
              message: res.message
            });
          }
        }, 1000);
      });
    }
  }
};
</script>