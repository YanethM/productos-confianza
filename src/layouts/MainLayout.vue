<template>
  <header-view></header-view>

  <RouterView />

  <footer-view></footer-view>
</template>

<script setup>
import { RouterView } from "vue-router";

import HeaderView from "./../components/Header/IndexView.vue";
import FooterView from "./../components/Footer/IndexView.vue";
</script>
