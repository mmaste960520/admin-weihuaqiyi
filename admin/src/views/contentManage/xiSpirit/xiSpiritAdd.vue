
<template>
  <el-row class="components-container">
    <my-uepage
      :Form="ticketForm"
      :showAuthor="false"
      :showLinkName="false"
      :showEditButtonView="pageType!='查看'?false:true"
      :defaultMsg="ticketForm.content"
      :fullscreenLoading="fullscreenLoading"
      :showLinkUrl="false"
      :showPersonName="false"
      @submit="submitcontent"
      @goBack="goBackFun"
      @imgPath="getImgPath"
    ></my-uepage>
  </el-row>
</template>
<script>
import API from "@/api/api_xiSpirit";
import myUEpage from "@/components/myUEpage";
export default {
  components: { "my-uepage": myUEpage },
  data() {
    return {
      fullscreenLoading: true,
      pageType: "",
      ticketForm: {
        title: "",
        imgPath: "",
        personName: "",
        linkName: "",
        linkUrl: "",
        menuId: this.$route.query.menuId + "",
        description: "",
        content: "",
        // addId:''
      }
    };
  },
  created() {
    this.pageType = this.$route.query.pageType;
    // this.addId = this.$route.query.addId;
    // console.log(this.addId)
    this.getData();
    // this.addCon();
  },
  mounted() {},
  methods: {
    // addCon(){
    //   if(this.addId == "no"){
    //     // debugger
    //     this.fullscreenLoading = false
    //   } else {
    //     this.getData();
    //   }
    // },
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
      // API.getDetailById(params).then(res => {
      //   this.ticketForm = res.data[0];
      // });
      var that = this;
      // setTimeout(() => {
      //   that.fullscreenLoading = false;
      // }, 100);


      
      if(this.$route.query.id == null){//如果id为空，说明是新增，去调用一下接口，返回值不做处理，不调用的话，富文本出不来，不知道什么原因
        this.fullscreenLoading = true;
        let params = {
          menuId: this.$route.query.menuId,
          id: this.$route.query.id
        };
        let that = this;
        API.getDetailById(params).then(res => {
          that.fullscreenLoading = false;
        });
      }else{
        API.getDetailById(params).then(res => {
          that.ticketForm = res.data[0];
          if (!!res.data[0].agePeriod) {
            var agePeriodArr = res.data[0].agePeriod.split("-");
            that.ticketForm.ageStartPeriod = agePeriodArr[0].split("(")[1];
            that.ticketForm.ageEndPeriod = agePeriodArr[1].split(")")[0];
          }
          console.log(that.ticketForm);
          that.fullscreenLoading = false;
        });
      }






    }
  }
};
</script>