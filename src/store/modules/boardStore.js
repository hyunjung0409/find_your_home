import { listArticle, getArticle } from "@/api/board";
import { listComment } from "@/api/comment";

const boardStore = {
  namespaced: true,
  state: {
    boards: [],
    board: null,
    comments: [],
  },
  getters: {
    boards(state) {
      // 게시글 목록
      return state.boards;
    },
    board(state) {
      // 게시글 정보
      return state.board;
    },
    comments(state) {
      // 답변 목록
      return state.comments;
    },
  },
  mutations: {
    setBoards(state, payload) {
      state.boards = payload;
    },
    setBoard(state, payload) {
      state.board = payload;
    },
    setComment(state, payload) {
      state.comments = payload;
    },
  },
  actions: {
    getBoards({ commit }) {
      listArticle(
        (data) => {
          commit("setBoards", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getBoard({ commit }, payload) {
      getArticle(
        payload,
        (data) => {
          commit("setBoard", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getComments({ commit }, payload) {
      listComment(
        payload,
        (data) => {
          commit("setComments", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default boardStore;
