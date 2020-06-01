
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      :fullscreenLoading="fullscreenLoading"
      :showEditButtonView="pageType!='查看'?false:true"
      :showPersonName="false"
      :showImg="false"
      @submit="submitcontent"
      @goBack="goBackFun"
      @imgPath="getImgPath"
    ></my-uepage>
  </el-row>
</template>
<script>
import API from "@/api/api_xianTings";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      pageType: "",
      fullscreenLoading: false,
      ticketForm: {
        title: "",
        imgPath: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        personName: "",
        content: ""
      }
    };
  },
  created() {
    this.getData();
    this.pageType = this.$route.query.pageType;
  },
  methods: {
    goBackFun() {
      this.getData();
    },
    submitcontent(params) {
      this.ticketForm.content = params.content;
      window.sessionStorage.setItem("responseType", "json");
      API.addAPI(this.ticketForm).then(res => {
        this.$message({
          type: !!res && res.code === 20000 ? "success" : "warning",
          message: res.message
        });
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 2000);
        }
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getData() {
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