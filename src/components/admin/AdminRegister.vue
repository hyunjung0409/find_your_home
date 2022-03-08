<template>
  <b-container class="bv-example-row mt-3">
    <div class="container text-center mt-3">
      <b-jumbotron
        id="jumbotron"
        bg-variant="muted"
        text-variant="dark"
        class="shadow-lg"
      >
        <div class="col-lg-10 mx-auto">
          <p class="font-weight-bold" id="registration" align="left">
            Membership registration
          </p>
          <hr class="my-4" />
          <form class="text-left mb-3" @submit.prevent="handleSubmit">
            <input type="hidden" v-model="email" />
            <input type="hidden" v-model="tel" />
            <div class="form-group">
              <label for="username">이름</label>
              <input
                type="text"
                class="form-control"
                v-model="userName"
                placeholder="이름입력..."
              />
            </div>
            <div class="form-group">
              <label for="userid">아이디</label>
              <input
                type="text"
                class="form-control"
                v-model="userId"
                placeholder="아이디입력..."
                @keyup="idCheck()"
              />
              <p v-html="idresult"></p>
            </div>
            <div class="form-group">
              <label for="userpwd">비밀번호</label>
              <input
                type="password"
                class="form-control"
                v-model="userPwd"
                placeholder="비밀번호입력..."
              />
            </div>
            <div class="form-group">
              <label for="pwdcheck">비밀번호재입력</label>
              <input
                type="password"
                class="form-control"
                v-model="pwdcheck"
                placeholder="비밀번호재입력..."
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
                  size="25"
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

            <div class="form-group">
              <div><label for="tel1">전화번호</label></div>
              <div id="tel" class="custom-control-inline">
                <select class="form-control" v-model="tel1">
                  <option disabled value="">선택</option>
                  <option value="010">010</option>
                  <option value="02">02</option>
                  <option value="031">031</option>
                  <option value="032">032</option>
                  <option value="041">041</option>
                  <option value="051">051</option>
                  <option value="061">061</option>
                </select>
                &nbsp;&nbsp;_&nbsp;&nbsp;
                <input
                  type="text"
                  class="form-control"
                  v-model="tel2"
                  placeholder=""
                />
                &nbsp;&nbsp;_&nbsp;&nbsp;
                <input
                  type="text"
                  class="form-control"
                  v-model="tel3"
                  placeholder=""
                />
              </div>
            </div>

            <div class="form-group">
              <label for="zipcode">주소</label>
              <input
                type="hidden"
                onclick="sample6_execDaumPostcode()"
                value="주소검색"
              />
              <input
                type="hidden"
                id="sample6_postcode"
                placeholder="우편번호"
              />
              <div style="margin-bottom: 5px">
                <input
                  type="text"
                  class="form-control"
                  id="address1"
                  name="address1"
                  placeholder="여기를 클릭하세요"
                  @click="sample6_execDaumPostcode()"
                />
              </div>
              <div>
                <input
                  type="text"
                  class="form-control"
                  id="address2"
                  name="address2"
                  placeholder="상세주소를 입력해주세요"
                  v-model="address2"
                />
              </div>
              <input
                type="hidden"
                class="form-control"
                id="sample6_extraAddress"
                placeholder="상세주소"
              />
            </div>
            <div class="form-group text-center">
              <button class="btn btn-outline-primary">회원가입</button>
              &nbsp;&nbsp;&nbsp;
              <button type="reset" class="btn btn-outline-danger">
                초기화
              </button>
            </div>
          </form>
        </div>
      </b-jumbotron>
    </div>
  </b-container>
</template>

<script>
import { doubleCheck } from "@/api/member";
import { userRegister } from "@/api/admin";

export default {
  name: "AdminRegister",
  data() {
    return {
      userName: "",
      userId: "",
      userPwd: "",
      pwdcheck: "",
      email: "",
      emailId: "",
      emailDomain: "",
      tel: "",
      tel1: "",
      tel2: "",
      tel3: "",
      address: "",
      address1: "",
      address2: "",
      idresult: "",
      isId: false,
      ckid: "",
    };
  },
  methods: {
    idCheck() {
      this.ckid = this.userId;
      doubleCheck(
        {
          ckid: this.userId,
        },
        ({ data }) => {
          if (data === "success") {
            this.idresult = `<div style="color: blue">사용 가능한 아이디입니다.</div>`;
          } else {
            this.idresult = `<div style="color: red">사용 불가능한 아이디입니다.</div>`;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    handleSubmit() {
      if (!this.userName) {
        alert("이름 입력!!!");
        return;
      } else if (!this.userId) {
        alert("아이디 입력!!!");
        return;
      } else if (!this.userPwd) {
        alert("비밀번호 입력!!!");
        return;
      } else if (this.userPwd != this.pwdcheck) {
        alert("비밀번호 확인!!!");
        return;
      } else {
        this.email = this.emailId + "@" + this.emailDomain;
        this.tel = this.tel1 + "-" + this.tel2 + "-" + this.tel3;
        this.address =
          document.getElementById("address1").value + ", " + this.address2;
        this.registMemeber();
      }
    },
    registMemeber() {
      userRegister(
        {
          address: this.address,
          email: this.email,
          tel: this.tel,
          userId: this.userId,
          userName: this.userName,
          userPwd: this.userPwd,
        },
        ({ data }) => {
          // console.log(data);
          // let msg = "회원 등록시 문제가 발생했습니다.";
          // if (data === "success") {
          //   msg = "회원 등록이 완료되었습니다.";
          // }
          // alert(msg);
          this.$router.push({ name: "AdminList" });
        },
        (error) => {
          console.log(error);
        }
      );
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
#jumbotron {
  margin-top: 50px;
}

#registration {
  font-size: 52px;
  color: #007bff;
}
</style>
