<template>
  <div class="product_wizard product_wizard_step_1">
    <div class="product_wizard_step_1__banner">
      <home-banner></home-banner>
    </div>

    <div class="product_wizard_step_1__form">
      <home-form></home-form>
    </div>
  </div>
</template>

<script setup>
import HomeBanner from "./HomeBanner.vue";
import HomeForm from "./HomeForm.vue";

import axios from "axios";
import { computed, provide, ref } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";

const data = ref([]);
const url = computed(() => {
  return `${import.meta.env.VITE_WEB_URL}/data/products.json?${moment().format(
    "Ymd"
  )}`;
});

const loadData = () => {
  axios
    .get(url.value)
    .then((response) => {
      data.value = response.data.products;
    })
    .catch((error) => console.log(error));
};

loadData();

const route = useRoute();

const option = computed(() => {
  let value = data.value.filter(
    (option) => option.name === route.params.product
  );

  return value.shift();
});

provide("option", option);
</script>
