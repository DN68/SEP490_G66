<template>
  <div
    class="container"
    style="height: auto; max-width: -webkit-fill-available"
  >
    <header class="row">
      <Header></Header>
    </header>
    
    <div class="row">
      <aside class="col-md-2 col-sm-2">
        <div>
          <Sidebar></Sidebar>
        </div>
      </aside>
      <article class="col-md-10 col-sm-10" style="padding: 0;">
        <body>
          <div>
            <h2 style="text-align: center">How are you</h2>
            <h2 style="text-align: center">How are you</h2>
            <h2 style="text-align: center">How are you</h2>
            <h2 style="text-align: center">How are you</h2>
            <h2 style="text-align: center">How are you</h2>
            <h2 style="text-align: center">How are you</h2>
            <h2 style="text-align: center">How are you</h2>
          </div>
          <div>
        <!-- Copyright -->
        <div
          class="text-center p-4"
          style="background-color: rgba(0, 0, 0, 0.025)"
        >
          © 2023 Copyright:
          <a class="text-reset fw-bold" href="https://mdbootstrap.com/"
            >Prolancer</a
          >
        </div>
      </div>
        </body>
      </article>
      
    </div>
    <!-- <footer class="panel panel-default">
    </footer> -->
  </div>

</template>
  
  <script>
// @ is an alias to /src
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import axios from "axios"

export default {
  name: "HomePage",
  components: {
    Header,
    Sidebar,
  },
  mounted() {
    axios
      .get("/users/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.role = res.data.user.role;
          if (this.role != "A") {
            this.$router.push("/");
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
  },
};
</script>
  
  <style>
.dropdown-menu {
  width: 300px;
  position: fixed;
  margin-top: 8px;
  margin-left: 5%;
}
.dropdown-menu::before {
  content: "";
  height: 10px;
  left: 0;
  right: 0;
  top: 100%;
  position: absolute;
  background-color: transparent;
  transform: translateY(-1400%);
}

@media screen and (max-width: 990px) {
  #navCategory {
    display: none;
  }
  /* .topnav a.icon {
      float: right;
      display: block;
    } */
}
</style>