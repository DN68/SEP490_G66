<template>
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
          <div class="col-sm-3 become_header_item" :class="{ active: isstep1 }">
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
          <div class="col-sm-3 become_header_item" :class="{ active: isstep2 }">
            <span v-if="isstep2"><i class="bi bi-2-circle-fill fs-5"></i></span>
            <span v-else
              ><i
                class="bi fs-5"
                :class="{
                  'bi-check-circle-fill': completedStep2,
                  'bi-2-circle': !completedStep2,
                }"
              ></i
            ></span>

            <span> Personal Information</span>
            <i class="bi bi-chevron-right"></i>
          </div>
          <div class="col-sm-3 become_header_item" :class="{ active: isstep3 }">
            <span v-if="isstep3"><i class="bi bi-3-circle-fill fs-5"></i></span>
            <span v-else><i class="bi bi-3-circle fs-5"></i></span>
            <span> Upload CV</span>
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
        <span
          >Tell us a bit about yourself and how you gained your skills,
          certifications and experience.</span
        >
      </div>

      <div v-if="isstep1">
        {{ message }}
        <table class="inputForm">
          <tr>
            <td class="line-info"><span>Username </span></td>
            <td>
              <input
                class="inputField"
                type="text"
                v-model="username"
                @change="isUsernameExist"
              />
            </td>
          </tr>
          <tr>
            <td class="line-info"><span>Your Email </span></td>
            <td>
              <input
                class="inputField"
                type="text"
                v-model="email"
                @change="isEmailExist"
              />
            </td>
          </tr>
          <tr>
            <td class="line-info"><span>Password </span></td>
            <td>
              <input class="inputField" type="password" v-model="password" />
            </td>
          </tr>
          <tr>
            <td class="line-info"><span>Confirm Password </span></td>
            <td>
              <input
                class="inputField"
                type="password"
                v-model="repeatPassword"
              />
            </td>
          </tr>
        </table>
      </div>
      <div v-if="isstep3">
        <table class="inputForm">
          <tr>
            <td class="line-info"><span>CV Title </span></td>
            <td><input class="inputField" type="text" v-model="cvTitle" /></td>
          </tr>
          <tr>
            <td class="line-info"><span>Upload CV </span></td>
            <td>
              <input
                style="width: 85%"
                type="file"
                ref="fileCV"
                accept=".pdf"
              />
              (.pdf only)
            </td>
          </tr>
          <tr>
            <td class="line-info"><span>Description </span></td>
            <td>
              <textarea
                name=""
                id=""
                cols="48"
                rows="5"
                style="width: 100%"
                placeholder="  Share a bit about your work experience,cool project you've completed"
                v-model="cvDescription"
              ></textarea>
            </td>
          </tr>
        </table>
      </div>
      <div v-if="isstep2">
        {{ message }}
        <table class="inputForm">
          <tr>
            <td class="line-info"><span>Full Name</span></td>
            <td>
              <input
                type="text"
                placeholder="First Name"
                v-model="firstName"
                style="width: 48.5%"
              />
              <input
                class="ms-2"
                placeholder="Last Name"
                v-model="lastName"
                type="text"
                style="width: 50%"
              />
            </td>
          </tr>
          <tr>
            <td class="line-info"><span>Phone </span></td>
            <td>
              <input type="text" class="inputField" v-model="phoneNo" />
            </td>
          </tr>
          <tr>
            <td class="line-info"><span>Address </span></td>
            <td>
              <input type="text" class="inputField" v-model="location" />
            </td>
          </tr>
          <tr>
            <td class="line-info"><span>Description </span></td>
            <td>
              <textarea
                name=""
                id=""
                cols="48"
                rows="5"
                style="width: 100%"
                v-model="description"
                placeholder="  Share a bit about your work experience,cool project you've completed"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td class="line-info"><span>Category </span></td>
            <td>
              <select
                v-model="mainCategory"
                class="form-select lefthalf"
                aria-label="Default select example"
              >
                <option :value="-1">Select a category</option>
                <option
                  v-for="category in categories"
                  :key="category.CategoryID"
                  :value="category.CategoryID"
                >
                  {{ category.Category_Name }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="line-info"><span>Language </span></td>
            <td>
              <div class="dropdown">
                <button
                  type="button"
                  data-bs-toggle="dropdown"
                  style="
                    border: 1px #ccc solid;
                    background-color: #fff;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    width: 100%;
                  "
                >
                  <span style="float: left"> Vietnamese </span>
                  <i
                    class="fa-solid fa-chevron-down"
                    style="float: right; align-self: center"
                  ></i>
                </button>
                <ul class="dropdown-menu">
                  <li class="dropdown-item" href="#">Vietnamese</li>
                  <li class="dropdown-item" href="#">English</li>
                </ul>
              </div>
            </td>
          </tr>
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
          @click="saveFreelancer()"
        >
          Save
        </button>
        <button
          v-if="isstep1"
          type="button"
          class="btn btn-danger"
          style="border: none; width: 100px; margin-top: 40px"
          :disabled="!checkInputStep1"
          @click="
            showModal();
            sendvalidationEmail();
          "
        >
          Continue
        </button>
        <button
          v-if="isstep2"
          id="btn-sub"
          type="submit"
          class="btn btn-primary bg-danger"
          style="border: none; width: 100px; margin-top: 40px"
          :disabled="!checkInputStep2"
          @click="changeStep(currentStep + 1)"
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
                Verification code: <input type="password" maxlength="6" v-model="inputCode" />
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
      <button @click="openPdfPage">See PDF</button>
      <!-- <embed :src="blobUrl" type="application/pdf" width="100%" height="900px"> -->
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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
      categories: [],
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
      location: "",
      role: "F",
      mainCategory: -1,
      //email verification
      verificationCode: "",
      inputCode: "123456",
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
    checkInputStep1() {
      //input validation here
      if (!this.username) {
        this.message = "You must enter username";
        return false;
      }
      if (!this.isValidUsername) {
        this.message =
          "Username must start with an alphabet and has at least 8 characters";
        return false;
      }
      console.log(this.usernameExist);
      if (this.usernameExist) {
        this.message = "Username exist";
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
    checkInputStep2() {
      //input validation here

      if (!this.firstName) {
        this.message = "You must enter your first name";
        return false;
      }
      if (!this.lastName) {
        this.message = "You must enter your last name";
        return false;
      }
      if (!this.phoneNo) {
        this.message = "You must enter your phone number";
        return false;
      }
      if (!this.location) {
        this.message = "You must enter your address";
        return false;
      }
      if (!this.description) {
        this.message = "You must enter your description (at least 150 letters)";
        return false;
      }
      if (this.mainCategory == -1) {
        this.message = "You must choose your specialization";
        return false;
      }
      return true;
    },
  },
  methods: {
    isEmailExist() {
      axios.get(`/accounts/${this.email}/checkEmail`).then(
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
      axios.get(`/accounts/${this.username}/checkUsername`).then(
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
    sendvalidationEmail() {
      axios
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
    showModal() {
      this.modal.show();
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
    async saveFreelancer() {
      //save freelancer account info
      axios
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
            axios
              .post("/freelancers/create", {
                accountID: this.account.AccountID,
                firstName: this.firstName,
                lastName: this.lastName,
                profilePicture:
                  "https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-122.jpg",
                // location: this.location,
                phoneNo: this.phoneNo,
                location: this.location,
                description: this.description
              })
              .then(
                (res) => {
                  this.message =
                    "Info added successfully. Returning to homepage";
                  // this.$router.push("/");
                  console.log(res.data);
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
      //Save CV pdf file
      const fileInput = this.$refs.fileCV;
      console.log(
        "🚀 ~ file: BecomeSeller.vue:278 ~ saveFreelancer ~ fileCV:",
        fileInput.files
      );
      console.log("🚀 ~ ", this.cvTitle + "   " + this.cvDescription);
      if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        console.log(formData);
        axios
          .post("/cv/createCV", formData)
          .then((response) => {
            // Handle the successful upload response
            console.log("File uploaded successfully", response);
            console.log(response);
            console.log(response.data);
            toast.success("Upload CV Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.reload(),
            });
          })
          .catch((error) => {
            // Handle the error
            console.error("Error uploading file", error);
            toast.warn("Upload CV Failed!", { autoClose: 2000 });
          });
      } else {
        // Handle case when no file is selected
        console.warn("Please select a file to upload");
      }
    },
    async openPdfPage() {
      const apiUrl = "/cv/" + this.CV_Uploads;
      const resData = await axios.get(apiUrl, { responseType: "arraybuffer" });
      console.log(resData);
      const blob = new Blob([resData.data], { type: "application/pdf" });

      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(blob);
      this.blobUrl = blobUrl;
      console.log(blobUrl);
      // Open a new window or tab and display the PDF
      const pdfWindow = window.open();
      pdfWindow.document.write(`
      <html>
      <head>
      <title>CV Viewer</title>
      </head>
      <body>
      <embed src="${blobUrl}" type="application/pdf" width="100%" height="100%">
      </body>
      </html>
              `);
      pdfWindow.onbeforeunload = function () {
        URL.revokeObjectURL(blobUrl);
      };
    },
  },
  mounted() {
    axios.get("/categories/get").then((res) => {
      this.categories = res.data;
    }),
      (this.modal = new bootstrap.Modal(this.$refs.myModal));
  },
};
</script>

<style>
.header {
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
</style>