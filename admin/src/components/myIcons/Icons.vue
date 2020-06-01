<template>
  <div class="ui-fas">
    <el-input
      v-model="name"
      @input.native="filterIcons"
      suffix-icon="el-icon-search"
      placeholder="请输入图标名称"
    ></el-input>
    <ul class="fas-icon-list">
      <li
        v-for="(item, index) in iconList"
        :key="index"
        @click="selectedIcon(item)"
      >
        <i
          class="fas "
          :class="['fa fa-' + item]"
        />
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { iconLists } from "@/plugins/solid.js";
export default {
  name: "compIcons",
  data() {
    return {
      name: "",
      iconList: iconLists
    };
  },
  created() {
    console.log(iconLists);
    console.log(this.iconList);
  },
  methods: {
    filterIcons() {
      if (this.name) {
        this.iconList = this.iconList.filter(item => item.includes(this.name));
      } else {
        this.iconList = iconLists;
      }
    },
    selectedIcon(name) {
      this.$emit("myselectedIcon", name);
    },
    reset() {
      this.name = "";
      this.iconList = iconLists;
    }
  }
};
</script>