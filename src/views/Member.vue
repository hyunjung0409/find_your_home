<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-steelblue"></h3>
    <router-view></router-view>
    <img src="@/assets/bg.jpg" id="bg" alt="" />
  </b-container>
</template>

<script>
export default {
  name: "Member",
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
</style>
