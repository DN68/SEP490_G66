<template>
  <div class="header">
    <Headers></Headers>
  </div>
  <div class="sidebar">
    <Sidebarprf></Sidebarprf>
  </div>
  <div id="content" class="">
    <div class="container-profile">
      <form action="/update" class="form-profile">
        <div class="field">
            <div class="d-flex justify-content-between total font-weight-bold mt-4"><span>Username:</span><span>$7,197.00</span></div>
            
        </div>

      
          
        
      </form>
    </div>
  </div>
</template>

<script>
import Headers from "../components/HeaderView.vue";
import Sidebarprf from "../components/Sidebarprf.vue";

export default {
  name: "App",
  components: {
    Headers,
    Sidebarprf,
  },
};
</script>

<style>
html {
  background-color: #ededed;
}
.sidebar {
  float: left;
  width: 17%;
}
#content {
  float: right;
  width: 80%;
  padding-top: 10%;
  /* position: fixed; */
  top: 0;
  bottom: 0;
  right: 0;
  padding: 85.8px 0 0;
  margin-top: 3%;

  z-index: 600;
  position: sticky;

}

.container-profile {
  margin: 10px 10%;
  width: 110%;
  height: 100%;
}
#btn-sub {
  display: block;
  margin-top: 30px;
  border-radius: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  background-color: #dc3545 !important;
  border: none;
}
.form-profile {
  border: 1px #ccc solid;
  background-color: #fff;
  padding: 30px;
  width: 60%;
  position: relative;
  height: 750px;
}
.field {
  float: left;
  /* padding-right: 100px; */
  width: 60%;
  margin-left: 20%;
  position: absolute;
}


</style>
