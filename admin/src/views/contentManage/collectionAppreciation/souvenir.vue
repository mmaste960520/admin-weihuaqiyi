<template>
  <div class="">
    <common-img
      :imgList="imgList"
      :searchParams="searchParams"
      :showAuthor="false"
      :showImgLoading="showImgLoading"
      :imgPath="imgPath"
      :show.sync="show"
      @show="open"
      @pageNum="pageNum"
      @update="update"
      @deleteItem="confirmDeleteItem"
      @formfile="uploadFormFile"
      @formInfo="submitFormInfo"
    ></common-img>
    <MyConfirm
      ref="myconfirm"
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent"
    ></MyConfirm>
  </div>
</template>
<script>
import commonImg from "@/views/contentManage/commonImgui";
import API from "@/api/api_cangpinxinshang.js";
export default {
  name: "folk",
  components: { "common-img": commonImg },
  data() {
    return {
      id: "",
      confirmType: "warning",
      confirmTitle: "提示信息",
      confirmContent: "此操作将永久删除, 是否继续?",
      formFile: {}, //上传图片
      imgPath: "",
      showImgLoading: false,
      searchParams: {
        page: 1,
        size: 9,
        menuId: 10003003 + ""
      },
      addFormInfo: {
        id: "",
        title: "",
        author: "",
        content: "",
        imgPath: "",
        menuId: 10003003 + ""
      },
      show: false,
      imgList: []
    };
  },
  methods: {
    open() {
      this.show = true;
      this.imgPath = "";
    },
    update(item) {
      this.show = true;
      this.imgPath = item.imgPath;
    },
    uploadFile() {
      window.sessionStorage.setItem("responseType", "form");
      API.uploadImg(this.formFile).then(res => {
        this.$message({
          message: res.message,
          type: !!res && res.code === 20000 ? "success" : "error"
        });
        if (!!res && res.code === 20000) {
          this.addFormInfo.imgPath = !!res.data[0]
            ? res.data[0].replace(/\\/g, "/")
            : "";
          this.imgPath = !!res.data[0] ? res.data[0].replace(/\\/g, "/") : "";
        }
        window.sessionStorage.setItem("responseType", "json");
      });
    },
    uploadFormFile(val) {
      this.formFile = val;
      this.uploadFile();
    },
    submitFormInfo(val) {
      this.addFormInfo = val;
      this.addFormInfo.imgPath = this.imgPath;
      window.sessionStorage.setItem("responseType", "json");
      this.addFormInfo.menuId = 10003003 + "";
      API.addAPI(this.addFormInfo).then(res => {
        if (!!res && res.code === 20000) {
          this.show = false;
          var that = this;
          setTimeout(function() {
            that.findList();
          }, 1000);
        } else {
          this.$message({
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "error"
          });
        }
      });
    },
    findList() {
      window.sessionStorage.setItem("responseType", "json");
      this.showImgLoading = true;
      API.findList(this.searchParams).then(res => {
        if (!!res && res.code === 20000 && res.data.total !== 0) {
          this.imgList = res.data;
        } else {
          this.$message({
            message:
              !!res && res.data.total === 0
                ? "查询成功，暂无相关数据。"
                : res.message,
            type: !!res && res.code === 20000 ? "success" : "error"
          });
        }
        this.showImgLoading = false;
      });
    },
    // 取消删除
    cancle() {
      this.id = null;
    },
    deleteImg() {
      var _this = this;
      window.sessionStorage.setItem("responseType", "json");
      API.delAPI({ id: _this.id })
        .then(res => {
          this.$notify({
            title: "提示",
            duration: "1000",
            message: res.message,
            type: !!res && res.code === 20000 ? "success" : "error"
          });
          if (!!res && res.code === 20000) {
            this.findList();
            this.id = null;
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error"
          });
        });
    },
    confirmDeleteItem(item) {
      var _this = this;
      _this.id = item.id;
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.deleteImg, _this.cancle);
      }, 100);
    },
    pageNum(val) {
      this.searchParams.page = val;
      this.findList();
    }
  },
  created() {
    this.findList();
  },
  mounted() {}
};
</script>

<style scoped>
</style>
