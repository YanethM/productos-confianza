export default {
  namespaced: true,
  state: {
    message: "",
  },
  mutations: {
    setMessage(state, value) {
      state.message = value;
    },
  },
  actions: {
    SET_MESSAGE(context, value) {
      context.commit("setMessage", value);
    },
  },
};
