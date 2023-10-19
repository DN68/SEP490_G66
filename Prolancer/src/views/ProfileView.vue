<template>
  <div class="header">
    <Headers></Headers>
  </div>
  <div class="sidebar">
    <Sidebar></Sidebar>
  </div>
  <div id="content" class="">
    <div class="left col-sm-4">
      <div class="info">
        <div>
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Description</label
          >
          <p class="form-label mt-5" style="float: right" id="test">
            Edit Description
          </p>
        </div>
        <br>
        <p style="font-weight: lighter;">
          Please send me a message and I'll get back to you as fast as possible.
          Providing the best quality service for my clients is my #1 priority.
          Thank you for checking my profile.
        </p>
      </div>
    </div>
    <div class="right col-sm-5">
      <p>dsadbhsajhdbsjah</p>
    </div>
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

<style>
.html {
  background-color: #fff;
}
.sidebar {
  float: left;
  width: 17%;
}
#content {
  float: right;
  width: 80%;
  padding-top: 10%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 85.8px 0 0;
  margin-top: 3%;

  z-index: 600;
}
.left {
  background-color: #fff;
  float: left;
  margin-left: 5%;
  height: 100%;
  border: 1px solid #dadbdd;
  font-weight: bold;
}
.right {
  background-color: #fff;
  float: right;
  border: 1px solid #dadbdd;
  height: 100%;
  margin-right: 5%;
}
.info {
  margin: 10px 20px;
}
#test {
  font-weight: lighter;
  color: rgb(90, 90, 139);
}
#test:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
