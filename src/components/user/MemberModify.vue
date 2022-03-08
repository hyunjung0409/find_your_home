<template>
  <b-container class="mt-4" v-if="userInfo">
    <!-- <h2 class="p-3 mb-3 shadow bg-light">
      <mark class="orange">정보수정</mark>
    </h2> -->
    <b-jumbotron
      id="jumbotron"
      bg-variant="muted"
      text-variant="dark"
      class="shadow-lg"
    >
      <div class="col-lg-10 mx-auto">
        <p class="font-weight-bold" id="modify-information" align="left">
          Modify the information
        </p>
        <hr class="my-4" />
        <form id="memberform" class="text-left mb-3" method="post" action="">
          <input type="hidden" id="email" name="email" />
          <input type="hidden" id="tel" name="tel" />
          <input type="hidden" id="address" name="address" />
          <div class="view">
            <div class="form-group">
              <label for="username">이름</label>
              <input
                type="text"
                class="form-control"
                id="username"
                name="userName"
                v-model="userInfo.userName"
                readonly="readonly"
              />
            </div>
            <div class="form-group">
              <label for="userid">아이디</label>
              <input
                type="text"
                class="form-control"
                id="userid"
                name="userId"
                v-model="userInfo.userId"
                readonly="readonly"
              />
            </div>
            <div class="form-group">
              <label for="userid">이메일</label>
              <input
                type="text"
                class="form-control"
                id="userid"
                name="userId"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label for="userid">전화번호</label>
              <input
                type="text"
                class="form-control"
                id="userid"
                name="userId"
                v-model="tel"
              />
            </div>
            <div class="form-group">
              <label for="userid">주소</label>
              <input
                type="text"
                class="form-control"
                id="userid"
                name="userId"
                v-model="address"
              />
            </div>
          </div>
        </form>
        <div class="form-group text-center">
          <button
            type="button"
            class="modiBtn btn btn-outline-success"
            @click="changeUserInfo"
          >
            정보수정
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            type="button"
            class="delBtn btn btn-outline-primary"
            @click="changePwd"
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </b-jumbotron>
    <div v-if="myModel">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">비밀번호 변경</h4>
                  <button type="button" class="close" @click="myModel = false">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form class="text-left mb-3" @submit.prevent="handleSubmit">
                  <div class="modal-body">
                    <div class="form-group">
                      <div align="left"><label>아이디</label></div>
                      <input
                        type="text"
                        class="form-control"
                        v-model="userInfo.userId"
                        readonly="readonly"
                      />
                    </div>
                    <div class="form-group">
                      <div align="left"><label>비밀번호</label></div>
                      <input
                        type="password"
                        class="form-control"
                        v-model="password"
                      />
                    </div>
                    <div class="form-group">
                      <div align="left"><label>비밀번호 확인</label></div>
                      <input
                        type="password"
                        class="form-control"
                        v-model="checkPassword"
                      />
                    </div>
                    <div class="form-group text-center">
                      <button class="btn btn-primary btn-block mb-1">
                        비밀번호 변경
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </b-container>
</template>

<script>
import { modify, changePwd } from "@/api/member";
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  data() {
    return {
      user: {
        userId: String,
        userPwd: String,
      },
      email: String,
      tel: String,
      address: String,
      myModel: false,
      password: "",
      checkPassword: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  created() {
    this.userId = this.userInfo.userId;
    this.userPwd = this.userInfo.userPwd;
    this.email = this.userInfo.email;
    this.tel = this.userInfo.tel;
    this.address = this.userInfo.address;
  },
  components: {},
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async changeUserInfo() {
      await modify(
        {
          userId: this.userInfo.userId,
          userPwd: this.userInfo.userPwd,
          email: this.email,
          tel: this.tel,
          address: this.address,
        },
        ({ data }) => {
          let msg = "회원 수정시 문제가 발생했습니다.";
          if (data === "success") {
            this.userConfirm(this.user);
            let token = sessionStorage.getItem("access-token");
            if (this.isLogin) {
              this.getUserInfo(token);
            }
            msg = "회원 정보 수정이 완료되었습니다.";
            this.$router.push({ name: "Home" });
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    changePwd() {
      console.log("메롱");
      this.myModel = true;
    },
    handleSubmit() {
      changePwd(
        {
          userId: this.userInfo.userId,
          userPwd: this.password,
        },
        ({ data }) => {
          let msg = "비밀번호 변경시 문제가 발생했습니다.";
          if (data === "success") {
            this.userConfirm(this.user);
            let token = sessionStorage.getItem("access-token");
            if (this.isLogin) {
              this.getUserInfo(token);
            }
            msg = "비밀번호 변경이 완료되었습니다.";
            this.$router.push({ name: "Home" });
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

#modify-information {
  font-size: 52px;
  color: #007bff;
}
</style>
