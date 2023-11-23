<template>
  <section class="vh-100" style="background-color: #eee">
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
                  <form class="mx-1 mx-md-4 bd p-5">
                    <p class="text-danger">Please choose your role you want</p>
                    
                    <div
                      id="btn-redirect"
                      class="d-flex flex-row align-items-center mb-4"
                      style="margin-top: 20%"
                    >
                      <router-link
                        to="/register/freelancer"
                        class="bg-danger bg-gradient text-light"
                        style="
                          text-decoration: none;
                          color: #000;
                          padding: 15px 63px;
                          border: 1px #ccc solid;
                          width:90%
                        "
                      >
                        Become a Seller
                      </router-link>
                    </div>
                      
                    <div class="d-flex flex-row align-items-center mb-4"  >
                      <router-link
                        to="/register/customer"
                        class="bg-danger bg-gradient text-light"
                        style="
                          text-decoration: none;
                          color: #000;
                          padding: 15px 55px;
                          border: 1px #ccc solid;
                          width:90%
                        "
                      >
                        Register as company
                      </router-link>
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

export default {
  data() {
    return {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      password: "",
      repeatPassword: "",
      message: "",
      emailExist: false,
      usernameExist: false,
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
      if (!this.username) {
        this.message = "You must enter username";
        return false;
      }
      if (this.usernameExist) {
        this.message = "Username exist";
        return false;
      }
      if (!this.isValidUsername) {
        this.message =
          "Username must start with an alphabet and has at least 8 characters";
        return false;
      }
      if (!this.firstName) {
        this.message = "You must enter your first name";
        return false;
      }
      if (!this.lastName) {
        this.message = "You must enter your last name";
        return false;
      }
      if (!this.email) {
        this.message = "You must enter Email";
        return false;
      }
      if (!this.isValidEmail) {
        this.message = "Wrong email format";
        return false;
      }
      if (this.emailExist) {
        this.message = "Email exist";
        return false;
      }
      if (!this.phoneNo) {
        this.message = "You must enter your phone number";
        return false;
      }
      if (!this.password) {
        this.message = "You must enter password";
        return false;
      }
      if (!this.isValidPassword) {
        this.message =
          "Password must be of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
        return false;
      }
      if (!this.repeatPassword) {
        this.message = "You must enter repeat password";
        return false;
      }
      if (this.password != this.repeatPassword) {
        this.message = "Wrong password confirmation";
        return false;
      }

      return true;
    },
  },

  methods: {
    async Register() {
      if (this.checkInput) {
        axios
          .post("/users/create", {
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNo: this.phoneNo,
            password: this.password,
          })
          .then(
            (res) => {
              this.$router.push("/sendmessage");
              // console.log("Added successfully");
            },
            (err) => {
              console.log(err.response);
            }
          );
      }
    },
    isEmailExist() {
      axios.get(`/users/${this.email}/checkEmail`).then(
        (res) => {
          console.log(res.data);
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
      axios.get(`/users/${this.username}/checkUsername`).then(
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
};
</script>

<style scoped></style>
