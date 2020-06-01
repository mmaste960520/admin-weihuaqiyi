<template>
  <div class="tp">
    <div class="hw_box">
      <div class="hw_bg"></div>
      <!-- 头部 -->
      <!--参观留言-用户留言-->
      <header>
        <h3>参观留言</h3>
        <div class="hw_return" @click='prev'>
          <img src="../../../static/img/ico_return.png" alt="">
        </div>
      </header>
      <!--内容-->
      <div class="hw_content">
          <div class="hw_con">
            <div class="hw_con_text">
              <p>用户姓名:</p>
              <input type="text" placeholder="请输入您的名称" v-model="name">
            </div>
            <!--<div class="hw_con_text">
              <p>联系电话:</p>
              <input type="text" placeholder="请输入您的电话" v-model="phone">
            </div>-->
            <div class="hw_message_con">
              <p>留言内容:</p>
              <textarea cols="" rows="" placeholder="请输入留言" v-model="content"></textarea>
            </div>
            <div class="hw_message_con">
              <p>上传图片:</p>

              <div class="hw_message_pic">
                <!--    照片添加    -->
                <div class="z_photo">
									<div class="z_file">
                    <input type="file" name="file" id="file" value="" accept="image/*" multiple @change="imgChange('z_photo','z_file');" />
                  </div>
                </div>

                <!--遮罩层-->
                <div class="z_mask">
                  <!--弹出框-->
                  <div class="z_alert">
                    <p>确定要删除这张图片吗？</p>
                    <p>
                      <span class="z_cancel">取消</span>
                      <span class="z_sure">确定</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button @click="fabiaoSbumit()">发表留言</button>
      </div>
    </div>
  </div>

</template>

<script>
  import { MessageBox } from 'mint-ui';
    export default {
      name: "user-message",
      data(){
        return{
          fileobj:"",
          name:'',
          phone:'',
          content:'',
          imgDataUrl:'',
          imgUrl:[],
          imageurl:[]
        }
      },
      methods:{
        imgChange(obj1, obj2) {
          //获取点击的文本框
          var file = document.getElementById("file");
          //存放图片的父级元素
          var imgContainer = document.getElementsByClassName(obj1)[0];
          //获取的图片文件
          var fileList = file.files;
          //文本框的父级元素
          var input = document.getElementsByClassName(obj2)[0];
          var imgArr = [];
          //遍历获取到得图片文件
          for (var i = 0; i < fileList.length; i++) {
            var imgUrl = window.URL.createObjectURL(file.files[i]);
            imgArr.push(imgUrl);
            var img = document.createElement("img");
            img.style.width = 1 + "rem";
            img.style.height = 1 + "rem";
            img.setAttribute("src", imgArr[i]);
            var imgAdd = document.createElement("div");
            imgAdd.style.marginTop = 0.05+"rem";
            imgAdd.style.position = "relative";
            imgAdd.setAttribute("class", "z_addImg");
            imgAdd.appendChild(img);

            var span = document.createElement("span");
            span.style.width = "0.15rem";
            span.style.height = "0.15rem";
            span.style.position = "absolute";
            span.style.top = "-0.04rem";
            span.style.fontSize = "0.15rem";
            span.style.lineHeight = "0.15rem";
            span.style.color = "#fbf8f8";
            span.style.right = "-0.05rem";
            span.style.cursor = "pointer";
            span.style.textAlign = "center";
            span.style.backgroundColor = "#E24142";
            span.style.borderRadius = "0.15rem";
            span.innerHTML = "×";
            const _this = this
            span.onclick = function(){
               imgAdd.style.display = "none";
               var delImgUrlValue = img.getAttribute('value')//被删除的图片的地址
               var delImgIndex = _this.imageurl.indexOf(delImgUrlValue)
               _this.imageurl.splice(delImgIndex,1)
            }

            imgAdd.appendChild(img);
            imgAdd.appendChild(span);

            imgContainer.insertBefore(imgAdd, input);
            // console.log(fileList[0])
            var data = new FormData();
            console.log(fileList[0]);
            console.log(localStorage.id);
            data.append("file", fileList[0]);
            data.append("menu",localStorage.id)
            $.ajax({
              url: localStorage.http + '/syx/file/multipleUpload/',
              type: 'POST',
              data: data,
              cache: false,
              processData: false,
              contentType: false
            }).done( (response)=> {
              img.setAttribute("value",(response.data).toString())
              this.imageurl.push((response.data).toString())
              console.log(this.imageurl)
            });
          }

        },
        imgRemove() {
          var imgList = document.getElementsByClassName("z_addImg");
          var mask = document.getElementsByClassName("z_mask")[0];
          var cancel = document.getElementsByClassName("z_cancel")[0];
          var sure = document.getElementsByClassName("z_sure")[0];
          for (var j = 0; j < imgList.length; j++) {
            imgList[j].index = j;
            imgList[j].onclick = function() {
              var t = this;
              mask.style.display = "block";
              cancel.onclick = function() {
                mask.style.display = "none";
              };
              sure.onclick = function() {
                mask.style.display = "none";
                t.style.display = "none";
              };
            }
          }
        },
        //参观留言
        prev(){
          this.$router.push('/visitMessage')
        },
        //判断用户是否输入内容
        fabiaoSbumit() {
          /*if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.phone)) {
            MessageBox('提示', '请输入正确手机号');
          } else */
          if(this.name.length <= 1){
            MessageBox('提示', '用户名必须大于两个字符');
          } else if(this.content.length == 0){
            MessageBox('提示', '请输入留言内容');
          } else {
            this.tijiaoliuyan();
          }
        },
        // 提交内容
        tijiaoliuyan(){
          this.$axios({
            method: 'post',
            url: 'syx/liuyanbiao',
            data: {
              "userId": localStorage.id,
              "name": this.name,
              "phone": this.phone,
              "content": this.content,
              "uploadImgPath": this.imageurl.toString(),
              "address": "",
            },
          }).then((res) => {
            console.log(res)
            if (res) {
              if (res.data.code === 20000) {
                //成功请求
                MessageBox('提示', res.data.message);
                this.$router.push('/visitMessage')//参观留言
              } else {
                //失败
                MessageBox('提示', res.data.message);
              }
            }
          })
        }
      }

    }
