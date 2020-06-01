<template>
  <div
    class="content-top-line"
    v-loading="fullscreenLoading"
    element-loading-text="正在设置，请等待......"
  >
    <div class="data-list">
      <el-row>
        <el-radio-group v-model="settingType">
          <el-radio label="videoSetting">观看视频</el-radio>
          <el-radio label="testSetting">考试</el-radio>
        </el-radio-group>
      </el-row>
      <el-row style="margin-top:30px;">
        <MyTwoColumForm
          :form="form"
          ref="myform"
          :formData="formData"
          :formItem="formItem"
          @submit="submitSetting"
        > </MyTwoColumForm>
      </el-row>
      <el-row style="margin:80px;">
        <span>备注：</span>
        <span
          v-show="settingType=='videoSetting'"
          style="color: #409EFF;"
        >
          观看视频获得小红花计算公式：观看视频每分钟获取的小红旗数量 * 视频比率={{formData.redFlowerPerMinute * formData.videoRatio}}
        </span>
        <span
          v-show="settingType=='testSetting'"
          style="color: #409EFF;"
        >
          答题获得小红花计算公式：每答对一个题目获取的小红旗数量 * 试题比率={{formData.redFlowerPerTest * formData.testRatio}}
        </span>
      </el-row>
    </div>
  </div>
</template>

<script>
import API from "@/api/api_site.js";
import { getPageSize, px2rem, rem2px } from "@/plugins/util.js";
import { getField, getFormField, getSearchField } from "@/assets/json/index.js";
export default {
  data() {
    // 表单配置
    var form = {
      title: "",
      ref: "settingFrom",
      showTitle: false,
      showUploadImg: false,
      labelWidth: px2rem(1510),
      labelPositon: "right",
      width: "50%",
      style: "",
      column: 1,
      hasSubmit: true,
      imgPath: "",
      submitText: "提交",
      cancleText: "取消"
    };
    return {
      fullscreenLoading: false,
      id: "",
      settingType: "videoSetting",
      formItem: [],
      formData: {},
      form: form
    };
  },
  created: function() {
    this.findData();
  },
  watch: {
    settingType(val) {
      this.findData()
    }
  },
  mounted: function() {},
  methods: {
    formInit(type, row) {
      this.formItem = getFormField(type, "item");
      this.formData = !!row ? row : getFormField(type, "data");
    },
    submitSetting() {
      this.fullscreenLoading = true;
      API[this.settingType](this.formData).then(res => {
        this.$message({
          message: res.message,
          type: res.code === 20000 ? "success" : "error"
        });
        this.fullscreenLoading = false;
      });
    },
    findData() {
      window.sessionStorage.setItem("responseType", "json");
      this.fullscreenLoading = true;
      API.findSiteList()
        .then(res => {
          if (!!res && res.code === 20000) {
             this.formInit(this.settingType, res.data[0]);
          } else {
            this.$message({
              message: res.message,
              type: !!res && res.code === 20000 ? "success" : "warning"
            });
          }
          this.fullscreenLoading = false;
        })
        .catch(res => {});
    }
  }
};
</script>

<style  lang="scss" scoped>
.restore-button {
  outline: none;
  margin: 0px 50px;
  padding: 5px 25px;
  border-radius: 30px;
  background: #f2f4f4;
  border: 1px solid #f2f4f4;
  color: #000;
}
.restore-button:hover {
  cursor: pointer;
  color: #fff;
  background: #eb5e5f;
}
.data-list {
  width: 75%;
  margin: 30px auto 0px;
  .data-type-button {
    margin: 50px auto;
    .my-button-img {
      margin-top: 9px;
    }
    .my-button-span {
      position: relative;
      top: -6px;
      margin-left: 10px;
      line-height: 25px;
    }
  }
}
</style>
