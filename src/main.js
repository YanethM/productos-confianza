import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGTag from "vue-gtag";

import "./../src/assets/styles.scss";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(
  VueGTag,
  {
    appName: "Productos - Financiera Confianza",
    includes: [
      {
        id: "GTM-WSFPSZN",
      },
    ],
    config: { id: "G-9VHNCZ9KSB" },
  },
  router
);

app.mount("#app");
