<template>
  <div class="product_wizard_step_1__form-item section-title">
    <h4>{{ title }}</h4>
  </div>
</template>

<script>
export default {
  name: "FormTitle",
  data() {
    return {
      options: [
        {
          name: "ahorros",
          title: "¡Te ayudamos a ahorrar para cumplir tus sueños!",
        },
        {
          name: "cts",
          title:
            "Traslada tu CTS con nosotros y asegura el esfuerzo para tu futuro",
        },
        {
          name: "dpf",
          title: "Haz crecer tu dinero con Confianza",
        },
        {
          name: "prestamo",
          title: "¡Tenemos el crédito que necesitas!",
        },
      ],
    };
  },
  computed: {
    title() {
      let value = this.options.filter(
        (option) => option.name === this.$route.params.product
      );
      return value[0].title;
    },
  },
};
</script>
