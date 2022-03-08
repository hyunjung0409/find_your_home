import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Instargram from "@/views/Instargram.vue";

import Member from "@/views/Member.vue";
import MemberLogin from "@/components/user/MemberLogin.vue";
import MemberJoin from "@/components/user/MemberJoin.vue";
import MemberMyPage from "@/components/user/MemberMyPage.vue";
import MemberModify from "@/components/user/MemberModify";
import MemberDelete from "@/components/user/MemberDelete";
import MemberFindPwd from "@/components/user/MemberFindPwd";

import Admin from "@/views/Admin.vue";
import AdminList from "@/components/admin/AdminList.vue";
import AdminRegister from "@/components/admin/AdminRegister.vue";
// import AdminModify from "@/components/admin/AdminModify.vue";

import Board from "@/views/Board.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardView from "@/components/board/BoardView.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";

import Qna from "@/views/Qna.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaWrite from "@/components/qna/QnaWrite.vue";
import QnaView from "@/components/qna/QnaView.vue";
import QnaUpdate from "@/components/qna/QnaUpdate.vue";

import House from "@/views/House.vue";

import store from "@/store/index.js";

Vue.use(VueRouter);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "SignIn" });
    router.push({ name: "SignIn" });
  } else {
    console.log("로그인 했다.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/instargram",
    name: "Instargram",
    component: Instargram,
  },
  {
    path: "/user",
    name: "Member",
    component: Member,
    children: [
      {
        path: "singin",
        name: "SignIn",
        component: MemberLogin,
      },
      {
        path: "singup",
        name: "SignUp",
        component: MemberJoin,
      },
      {
        path: "mypage",
        name: "MyPage",
        beforeEnter: onlyAuthUser,
        component: MemberMyPage,
      },
      {
        path: "modify",
        name: "Modify",
        beforeEnter: onlyAuthUser,
        component: MemberModify,
      },
      {
        path: "delete",
        name: "Delete",
        beforeEnter: onlyAuthUser,
        component: MemberDelete,
      },
      {
        path: "findPwd",
        name: "FindPwd",
        component: MemberFindPwd,
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    redirect: "/admin/user",
    children: [
      {
        path: "user",
        name: "AdminList",
        component: AdminList,
      },
      {
        path: "user",
        name: "AdminRegister",
        component: AdminRegister,
      },
      // {
      //   path: "user",
      //   name: "AdminModify",
      //   component: AdminModify,
      // },
    ],
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "BoardList",
        component: BoardList,
      },
      {
        path: "write",
        name: "BoardWrite",
        beforeEnter: onlyAuthUser,
        component: BoardWrite,
      },
      {
        path: "detail/:articleno",
        name: "BoardView",
        beforeEnter: onlyAuthUser,
        component: BoardView,
      },
      {
        path: "update/:articleno",
        name: "BoardUpdate",
        beforeEnter: onlyAuthUser,
        component: BoardUpdate,
      },
    ],
  },
  {
    path: "/qna",
    name: "Qna",
    component: Qna,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "QnaList",
        component: QnaList,
      },
      {
        path: "write",
        name: "QnaWrite",
        beforeEnter: onlyAuthUser,
        component: QnaWrite,
      },
      {
        path: "detail/:articleno",
        name: "QnaView",
        beforeEnter: onlyAuthUser,
        component: QnaView,
      },
      {
        path: "update/:articleno",
        name: "QnaUpdate",
        beforeEnter: onlyAuthUser,
        component: QnaUpdate,
      },
      // {
      //   path: "delete/:articleno",
      //   name: "QnaDelete",
      //   component: QnaDelete,
      // },
    ],
  },
  {
    path: "/house",
    name: "House",
    component: House,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
