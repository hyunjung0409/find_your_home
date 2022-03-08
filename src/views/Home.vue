<template>
  <b-container class="bv-example-row mt-3 text-center">
    <div class="bgimg">
      <!-- <h3 class="underline-steelblue"><b-icon icon="house"></b-icon> SSAFY</h3> -->
      <b-row>
        <b-col></b-col>
        <b-col cols="12">
          <b-jumbotron
            id="jumbotron"
            bg-variant="muted"
            text-variant="dark"
            class="shadow-lg"
          >
            <template #header
              ><p class="font-weight-bold">Welcome to HappyHouse</p></template
            >
            <hr class="my-4" />
            <img src="@/assets/undraw_Hello.png" id="" width="500px" />
            <p>
              마음의 안식처가 되어주는 집이라는 공간. <br />여러분이 좋은
              안식처를 구할 수 있도록 <b>HappyHouse</b>가 도와드리겠습니다.
              <br /><br />
            </p>
            <p style="color: #28a745">
              쉽고 빠르게 <b>동으로 아파트 매매정보 검색!</b> <br />
              지도를 통해 <b>위치확인</b>은 물론 <b>실거래가까지 한번에!</b>
              <br />
              맘에 드는 매물 <b>주변의 편의시설</b>까지 확인! <br /><br />
            </p>
            <p>HappyHouse와 함께 찾아보아요.</p>
          </b-jumbotron>
        </b-col>
        <b-col></b-col>
      </b-row>
      <img src="@/assets/bg.jpg" id="bg" alt="" />
    </div>
  </b-container>
</template>

<script>
export default {
  name: "Main",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
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

#center {
  margin-top: 200px;
  margin-bottom: 200px;
}

#jumbotron {
  margin-top: 50px;
  /* opacity: 20%; */
}
</style>
