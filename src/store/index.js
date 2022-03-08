import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import http from "@/util/http-common";

Vue.use(Vuex);

import memberStore from "@/store/modules/memberStore.js";
import boardStore from "@/store/modules/boardStore.js";
import houseStore from "@/store/modules/houseStore.js";

const store = new Vuex.Store({
  modules: {
    memberStore,
    boardStore,
    houseStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
  state: {
    comments: [],
    boardlist: [],
    qnalist: [],
  },
  getters: {
    comments(state) {
      // 도서평 목록
      return state.comments;
    },
    boardlist: (state) => {
      return state.boardlist;
    },
    qnalist(state) {
      return state.qnalist;
    },
  },
  mutations: {
    setComments(state, payload) {
      state.comments = payload;
    },
    ALLBOARD: (state, payload) => {
      state.boardlist = payload.boardlist;
    },
    ALLQNA: (state, payload) => {
      state.qnalist = payload.qnalist;
    },
  },
  actions: {
    getComments(context, payload) {
      http.get(payload).then(({ data }) => {
        context.commit("setComments", data);
      });
    },
    ALLBOARD: (store) => {
      http
        .get("/board")
        .then((response) => {
          store.commit("ALLBOARD", { boardlist: response.data });
        })
        .catch((response) => {
          console.log(response);
        });
    },
    ALLQNA: (store) => {
      http
        .get("/qna")
        .then((response) => {
          store.commit("ALLQNA", { qnalist: response.data });
        })
        .catch((response) => {
          console.log(response);
        });
    },
  },
});

export default store;
