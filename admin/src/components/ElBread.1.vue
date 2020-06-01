

<template>
  <el-breadcrumb separator-class="fa fa-angle-right">
    <!-- 内容管理模块面包屑导航 -->
    <el-breadcrumb-item
      v-for="(item, index) in breadlist"
      :key="index"
      :to="{ path: item.path }"
    >
      <i
        v-if="index===0"
        class="fa fa-home"
      >
        <span>首页&nbsp;&gt;&nbsp;</span>
      </i>
      {{item.meta.title||item.name||''}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      breadlist: [],
      contentMenu: "",
      contentRouter: "",
      currentRouteName: "",
      currentContentRouter: ""
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"])
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.breadlist = this.$route.matched;
      this.contentRouter = !!this.permission_routers[4].children
        ? this.permission_routers[4].children
        : [];
      this.currentRouteName = !!this.$route.matched[2]
        ? this.$route.matched[2].name
        : "";
      console.log(this.currentRouteName);
      this.currentContentRouter = this.getRounterIndex();
      this.$emit("currentContentRouter", this.currentContentRouter);
    },
    getRounterIndex() {
      console.log(this.contentRouter);
      for (var i = 0; i < this.contentRouter.length; i++) {
        if (this.contentRouter[i].name === this.currentRouteName) {
          return this.contentRouter[i];
        } else {
          for (var j = 0; j < this.contentRouter[i].children.length; j++) {
            if (
              this.contentRouter[i].children[j].name === this.currentRouteName
            ) {
              return this.contentRouter[i];
            }
          }
        }
      }
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>
<style lang="scss">
.el-breadcrumb {
  width: 80%;
  padding: 0px 0px 0px;
  font-size: 14px;
  .el-breadcrumb__item:last-child .el-breadcrumb__inner,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #d43537;
  }
  .el-breadcrumb__inner {
    i {
      color: #d43537;
      margin-right: -3px;
    }
    span {
      color: #bbb;
    }
  }
}
</style>
