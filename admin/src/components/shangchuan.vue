<template>
  <div>
    <input
      id="upload_file"
      type="file"
      accept='image/*'
      name="file"
      @change="fileChange($event)"
    /> 
    <div
      class="image-item space"
      @click="showActionSheet()"
    >
      <div class="image-up"></div>
    </div>
    <div class="upload_warp">
      <div class="upload_warp_img">
        <!-- 图片回显 start -->
        <div
          v-show="getImglist.length>0"
          class="upload_warp_img_div"
          v-for="(item,ind) in getImglist"
        >
          <div class="upload_warp_img_div_top">
            <img
              src="@/assets/img/delImg.png"
              class="upload_warp_img_div_del"
              @click="fileGetImgListDel(ind)"
            >
          </div>
          <img
            :src="item"
            style="display: inline-block;"
          >
        </div>
        <!-- 图片回显 end -->
        <div
          class="upload_warp_img_div"
          v-for="(item,index) in imgList"
        >
          <div class="upload_warp_img_div_top">
            <img
              src="@/assets/img/delImg.png"
              class="upload_warp_img_div_del"
              @click="fileDel(index)"
            >
          </div>
          <img
            :src="item"
            style="display: inline-block;"
          >
        </div>
        <div
          class="upload_warp_left"
          id="upload_warp_left"
          @click="fileClick()"
          v-if="this.imgList.length+ getImglist.length < 6"
        >
          <img
            src="@/assets/img/addpng.png"
            class="imgs"
          />
        </div>
      </div>
    </div>
    <div class="upload_warp_text">
      <span>已选择{{imgList.length + getImglist.length}}张图片</span>
    </div>
    <button
      class="pz_btn"
      @click="handleClick()"
    >提交作业</button>
  </div>

</template>

