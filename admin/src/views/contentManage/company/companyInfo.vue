<template>
  <div class="margin-top:20px;">
    <MyTwoColumForm
      :form="form"
      ref="myform"
      :fullscreenLoading="fullscreenLoading"
      :defaultMsg="form.content"
      :formData="formData"
      @imgPath="getImgPath"
      @uploadPath="getMp4Path"
      :formItem="formItem"
      @submit="submit"
    > </MyTwoColumForm>
  </div>
</template>
<script>
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { setTimeout } from "timers";
import API from "@/api/api_course.js";
export default {
  name: "createCourse",
  data() {
    // 表单配置
    var form = {
      isLeft: true,
      showFormBorder: false,
      title: "课程管理-创建",
      ref: "companyInfoForm",
      showTitle: false,
      showUE: true,
      showUploadImg: true,
      showImg: true,
      showMp4: true,
      showDownloadPath: false,
      labelWidth: px2rem(500),
      labelPositon: "left",
      width: "90%",
      style: "notprepend",
      column: 1,
      hasSubmit: true,
      istop100: false,
      content: "",
      imgPath: "",
      uploadPath: "",
      submitText: "提交",
      cancleText: "取消"
    };
    return {
      fullscreenLoading: false,
      form: form,
      formItem: [],
      formData: {}
    };
  },
  computed: {
   
  },
  watch: {
  
  },
  created() {
    this.formInit();
    this.getData();
    if (!!this.$route.query.id) {
      this.getArticleDetail();
    }
  },
  methods: {
    formInit(row) {
      this.formItem = getFormField("companyInfo", "item");
      this.formData = !!row ? row : getFormField("companyInfo", "data");
    },
    getImgPath(val) {
      this.form.imgPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    getMp4Path(val) {
      this.form.uploadPath = !!val ? val.replace(/\\/g, "/") : "";
    },
    // 提交数据
    submit() {
      window.sessionStorage.setItem("responseType", "json");
      var a = this.formData.imgPath;
      this.formData.imgPath = !!a ? a.replace(/\\/g, "/") : "";
      var params = this.formData;

      params.articleType =
        this.$route.path === "/event/editor" ||
        this.$route.path === "/event/create"
          ? "5"
          : this.$route.path === "/experience/editor" ||
            this.$route.path === "/experience/create"
          ? "4"
          : this.$route.path === "/course/editor" ||
            this.$route.path === "/course/create"
          ? "2"
          : "";
      params.classesId = !!params.classesId ? params.classesId.id : "";
      params.video = this.form.uploadPath;
      params.imgUrl = this.form.imgPath;
      var subparams = {
        article: params,
        articleContent: {
          content: params.content
        }
      };
      // API.addAPI(subparams).then(res => {
      //   this.$message({
      //     message: res.message,
      //     type: !!res && res.code === 20000 ? "success" : "warning"
      //   });
      //   //权限不足
      //   if (!!res && res.code === 20000) {
      //     this.dialogVisible = false;
      //     var that = this;
      //     setTimeout(function() {
      //       that.$router.go(-1);
      //     }, 1000);
      //   }
      // });
    },
    getData() {
      this.fullscreenLoading = true;
      if (!!this.$route.query.id) {
        this.formData = this.$route.query;
        this.form.imgPath = this.$route.query.img_url;
        this.form.uploadPath = this.$route.query.video;
        this.formData.articleType = !!this.$route.query.article_type
          ? this.$route.query.article_type
          : "";
      }
      var that = this;
      setTimeout(() => {
        that.fullscreenLoading = false;
      }, 100);
    },
    getArticleDetail() {
      API.findArticleDetail({ id: this.$route.query.id }).then(res => {
        if (!!res && res.code === 20000) {
          this.form.content = !!res.data.content ? res.data.content : "";
        }
      });
      if (!!this.$route.query.userid) {
        this.getTeacherList(this.formItem[4], {
          userid: this.$route.query.userid
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>