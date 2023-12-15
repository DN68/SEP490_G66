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
            <router-link to="/login">
              <i class="fa-solid fa-arrow-left-long text-danger"></i>
            </router-link>
            <p
              class="text-center h1 fw-bold mb-5 mx-1 mt-4"
              style="color: #e37e7f"
            >
              Forgot Password?
            </p>

            <!-- Email input -->
            <div class="form-outline mb-3">
              <label class="form-label" style="float: left" for="form3Example3"
                >Enter your email that have registered to this website.</label
              >
              <input
                type="email"
                id="form3Example3"
                class="form-control form-control-lg"
                placeholder="Enter your email"
                v-model="email"
              />
            </div>

            <div class="text-center mt-4 pt-2">
              <button
                type="button"
                class="btn bg-danger bg-gradient text-light btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
                @click="resetPassword"
                :disabled="isButtonDisabled"
                ref="resetButton"
              >
                Reset Password
              </button>
              &nbsp;
              <span ref="message">{{ message }}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import api from '../../api';
export default {
  data() {
    return {
      email: "",
      message: "",
      isButtonDisabled: false,
    };
  },
  methods: {
    resetPassword() {
      api
        .post("/accounts/forgotPassword", {
          email: this.email,
        })
        .then(
          (res) => {
            this.isButtonDisabled = true;
            toast.success("New password sent to mail", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.replace("/login"),
            });
            const countdown = setTimeout(() => {
              this.$router.push("/login");
            }, 4000);
          },
          (err) => {
            this.message = "No user with this email";
            this.$refs.message.style.color = "red";
          }
        );
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
