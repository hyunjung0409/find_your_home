<template>
  <b-container class="bv-example-row mt-3">
    <div class="bgimg">
      <div class="row" id="signup-area">
        <div class="col-lg-6">
          <p class="font-weight-bold" id="signup" align="left">Find Password</p>
          <p id="sign-up" align="left">
            Enter your details below to find your password.
          </p>
          <hr class="my-4" />
          <form class="text-left mb-3" @submit.prevent="handleSubmit">
            <input type="hidden" v-model="email" />
            <!-- <input type="hidden" v-model="address" /> -->
            <div class="form-group">
              <label for="userid">아이디</label>
              <input
                type="text"
                class="form-control"
                v-model="userId"
                placeholder="아이디입력..."
              />
            </div>

            <div class="form-group">
              <label for="emailid">이메일</label><br />
              <div id="email" class="custom-control-inline">
                <input
                  type="text"
                  class="form-control"
                  v-model="emailId"
                  placeholder="이메일아이디입력..."
                  size="50"
                />
                @
                <select class="form-control" v-model="emailDomain">
                  <option disabled value="">선택</option>
                  <option value="ssafy.com">싸피</option>
                  <option value="naver.com">네이버</option>
                  <option value="kakao.com">카카오</option>
                  <option value="google.com">구글</option>
                </select>
              </div>
            </div>

            <div class="form-group text-center">
              <button class="btn btn-primary btn-block mb-1">
                비밀번호 찾기
              </button>
              <button type="reset" class="btn btn-outline-danger btn-block">
                회원가입
              </button>
            </div>
          </form>
        </div>
        <div class="col-lg-6">
          <img
            src="@/assets/undraw_searching_p5ux.png"
            id="signup-image"
            width="500px"
          />
        </div>
      </div>
    </div>
    <img src="@/assets/bg.jpg" id="bg" alt="" />
  </b-container>
</template>

<script>
import { findPwd } from "@/api/member";

export default {
  name: "memberFindPwd",
  data() {
    return {
      userId: "",
      email: "",
      emailId: "",
      emailDomain: "",
      isId: false,
    };
  },
  methods: {
    handleSubmit() {
      if (!this.userId) {
        alert("아이디 입력!!!");
        return;
      } else {
        this.email = this.emailId + "@" + this.emailDomain;
        this.registMemeber();
      }
    },
    registMemeber() {
      findPwd(
        {
          email: this.email,
          userId: this.userId,
        },
        ({ data }) => {
          console.log(data);
          let msg = "비밀번호 찾기 시 문제가 발생했습니다.";
          if (data !== "") {
            msg = "비밀번호 찾기가 완료되었습니다.";
          }
          alert(data);
        },
        (error) => {
          console.log(error);
        }
      );
      // http
      //   .post("/member/user", {
      //     address: this.address,
      //     email: this.email,
      //     tel: this.tel,
      //     userId: this.userId,
      //     userName: this.userName,
      //     userPwd: this.userPwd,
      //   })
      //   .then(({ data }) => {
      //     // 서버에서 정상적인 값이 넘어 왔을경우 실행.
      //     let msg = "회원 가입시 문제가 발생했습니다.";
      //     if (data === "success") {
      //       msg = "회원 가입이 완료되었습니다.";
      //     }
      //     alert(msg);
      //     this.$router.push({ name: "Home" });
      //   });
    },
    sample6_execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ""; // 주소 변수
          var extraAddr = ""; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === "R") {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraAddr +=
                extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraAddr !== "") {
              extraAddr = " (" + extraAddr + ")";
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            document.getElementById("sample6_extraAddress").value = extraAddr;
          } else {
            document.getElementById("sample6_extraAddress").value = "";
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById("sample6_postcode").value = data.zonecode;
          document.getElementById("address1").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("address2").focus();
        },
      }).open();
    },
  },
};
</script>

<style scoped>
#signup-area {
  background-color: #ffffff;

  margin-top: 20px;

  padding-top: 80px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 100px;

  border-radius: 5px;
}

#signup {
  font-size: 52px;
  color: #007bff;
}

#sign-up {
  font-size: 18px;
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

#signup-image {
  margin-top: 200px;
}
</style>
