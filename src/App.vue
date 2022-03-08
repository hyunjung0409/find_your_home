<template>
  <div id="app">
    <navi-bar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import NaviBar from "./components/layout/NaviBar.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    NaviBar,
    Footer,
  },
};
</script>

<style>
a:hover {
  text-decoration: none;
  font-weight: bold;
}

a.router-link-exact-active {
  color: #e6e6e6;
}

a.link {
  color: #e6e6e6;
}

a.nav-link {
  color: #e6e6e6;
}
</style>
