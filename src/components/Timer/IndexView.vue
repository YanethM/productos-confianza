<template>
  {{ timerCount }}
</template>

<script>
export default {
  data() {
    return {
      timerCount: 30,
    };
  },
  watch: {
    timerCount: {
      handler(value) {
        if (this.$store.state.timer.show) {
          if (value > 0) {
            setTimeout(() => {
              this.timerCount--;
            }, 1000);
          }
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
};
</script>
