<template>
  <section
    class="app-main"
    :class="{ 'iscontent': $route.path.search('/content') === -1}"
  >
    <div class="myclearfix">
      <breadcrumb
        v-if="$route.path.search('/content') === -1"
        class="breadcrumb-container"
      />
    </div>
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "AppMain",
  components: {
    Breadcrumb
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 84px);
  width: 100%;
  min-width: 1050px;
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  text-align: center;
  margin-top: 65px;
}
.breadcrumb-container {
  float: left;
}
.iscontent {
  /* margin: 0px 0px 0px 0px; */
  padding: 10px;
  width: 100%;
  border: 10px solid #dee5e6;
  padding-bottom: 144px;
  border-bottom: none;
}
</style>

