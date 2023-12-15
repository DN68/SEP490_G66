<template>
  <section class="vh-1000" style="background-color: #eee">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <router-link to="/login">
                    <i
                      class="fa-solid fa-arrow-left-long text-danger"
                      style="float: left"
                    ></i>
                  </router-link>
                  <p
                    class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-danger"
                  >
                    Customer info
                  </p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          placeholder="First Name"
                          v-model="firstName"
                          style="float: left; width: 80%"
                        />
                      </div>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          placeholder="Last Name"
                          v-model="lastName"
                          style="float: right; width: 80%"
                        />
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fa-solid fa-location-dot fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="Location"
                          v-model="location"
                        />
                      </div>
                    </div>
                    <!-- <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          placeholder="Company Name"
                          v-model="username"
                          @change="isUsernameExist"
                        />
                      </div>
                    </div> -->
                    <!-- <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="Email"
                          v-model="email"
                          @change="isEmailExist"
                        />
                      </div>
                    </div> -->
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fa-solid fa-phone fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="Phone Number"
                          v-model="phoneNo"
                        />
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fa-solid fa-location-dot fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="Company Name"
                          v-model="companyName"
                        />
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fa-solid fa-location-dot fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="Company Address"
                          v-model="companyAddress"
                        />
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fa-solid fa-barcode fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="Tax Code"
                          v-model="taxCode"
                        />
                      </div>
                    </div>
                    <!-- <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fa-solid fa-gavel fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="Legal representative"
                          v-model="legelrepresentative"
                        />
                      </div>
                    </div> -->

                    <div
                      class="d-flex flex-column justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <div class="mess text-danger">
                        {{ message }}
                      </div>

                      <button
                        type="button"
                        class="btn bg-danger bg-gradient text-light btn-lg mt-3"
                        @click="createCustomer"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        class="btn bg-danger bg-gradient text-light btn-lg mt-3"
                        @click="logout"
                      >
                        Logout
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    src="../assets/image/386858860_6484307888364663_6310575723905631009_n-removebg-preview.png"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import api from '../../api';
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      location: "",
      phoneNo: "",
      companyName: "",
      companyAddress: "",
      taxCode: "",
      account: {},
      message: "",
    };
  },
  computed: {
    //  A valid username should start with an alphabet so, [A-Za-z].
    //  All other characters can be alphabets, numbers or an underscore so, [A-Za-z0-9_].
    isValidUsername() {
      return /[A-Za-z][A-Za-z0-9_]{7,29}$/.test(this.username);
    }, //Email format
    isValidEmail() {
      return /^[^@]+@\w+(\.\w+)+\w$/.test(this.email);
    },
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    isValidPassword() {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        this.password
      );
    },
    checkInput() {
      //input validation here
      // if (!this.username) {
      //   this.message = "You must enter username";
      //   return false;
      // }
      // if (this.usernameExist) {
      //   this.message = "Username exist";
      //   return false;
      // }
      // if (!this.isValidUsername) {
      //   this.message =
      //     "Username must start with an alphabet and has at least 8 characters";
      //   return false;
      // }
      if (!this.firstName) {
        this.message = "You must enter your first name";
        return false;
      }
      if (!this.lastName) {
        this.message = "You must enter your last name";
        return false;
      }
      // if (!this.email) {
      //   this.message = "You must enter Email";
      //   return false;
      // }
      // if (!this.isValidEmail) {
      //   this.message = "Wrong email format";
      //   return false;
      // }
      // if (this.emailExist) {
      //   this.message = "Email exist";
      //   return false;
      // }
      if (!this.phoneNo) {
        this.message = "You must enter your phone number";
        return false;
      }
      // if (!this.password) {
      //   this.message = "You must enter password";
      //   return false;
      // }
      // if (!this.isValidPassword) {
      //   this.message =
      //     "Password must be of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
      //   return false;
      // }
      // if (!this.repeatPassword) {
      //   this.message = "You must enter repeat password";
      //   return false;
      // }
      // if (this.password != this.repeatPassword) {
      //   this.message = "Wrong password confirmation";
      //   return false;
      // }

      return true;
    },
  },

  methods: {
    async createCustomer() {
      // console.log(this.account) 
      if (this.checkInput) {
        api
          .post("/customers/create", {
            accountID: this.account.accountId,
            firstName: this.firstName,
            lastName: this.lastName,
            profilePicture: "https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-122.jpg",
            location: this.location,
            phoneNo: this.phoneNo,
            companyName: this.companyName,
            companyAddress: this.companyAddress,
            taxCode: this.taxCode
          })
          .then(
            (res) => {
              this.message = "Info added successfully. Returning to homepage";
              this.$router.push("/");
              // console.log(res.data);
            },
            (err) => {
              console.log(err.response);
            }
          );
      }
    },
    logout(){
      this.$router.push('/logout')
    },
    isEmailExist() {
      api.get(`/users/${this.email}/checkEmail`).then(
        (res) => {
          // console.log(res.data);
          if (res.data) {
            this.emailExist = true;
          } else {
            this.emailExist = false;
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
    },
    isUsernameExist() {
      api.get(`/users/${this.username}/checkUsername`).then(
        (res) => {
          console.log(res.data);
          if (res.data) {
            this.usernameExist = true;
          } else {
            this.usernameExist = false;
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
    },
  },
  mounted() {
    if (this.$route.query.data) {
      this.account = JSON.parse(decodeURIComponent(this.$route.query.data));
      api
        .post("/accounts/create", {
          email: this.account.email,
          username: this.account.username,
          password: this.account.password,
          role: this.account.role,
        })
        .then(
          (res) => {
            // console.log(res.data);
            console.log("Added successfully");
          },
          (err) => {
            console.log(err.response);
            // const token = localStorage.getItem("token");
            // if (token) {
            //   this.account = VueJwtDecode.decode(token);
            // } else {
            //   this.$router.push("/");
            // }
          }
        );
    }
  },
};
</script>

<style>
</style>