export default {
  namespaced: true,
  state: {
    adviserExists: "",
    offerExists: "",
    extensionExists: "",
    extensionMessage: "",
    approvedLoan: "",
    monthlyFee: "",
    tea: "",
    tcea: "",
    feeMessage: "",
    period: "",
    messageTitle: "",
    text1: "",
    text2: "",
  },
  mutations: {
    setCredit(state, payload) {
      state.adviserExists = payload.adviserExists;
      state.offerExists = payload.offerExists;
      state.extensionExists = payload.extensionExists;
      state.extensionMessage = payload.extensionMessage;
      state.approvedLoan = payload.approvedLoan;
      state.monthlyFee = payload.monthlyFee;
      state.tea = payload.tea;
      state.tcea = payload.tcea;
      state.feeMessage = payload.feeMessage;
      state.period = payload.period;
      state.messageTitle = payload.messageTitle;
      state.text1 = payload.text1;
      state.text2 = payload.text2;
    },
  },
  actions: {
    SET_CREDIT(context, payload) {
      context.commit("setCredit", payload);
    },
  },
};
