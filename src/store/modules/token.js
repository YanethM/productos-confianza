export default {
  namespaced: true,
  state: {
    token: "",
    tokenBT: "",
    existeBT: "",
    expirationTime: "",
    xApiKey: "",
    xAddress: "",
  },
  mutations: {
    setApi(state, payload) {
      state.xApiKey = payload.xApiKey;
      state.xAddress = payload.xAddress;
    },
    setToken(state, payload) {
      state.token = payload.token;
      state.tokenBT = payload.tokenBT;
      state.existeBT = payload.existeBT ? payload.existeBT : payload.existBT;
    },
    setExpirationTime(state, payload) {
      state.expirationTime = payload;
    },
    logout(state) {
      state.token = "";
      state.tokenBT = "";
      state.existeBT = "";
      state.expirationTime = "";
      state.xApiKey = "";
      state.xAddress = "";
    },
  },
  actions: {
    SET_API(context, payload) {
      context.commit("setApi", payload);
    },
    SET_TIME(context, payload) {
      context.commit("setExpirationTime", payload);
    },
    SET_TOKEN(context, payload) {
      context.commit("setToken", payload);
    },
    SET_LOGOUT(context) {
      context.commit("logout");
    },
  },
};
