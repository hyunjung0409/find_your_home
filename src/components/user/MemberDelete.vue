<template>
  <b-container class="bv-example-row mt-3">
    <h2 class="p-3 mb-3 shadow bg-light">
      <mark class="orange">비밀번호 재확인</mark>
    </h2>
    <b-jumbotron
      id="jumbotron"
      bg-variant="muted"
      text-variant="dark"
      class="shadow-lg"
    >
      <div class="container text-center mt-3">
        <div class="col-lg-8 mx-auto">
          <b-form class="text-left">
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="userInfo.userId"
                readonly
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userPwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
              <b-form-input
                hidden
                id="userpwd"
                v-model="user.userPwd"
                required
              ></b-form-input>
            </b-form-group>
            <br />
            <div class="form-group text-center">
              <button type="button" class="btn btn-danger" @click="confirm">
                확인
              </button>
            </div>
          </b-form>
        </div>
      </div>
    </b-jumbotron>
  </b-container>
</template>
<script>
import { deleteMember } from "@/api/member";
import { mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberDelete",
  components: {},
  data() {
    return {
      user: {
        userId: null,
        userPwd: null,
      },
      userPwd: null,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  setup() {},
  created() {
    this.userPwd = this.userInfo.userPwd;
  },
  mounted() {},
  unmounted() {},
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    confirm() {
      if (this.user.userPwd === this.userPwd) {
        deleteMember(
          {
            ckid: this.userInfo.userId,
          },
          ({ data }) => {
            let msg = "회원 탈퇴시 문제가 발생했습니다.";
            if (data === "success") {
              msg = "회원 탈퇴 처리되었습니다.";
              this.SET_IS_LOGIN(false);
              this.SET_USER_INFO(null);
              sessionStorage.removeItem("access-token");
              this.$router.push({ name: "Home" });
            }
            alert(msg);
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (!this.user.userPwd) {
        alert("비밀번호를 입력하세요.");
      } else {
        alert("비밀번호를 정확하게 입력해주세요.");
      }
    },
  },
};
</script>
