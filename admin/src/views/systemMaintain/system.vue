
<template>
  <div class="system content-top-line sys-main">
    <div class="tabs clearfix">
      <el-row
        type="flex"
        class="row-bg"
        justify="space-around"
      >
        <el-col
          v-for="(item,index) in sysImgData"
          :key="index"
          :span="6"
          @click="gotoUrl(item.path,'',index)"
        >
          <img
            class="cursorpointer"
            @click="gotoUrl(item.path,'',index)"
            :src="sysImgData[index].img"
            alt=""
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ElBread from "@/components/ElBread"; //面包屑
export default {
  name: "contentManage",
  components: {
    "el-bread": ElBread
  },
  data() {
    return {
      sysImgData: [
        {
          path:"/systemMaintain/cacheClear",
          img: require("@/assets/img/system/png3.png")
        },
        {
          path:"/systemMaintain/problemDiagnose",
          img: require("@/assets/img/system/png1.png")
        },
        {
          path:"/systemMaintain/performanceOptimize",
          img: require("@/assets/img/system/png2.png")
        }
      ]
    };
  },
  created() {
  },
  methods: {
    gotoUrl(path, query, index) {
      this.$router.push({
        path: !!path ? path : "",
        query: !!query ? query : ""
      });
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.tabs {
  position: relative;
}
img.cursorpointer {
    width: 100%;
}
.sys-main {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
}
</style>
