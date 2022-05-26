<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import MainLayout from "@views/layouts/MainLayout.vue";
import EmptyLayout from "@views/layouts/EmptyLayout.vue";
export default {
  name: "App",
  components: {
    MainLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      const route = this.$route.meta;
      return route.layout ? route.layout : "EmptyLayout";
    },
  },
};
</script>
<style>
body {
  background: rgb(235, 235, 235);
}
select {
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right;
  background-size: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-position-x: 95%;
}
</style>
