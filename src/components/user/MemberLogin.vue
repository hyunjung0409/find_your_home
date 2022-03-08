<template>
  <b-container class="bv-example-row mt-3">
    <div class="bgimg">
      <div class="row" id="login-area">
        <div class="col-lg-6">
          <p class="font-weight-bold" id="login" align="left">Login</p>
          <p id="sign-up" align="left">Enter your details below to continue</p>
          <hr class="my-4" />
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError">
              아이디 또는 비밀번호를 확인하세요.
            </b-alert>
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                size="lg"
                id="userid"
                v-model="user.userId"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                size="lg"
                type="password"
                id="userpwd"
                v-model="user.userPwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <br />
            <div class="form-group text-center">
              <button
                type="button"
                class="btn btn-primary btn-lg btn-block mb-3"
                @click="confirm"
              >
                Login
              </button>
              <p id="sign-up">
                Don't have an account?
                <a id="sign-up-here" style="cursor: pointer" @click="movePage"
                  >Sign up here</a
                >
              </p>
              <p id="sign-up">
                Did you forget your password?
                <a id="sign-up-here" style="cursor: pointer" @click="movePage2"
                  >Click here</a
                >
              </p>
            </div>
          </b-form>
        </div>
        <div class="col-lg-6">
          <img src="@/assets/Login.png" id="login-image" width="500px" />
        </div>
      </div>
    </div>
    <img src="@/assets/bg.jpg" id="bg" alt="" />
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        userId: null,
        userPwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "Home" });
      }
    },
    movePage() {
      this.$router.push({ name: "SignUp" });
    },
    movePage2() {
      this.$router.push({ name: "FindPwd" });
    },
  },
};
</script>

<style scoped>
#login-area {
  background-color: #ffffff;

  margin-top: 20px;

  padding-top: 80px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 100px;

  border-radius: 5px;
}
#login {
  font-size: 52px;
  color: #007bff;
}

#sign-up {
  font-size: 18px;
}

#sign-up-here {
  font-size: 18px;
  color: #007bff;
}

#bg {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 80%;

  min-width: 100%;
  min-height: 100%;
  z-index: -10;
}

#login-image {
  margin-top: 130px;
}
</style>
