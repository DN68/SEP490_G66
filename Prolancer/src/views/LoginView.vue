<template>
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <router-link to="/"
            ><img
              src="../assets/image/386858860_6484307888364663_6310575723905631009_n-removebg-preview.png"
              class="img-fluid"
              alt="Sample image"
              style="border-right: 2px #ccc solid"
          /></router-link>
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <p
              class="text-center h1 fw-bold mb-5 mx-1 mt-4"
              style="color: #e37e7f"
            >
              Welcome to Prolancer
            </p>
            <div
              class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"
            >
              <p class="lead fw-normal mb-0 me-3">Log in with</p>
              <button
                type="button"
                class="btn bg-danger bg-gradient text-light mx-1"
              >
                <i class="fab fa-facebook-f"></i>
              </button>

              <button
                type="button"
                class="btn bg-danger bg-gradient text-light mx-1"
              >
                <i class="fab fa-twitter"></i>
              </button>

              <button
                type="button"
                class="btn bg-danger bg-gradient text-light mx-1"
              >
                <i class="fab fa-linkedin-in"></i>
              </button>
            </div>

            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <!-- Email input -->
            <div class="form-outline mb-3">
              <label class="form-label" style="float: left" for="form3Example3"
                >Username or Email address</label
              >
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                placeholder="Enter a valid email address"
                v-model="emailOrUsername"
              />
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <label class="form-label" style="float: left" for="form3Example4"
                >Password</label
              >
              <input
                type="password"
                id="form3Example4"
                class="form-control form-control-lg"
                placeholder="Enter password"
                v-model="password"
              />
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <!-- Checkbox -->
              <div class="form-check mb-0">
                <input
                  class="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="form2Example3"
                />
                <label class="form-check-label" for="form2Example3">
                  Remember me
                </label>
              </div>
              <router-link
                to="/forget"
                class="text-dark"
                style="text-decoration: none"
                >Forgot password?</router-link
              >
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                type="button"
                class="btn bg-danger bg-gradient text-light btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
                @click="Login"
              >
                Login
              </button>
              <p class="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account?
                <router-link class="text-danger" to="/register"
                  >Register</router-link
                >
              </p>
            </div>
          </form>
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
      emailOrUsername: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async Login() {
      let user = {
        emailOrUsername: this.emailOrUsername,
        password: this.password
      }
      axios.post('/users/login', user)
        .then(res => {
          //if successfull
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            this.$router.push('/');
          }
        }, err => {
          console.log(err.response);
        })
    },
  },
};
</script>


<style scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
