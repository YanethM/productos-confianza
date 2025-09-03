import { createApp } from "vue";
import Vuex from "vuex";

import credit from "./modules/credit";
import loading from "./modules/loading";
import message from "./modules/message";
import token from "./modules/token";
import user from "./modules/user";

const app = createApp({});

app.use(Vuex);

export default new Vuex.Store({
  modules: {
    credit,
    loading,
    message,
    token,
    user,
  },
});
