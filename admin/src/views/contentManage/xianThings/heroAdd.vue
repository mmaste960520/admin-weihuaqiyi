
<template>
  <el-row class="components-container hero-page">
    <my-uepage
      :Form="ticketForm"
      :defaultMsg="ticketForm.content"
      :showPersonName="true"
      :fullscreenLoading="fullscreenLoading"
      :showEditButtonView="pageType!='查看'?false:true"
      :showAgePeriod="true"
      :showTitle="false"
      @submit="submitcontent"
      @goBack="goBackFun"
      @imgPath="getImgPath"
    ></my-uepage>
  </el-row>
</template>
<script>
import API from "@/api/api_xianTingsHero";
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
        agePeriod: "",
        ageStartPeriod: "",
        ageEndPeriod: "",
        personName: "",
        content: ""
      }
    };
  },
  created() {
    this.formatTimeUTC();
    this.pageType = this.$route.query.pageType;
  },
  mounted() {
    this.getData()
  },
  methods: {
    goBackFun() {
      this.formatTimeUTC();
      this.getData();
    },
    submitcontent(params) {
      this.ticketForm.content = params.content;
      this.ticketForm.agePeriod =
        "(" +
        new Date(params.ageStartPeriod).Format("yyyy") +
        "-" +
        new Date(params.ageEndPeriod).Format("yyyy") +
        ")";
      window.sessionStorage.setItem("responseType", "json");
      API.addAPI(this.ticketForm).then(res => {
        if (!!res && res.code === 20000) {
          var that = this;
          setTimeout(function() {
            that.$router.go(-1);
          }, 2000);
        } else {
          this.$message({
            type: !!res && res.code === 20000 ? "success" : "warning",
            message: res.message
          });
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
      let that = this;
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
    },
    formatTimeUTC() {
      // 对Date的扩展，将 Date 转化为指定格式的String
      // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
      // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
      // 例子：
      // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
      Date.prototype.Format = function(fmt) {
        //author: zhengsh 2016-9-5
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
    }
  }
};
</script>
