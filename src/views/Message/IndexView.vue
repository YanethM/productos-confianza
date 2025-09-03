<template>
  <div class="product_wizard product_wizard_step_2 blacklist">
    <div class="container">
      <div class="product_wizard_step_2__title">
        <i class="las la-exclamation-circle icon-xl"></i>
        <h4>
          {{ $store.state.message.message }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch("token/SET_LOGOUT");
    this.$store.dispatch("user/SET_LOGOUT");
  },
  created() {
    window.fbq("track", "CompleteRegistration");

    window.gtag("event", "conversion", {
      send_to: "AW-11462679970/vBeuCIb5nIgZEKK76tkq",
    });

    let r = this.$router.resolve({
      name: this.$route.name,
      params: this.$route.params,
      query: this.$route.query,
    });

    setTimeout(() => (window.location.href = `/${r.params.product}`), 20000);
  },
};
</script>
