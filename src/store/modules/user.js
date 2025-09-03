export default {
  namespaced: true,
  state: {
    name: "",
    document_num: "",
    document_type: "",
  },
  mutations: {
    setName(state, value) {
      state.name = value;
    },
    setDocumentNum(state, value) {
      state.document_num = value;
    },
    setDocumentType(state, value) {
      state.document_type = value;
    },
    logout(state) {
      state.name = "";
      state.document_num = "";
      state.document_type = "";
    },
  },
  actions: {
    SET_NAME(context, payload) {
      context.commit("setName", payload);
    },
    SET_DOC_NUM(context, payload) {
      context.commit("setDocumentNum", payload);
    },
    SET_DOC_TYPE(context, payload) {
      context.commit("setDocumentType", payload);
    },
    SET_LOGOUT(context) {
      context.commit("logout");
    },
  },
};
