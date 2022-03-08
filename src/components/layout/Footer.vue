<template>
  <div id="footer">
    <b-row>
      <b-col sm="3">
        <img src="@/assets/logo.jpg" width="150px" alt="HappyHouse" />
      </b-col>
      <b-col sm="3">
        <h6 class="mb-3 mb-lg-4 bold-text" id="footer-items"><b>MENU</b></h6>
        <ul class="list-unstyled" id="footer-items">
          <router-link to="/board/list">
            <li>Board</li>
          </router-link>
          <router-link to="/qna/list">
            <li>QnA</li>
          </router-link>
          <router-link to="/house">
            <li>House</li>
          </router-link>
        </ul>
      </b-col>
      <b-col sm="3">
        <h6 class="mb-3 mb-lg-4 bold-text" id="footer-items"><b>CONTACT</b></h6>
        <ul class="list-unstyled" id="footer-items">
          <li>
            <b-icon icon="envelope-fill" font-scale="1"></b-icon> &nbsp;
            swchae516@naver.com
          </li>
          <li>
            <b-icon icon="envelope-fill" font-scale="1"></b-icon> &nbsp;
            dhwlgns7028@naver.com
          </li>
          <li>
            <b-icon icon="envelope-fill" font-scale="1"></b-icon> &nbsp;
            h.jung0409@daum.net
          </li>
        </ul>
      </b-col>
      <b-col sm="3">
        <h6 class="mb-3 mb-lg-4 bold-text" id="footer-items"><b>ADDRESS</b></h6>
        <ul class="list-unstyled" id="footer-items">
          <li>SSAFY 광주 캠퍼스</li>
          <li>광주광역시 광산구 하남산단 6번로 107</li>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script></script>

<style scoped>
#footer {
  margin-top: 100px;
  padding-top: 50px;
  padding-bottom: 30px;
  background-color: #28a745;
}

#footer-items {
  color: #e6e6e6;
}

li {
  color: #e6e6e6;
}
</style>
