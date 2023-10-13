<template>
  <div class="header">
    <Headers></Headers>
  </div>
  <div class="sidebar">
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Headers from "../components/HeaderView.vue";
import Sidebar from "../components/SideBarView.vue";

export default {
  name: "App",
  components: {
    Headers,
    Sidebar,
  },
};
</script>

<style></style>
