<template>
  <b-container class="bv-example-row mt-3" id="container">
    <b-row class="mb-1">
      <b-navbar class="mb-3">
        <b-nav-form>
          <b-form-select v-model="search.key" class="mr-sm-1">
            <option disabled value="">선택</option>
            <option value="articleno">글 번호</option>
            <option value="userid">작성자</option>
            <option value="subject">제목</option>
          </b-form-select>
          <b-form-input
            class="mr-sm-1"
            v-model="search.word"
            @keypress.enter.prevent="searchSubmit"
            placeholder="검색어를 입력해주세요."
          ></b-form-input>
          <b-button
            class="mr-sm-1"
            variant="success"
            @click.prevent="searchSubmit"
          >
            검색
          </b-button>
          <b-button variant="primary" @click="moveWrite()" id="btn-right"
            >글쓰기</b-button
          >
        </b-nav-form>
      </b-navbar>
    </b-row>
    <b-jumbotron
      id="jumbotron"
      bg-variant="muted"
      text-variant="dark"
      class="shadow-lg"
    >
      <b-row>
        <b-col cols="12">
          <div>
            <b-table
              v-if="check"
              striped
              hover
              style="cursor: pointer"
              :items="qnalist"
              :per-page="perPage"
              :current-page="currentPage"
              :fields="fields"
              @row-clicked="rowClick"
            ></b-table>
            <b-table
              v-else
              striped
              hover
              style="cursor: pointer"
              :items="test"
              :per-page="perPage"
              :current-page="currentPage"
              :fields="fields"
              @row-clicked="rowClick"
            ></b-table>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-jumbotron>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="center"
    ></b-pagination>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import { listArticle } from "@/api/qna.js";

export default {
  name: "QnaList",
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      articleno: String,
      search: {
        key: "",
        word: "",
      },
      check: true,
      test: [],
      fields: [
        {
          key: "articleno",
          label: "번호",
        },
        {
          key: "subject",
          label: "제목",
        },
        {
          key: "userid",
          label: "글쓴이",
        },
        {
          key: "regtime",
          label: "작성일",
        },
        {
          key: "hit",
          label: "조회수",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("ALLQNA");
    this.test = this.qnalist;
  },
  computed: {
    ...mapGetters(["qnalist"]),
    rows() {
      return this.test.length;
    },
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "QnaWrite" }); //이동..
    },
    rowClick(data) {
      this.$router.push({
        name: "QnaView",
        params: { articleno: data.articleno },
      });
    },
    searchSubmit() {
      this.check = false;
      let param = {
        key: this.search.key,
        word: this.search.word,
      };
      listArticle(
        param,
        (data) => {
          this.test = data.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}

#container {
  background-color: #ffffffa9;
  padding: 50px 50px 50px 50px;
  border-radius: 5px;
}

#jumbotron {
  background-color: #ffffff;
}

#btn-right {
  margin-left: 530px;
}
</style>