<script>
import $ from "jquery";
import API from "@/api/api_zuoye.js";
import Cropper from "cropperjs";
import Exif from "exif-js";
export default {
  name: "shangchuan",
  data() {
    return {
      imgList: [],
      datas: new FormData(),
      files: 0,
      size: 0
    };
  },
  props: {
     getImglist: {
      type: Array,
      default: () => []
    },
    // // 定义的宽高比
    widthRate: {
      type: Number,
      default: 1
    },
    // 定义的宽高比
    heightRate: {
      type: Number,
      default: 1
    },
    imgUrl: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  methods: {
    //调用相册&相机
    fileClick() {
      $("#upload_file").click();
    },
    //调用手机摄像头并拍照
    getImage() {
      let cmr = plus.camera.getCamera();
      cmr.captureImage(
        function(p) {
          plus.io.resolveLocalFileSystemURL(
            p,
            function(entry) {
              compressImage(entry.toLocalURL(), entry.name);
            },
            function(e) {
              plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            }
          );
        },
        function(e) {},
        {
          filter: "image"
        }
      );
    },
    //从相册选择照片
    galleryImgs() {
      plus.gallery.pick(
        function(e) {
          let name = e.substr(e.lastIndexOf("/") + 1);
          compressImage(e, name);
        },
        function(e) {},
        {
          filter: "image"
        }
      );
    },
    //点击事件，弹出选择摄像头和相册的选项
    showActionSheet() {
      let bts = [
        {
          title: "拍照"
        },
        {
          title: "从相册选择"
        }
      ];
      plus.nativeUI.actionSheet(
        {
          cancel: "取消",
          buttons: bts
        },
        function(e) {
          if (e.index == 1) {
            this.getImage();
          } else if (e.index == 2) {
            this.galleryImgs();
          }
        }
      );
    },
    fileChange(el) {
      let image = document.getElementById("img"); //预览对象
      let that= this;
      this.clip(event, {
        resultObj: that.fileList,
        aspectWithRatio: Number(this.widthRate),
        aspectHeightRatio: Number(this.heightRate)
      });
    },
    fileDel(index) {
      this.imgList.splice(index, 1);
    },
    fileGetImgListDel(index) {
      this.getImglist.splice(index, 1);
    },
    bytesToSize(bytes) {
      if (bytes === 0) {
        return "0 B";
      }
      let k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
    handleClick() {
      // base64转为file类型进行图片上传
      var form = new FormData();
      form.append("menu", "zuoye");
      var bytes="";
      var array=[];
      var blob ="";
      for (var i = 0; i < this.imgList.length; i++) {
         bytes = window.atob(this.imgList[i].split(',')[1]);
         array = [];
        for(var j = 0; j < bytes.length; j++){
            array.push(bytes.charCodeAt(j));
        }
        blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
        form.append("file", blob, Date.now() + '.jpg');
      }
      window.sessionStorage.setItem("responseType", "form");
      API.uploadAPI(form)
        .then(res => {
          if (!!res && res.code === 20000) {
            let imgSumArr = this.getImglist.concat(res.data);
            this.$emit("imgPathArr", imgSumArr);
          }
          window.sessionStorage.setItem("responseType", "json");
        })
        .catch(err => {
          window.sessionStorage.setItem("responseType", "json");
        });
    },

    initilize(opt) {
      let self = this;
      this.options = opt;
      //创建dom
      this.createElement();
      this.resultObj = opt.resultObj;
      //初始化裁剪对象
      this.cropper = new Cropper(this.preview, {
        aspectRatio: opt.aspectWithRatio / opt.aspectHeightRatio,
        autoCropArea: opt.autoCropArea || 0.8,
        viewMode: 2,
        guides: true,
        cropBoxResizable: true, //是否通过拖动来调整剪裁框的大小
        cropBoxMovable: true, //是否通过拖拽来移动剪裁框。
        dragCrop: false,
        dragMode: "move", //‘crop’: 可以产生一个新的裁剪框3 ‘move’: 只可以移动3 ‘none’: 什么也不处理
        center: true,
        zoomable: true, //是否允许放大图像。
        zoomOnTouch: true, //是否可以通过拖动触摸来放大图像。
        scalable: true,
        // minCropBoxHeight: 750,
        // minCropBoxWidth: 750,
        background: false,
        checkOrientation: true,
        checkCrossOrigin: true,
        zoomable: false,
        zoomOnWheel: false,
        center: false,
        toggleDragModeOnDblclick: false,
        ready: function() {
          if (opt.aspectRatio == "Free") {
            let cropBox = self.cropper.cropBox;
            cropBox.querySelector("span.cropper-view-box").style.outline =
              "none";
            self.cropper.disable();
          }
        }
      });
    },
    //创建一些必要的DOM，用于图片裁剪
    createElement() {
      //初始化图片为空对象
      this.preview = null;
      let str =
        '<div><img id="clip_image" src="originUrl"></div><button type="button" id="cancel_clip">取消</button><button type="button" id="clip_button">确定</button>';
      str +=
        '<div class="crop_loading"><div class="crop_content"><div class="crop_text">图片修剪中...</div></div></div>';
      str +=
        '<div class="crop_success"><div class="crop_success_text">上传成功</div></div></div>';
      let body = document.getElementsByTagName("body")[0];
      this.reagion = document.createElement("div");
      this.reagion.id = "clip_container";
      this.reagion.className = "container";
      this.reagion.innerHTML = str;
      body.appendChild(this.reagion);
      this.preview = document.getElementById("clip_image");
      //绑定一些方法
      this.initFunction();
    },
    //初始化一些函数绑定
    initFunction() {
      let self = this;
      this.clickBtn = document.getElementById("clip_button");
      this.cancelBtn = document.getElementById("cancel_clip");
      //确定事件
      this.addEvent(this.clickBtn, "click", function() {
        self.crop();
      });
      //取消事件
      this.addEvent(this.cancelBtn, "click", function() {
        self.destoried();
      });
      //清空input的值
      this.addEvent(this.fileObj, "click", function() {
        this.value = "";
      });
    },
    //外部接口，用于input['file']对象change时的调用
    clip(e, opt) {
      let self = this;

      this.fileObj = e.srcElement;

      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) return false; //不是图片直接返回

      //调用初始化方法
      this.initilize(opt);

      //获取图片文件资源
      this.picValue = files[0];

      //调用方法转成url格式
      this.originUrl = this.getObjectURL(this.picValue);

      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.originUrl);
      }
    },
    //图片转码方法
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //点击确定进行裁剪
    crop() {
      let self = this;
      let image = new Image();
      let croppedCanvas;
      let roundedCanvas;

      // Crop
      document.querySelector(".crop_loading").style.display = "block";

      setTimeout(function() {
        croppedCanvas = self.cropper.getCroppedCanvas();
        // Round
        roundedCanvas = self.getRoundedCanvas(croppedCanvas);

        let imgData = roundedCanvas.toDataURL();
        image.src = imgData;

        //判断图片是否大于100k,不大于直接上传，反之压缩
        if (imgData.length < 100 * 1024) {
          // self.resultObj.src = imgData;
          //图片上传
          self.postImg(imgData);
        } else {
          image.onload = function() {
            //压缩处理
            let data = self.compress(image, self.Orientation);
            // self.resultObj.src = data;
            //图片上传
            self.postImg(data);
          };
        }
      }, 20);
    },
    //获取裁剪图片资源
    getRoundedCanvas(sourceCanvas) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let width = sourceCanvas.width;
      let height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;

      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.rect(0, 0, width, height);
      context.fill();

      return canvas;
    },
    //销毁原来的对象
    destoried() {
      let self = this;
      //移除事件
      this.removeEvent(this.clickBtn, "click", null);
      this.removeEvent(this.cancelBtn, "click", null);
      this.removeEvent(this.fileObj, "click", null);
      //移除裁剪框
      this.reagion.parentNode.removeChild(this.reagion);

      //销毁裁剪对象
      this.cropper.destroy();
      this.cropper = null;
    },
    //图片上传
    postImg(imageData) {
      this.$emit("callback", imageData);
      //这边写图片的上传
      let self = this;
      self.destoried();
      this.imgList.push(imageData);
    },
    //图片旋转
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    //图片压缩
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;

      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/png", 0.1);
      console.log(
        "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

      return ndata;
    },
    //添加事件
    addEvent(obj, type, fn) {
      if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
      } else {
        obj.attachEvent("on" + type, fn);
      }
    },
    //移除事件
    removeEvent(obj, type, fn) {
      if (obj.removeEventListener) {
        obj.removeEventListener(type, fn, false);
      } else {
        obj.detachEvent("on" + type, fn);
      }
    }
  }
};
</script>
<style>
.upload_warp_img_div {
  position: relative;
  margin-right: 9px;
  display: inline-block;
  margin-bottom: 5px;
  margin-top: 10px;
}
div#upload_warp_left {
  display: inline-block;
  width: 100px;
  height: 100px;
}
img.upload_warp_img_div_del {
  width: 21px !important;
  height: 21px !important;
  position: absolute;
  top: -9px;
  right: -9px;
}
div#upload_warp_left img {
  width: 100px;
  height: 100px;
}
.upload_warp_text {
  color: #757575;
}
#upload_file {
  display: none;
}
.upload_warp_img_div img {
  width: 100px;
  height: 100px;
}
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
}
 
