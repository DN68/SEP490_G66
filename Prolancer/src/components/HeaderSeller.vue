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
              <router-link
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                to="/manageorder"
                v-if="freelancer && freelancer.Status === 'Active'"
                ><span class="small" style="font-size: 20px; margin-left: 25px"
                  >Orders</span
                ></router-link>
              <a
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                @click="showModal()"
                v-else-if="freelancer && freelancer.Status === 'Pending'"
                ><span class="small" style="font-size: 20px; margin-left: 25px"
                  >Orders</span
                >
            </a>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                to="/managegigsel"
                v-if="freelancer && freelancer.Status === 'Active'"
              >
                <span class="small" style="font-size: 20px; margin-left: 25px"
                  >Gigs</span
                ></router-link
              >
              <a
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                @click="showModal()"
                v-if="freelancer && freelancer.Status === 'Pending'"
              >
                <span class="small" style="font-size: 20px; margin-left: 25px"
                  >Gigs</span
                >
            </a>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                to="/earning"
                v-if="freelancer && freelancer.Status === 'Active'"
              >
                <span class="small" style="font-size: 20px; margin-left: 25px"
                  >Earnings</span
                ></router-link
              >
              <a
                class="nav-link d-flex flex-column text-center"
                aria-current="page"
                v-if="freelancer && freelancer.Status === 'Pending'"
                @click="showModal()"
              >
                <span class="small" style="font-size: 20px; margin-left: 25px"
                  >Earnings</span
                >
            </a>
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
                  :src="freelancer && freelancer.Profile_Picture"
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
                <li>
                  <router-link class="dropdown-item" to="/manageinterviewsel"
                    >Manage your interviews</router-link
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
                  <router-link
                    class="dropdown-item"
                    to="/manageOrderRequest"
                    v-if="freelancer && freelancer.Status != 'Pending'"
                    >Order Request</router-link
                  >
                  <button class="dropdown-item" @click="showModal()" v-else>
                    Order Request
                  </button>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/manageChangeRequest"
                    v-if="freelancer && freelancer.Status != 'Pending'"
                    >Order change Request</router-link
                  >
                  <button class="dropdown-item" @click="showModal()" v-else>
                    Order change Request
                  </button>
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/manageSkill"
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
    <div
      class="modal fade"
      ref="myModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Access Restricted
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ buttonText }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              @click="hideModal(), (isShowInfoModal = !isShowInfoModal)"
            >
              Make interview request now
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <div
        class="modal fade show"
        style="display: block; background-color: #000000ad; padding-top: 10%"
        v-if="isShowInfoModal"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Interview Description</h5>
              <button
                type="button"
                class="btn-close"
                @click="isShowInfoModal = !isShowInfoModal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row" style="padding-left: 25px">
                <div>
                  <table class="freelancerInfoForm">
                    <tr>
                      <td class="line-info"><span>Description</span></td>
                      <td>
                        <textarea
                          class="formInput"
                          id=""
                          cols="50"
                          rows="2"
                          v-model="description"
                          placeholder="What skill do you need to interview, your free time,..."
                          required
                          maxlength="100"
                        ></textarea>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="isShowInfoModal = !isShowInfoModal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="
                  isShowInfoModal = !isShowInfoModal;
                  isshowConfirmRequestModal = !isshowConfirmRequestModal;
                  // createInterview();
                "
              >
                Make interview request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm_request">
      <div
        class="modal fade show"
        style="display: block; background-color: #000000ad; padding-top: 10%"
        v-if="isshowConfirmRequestModal"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div
              class="modal-header text-end"
              style="background-color: #33b5e5; color: white"
            >
              <h5 class="modal-title" style="text-align: center">
                Are you sure?
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="isshowConfirmRequestModal = !isshowConfirmRequestModal"
                aria-label="Close"
                style="color: white"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div>
                  <p class="modal-title">
                    Do you really want to create this interview request ?
                  </p>
                  <p class="modal-title">This process cannot be undone.</p>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center">
              <a
                type="button"
                class="btn btn-info waves-effect waves-light text-white"
                @click="
                  createInterview(),
                    (isshowConfirmRequestModal = !isshowConfirmRequestModal)
                "
                >Save</a
              >
              <a
                type="button"
                class="btn btn-outline-info waves-effect"
                @click="isshowConfirmRequestModal = !isshowConfirmRequestModal"
                data-dismiss="modal"
                >Cancel</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Navbar -->
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import * as bootstrap from 'bootstrap';
import api from '../../api';
var moment = require("moment");

export default {
  data() {
    return {
      freelancer: {},
      isShow: false,
      modal: null,
      buttonText: "You have to interview to perform this task",
      isShowInfoModal: false,
      isshowConfirmRequestModal: false,
    };
  },

  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.myModal);
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      // this.freelancer = null;
      this.$router.push("/error");
    } else {
      api
        .get("/freelancers/info", {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
          (res) => {
            if (!res.data.freelancer) {
              this.$router.push("/error");
            }
            this.freelancer = res.data.freelancer;
            console.log(res.data);
            // this.showAvatar(res.data.freelancer.Profile_Picture);
          },
          (err) => {
            console.log(err.response);
          }
        );
    }
  },
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    createInterview() {
      api
        .post("/interviews/create", {
          CreateByID: this.freelancer.FreelancerID,
          ScheduledDate: moment().format("YYYY-MM-DD"),
          Location: "",
          Description: this.description,
          Status: "Pending",
        })
        .then(
          (res) => {
            toast.success("Interview Request Created Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.reload(),
            });
          },
          (err) => {
            console.log(err.response);
          }
        );
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
span {
  font-weight: 500;
}
.formInput{
  width: 90%
}
</style>
