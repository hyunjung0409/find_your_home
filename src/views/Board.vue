<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3
      style="font-size: 30px"
      id="title"
      class="font-weight-bold underline-hotpink"
    >
      공지 사항
    </h3>
    <hr />
    <router-view></router-view>
    <img src="@/assets/bg.jpg" id="bg" alt="" />
  </b-container>
</template>
<script>
export default {
  name: "Board",
};
</script>
<style scoped>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(255, 97, 184, 0.6) 30%
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

#title {
  color: #ffffff;
  text-shadow: 2px 2px 2px rgb(100, 100, 100);
}
</style>
