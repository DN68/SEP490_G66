<template></template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  mounted() {
    const decoded = VueJwtDecode.decode(localStorage.getItem("token"));
    axios
      .put("/users/roleChange", {
        role: this.$route.params.role,
        email: decoded.email,
      })
      .then((res) => {
        if (res.data.role == "F"){
            this.$router.push("/seldash");
        }
        else if (res.data.role == "C"){
            this.$router.push("/");
        }
      },
      err => {
        console.log(err.response)
      });
  },
};
</script>

<style>
</style>