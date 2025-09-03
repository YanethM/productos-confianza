<template>
  <div class="product_wizard_step_1__banner__item" v-if="option">
    <carousel :autoplay="8000" :wrap-around="true">
      <slide v-for="image in filteredImages" :key="image">
        <div class="carousel__item">
          <a :href="image.link">
            <img :src="image.url" :alt="option.name" />
          </a>
        </div>
      </slide>

      <template #addons>
        <navigation v-if="filteredImages.length > 1" />
        <pagination v-if="filteredImages.length > 1" />
      </template>
    </carousel>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import { computed, inject } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const option = inject("option");

const filteredImages = computed(() => {
  if (route.query.campaign) {
    return option.value.images.filter(
      (image) => image.campaign === route.query.campaign
    );
  } else {
    return option.value.images;
  }
});
</script>
