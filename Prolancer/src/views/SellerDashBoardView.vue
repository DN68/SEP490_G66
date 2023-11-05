<template>
  <Headerseller></Headerseller>
  <SideBar style="float: left; width: 17%;"></SideBar>
  <div class="content" style="float: right;width: 80%;margin-top:5%">
<p style="">asjkdaksd</p>
  </div>
  
  <img src="../assets/image/AVT-Doi16-4.png" alt="">
  <footer class="panel panel-default">
      <Footer></Footer>
    </footer>
</template>

<script>
import Headerseller from "../components/HeaderSeller.vue";
import Footer from "../components/Footer.vue"
import SideBar from "../components/Sidebarprf.vue"
export default {
 name: "App",
  components: {
    Headerseller,
   Footer,
   SideBar
  },
}
</script>

<style>
Footer{
    bottom:0;
}
</style>