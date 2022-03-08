<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img
            src="@/assets/logo.jpg"
            class="d-inline-block align-middle"
            width="150px"
            alt="HappyHouse"
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">
            <router-link :to="{ name: 'Home' }" class="link">
              <b-icon icon="house" font-scale="1" /> HOME
            </router-link>
          </b-nav-item> -->
          <b-nav-item href="#">
            <router-link :to="{ name: 'Board' }" class="link">
              <b-icon icon="journal" font-scale="1" /> 공지사항
            </router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link :to="{ name: 'Qna' }" class="link">
              <b-icon icon="patch-question" font-scale="1" /> QnA
            </router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link :to="{ name: 'House' }" class="link">
              <b-icon icon="house-fill" font-scale="1" /> 아파트정보
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar
                variant="primary"
                v-text="userInfo ? userInfo.userId.charAt(0).toUpperCase() : ''"
              />
              {{ userInfo.userName }}({{ userInfo.userId }})님 환영합니다.
            </template>
            <b-dropdown-item class="align-self-center">
              <router-link :to="{ name: 'MyPage' }"
                ><b-icon icon="person-circle"></b-icon
                ><span style="font-size: 16px"
                  >&nbsp;&nbsp;MyPage</span
                ></router-link
              >
            </b-dropdown-item>
            <b-dropdown-item
              class="align-self-center"
              v-if="userInfo.userId === 'admin'"
              ><router-link :to="{ name: 'Admin' }"
                ><b-icon icon="people-fill"></b-icon
                ><span style="font-size: 16px"
                  >&nbsp;&nbsp;회원목록보기</span
                ></router-link
              ></b-dropdown-item
            >
            <b-dropdown-item @click.prevent="onClickLogout"
              ><span style="color: #007bff; font-size: 16px"
                ><b-icon icon="unlock"></b-icon>&nbsp;&nbsp;Logout</span
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'SignIn' }"
                ><b-icon icon="lock"></b-icon
                ><span style="font-size: 16px"
                  >&nbsp;&nbsp;Login</span
                ></router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'SignUp' }"
                ><b-icon icon="person-circle"></b-icon>
                <span style="font-size: 16px"
                  >&nbsp;&nbsp;SignUp</span
                ></router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "NaviBar",
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
/* ul.dropdown-menu.dropdown-menu-right.show {
  background: #28a745;
} */

a.nav-link {
  color: #ffffff;
}
</style>
