<template>
  <div class="nav-links">
    <RouterLink
      class="link-item"
      :class="{ active: currentRoute === 'ahorros' }"
      :to="{ name: 'Home', params: { product: 'ahorros' } }"
    >
      Cuenta de Ahorro
    </RouterLink>
    <RouterLink
      class="link-item"
      :class="{ active: currentRoute === 'cts' }"
      :to="{ name: 'Home', params: { product: 'cts' } }"
    >
      CTS
    </RouterLink>
    <RouterLink
      class="link-item"
      :class="{ active: currentRoute === 'dpf' }"
      :to="{ name: 'Home', params: { product: 'dpf' } }"
    >
      Depósito a Plazo Fijo
    </RouterLink>
    <RouterLink
      class="link-item"
      :class="{ active: currentRoute === 'prestamo' }"
      :to="{ name: 'Home', params: { product: 'prestamo' } }"
    >
      Crédito
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: "HeaderLinks",
  computed: {
    currentRoute() {
      return this.$route.params.product;
    },
  },
};
</script>
