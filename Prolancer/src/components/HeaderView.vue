<template>
  <!-- Navbar -->
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <!-- Container wrapper -->
      <div class="container">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="/">
          <img
            src="../assets/image/logo2.png"
            height="40"
            alt=""
            loading="lazy"
        /></a>
        <!-- Search form -->
        <form class="input-group" style="width: 700px">
          <input
            type="search"
            class="form-control"
            placeholder="What are you looking for ?"
            aria-label="Search"
          />
          <button
            id="btn_search"
            class="btn btn-outline-primary"
            type="button"
            data-mdb-ripple-color="dark"
            style="padding: 0.45rem 1.5rem 0.35rem"
          >
            <i class="bi bi-search" style="color: white"></i>
          </button>
        </form>

        <!-- Toggle button -->
        <button
          v-on:click="isShow = !isShow"
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left links -->
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <!-- <li class="nav-item">
          <a class="nav-link active d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-home fa-lg"></i><span class="small">Home</span></a>
        </li> -->

            <!-- <li class="nav-item">
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-user-friends fa-lg"></i><span class="small">My Network</span></a>
        </li> -->
            <li class="nav-item">
              <a
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                href="#"
                ><i class="bi bi-box-seam"></i
                ><span class="small">Orders</span></a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                href="#"
                ><i class="bi bi-chat"></i
                ><span class="small">Messaging</span></a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                href="#"
                ><i class="bi bi-heart"></i>
                <span class="small">Favourite</span></a
              >
            </li>
            <li class="nav-item" v-if="!user.email">
              <!-- <a
              class="nav-link d-flex flex-column text-center"
              aria-current="page"
              href="#"
              ><i class="bi bi-heart"></i>
              <span class="small">Favourite</span></a
            > -->
              <router-link
                to="/login"
                class="text_decoration:none nav-link d-flex flex-column text-center"
                aria-current="page"
                style="margin: 8px 0px 8px 50px"
              >
                <i
                  class="fa-solid fa-right-to-bracket"
                  style="color: #7c8088"
                ></i>
                <span class="small">Login</span></router-link
              >
            </li>

            <!-- <li class="nav-item" style="text-decoration:none">
            <router-link to="/login">
            <a
              class="nav-link d-flex flex-column text-center"
              aria-current="page"
              href="#"
            >
              <span class="small" style="margin-top: 10px">Login In/Register</span></a>
            </router-link>
            
          </li> -->

            <li class="nav-item dropdown" style="">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  :src="user.image"
                  class="rounded-circle"
                  height="30"
                  alt=""
                  loading="lazy"
                />
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <router-link class="dropdown-item" to="/updateprofile"
                    >My Profile</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/change"
                    >Change password</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="#"
                    >Settings</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/logout"
                    >Logout</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
          <!-- Left links -->
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    
  </div>
  <!-- Navbar -->
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
export default {
  data() {
    return {
      isShow: false,
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
    api
      .get("/user/info", {
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
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.navbar-scroll .nav-link,
.navbar-scroll .navbar-toggler-icon,
.navbar-scroll .navbar-brand {
  color: #262626;
}

/* Color of the navbar BEFORE scroll */
.navbar-scroll {
  background-color: #ffc017;
}

/* Color of the links AFTER scroll */
.navbar-scrolled .nav-link,
.navbar-scrolled .navbar-toggler-icon,
.navbar-scroll .navbar-brand {
  color: #262626;
}

/* Color of the navbar AFTER scroll */
.navbar-scrolled {
  background-color: #fff;
}

/* An optional height of the navbar AFTER scroll */
.navbar.navbar-scroll.navbar-scrolled {
  padding-top: auto;
  padding-bottom: auto;
}
.navbar-brand {
  font-size: unset;
  height: 3.5rem;
}
.nav-item:hover .dropdown-menu {
  display: block;
}
#btn_search {
  background-color: black;
  width: 10%;
  border: none;
}
.navbar {
  border-bottom: 1px solid #dcd8d8;
  position: relative;
}
.selected {
  display: block !important;
}
@media screen and (min-width: 990px) {
  #sidebarMenuNomarl {
    display: none !important;
  }
  /* .topnav a.icon {
    float: right;
    display: block;
  } */
}
</style>
