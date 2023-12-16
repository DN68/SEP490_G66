<template>
  <div>
    <div class="become">
      <div class="header">
        <router-link to="/">
          <img
            class="imgbecome"
            src="../assets/image/386858860_6484307888364663_6310575723905631009_n-removebg-preview.png"
            alt=""
          />
        </router-link>
      </div>
      <div class="container-become">
        <article class="col-sm-12">
          <div class="row become_header">
            <div
              class="col-sm-3 become_header_item"
              :class="{ active: isstep1 }"
            >
              <span
                ><i
                  class="bi fs-5"
                  :class="{
                    'bi-check-circle-fill': completedStep1,
                    'bi-1-circle-fill': isstep1,
                  }"
                ></i
              ></span>
              <span> Account Setup</span>
              <i class="bi bi-chevron-right"></i>
            </div>
            <div
              class="col-sm-3 become_header_item"
              :class="{ active: isstep2 }"
            >
              <span v-if="isstep2"
                ><i class="bi bi-2-circle-fill fs-5"></i
              ></span>
              <span v-else
                ><i
                  class="bi fs-5"
                  :class="{
                    'bi-check-circle-fill': completedStep2,
                    'bi-2-circle': !completedStep2,
                  }"
                ></i
              ></span>

              <span> Legal Representative Information</span>
              <i class="bi bi-chevron-right"></i>
            </div>
            <div
              class="col-sm-3 become_header_item"
              :class="{ active: isstep3 }"
            >
              <span v-if="isstep3"
                ><i class="bi bi-3-circle-fill fs-5"></i
              ></span>
              <span v-else><i class="bi bi-3-circle fs-5"></i></span>
              <span> Company Info</span>
            </div>
          </div>
        </article>
        <div
          style="
            text-align: start;
            border-bottom: 1px #ccc solid;
            padding-bottom: 35px;
          "
        >
          <h1>Your Information</h1>
          <span>Tell us a bit about yourself and your company.</span>
        </div>

        <div v-if="isstep1">
          <table class="inputForm">
            <tr>
              <td class="line-info"><span>Username </span></td>
              <td>
                <input
                  class="inputField"
                  type="text"
                  placeholder="Enter username"
                  v-model="username"
                  @change="isUsernameExist()"
                  ref="username"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.username }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="line-info"><span>Your Email </span></td>
              <td>
                <input
                  class="inputField"
                  type="text"
                  placeholder="Enter Email"
                  v-model="email"
                  @change="isEmailExist()"
                  ref="email"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.email }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="line-info"><span>Password </span></td>
              <td>
                <input
                  class="inputField"
                  type="password"
                  placeholder="Enter password"
                  v-model="password"
                  ref="password"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.password }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="line-info"><span>Confirm Password </span></td>
              <td>
                <input
                  class="inputField"
                  type="password"
                  placeholder="Re-enter username"
                  v-model="repeatPassword"
                  ref="repeatPassword"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.repeatPassword }}
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div v-if="isstep3">
          <table class="inputForm">
            <tr>
              <td class="line-info"><span>Company Name</span></td>
              <td>
                <input
                  class="inputField"
                  type="text"
                  v-model="companyName"
                  ref="companyName"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.companyName }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="line-info"><span>Company Address </span></td>
              <td>
                <textarea
                  name=""
                  id=""
                  cols="48"
                  rows="5"
                  style="width: 100%"
                  placeholder="Write your company address"
                  v-model="companyAddress"
                  ref="companyAddress"
                ></textarea>
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.companyAddress }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="line-info"><span>Tax Code</span></td>
              <td>
                <input
                  class="inputField"
                  type="text"
                  v-model="taxCode"
                  ref="taxCode"
                />
                <p class="errmessage" style="color: red">
                  {{ validationErrors.taxCode }}
                </p>
              </td>
            </tr>
          </table>
        </div>
        <div v-if="isstep2">
          <table class="inputForm">
            <tr>
              <td class="line-info"><span>Full Name</span></td>
              <td>
                <input
                  class="name"
                  type="text"
                  placeholder="First Name"
                  v-model="firstName"
                  style="width: 50%"
                  ref="firstName"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.firstName }}
                  </p>
                </div>
                <input
                  class="name"
                  placeholder="Last Name"
                  v-model="lastName"
                  type="text"
                  style="width: 50%"
                  ref="lastName"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.lastName }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="line-info"><span>Phone </span></td>
              <td>
                <input
                  type="text"
                  class="inputField"
                  v-model="phoneNo"
                  placeholder="Enter your phone number"
                  ref="phoneNo"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.phoneNo }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td class="line-info"><span>Address </span></td>
              <td>
                <input
                  type="text"
                  class="inputField"
                  v-model="location"
                  placeholder="Enter your address"
                  ref="location"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.location }}
                  </p>
                </div>
              </td>
            </tr>
            <!-- <tr>
              <td class="line-info"><span>Profile Picture </span></td>
              <td>
                <input
                  style="width: 80%"
                  type="file"
                  ref="fileImage"
                  accept=".jpeg, .jpg, .png"
                  @change="updateFileImage"
                />
                (.jpeg, .jpg, .png)
                <p class="errmessage" style="color: red">
                  {{ validationErrors.fileImage }}
                </p>
              </td>
            </tr> -->
          </table>
        </div>
        <div class="button">
          <button
            v-if="!isstep1"
            id="btn-sub"
            type="submit"
            class="btn btn-primary bg-primary"
            style="
              border: none;
              width: 100px;
              margin-top: 40px;
              margin-right: 20px;
            "
            @click="changeStep(currentStep - 1)"
          >
            Back
          </button>
          <button
            v-if="isstep3"
            id="btn-sub"
            type="submit"
            class="btn btn-primary bg-danger"
            style="border: none; width: 100px; margin-top: 40px"
            @click="saveHirer()"
          >
            Save
          </button>
          <button
            v-if="isstep1"
            type="button"
            class="btn btn-danger"
            style="border: none; width: 100px; margin-top: 40px"
            @click="emailConfirmation()"
          >
            Continue
          </button>
          <button
            v-if="isstep2"
            id="btn-sub"
            type="submit"
            class="btn btn-primary bg-danger"
            style="border: none; width: 100px; margin-top: 40px"
            @click="toStep3()"
          >
            Continue
          </button>
          <!-- Modal -->
          <div
            class="modal fade"
            ref="myModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Verify Your Email
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <!-- <p>This is the content of the modal.</p> -->
                  Verification code:
                  <input type="password" maxlength="6" v-model="inputCode" />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="
                      startCountdown();
                      sendvalidationEmail();
                    "
                    :disabled="countingDown"
                  >
                    {{ buttonText }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="verifyEmail()"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          ref="myModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Verify Your Email
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <!-- <p>This is the content of the modal.</p> -->
                Verification code:
                <input type="password" maxlength="6" v-model="inputCode" />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="
                    startCountdown();
                    sendvalidationEmail();
                  "
                  :disabled="countingDown"
                >
                  {{ buttonText }}
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="verifyEmail()"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
  
  <script>
import Footer from "../components/Footer.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import api from '../../api';
import * as bootstrap from 'bootstrap';
export default {
  name: "",
  components: {
    Footer,
  },
  data() {
    return {
      //registration step
      isstep1: true,
      isstep2: false,
      isstep3: false,
      currentStep: 1,
      completedStep1: false,
      completedStep2: false,
      //CV
      cvTitle: "",
      fileCV: "",
      cvDescription: "",
      blobUrl: "",
      CV_Uploads:
        "undefined_Report3_Software-Requirement-Specification (5).pdf",
      //popup
      modal: null,
      buttonText: "Resend",
      countingDown: false,
      countdownInterval: null,
      countdownSeconds: 10,
      //user input info
      account: {},
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      description: "",
      phoneNo: "",
      password: "",
      repeatPassword: "",
      message: "",
      emailExist: false,
      usernameExist: false,
      fileImage: null,
      location: "",
      role: "C",
      companyName: "",
      companyAddress: "",
      taxCode: "",
      //email verification
      verificationCode: "",
      inputCode: "123456",
      validationErrors: {
        //Step 1 validation
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        firstName: "",
        lastName: "",
        //Step 2 validation
        firstName: "",
        lastName: "",
        phoneNo: "",
        location: "",
        description: "",
        fileImage: "",
        //step 3 validation
        companyName: "",
        companyAddress: "",
        taxCode: "",
      },
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
    isValidPhoneNumber() {
      return /^(03[2-9]|05[2689]|07[06-9]|08[1-9]|09\d)\d{7}$/.test(
        this.phoneNo
      );
    },

    checkInputStep1() {
      var errCount = 0;
      //input validation here
      if (!this.validateField("username")) {
        errCount++;
      }
      if (!this.validateField("email")) {
        errCount++;
      }
      if (!this.validateField("password")) {
        errCount++;
      }
      if (!this.validateField("repeatPassword")) {
        errCount++;
      }

      //if no error -> true
      if (errCount == 0) {
        return true;
      } else {
        return false;
      }
    },
    checkInputStep2() {
      var errCount = 0;

      //input validation here
      if (!this.validateField("firstName")) {
        errCount++;
      }
      if (!this.validateField("lastName")) {
        errCount++;
      }
      if (!this.validateField("phoneNo")) {
        errCount++;
      }
      if (!this.validateField("location")) {
        errCount++;
      }
      // if (!this.validateFile("fileImage")) {
      //   errCount++;
      // }

      console.log(errCount);

      //if no error -> true
      if (errCount == 0) {
        return true;
      } else {
        return false;
      }
    },
    checkInputStep3() {
      var errCount = 0;
      //input validation here
      if (!this.validateField("companyName")) {
        errCount++;
      }
      // if (!this.validateFile("fileCV")) {
      //   errCount++;
      // }
      if (!this.validateField("companyAddress")) {
        errCount++;
      }
      if (!this.validateField("taxCode")) {
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
      // Username validation
      if (fieldName == "username" && !this.isValidUsername) {
        this.validationErrors[
          fieldName
        ] = `Username must start with an alphabet character. Total length must be 8 to 30 characters including letters, numbers, or underscores.`;
        this.setBorderColor(fieldName, false);
        return false;
      }
      if (fieldName == "username" && this.usernameExist) {
        this.validationErrors[fieldName] = `This user name is already exist`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      // Email validation
      if (fieldName == "email" && !this.isValidEmail) {
        this.validationErrors[fieldName] = `Wrong email format`;
        this.setBorderColor(fieldName, false);
        return false;
      }
      if (fieldName == "email" && this.emailExist) {
        this.validationErrors[fieldName] = `This email is already exist`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      // Password validation
      if (fieldName == "password" && !this.isValidPassword) {
        this.validationErrors[
          fieldName
        ] = `Password must be more than 8 characters, including at least one lowercase letter, one uppercase letter, a number, a special character`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      // Confirm password validation
      if (
        fieldName == "repeatPassword" &&
        this.repeatPassword != this.password
      ) {
        this.validationErrors[fieldName] = `Wrong password confirmation`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      if (fieldName == "phoneNo" && !this.isValidPhoneNumber) {
        this.validationErrors[fieldName] = `Invalid phone number`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      //if field input OK
      this.validationErrors[fieldName] = "";
      this.setBorderColor(fieldName, true);
      return true;
    },

    //validate input type file
    validateFile(fieldName) {
      const fileInput = this.$refs[fieldName];
      console.log(fileInput.files.length);
      console.log(fileInput.files);
      if (fileInput.files.length <= 0) {
        this.validationErrors[fieldName] = `You must import file here`;
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

    isEmailExist() {
      api.get(`/accounts/${this.email}/checkEmail`).then(
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
      console.log(this.username);
      api.get(`/accounts/${this.username}/checkUsername`).then(
        (res) => {
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

    //Send validation code to mail & show verification popup
    emailConfirmation() {
      if (this.checkInputStep1) {
        this.showModal();
        this.sendvalidationEmail();
      }
    },
    showModal() {
      this.modal.show();
    },
    sendvalidationEmail() {
      api
        .post("/accounts/create/confirm", {
          email: this.email,
          username: this.username,
          password: this.password,
          // role: this.role,
        })
        .then(
          (res) => {
            // console.log("Added successfully");
            console.log(res.data.code);
            this.verificationCode = res.data.code;
          },
          (err) => {
            console.log(err.response);
          }
        );
    },
    startCountdown() {
      if (!this.countingDown) {
        this.countingDown = true;

        this.countdownInterval = setInterval(() => {
          this.countdownSeconds--;

          if (this.countdownSeconds === 0) {
            clearInterval(this.countdownInterval);
            this.countingDown = false;
            this.countdownSeconds = 10;
            this.buttonText = "Resend";
          } else {
            this.buttonText = `Resend (${this.countdownSeconds}s)`;
          }
        }, 1000);
      }
    },
    verifyEmail() {
      if (this.inputCode == this.verificationCode) {
        this.changeStep(this.currentStep + 1);
      } else {
        toast.error("Verification failed", {
          theme: "colored",
          autoClose: 2000,
        });
      }
    },

    updateFileImage() {
      this.fileImage = this.$refs.fileImage;
    },

    //go to step 3 from step 2
    toStep3() {
      console.log(this.checkInputStep2);
      if (this.checkInputStep2) {
        this.changeStep(this.currentStep + 1);
      }
    },
    changeStep(step) {
      // Implement your logic to change steps based on the parameter
      this.modal.hide();
      if (step == 2) {
        this.isstep2 = true;
        this.isstep1 = false;
        this.isstep3 = false;
        this.currentStep = 2;
        this.completedStep1 = true;
        this.completedStep2 = false;
      } else if (step == 3) {
        this.isstep2 = false;
        this.isstep1 = false;
        this.isstep3 = true;
        this.currentStep = 3;
        this.completedStep2 = true;
        this.completedStep1 = true;
      } else {
        this.isstep2 = false;
        this.isstep1 = true;
        this.isstep3 = false;
        this.currentStep = 1;
        this.completedStep2 = false;
        this.completedStep1 = false;
      }
    },
    async saveHirer() {
      if (this.checkInputStep3) {
        //save freelancer account info
        api
          .post("/accounts/create", {
            email: this.email,
            username: this.username,
            password: this.password,
            role: this.role,
          })
          .then(
            (res) => {
              console.log("Added account successfully");
              console.log(res.data.account);
              this.account = res.data.account;
              //add new freelancer with newly created account ID
              api
                .post("/customers/create", {
                  accountID: this.account.AccountID,
                  firstName: this.firstName,
                  lastName: this.lastName,
                  profilePicture:
                    "https://cdn2.iconfinder.com/data/icons/office-and-business-round-set-1/64/6-512.png",
                  // location: this.location,
                  phoneNo: this.phoneNo,
                  location: this.location,
                  description: this.description,
                  companyName: this.companyName,
                  companyAddress: this.companyAddress,
                  taxCode: this.taxCode,
                })
                .then(
                  (res) => {
                    console.log(res.data);
                    //message
                    toast.success("Account registered successfully", {
                      theme: "colored",
                      autoClose: 2000,
                      onClose: () => location.replace("/sendmessage"),
                    });
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
      }
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.myModal);
  },
};
</script>
  
  <style>
.become .header {
  width: 100%;
  height: 80px;
  position: relative;
  border-bottom: 1px #dad8d8 solid;
}
.imgbecome {
  position: absolute;
  width: 10%;
  display: flex;
  margin-left: 5%;
}
.container-become {
  margin: 15px 10%;
}
.left {
  float: left;
  width: 7%;
}
.right {
  float: right;
  width: 85%;
}
.line-info {
  margin-top: 5%;
  display: flex;
}
.become .become_header {
  margin: 20px 0;
  border-bottom: 1px solid #dcd8d8;
  padding-bottom: 20px;
}

.become .become_header .become_header_item {
  width: fit-content;
  font-weight: 600;
}

.become .active span {
  color: #d73436;
}
.inputForm {
  width: 100%;
}
.inputForm td {
  padding: 10px;
}
.inputForm tr td select {
  border: 1px solid;
}
.inputField {
  width: 100%;
}
input[type="file"] {
  border: 2px solid white;
}
.name{
  width: 50%;
  margin-right: 50%;
}
.errmessage{
  text-align: left;
}
</style>
