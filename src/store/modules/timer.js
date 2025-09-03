export default {
  namespaced: true,
  state: {
    show: false,
    time: null,
  },
  mutations: {
    setShow(state, value) {
      state.show = value;
    },
    setTime(state, value) {
      state.show = value;
    },
  },
  actions: {
    SET_SHOW(context, payload) {
      context.commit("setShow", payload);
    },
    SET_TIME(context, payload) {
      context.commit("setTime", payload);
    },
  },
};
