<template>
  <!-- Sidebar -->
  <!-- <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
    <img :src="user.image" alt="" />
    <br />
    <div class="info-user">
      <h5 class="username">{{user.username}}</h5>
      <p class="email">{{user.email}}</p>
    </div>
  </nav> -->
  <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
          <img class="imgsidebar" :src="currentAccountInfo.Profile_Picture" alt="" />
    <br />
    <div class="info-user">
      <h5 class="username">{{ currentAccountInfo.Username }}</h5>
      <h7 class="role">
        <span v-if="currentAccountInfo.Role === 'F'">Freelancer</span>
        <span v-if="currentAccountInfo.Role === 'C'">Customer</span>
      </h7>
      <p class="email">{{ currentAccountInfo.Email }}</p>
    </div>
        </div>
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
import axios from "axios"
import VueJwtDecode from 'vue-jwt-decode';

export default {
  data() {
    return {
      currentAccountInfo: {},
    };
  },
  mounted() {
    let token = localStorage.getItem("token")
    //account is not authorized
    if (!token) {
      this.$router.push('/login')
    } else {
      let decoded = VueJwtDecode.decode(token)
      console.log(decoded.role)
      if(decoded.role === "F"){
        axios
        .get("/freelancers/info", {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.currentAccountInfo = res.data.freelancer;
            console.log(this.currentAccountInfo.Username)
          },
          (err) => {
            console.log(err.response);
          }
        );
      }else if(decoded.role === "C"){
        axios
        .get("/customers/info", {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.currentAccountInfo = res.data.customer;
            console.log(this.currentAccountInfo.Username)
          },
          (err) => {
            console.log(err.response);
          }
        );
      }
      // axios
      //   .get("/accounts/info", {
      //     headers: { token: localStorage.getItem("token") },
      //   })
      //   .then(
      //     (res) => {
      //       this.account = res.data.account;
      //     },
      //     (err) => {
      //       console.log(err.response);
      //     }
      //   );
    }
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

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 58px 0 0; /* Height of navbar */
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 240px;
  z-index: 600;
}

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
  background-color: #e37e7f
;
  border: none;
}

.imgsidebar {
  width: 60%;
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 60%;
  border-radius: 40%;
}
.info-user {
  text-align: center;
 
}
.email {
  opacity: 0.6;
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
