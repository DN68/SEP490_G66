<template>
  <div>
    <div class="header">
      <HeaderAdmin v-if="role == 'A'"></HeaderAdmin>
      <HeaderSeller v-if="role == 'F'"></HeaderSeller>
      <Headers v-if="role == 'C'"></Headers>
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
          <span ref="message">{{ message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "../components/Header.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";
import HeaderSeller from "../components/HeaderSeller.vue";
import Sidebar from "../components/Sidebarprf.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Headers,
    Sidebar,
    HeaderAdmin,
    HeaderSeller
},
  data() {
    return {
      account: {},
      inputOldPassword: "",
      newPassword: "",
      reNewPassword: "",
      message: "",
      role: ""
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
      .get("/accounts/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.account = res.data.account;
          this.role = this.account.Role
        },
        (err) => {
          console.log(err.response);
        }
      );
  },
  computed: {
    // minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    isValidPassword() {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        this.newPassword
      );
    },
    checkInput() {
      if (!this.inputOldPassword) {
        this.message = "you must enter password";
        this.$refs.message.style.color = "red";
        return false;
      }
      if (!this.newPassword) {
        this.message = "you must enter new password";
        this.$refs.message.style.color = "red";
        return false;
      }
      if (!this.isValidPassword) {
        this.message =
          "Password must be of minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
          this.$refs.message.style.color = "red";
          return false;
      }
      if (!this.reNewPassword) {
        this.message = "you must re-enter new password";
        this.$refs.message.style.color = "red";
        return false;
      }
      if (this.newPassword != this.reNewPassword) {
        this.message = "Wrong password confirmation";
        this.$refs.message.style.color = "red";
        return false;
      }
      return true;
    },
  },
  methods: {
    changePassword() {
      console.log(this.account)
      if (this.checkInput) {
        // console.log("Wrong password confirm");
        axios
          .put(`/accounts/${this.account.Email}/changepw`, {
            inputOldPassword: this.inputOldPassword,
            oldPassword: this.account.Password,
            newPassword: this.newPassword,
          })
          .then(
            (res) => {
              this.$refs.message.style.color = "green";
              this.message = "change pass success";
              // this.$router.push("/logout");
            },
            (err) => {
              this.$refs.message.style.color = "red";
              this.message = "Change pass failed, wrong old password !!!"
            }
          );
      }
    },
  },
};
</script>

<style scoped>

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
  background-color: #ccc;
    width: 83%;
}

.container-change {
  margin: 10px 20%;
  width: 60%;
  border: 1px #ccc solid;
  padding: 35px;
  background-color: #fff;
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
