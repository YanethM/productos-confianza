<template>
  <div id="app">
    <load-layout v-if="isLoading">
      <base-loading></base-loading>
    </load-layout>
    <main-layout v-else></main-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

import MainLayout from "./layouts/MainLayout.vue";
import LoadLayout from "./layouts/LoadLayout.vue";
import BaseLoading from "./components/BaseLoading.vue";

export default {
  name: "App",
  components: {
    MainLayout,
    LoadLayout,
    BaseLoading,
  },
  computed: {
    ...mapState("loading", {
      isLoading: "isLoading",
    }),
  },
};
</script>
