<template>
  <div class="header">
    <Headerseller></Headerseller>
  </div>

  <div class="content-create" style="position:absolute">
      <div class="first">
        
      </div>
  </div>
  <div class="footer">
    <Footer></Footer>
  </div>
</template>

<script>
import Headerseller from "../components/HeaderSeller.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "App",
  components: {
    Headerseller,
    Footer,
  },
};
</script>

<style>
html {
  background-color: #f1f1f1;
}
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 600;
  margin-top: 15px;
}
.content-create {
  border: 1px #ccc solid;
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 2%;
  background-color: #fff;
}
</style>