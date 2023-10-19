<template>
  <div class="header">
    <Headers></Headers>
  </div>
  <div class="sidebar">
    <Sidebar></Sidebar>
  </div>
  <div id="content" class="">
    
      <div class="container-change">
        <form action="" class="form-change">
        <label class="form-label mt-5" style="float: left" for="form3Example3"
          >Old Password</label
        >
        <input
          type="password"
          id="form3Example3"
          class="form-control form-control-lg"
          placeholder="Enter your old password"
        />
        <label class="form-label mt-5" style="float: left" for="form3Example3"
          >New Password</label
        >
        <input
          type="password"
          id="form3Example3"
          class="form-control form-control-lg"
          placeholder="Enter your new password"
        />
        <label class="form-label mt-5" style="float: left" for="form3Example3"
          >Re-enter New Password</label
        >
        <input
          type="password"
          id="form3Example3"
          class="form-control form-control-lg"
          placeholder="Enter your new password again"
        />
        <button id="btn-sub" type="submit" class="btn btn-primary">Submit</button>
        </form>

        
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
html{
    background-color: #ededed;
}
.sidebar {
  float: left;
  width: 17%;
}
#content {
  float: right;
  width: 70%;
  padding-top: 10%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 85.8px 0 0;
  margin-top: 3%;

  z-index: 600;
}

.container-change {
  margin: 10px 20%;
  width: 50%;
}
#btn-sub {
    display: block;
    margin-top: 30px;
    border-radius: 10px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    background-color:#dc3545!important;
    border: none;
}
.form-change{
    border: 1px #ccc solid;
    background-color: #fff;
    padding: 30px
}
</style>
