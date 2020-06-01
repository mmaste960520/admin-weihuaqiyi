<template>
  <div
    class="content-manageappre"
    v-loading="showImgLoading"
    element-loading-text="拼命加载中..."
  >
    <div class="clearfix">
      <div class="img-box left">
        <div
          class="uplaod-bgimg cursorpointer"
          @click="showDialog()"
        >
          <i class="el-icon-plus uplaod-bgimg"></i>
          <p>点击上传图片</p>
        </div>
      </div>
      <div
        class="img-box tuImg"
        v-for="(item,index) in imgList.rows"
        :key="index"
      >
        <img
          :src="!!item.imgPath?item.imgPath:''"
          :onerror="errorImg"
          @click="update(item)"
        />
        <span @click="deleteConfirm(item)"></span>
        <p
          style="-webkit-box-orient: vertical;"
          class="ellipsis1 cursorpointer"
          :title="item.scenicSpotName||item.title"
        >{{item.scenicSpotName||item.title}}</p>
      </div>
    </div>
    <div style="margin-top:15px;">
      <el-pagination
        :page-size="searchParams.size"
        layout="prev, pager, next"
        :total="imgList.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show"
      top="10vh"
      width="525px"
    >
      <div
        class="clearfix"
        style="margin-bottom:10px"
      >
        <div class="img-box showleft">
          <input
            class="upload-img"
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            @change="changeImage($event)"
            id="upload-img-input"
          />
          <div class="uplaod-bgimg">
            <i
              v-if="!imgPath"
              class="el-icon-plus uplaod-bgimg"
            ></i>
            <img
              v-if="!!imgPath"
              class="uplaod-bgimg"
              :src="imgPath"
            />
            <p>点击上传图片</p>
            <div class="fontsize10">上传图片说明：格式支持 .jpg .jpeg .png等</div>
          </div>
        </div>
      </div>
      <el-form
        ref="otherFormInfo"
        :model="otherFormInfo"
        label-width="40px"
        class="margintop10"
      >
        <!-- 名称 -->
        <el-form-item label="标题">
          <el-input v-model="!!otherFormInfo.scenicSpotName?otherFormInfo.scenicSpotName:otherFormInfo.title"></el-input>
        </el-form-item>
        <!-- author -->
        <el-form-item
          label="作者"
          v-show="showAuthor"
        >
          <el-input v-model="otherFormInfo.author"></el-input>
        </el-form-item>
        <!-- content -->
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :rows="4"
            v-model="otherFormInfo.content"
          ></el-input>
        </el-form-item>
        <el-button
          type="danger"
          @click="submit()"
        >提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "commonImgui",
  data() {
    return {
      errorImg: 'this.src="' + require("@/assets/img/noImg.png") + '"',
      dialogTitle: "上传图片",
      id: "",
      visible: this.show,
      total: 50,
      otherFormInfo: {
        title: "",
        author: "",
        id: "",
        content: "",
        imgPath: ""
      }
    };
  },
  props: {
    imgList: "",
    imgPath: {
      type: String,
      default: ""
    },
    searchParams: "",
    showAuthor: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    showImgLoading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  methods: {
    // 添加数据
    showDialog() {
      this.$emit("show", true);
    },
    update(item) {
      this.dialogTitle = "编辑图片";
      this.$emit("update", item);
      this.otherFormInfo = item;
    },
    submit() {
      this.$emit("formInfo", this.otherFormInfo);
    },
    changeImage(ev) {
      // let uploadImginput = document.getElementById("upload-img-input");
      let formfile = new FormData(); //拿到表单创建FormData对象；
      let files = ev.target.files; //拿到选择的文件
      formfile.append(
        "menu",
        this.$route.query.menuId + "" || this.$route.query.name
      );
      formfile.append("file", files[0]);
      this.$emit("formfile", formfile);
    },

    deleteConfirm(item) {
      this.$emit("deleteItem", item);
    },
    handleCurrentChange(val) {
      this.$emit("pageNum", val);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.img-box {
  float: left;
  position: relative;
}
.img-box:nth-child(5n + 1) {
  margin-left: 0px !important;
}
input.upload-img {
  height: 49%;
  border: 1px solid red;
  position: absolute;
  width: 100%;
  top: 10px;
  left: 0px;
  cursor: pointer;
  opacity: 0;
  z-index: 10000;
}

.uplaod-bgimg {
  z-index: 10;
  font-size: 84px;
  color: lightgrey;
  margin-top: 41px;
}
.showleft .uplaod-bgimg {
  margin-top: 19px;
  font-size: 61px;
  font-family: 微软雅黑;
}
.uplaod-bgimg img {
  left: 14px;
  top: -61px;
  margin-top: 0px !important;
}
.showleft .uplaod-bgimg img {
  left: 62px;
  top: -61px;
  margin-top: 0px !important;
}
.content-manageappre {
  margin: 0 auto;
  margin-top: 30px;
  width: 96%;
}
.content-manageappre .left {
  width: 18%;
  height: 330px;
  background: #f0f4f7;
  margin-top: 35px;
}
.content-manageappre .showleft {
  width: 40%;
  left: 30%;
  height: 215px;
  background: #f5fafc;
}

.content-manageappre .left img {
  margin: 0 auto;
  width: 40px;
  height: 30px;
  margin-top: 130px;
}
.content-manageappre .left p {
  font-size: 14px;
  margin-top: 4px;
  color: lightgray;
}
.content-manageappre img {
  width: 100%;
  height: 270px;
}
.content-manageappre .showleft img {
  width: 50%;
  height: 64px;
}
.content-manageappre .tuImg {
  position: relative;
  height: 330px;
  width: 18%;
  box-sizing: border-box;
  background: #f5fafc;
  margin-left: 28px;
  margin-top: 35px;
}
.content-manageappre .tuImg span {
  display: block;
  width: 24px;
  height: 24px;
  background: url("../../assets/img/content/cha.png") no-repeat;
  background-size: 24px auto;
  position: absolute;
  right: -11px;
  top: -11px;
  cursor: pointer;
  z-index: 20;
}
.content-manageappre .tuImg p {
  font-size: 13px;
  text-align: center;
  margin-top: 20px;
  color: #58626f;
}
</style>
