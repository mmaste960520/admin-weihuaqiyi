<template>
  <div class="me">
    <div class="tabs">
      <ul>
        <router-link
          v-for="(item,index) in $router.options.routes[4].children"
          :key="!!item.id?item.id:index"
          :to="{name: item.name}"
          @click.native="setCurrentMenu(item.name)"
          tag="li"
          v-show="!item.show&&item.show!==false"
        >{{item.name}}</router-link>
      </ul>
    </div>
    <div class="content-manage">
      <el-row
        :gutter="20"
        style="margin-bottom:10px;"
      >
        <el-col :span="9">
          <el-bread @currentContentRouter="MenuArr"></el-bread>
        </el-col>
        <el-col :span="11"
          v-show="$route.matched[this.$route.matched.length - 1].name.indexOf('-')==-1"
        >
          <div
            class="child-menu-box"
            v-if="!!childMenuArr && !!childMenuArr.children && childMenuArr.children.length>0  "
          >
            <router-link
              v-for="(item,index) in childMenuArr.children"
              :key="!!item.id?item.id:index"
              v-show="!item.show&&item.show!==false"
              tag="el-button"
              @click.native="setPreMenu(item.name)"
              :to="{path: !!item.path ? item.path : '',query: { menuId: !!item.id ? item.id : '' }}"
            >{{item.name}}</router-link>
          </div>
        </el-col>
      </el-row>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import ElBread from "@/components/ElBread.1.vue"; //面包屑
export default {
  name: "contentManage",
  components: {
    "el-bread": ElBread
  },
  data() {
    return {
      subMenus: [],
      id: null,
      childMenuArr: { children: [] }
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    MenuArr(val) {
      this.childMenuArr = !!val && val !== undefined ? val : this.childMenuArr;
    },
    setCurrentMenu(name) {
      if (
        this.$route.matched.length <= 3 ||
        this.childMenuArr.children.length < 0
      ) {
        this.$route.matched[this.$route.matched.length - 1].name = !!name
          ? name
          : this.$route.matched[this.$route.matched.length - 1].name;
      } else {
        window.sessionStorage.setItem(
          "preMenu",
          !!this.childMenuArr.children[0] &&
            !!this.childMenuArr.children[0].name
            ? this.childMenuArr.children[0].name
            : ""
        );
        this.$route.matched[this.$route.matched.length - 1].name = !!this
          .childMenuArr.children[0].name
          ? this.childMenuArr.children[0].name
          : this.$route.matched[this.$route.matched.length - 1].name;
      }
    },
    setPreMenu(name) {
      window.sessionStorage.setItem("preMenu", name);
      this.$route.matched[this.$route.matched.length - 1].name = name;
    }
  },
  watch: {}
};
</script>
<style lang="scss" rel="stylesheet/scss" type="text/scss" scoped>
.me {
  .content-manage {
    border-left: 10px solid #dee5e6;
    padding: 10px 12px;
    min-height: 704px;
    border-right: 10px solid #dee5e6;
  }
  .tabs {
    border-bottom: 10px solid #dee5e6;
    & > ul,
    & > ul > li {
      margin: 0;
      padding: 0;
      list-style: none;
      cursor: pointer;
    }

    & > ul {
      display: flex;
      border-bottom: #cccccc solid 1px;
      & > li {
        flex: 1;
        text-align: center;
        padding: 10px 0px;
        &.router-link-active {
          color: #d0021b;
          border-bottom: 2px solid #d0021b;
        }
      }
    }
  }
}
</style>
