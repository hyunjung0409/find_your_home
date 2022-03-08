<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-2">
      <b-col class="text-right">
        <b-button variant="primary" class="mr-2" size="sm" @click="listArticle"
          >목록</b-button
        >
        <b-button
          v-if="
            userInfo.userId === article.userid || userInfo.userId === 'admin'
          "
          variant="info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >수정</b-button
        >
        <b-button
          v-if="
            userInfo.userId === article.userid || userInfo.userId === 'admin'
          "
          variant="danger"
          size="sm"
          @click="removeArticle"
          >삭제</b-button
        >
      </b-col>
    </b-row>
    <b-jumbotron
      id="jumbotron"
      bg-variant="muted"
      text-variant="dark"
      class="shadow-lg"
    >
      <b-row class="mb-1">
        <b-col>
          <b-card
            :header-html="`<h3>${article.articleno}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
            class="mb-2"
            border-variant="dark"
            no-body
          >
            <b-card-body class="text-left">
              <div v-html="message"></div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
      <comment-write :articleno="this.articleno" />
      <comment-write
        v-if="isModifyShow && this.modifyComment != null"
        :modifyComment="this.modifyComment"
        @modify-comment-cancel="onModifyCommentCancel"
      />
      <comment
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
        @modify-comment="onModifyComment"
      />
    </b-jumbotron>
  </b-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getArticle, deleteArticle } from "@/api/board";
import CommentWrite from "@/components/board/child/comment/CommentWrite.vue";
import Comment from "@/components/board/child/comment/Comment.vue";

const memberStore = "memberStore";

export default {
  name: "boardView",
  data() {
    return {
      article: "",
      articleno: "",
      isModifyShow: false,
      modifyComment: Object,
    };
  },
  components: {
    CommentWrite,
    Comment,
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(["comments"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
    // changeDateFormat() {
    //   return moment(new Date(this.article.regtime)).format(
    //     "YYYY.MM.DD hh:mm:ss"
    //   );
    // },
  },
  created() {
    this.articleno = this.$route.params.articleno;
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article = response.data;
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      }
    );
    this.$store.dispatch("getComments", `/comment/${this.articleno}`);
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "BoardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "BoardUpdate",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    removeArticle() {
      if (confirm("정말로 삭제?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "BoardList" });
        });
      }
    },
    onModifyComment(comment) {
      this.modifyComment = comment;
      this.isModifyShow = true;
    },
    onModifyCommentCancel(isShow) {
      this.isModifyShow = isShow;
    },
  },
};
</script>

<style></style>