</script>

<style scoped>
  body{
    width: 100%;
  }
  .hw_bg{
    background: url(../../assets/img/bg_visit_message.png);
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    z-index: 0;
  }
  .hw_box{
    width: 100%;
  }
  /*头部*/
  header{
    width: 100%;
    height: 0.47rem;
    /*background: radial-gradient(#d3a150, #c68641);*/
    background: url(../../../static/img/header_bg.png);
    background-size: 100%;
    background-position: 0 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .hw_return{
    height: 100%;
    width: 0.47rem;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 20;
  }
  header h3{
    color: #fff;
    font-size: 0.17rem;
    line-height: 0.47rem;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  header img{
    width: 0.1rem;
    height: 0.18rem;
    margin-left: 0.18rem;
  }
  /*内容*/
  .hw_content{
    width: 100%;
    padding: 0 0.1rem;
    box-sizing: border-box;
    padding-top: 0.47rem;
    z-index: 1;
    position: relative;
  }
  .hw_content form{
    display: flex;
    flex-direction: column;
  }
  .hw_con{
    width: 100%;
    min-height: 4.68rem;
    background: rgba(255,255,255,.7);
    margin-top: 0.15rem;
    padding: 0 0.18rem;
    box-sizing: border-box;
  }
  .hw_con_text{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.07rem 0;
  }
  .hw_con_text p{
    font-size: 0.14rem;
    color: #c00000;
  }
  .hw_con_text input{
    outline: none;
    width: 2.37rem;
    height: 0.33rem;
    border: 0.02rem solid #e1dcd8;
    font-size: 0.13rem;
    border-radius: 0.02rem;
    text-indent: 0.2rem;
  }
  /*留言输入框*/
  .hw_message_con{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.07rem 0;
  }
  .hw_message_con p{
    font-size: 0.14rem;
    color: #c00000;
  }
  .hw_message_con textarea{
    resize: none;
    outline: none;
    line-height: 0.24rem;
    width: 2.33rem;
    height: 1.75rem;
    border: 0.02rem solid #e1dcd8;
    font-size: 0.13rem;
    border-radius: 0.02rem;
    text-indent: 0.2rem;
  }
  .hw_message_pic{
    width: 2.39rem;
  }
  .hw_pic_box{
    width: 0.85rem;
    height: 0.85rem;
    float: left;
    margin-right: 0.15rem;
  }
  .hw_pic_box img{
    width: 0.85rem;
    height: 0.85rem;
    border: 1px solid #bcb4ae;
  }
  button{
    width: 3.48rem;
    height: 0.44rem;
    margin: 0.3rem auto 0.4rem;
    background: #c58440;
    font-size: 0.15rem;
    color: #fff;
    line-height: 0.44rem;
    border: none;
  }

  .hw_add {
    width: 0.85rem;
    height: 0.85rem;
    display: inline-block;
    margin-bottom: 20px;
    border: 1px dashed #e0dfde;
    background: url("../../assets/img/bg_add.png") no-repeat;
    background-size: 100% 100%;
  }


  .z_photo {
    /*width: 5rem;*/
    /*height: 5rem;*/
    /*padding: 0.3rem;*/
    overflow: auto;
    clear: both;
    /*margin: 1rem auto;*/
    /*border: 1px solid #555;*/
  }

  .z_photo img {
    width: 1rem;
    height: 1rem;
  }

  .z_addImg {
    float: left;
    margin-right: 0.15rem;
  }

  .del_img_span{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 76px;
    font-size: 18px;
    color: red;
    right: 0.1rem;
    cursor: pointer;
  }

  .z_file {
    width: 1rem;
    height: 1rem;
    background: url(../../assets/img/z_add.png) no-repeat;
    background-size: 100% 100%;
    float: left;
    margin-right: 0.15rem;
    margin-top: 0.05rem;
  }

  .z_file input::-webkit-file-upload-button {
    width: 1rem;
    height: 1rem;
    border: none;
    position: absolute;
    outline: 0;
    opacity: 0;
  }

  .z_file input#file {
    display: block;
    width: auto;
    border: 0;
    vertical-align: middle;
  }
  /*遮罩层*/

  .z_mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: none;
  }

  .z_alert {
    width: 3rem;
    height: 2rem;
    border-radius: .2rem;
    background: #fff;
    font-size: .24rem;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1.5rem;
    margin-top: -2rem;
  }

  .z_alert p:nth-child(1) {
    line-height: 1.5rem;
  }

  .z_alert p:nth-child(2) span {
    display: inline-block;
    width: 49%;
    height: .5rem;
    line-height: .5rem;
    float: left;
    border-top: 1px solid #ddd;
  }

  .z_cancel {
    border-right: 1px solid #ddd;
  }


</style>
