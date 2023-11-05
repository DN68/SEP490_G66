<template>
  <!-- Sidebar -->
  <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
    <img :src="user.image" alt="" />
    <br />
    <div class="info-user">
      <h5 class="username">{{user.username}}</h5>
      <p class="email">{{user.email}}</p>
      <router-link to="/profile" style="text-decoration: none; color: #000"
        ><h5 class="preview">Preview Profile</h5></router-link
      >
    </div>
  </nav>

  <!-- Sidebar -->

  <!-- Navbar -->
  <!-- <nav
      id="main-navbar"
      class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    >
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
            
    </nav> -->
  <!-- Navbar -->

  <!--Main Navigation-->

  <!--Main layout-->
  <!-- <main style="margin-top: 58px">
    <div class="container pt-4"></div>
  </main> -->
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    axios
      .get("/users/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.user = res.data.user;
        },
        (err) => {
          console.log(err.response);
        }
      );
  },
};
</script>

<style>
/* body {
  background-color: #fbfbfb;
} */
@media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
}

/* Sidebar */

/*  
*/

@media (max-width: 991.98px) {
  .sidebar {
    width: 100%;
  }
}
.sidebar .active {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
.list-group-item {
  text-align: left;
}
.list-group-item.active {
  background-color: #e37e7f;
  border: none;
}

#sidebarMenu > img {
  width: 60%;
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 60%;
  border-radius: 40%;
}
.info-user {
  text-align: center;
  font-family: face;
}
.email {
  opacity: 0.6;
}
@font-face {
  font-family: face;
  src: url(D:\SEP490_G66\Prolancer\src\assets\font\Tilt_Neon\TiltNeon-Regular-VariableFont_XROT,YROT.ttf);
}
.preview {
  border: 1px #ccc solid;
  width: 70%;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
}
.preview:hover {
  background-color: #000;
  color: #fff;
  cursor: pointer;
}
</style>