input[type='file'] {
  outline: none;
  /*margin-top: 20px;*/
}

 
#clip_button {
  position: absolute;
  right: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  background: #1AAD19;
  color: #fff;
}
 
#cancel_clip {
  position: absolute;
  left: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  color: #fff;
  background: #E64340;
}
 
#clip_container.container {
  z-index: 99999;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}
 
#clip_container.container>div {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
 
#clip_image {
  max-width: 100%;
}
 
.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none
}
 
.crop_loading,
.crop_success {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
 
.crop_loading .crop_content {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  height: 66px;
  width: 140px;
  vertical-align: middle;
  color: #fff;
  padding-top: 20px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
 
.crop_loading .crop_content img {
  margin-top: 15px;
  margin-bottom: 10px;
}
 
.crop_success .crop_success_text {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  width: 120px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
 
.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg
}
 
.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
 
.cropper-wrap-box {
  overflow: hidden;
}
 
.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}
 
.cropper-modal {
  opacity: .5;
  background-color: #000;
}
 
.cropper-view-box {
  display: block;
  overflow: hidden;
 
  width: 100%;
  height: 100%;
 
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}
 
.cropper-dashed {
  position: absolute;
 
  display: block;
 
  opacity: .5;
  border: 0 dashed #eee
}
 
.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px
}
 
.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px
}
 
.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;
 
  display: block;
 
  width: 0;
  height: 0;
 
  opacity: .75
}
 
.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: ' ';
  background-color: #eee
}
 
.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px
}
 
.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px
}
 
.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;
 
  display: block;
 
  width: 100%;
  height: 100%;
 
  opacity: .1;
}
 
.cropper-face {
  top: 0;
  left: 0;
 
  background-color: #fff;
}
 
.cropper-line {
  background-color: #39f
}
 
.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize
}
 
.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize
}
 
.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize
}
 
.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize
}
 
.cropper-point {
  width: 5px;
  height: 5px;
 
  opacity: .75;
  background-color: #39f
}
 
.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize
}
 
.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize
}
 
.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize
}
 
.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize
}
 
.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize
}
 
.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize
}
 
.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize
}
 
.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1
}
 
@media (min-width: 768px) {
 
  .cropper-point.point-se {
    width: 15px;
    height: 15px
  }
}
 
@media (min-width: 992px) {
 
  .cropper-point.point-se {
    width: 10px;
    height: 10px
  }
}
 
@media (min-width: 1200px) {
 
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: .75
  }
}
 
.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: ' ';
  opacity: 0;
  background-color: #39f
}
 
.cropper-invisible {
  opacity: 0;
}
 
.cropper-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}
 
.cropper-hide {
  position: absolute;
 
  display: block;
 
  width: 0;
  height: 0;
}
 
.cropper-hidden {
  display: none !important;
}
 
.cropper-move {
  cursor: move;
}
 
.cropper-crop {
  cursor: crosshair;
}
 
.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>
