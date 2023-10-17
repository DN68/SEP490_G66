<template>
  <div class="header">
    <Headers></Headers>
  </div>
  <div class="sidebar">
    <Sidebar ></Sidebar>
  </div>
  <div class="content">
    <div class="form-outline mb-3 w-50">
              <label class="form-label" style="float: left" for="form3Example3"
                >Email address</label
              >
              <input
                type="email"
                id="form3Example3"
                class="form-control form-control-lg"
                placeholder="Enter a valid email address"
              />
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
.sidebar{
  display: float;
  float: left;
  width: 15%;
}
.content{
  display: float;
  float: right;
  width:80%;
  padding-top: 5%;
}
</style>
