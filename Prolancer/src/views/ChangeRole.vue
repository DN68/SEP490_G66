<template></template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import api from '../../api';
export default {
  data() {
    return {
      user: {},
    };
  },
  async mounted() {
    const decoded = VueJwtDecode.decode(localStorage.getItem("token"));
    await api
      .put("/users/roleChange", {
        role: this.$route.params.role,
        email: decoded.email,
      })
      .then(
        (res) => {
          api
            .get("/users/info", {
              headers: { token: localStorage.getItem("token") },
            })
            .then(
              (res) => {
                this.user = res.data.user;
                if (this.user.role == "F") {
                  this.$router.push("/seldash");
                } else if (this.user.role == "C") {
                  this.$router.push("/");
                }
              },
              (err) => {
                console.log(err.response);
              }
            );
        },
        (err) => {
          console.log(err.response);
        }
      );
  },
};
</script>

<style>
</style>