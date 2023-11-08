<template>
  <div class="header">
    <router-link to="/">
      <img
        class="imgbecome"
        src="../assets/image/386858860_6484307888364663_6310575723905631009_n-removebg-preview.png"
        alt=""
      />
    </router-link>
  </div>
  <div class="container-become">
    <div
      style="
        text-align: start;
        border-bottom: 1px #ccc solid;
        padding-bottom: 35px;
      "
    >
      <h1>Your Information</h1>
      <span>Tell us a bit about yourself</span>
    </div>
    <div class="line-info">
      <div class="left">
        <span>Full Name </span>
      </div>
      <div class="right">
        <input type="text" style="width: 40%" />
      </div>
    </div>
    <div class="line-info">
      <div class="left">
        <span>Your Email </span>
      </div>
      <div class="right">
        <input type="text" style="width: 40%" />
      </div>
    </div>
    <div class="line-info">
      <div class="left">
        <span>Description </span>
      </div>
      <div class="right">
        <textarea
          name=""
          id=""
          cols="48"
          rows="5"
          style="width: 60%; margin-left: 20%"
          placeholder="  Share a bit about your work experience,cool project you've completed"
        ></textarea>
      </div>
    </div>
    <div class="line-info">
      <div class="left">
        <span>Language </span>
      </div>
      <div class="right">
        <div class="dropdown" style="margin-left: -11%">
          <button
            type="button"
            data-bs-toggle="dropdown"
            style="border: 1px #ccc solid;background-color:#fff;padding-top:10px;padding-bottom:10px;width:300px"
          >
          <span style="float:left">
            Language 
            
             </span>
             <i class="fa-solid fa-chevron-down" style="float:right; align-self:center"></i>
          

            
          </button>
          <ul class="dropdown-menu">
            <li class="dropdown-item" href="#">Delete</li>
            <li class="dropdown-item" href="#">Delete</li>
            <li class="dropdown-item" href="#">Delete</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="footer">
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";

export default {
  name: "",
  components: {
    Footer,
  },
};
</script>

<style>
.header {
  width: 100%;
  height: 130px;
  position: relative;
  border-bottom: 1px #dad8d8 solid;
}
.imgbecome {
  position: absolute;
  width: 13%;
  display: flex;
  margin-left: 5%;
}
.container-become {
  margin: 15px 10%;
}
.left {
  float: left;
  width: 7%;
}
.right {
  float: right;
  width: 85%;
}
.line-info {
  margin-top: 5%;
  display: flex;
}
</style>