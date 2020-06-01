
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      :fullscreenLoading="fullscreenLoading"
      :showAuthor="true"
      :showAgePeriod="false"
      :showMp4="true"
      :showName="false"
      :showEditButtonView="pageType!='查看'?false:true"
      @submit="submitcontent"
      @imgPath="getImgPath"
      @uploadPath="getMp4Path"
      @goBack="goBackFun"
    ></my-uepage>
  </el-row>
</template>
<script>
import API from "@/api/api_weihuaqiyi";
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
        name: "",
        agePeriod: "",
        author: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        content: "",
        productUploadPath: ""
      }
    };
  },
  created() {
    this.getData();
    this.pageType = this.$route.query.pageType;
  },
  mounted() {},
  methods: {
    goBackFun() {
      this.getData();
    },
    submitcontent(params) {
      this.ticketForm.content = params.content;
      var that = this;
      window.sessionStorage.setItem("responseType", "json");
      API.addAPI(this.ticketForm).then(res => {
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 1000);
        } else {
          that.$message({
            type: !!res && res.code === 20000 ? "success" : "warning",
            message: res.message
          });
        }
      });
    },
    getImgPath(val) {
      this.ticketForm.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getMp4Path(val) {
      this.ticketForm.productUploadPath = !!val ? val.replace(/\\/g, "/") : "";
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