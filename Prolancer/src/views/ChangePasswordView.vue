<template>
  <div>
  <div class="header">
    <Headers></Headers>
  </div>
  <div class="sidebar">
    <Sidebar></Sidebar>
  </div>
  <div id="content" class="">
    <div class="container-change">
      <div class="form-change">
        <label class="form-label mt-5" style="float: left" for="form3Example3"
          >Old Password</label
        >
        <input
          type="password"
          id="form3Example3"
          class="form-control form-control-lg"
          placeholder="Enter your old password"
          v-model="inputOldPassword"
        />
        <label class="form-label mt-5" style="float: left" for="form3Example3"
          >New Password</label
        >
        <input
          type="password"
          id="form3Example3"
          class="form-control form-control-lg"
          placeholder="Enter your new password"
          v-model="newPassword"
        />
        <label class="form-label mt-5" style="float: left" for="form3Example3"
          >Re-enter New Password</label
        >
        <input
          type="password"
          id="form3Example3"
          class="form-control form-control-lg"
          placeholder="Enter your new password again"
          v-model="reNewPassword"
        />
        <button
          id="btn-sub"
          type="submit"
          @click="changePassword"
          class="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Headers from "../components/Header.vue";
import Sidebar from "../components/Sidebarprf.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Headers,
    Sidebar,
  },
  data() {
    return {
      user: {},
      inputOldPassword: "",
      newPassword: "",
      reNewPassword: "",
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    axios
      .get("/users/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.user = res.data.user;
        },
        (err) => {
          console.log(err.response);
        }
      );
  },
  methods: {
    changePassword() {
      if (this.newPassword != this.reNewPassword) {
        console.log("Wrong password confirm");
      } else {
        // console.log(this.inputOldPassword);
        // console.log(this.user.password);
        // console.log(this.newPassword);
        axios
          .put(`/users/${this.user.email}/changepw`, {
            inputOldPassword: this.inputOldPassword,
            oldPassword: this.user.password,
            newPassword: this.newPassword,
          })
          .then(
            (res) => {
              console.log("change pass success");
              this.$router.push("/logout");
            },
            (err) => {
              console.log("change pass failed");
            }
          );
      }
    },
  },
};
</script>

<style>
html {
  background-color: #ededed;
}
.sidebar {
  float: left;
  width: 17%;
}
#content {
  float: right;
  width: 70%;
  padding-top: 10%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 85.8px 0 0;
  margin-top: 3%;

  z-index: 600;
}

.container-change {
  margin: 10px 20%;
  width: 50%;
}
#btn-sub {
  display: block;
  margin-top: 30px;
  border-radius: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  background-color: #dc3545 !important;
  border: none;
}
.form-change {
  border: 1px #ccc solid;
  background-color: #fff;
  padding: 30px;
}
</style>
