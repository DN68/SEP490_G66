<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light " style="z-index: 1000;">
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
        <form class="input-group" style="width: 700px" action="/giglist">
          <input
            type="search"
            class="form-control"
            placeholder="What are you looking for ?"
            aria-label="Search"
            :value="searchText"
            name="search"
          />
          <button
            id="btn_search"
            class="btn btn-outline-primary"
            type="submit"
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
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-account-friends fa-lg"></i><span class="small">My Network</span></a>
        </li> -->
            <li class="nav-item" v-if="currentAccountInfo">
              <router-link class="nav-link d-flex flex-column text-center" to="/manageOrder"
                    >
                    <i class="bi bi-box-seam"></i
                ><span class="small">Orders</span>
              </router-link>
            </li>
            <li class="nav-item" v-if="currentAccountInfo">
              <router-link class="nav-link d-flex flex-column text-center" to="/chat"
                    >
              <i class="bi bi-chat"></i
                ><span class="small">Messaging</span>
              </router-link>
            </li>
            

            <!-- <li class="nav-item" v-if="account && account.isFreelancer != 1">
              <a
                class="nav-link d-flex flex-column text-center text-danger"
                aria-current="page"
                href="/becomesel"
              >
                <span class="small" style="margin-top: 5px; font-size: 17px"
                  >Become a Seller</span
                ></a
              >
            </li> -->
            <li class="nav-item dropdown" style="" v-if="currentAccountInfo">

              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  :src="currentAccountInfo.Profile_Picture"
                  class="rounded-circle"
                  height="30"
                  width="30"
                  alt=""
                  loading="lazy"
                />
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <router-link class="dropdown-item" to="/uppro"
                    >My Profile</router-link
                  >
                </li>
                <!-- <li v-if="account.isFreelancer == 1">
                  <router-link
                    class="dropdown-item"
                    to="/changeRole/F"
                    >Selling</router-link
                  >
                </li> -->
                <li>
                  <router-link class="dropdown-item" to="/change"
                    >Change Password</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/manageOrderRequest"
                    >Order Request</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/manageChangeRequest"
                    >Order Change Request</router-link
                  >
                </li>
                <li>
                  <router-link class="dropdown-item" to="/logout"
                    >Logout</router-link
                  >
                </li>
              </ul>
            </li>

            <li class="nav-item" v-else>
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

            <li class="nav-item dropdown" style="display: none">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://static.thenounproject.com/png/363640-200.png"
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
                  <a class="dropdown-item" href="/updateprofile">My profile</a>
                </li>
                <li>
                  <a class="dropdown-item" href="/change">Change password</a>
                </li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="/logout">Logout</a></li>
              </ul>
            </li>
          </ul>
          <!-- Left links -->
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
   
    <!-- Navbar -->
  </div>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import VueJwtDecode from 'vue-jwt-decode';
import api from '../../api';
export default {
  props: ["searchText"],
  data() {
    return {
      isShow: false,
      currentAccountInfo: null,
      // freelancer: null,
      // customer: null,
    };
  },
  mounted() {
    let token = localStorage.getItem("token")
    //account is not authorized
    if (!token) {
      this.account = null;
      this.$emit('update-account-info', null);
    } else {
      let decoded = VueJwtDecode.decode(token)
      console.log(decoded.role)
      if(decoded.role === "F"){
        api
        .get("/freelancers/info", {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.currentAccountInfo = res.data.freelancer;
            this.$emit('update-account-info', this.currentAccountInfo);
            console.log(this.currentAccountInfo)
          },
          (err) => {
            console.log(err.response);
          }
        );
      }else if(decoded.role === "C"){
        api
        .get("/customers/info", {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.currentAccountInfo = res.data.customer;
            this.$emit('update-account-info', this.currentAccountInfo);
            console.log(this.currentAccountInfo)
          },
          (err) => {
            console.log(err.response);
          }
        );
      }else if(decoded.role === "A"){
        this.$emit('update-account-info', {Role: 'A'});
      }
      // api
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
