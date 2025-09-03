<template>
  <div class="clock-timer">
    <p>
      La sesión terminará en
      <strong>{{ `${time.minutes}min ${time.seconds}seg` }}</strong>
    </p>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      time: {
        minutes: "",
        seconds: "",
      },
    };
  },
  created() {
    let eventTime = this.$store.state.token.expirationTime;
    let currentTime = moment().format("X");
    let diffTime = eventTime - currentTime;
    let duration = moment.duration(diffTime * 1000, "milliseconds");
    let interval = 1000;

    setInterval(() => {
      duration = moment.duration(duration - interval, "milliseconds");

      this.time.minutes = duration.minutes();
      this.time.seconds = duration.seconds();

      if (this.$store.state.token.expirationTime === moment().format("X")) {
        this.$router.push({
          name: "Home",
          params: { product: this.$route.params.product },
        });
      }
    }, interval);
  },
};
</script>

<style>
.clock-timer {
  margin-top: 110px;
  text-align: center;
}
</style>
