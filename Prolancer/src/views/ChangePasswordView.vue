<template>
  <div class="change_password">
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
            ref="inputOldPassword"
            required
          />
          <div>
            <p class="errmessage" style="color: red">
              {{ validationErrors.inputOldPassword }}
            </p>
          </div>
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >New Password</label
          >
          <input
            type="password"
            id="form3Example3"
            class="form-control form-control-lg"
            placeholder="Enter your new password"
            v-model="newPassword"
            ref="newPassword"
            required
          />
          <div>
            <p class="errmessage" style="color: red">
              {{ validationErrors.newPassword }}
            </p>
          </div>
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Re-enter New Password</label
          >
          <input
            type="password"
            id="form3Example3"
            class="form-control form-control-lg"
            placeholder="Enter your new password again"
            v-model="reNewPassword"
            ref="reNewPassword"
            required
          />
          <div>
            <p class="errmessage" style="color: red">
              {{ validationErrors.reNewPassword }}
            </p>
          </div>
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
import HeaderAdmin from "../components/HeaderAdmin.vue";
import HeaderSeller from "../components/HeaderSeller.vue";
import Sidebar from "../components/Sidebarprf.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import api from '../../api';
export default {
  name: "App",
  components: {
    Headers,
    Sidebar,
    HeaderAdmin,
    HeaderSeller,
  },
  data() {
    return {
      account: {},
      inputOldPassword: "",
      newPassword: "",
      reNewPassword: "",
      message: "",
      role: "",
      validationErrors: {
        inputOldPassword: "",
        newPassword: "",
        reNewPassword: "",
      },
    };
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    api
      .get("/accounts/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.account = res.data.account;
          this.role = this.account.Role;
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
      var errCount = 0;
      //input validation here
      if (!this.validateField("inputOldPassword")) {
        errCount++;
      }
      if (!this.validateField("newPassword")) {
        errCount++;
      }
      if (!this.validateField("reNewPassword")) {
        errCount++;
      } 
      //if no error -> true
      if (errCount == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    validateField(fieldName) {
      const value = this[fieldName].trim();

      if (value === "") {
        this.validationErrors[fieldName] = `This field cannot be empty.`;
        this.setBorderColor(fieldName, false);
        return false;
      }
      // // old pass check
      // if (fieldName == "inputOldPassword" && (this.inputOldPassword !== this.account.Password)) {
      //   this.validationErrors[
      //     fieldName
      //   ] = "Wrong old password";
      //   this.setBorderColor(fieldName, false);
      //   return false;
      // }
      // new pass validation
      if (fieldName == "newPassword" && !this.isValidPassword) {
        this.validationErrors[
          fieldName
        ] = `"Password must be more than 8 characters, including at least one lowercase letter, one uppercase letter, a number, a special character"`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      if (
        fieldName == "reNewPassword" &&
        this.newPassword != this.reNewPassword
      ) {
        this.validationErrors[fieldName] = `Wrong password confirmation`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      //if field input OK
      this.validationErrors[fieldName] = "";
      this.setBorderColor(fieldName, true);
      return true;
    },
    //Set border color
    setBorderColor(fieldName, value) {
      if (value == true) {
        this.$refs[`${fieldName}`].style.borderColor = "initial";
      } else {
        this.$refs[`${fieldName}`].style.borderColor = "red";
      }
    },
    changePassword() {
      console.log(this.checkInput)
      if (this.checkInput) {
        // console.log("Wrong password confirm");
        api
          .put(`/accounts/${this.account.Email}/changepw`, {
            inputOldPassword: this.inputOldPassword,
            oldPassword: this.account.Password,
            newPassword: this.newPassword,
          })
          .then(
            (res) => {
              console.log(res.data);
              // if (res.status(200)) {
              toast.success("Change password successfully", {
                theme: "colored",
                autoClose: 2000,
                onClose: () => location.reload(),
                // });
              });
            },
            (err) => {
              toast.error("Wrong old password", {
                theme: "colored",
                autoClose: 2000,
              });
            }
          );
      }
    },
  },
};
</script>

<style>
/* html {
  background-color: #ededed;
} */
.change_password{background-color: #ededed;}
.sidebar {
  float: left;
  width: 17%;
}
.change_password #content {
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
