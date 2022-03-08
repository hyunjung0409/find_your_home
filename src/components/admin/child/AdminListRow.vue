<template>
  <b-tr>
    <b-td>{{ userId }}</b-td>
    <b-td>{{ userPwd }}</b-td>
    <b-td>{{ userName }}</b-td>
    <b-td>{{ email }}</b-td>
    <b-td>{{ tel }}</b-td>
    <b-td>{{ address }}</b-td>
    <b-td>{{ joinDate }}</b-td>
    <b-td>
      <b-button class="btn-sm" variant="outline-danger" @click="removeUser()"
        >삭제</b-button
      >
    </b-td>
  </b-tr>
</template>

<script>
// import moment from "moment";
import { userDelete } from "@/api/admin";

export default {
  name: "AdminListRow",
  props: {
    userId: String,
    userPwd: String,
    userName: String,
    email: String,
    tel: String,
    address: String,
    joinDate: String,
  },
  computed: {
    // changeDateFormat() {
    //   return moment(new Date(this.regtime)).format("YY.MM.DD hh:mm:ss");
    // },
  },
  methods: {
    removeUser() {
      if (confirm("정말로 삭제?")) {
        userDelete(this.userId, () => {
          this.$router.go({ name: "AdminList" });
        });
      }
    },
  },
};
</script>

<style></style>
