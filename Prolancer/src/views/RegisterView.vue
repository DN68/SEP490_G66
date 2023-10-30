<template>
  <section class="vh-100" style="background-color: #eee">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <router-link to="/login">
                <i class="fa-solid fa-arrow-left-long text-danger"></i>
              </router-link>

              <div class="row justify-content-center">
                <div
                  class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                  style="border-right: 2px #ccc solid; padding-right: 50px"
                >
                  <p
                    class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-danger"
                  >
                    Register
                  </p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          placeholder="Your Name"
                          v-model="username"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="Your Email"
                          v-model="email"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          class="form-control"
                          placeholder="Password"
                          v-model="password"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4cd"
                          class="form-control"
                          placeholder="Repeat your password"
                          v-model="repeatPassword"
                        />
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button
                        type="button"
                        class="btn bg-danger bg-gradient text-light btn-lg"
                        @click="Register"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <router-link to="/"
                    ><img
                      src="../assets/image/386858860_6484307888364663_6310575723905631009_n-removebg-preview.png"
                      class="img-fluid"
                      alt="Sample image"
                  /></router-link>
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
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    async Register() {
      if (this.password == this.repeatPassword) {
        axios.post("http://localhost:3000/users/create", {
          email: this.email,
          username: this.username,
          password: this.password
        }).then(
          (res) => {
            this.error = "";
            this.$router.push("/login");
          },
          (err) => {
            console.log(err.response);
          }
        );
      }
    },
  },
};
</script>

<style scoped></style>
