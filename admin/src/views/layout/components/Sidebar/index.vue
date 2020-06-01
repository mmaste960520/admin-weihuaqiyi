<template>

  <el-scrollbar wrap-class="scrollbar-wrapper">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in permission_routers"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
      {{permission_routers}}
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Hamburger },
  created() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    }
  },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
<style >
.hamburger-container {
  background: #e67879;
  text-align: center;
  height: 26px;
  line-height: 30px;
  cursor: pointer;
}
.el-menu .el-menu-item {
  min-width: 60px;
  overflow: hidden;
  color: #000;
  height: 46px;
  line-height: 46px;
  background-color: #fff !important;
}
.el-menu .el-menu-item span {
  color: #000;
}
.el-menu-item:hover,
.el-submenu__title:hover,
.el-submenu .el-menu-item:hover {
  background-color: #eff5f8 !important;
  color: #000;
}
.el-submenu__title {
  background-color: #fff !important;
  color: #000;
}

.el-menu-item.is-active {
  background-color: #eff5f8 !important;
  color: #000 !important;
  border-left: 2px solid #e04646;
}

</style>