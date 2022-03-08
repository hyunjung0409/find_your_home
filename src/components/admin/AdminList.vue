<template>
  <b-container class="bv-example-row mt-3">
    <b-jumbotron
      id="jumbotron"
      bg-variant="muted"
      text-variant="dark"
      class="shadow-lg"
    >
      <div class="row" id="AdminList-area">
        <div class="col-lg-12">
          <p class="font-weight-bold" id="memberList" align="left">
            Member list
          </p>
          <b-row class="mb-1">
            <b-col class="text-right">
              <b-button variant="outline-primary" @click="moveRegister()"
                >등록</b-button
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="userItems.length">
              <b-table-simple hover responsive>
                <b-thead head-variant="dark">
                  <b-tr>
                    <!-- <b-th>번호</b-th> -->
                    <b-td>아이디</b-td>
                    <b-td>비밀번호</b-td>
                    <b-td>이름</b-td>
                    <b-td>이메일</b-td>
                    <b-td>전화번호</b-td>
                    <b-td>주소</b-td>
                    <b-td>가입일</b-td>
                    <b-td>수정/삭제</b-td>
                  </b-tr>
                </b-thead>
                <tbody>
                  <!-- 하위 component인 ListRow에 데이터 전달(props) -->
                  <admin-list-row
                    v-for="(userItem, index) in userItems"
                    :key="index"
                    v-bind="userItem"
                  />
                </tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-jumbotron>
  </b-container>
</template>

<script>
import AdminListRow from "@/components/admin/child/AdminListRow";
import { userList } from "@/api/admin.js";

export default {
  name: "AdminList",
  components: {
    AdminListRow,
  },
  data() {
    return {
      userItems: [],
    };
  },
  created() {
    userList(
      (response) => {
        this.userItems = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.userItems);
  },
  methods: {
    moveRegister() {
      this.$router.push({ name: "AdminRegister" });
    },
  },
};
</script>

<style scoped>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}

#memberList {
  font-size: 52px;
  color: #007bff;
}

#jumbotron {
  background-color: #ffffff;
  margin-top: 50px;
}
</style>
