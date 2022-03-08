<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-jumbotron
      id="jumbotron"
      bg-variant="muted"
      text-variant="dark"
      class="shadow-lg"
    >
      <div class="row" id="mypage-area">
        <div class="col-lg-6">
          <p class="font-weight-bold" id="mypage" align="left">MyPage</p>
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
                  v-model="userInfo.email"
                  readonly="readonly"
                />
              </div>
              <div class="form-group">
                <label for="userid">전화번호</label>
                <input
                  type="text"
                  class="form-control"
                  id="userid"
                  name="userId"
                  v-model="userInfo.tel"
                  readonly="readonly"
                />
              </div>
              <div class="form-group">
                <label for="userid">주소</label>
                <input
                  type="text"
                  class="form-control"
                  id="userid"
                  name="userId"
                  v-model="userInfo.address"
                  readonly="readonly"
                />
              </div>
            </div>
          </form>
          <div class="form-group text-center">
            <button
              type="button"
              class="modiBtn btn btn-outline-primary mt-1"
              @click="openModel"
              value="Add"
            >
              정보수정
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              type="button"
              class="delBtn btn btn-outline-danger mt-1"
              @click="openModel2"
            >
              회원탈퇴
            </button>
          </div>
        </div>
        <div class="col-lg-6">
          <img
            src="@/assets/undraw_Welcome.png"
            id="mypage-image"
            width="500px"
          />
        </div>
      </div>
      <div v-if="myModel">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">비밀번호 확인</h4>
                    <button
                      type="button"
                      class="close"
                      @click="myModel = false"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
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
                        v-model="checkPwd"
                      />
                    </div>
                    <br />
                    <div align="center">
                      <input type="hidden" v-model="userInfo.userPwd" />
                      <input
                        type="button"
                        class="btn btn-success btn-xs"
                        v-model="actionButton"
                        @click="moveMod"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div v-if="myModel2">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title">탈퇴안내</h4>
                    <button
                      type="button"
                      class="close"
                      @click="myModel2 = false"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <strong
                        >회원탈퇴를 신청하기 전에 안내 사항을 꼭
                        확인해주세요.</strong
                      >
                    </div>
                    <div align="left" class="form-group">
                      사용하시고 계신 아이디(&nbsp;<span style="color: red">{{
                        userInfo.userId
                      }}</span
                      >&nbsp;)는 탈퇴할 경우 재사용 및 복구가 불가능합니다.
                    </div>
                    <div align="left" class="form-group">
                      <span style="color: red">
                        탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가
                        불가</span
                      >
                      하오니 신중하게 선택하시기 바랍니다.
                    </div>
                    <hr />
                    <div align="left" class="form-group">
                      <span style="color: red">탈퇴 후에는 아이디 </span>
                      <span style="color: green">{{ userInfo.userId }}</span
                      ><span style="color: red">
                        로 다시 가입할 수 없으며 아이디와 데이터는 복구할 수
                        없습니다. 게시판형 서비스에 남아 있는 게시글은 탈퇴 후
                        삭제할 수 없습니다.</span
                      >
                    </div>
                    <div class="form-group">
                      <input
                        type="checkbox"
                        v-model="checkBox"
                        @click="changeCheck"
                      />
                      안내 사항을 모두 확인하였으며, 이에 동의합니다.
                    </div>

                    <div align="center">
                      <input
                        type="button"
                        class="btn btn-danger btn-xs"
                        v-model="actionButton2"
                        @click="moveDel"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </b-jumbotron>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  data() {
    return {
      checkPwd: "",
      checkBox: false,
      myModel: false,
      myModel2: false,
      actionButton: "정보수정",
      actionButton2: "확인",
    };
  },
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    moveMod() {
      if (this.checkPwd === this.userInfo.userPwd) {
        this.$router.push({ name: "Modify" });
      } else {
        alert("비밀번호가 다릅니다.");
      }
    },
    moveDel() {
      if (this.checkBox === true) {
        this.$router.push({ name: "Delete" });
      } else {
        alert("탈퇴 안내를 확인하고, 동의해 주세요.");
      }
    },
    openModel() {
      this.myModel = true;
    },
    openModel2() {
      this.myModel2 = true;
    },
    changeCheck() {
      if (this.checkBox === false) {
        this.checkBox = true;
      } else {
        this.checkBox = false;
      }
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

#jumbotron {
  background-color: #ffffff;
}

#mypage {
  font-size: 52px;
  color: #007bff;
}

#mypage-image {
  margin-top: 130px;
}
</style>
