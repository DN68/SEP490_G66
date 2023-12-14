<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top seller_header">
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
        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left links -->
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <!-- <a
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                href="'/seldash'"
                ><span class="small" style="font-size: 20px; margin-left: 25px"
                  >Dashboard</span
                ></a
              > -->
              <router-link class="nav-link d-flex flex-column text-center" to="/seldash"
                    >
                    <span class="small" style="font-size: 20px; margin-left: 25px"
                  >Dashboard</span
                >
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex flex-column text-center" to="/manageorder"
                    >
                    <span class="small" style="font-size: 20px; margin-left: 25px"
                  >Orders</span
                >
              </router-link>
            </li>
            <li class="nav-item">
             
              <router-link class="nav-link d-flex flex-column text-center" to="/managegigsel"
                    >
                    <span class="small" style="font-size: 20px; margin-left: 25px"
                  >Gigs</span
                >
              </router-link>
            </li>
            <li class="nav-item">
              
              <router-link class="nav-link d-flex flex-column text-center" to="/earning"
                    >
                    <span class="small" style="font-size: 20px; margin-left: 25px"
                  >Earnings</span
                >
              </router-link>
            </li>
            <li class="nav-item dropdown" style="margin-left: 130%">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  ref="profileImage"
                  :src="freelancer.Profile_Picture"
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
                style="width: 200px"
              >
                <li>
                  <router-link class="dropdown-item" to="/uppro"
                    >My Profile</router-link
                  >
                </li>
                <!-- <router-link
                class="dropdown-item"
                to="/changeRole/C"
                >Buying</router-link
              > -->
                <li>
                  <router-link class="dropdown-item" to="/change"
                    >Change password</router-link
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
                  <router-link class="dropdown-item" to="/manageSkill"
                    >Skill Test Score</router-link
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
    <div class="header">
      <!-- Sidebar -->
      <nav
        style="display: none; padding-top: 140px"
        id="sidebarMenuNomarl"
        :class="{ selected: isShow }"
        class="sidebar collapse bg-white"
      >
        <div class="position-sticky">
          <div class="list-group list-group-flush mx-3 mt-4">
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple active"
              aria-current="true"
            >
              <i class="bi bi-house-door-fill me-3"></i><span>HomePage</span>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
            >
              <i class="bi bi-stack me-3"></i>
              <span>Manage Orders</span>
            </a>
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              ><i class="bi bi-box-seam-fill me-3"></i>
              <span>Favourite List</span></a
            >

            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              ><i class="bi bi-mortarboard-fill me-3"></i
              ><span>My Profile</span></a
            >
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              ><i class="fas fa-calendar fa-fw me-3"></i
              ><span>Change Password</span></a
            >

            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              ><i class="bi bi-box-arrow-left me-3"></i> <span>Logout</span></a
            >
          </div>
        </div>
      </nav>
    </div>
  </div>

  <!-- Navbar -->
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import api from '../../api';
export default {
  data() {
    return {
      freelancer: {},
      isShow: false,
    };
  },
  mounted() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.freelancer = null;
    } else {
      api
        .get("/freelancers/info", {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.freelancer = res.data.freelancer;
            console.log(res.data)
            // this.showAvatar(res.data.freelancer.Profile_Picture);
          },
          (err) => {
            console.log(err.response);
          }
        );
    }
  },
  // methods:{
  //   async showAvatar(imgName){
  //     const apiUrl = "/freelancers/image/" + imgName;
  //     console.log(apiUrl)
  //     const resData = await api.get(apiUrl, { responseType: "arraybuffer" });
  //     console.log(resData);
  //     const blob = new Blob([resData.data], { type: "application/png" });

  //     // Create a URL for the Blob
  //     const blobUrl = URL.createObjectURL(blob);

  //     //set src for image element
  //     const avatarElement = this.$refs.profileImage;
  //     console.log(avatarElement)
  //     avatarElement.src = blobUrl
  //   }
  // }
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
span {
  font-weight: 500;
}
</style>
