<template>
  <div>
    <div class="header">
      <HeaderAdmin v-if="role == 'A'"></HeaderAdmin>
      <HeaderSeller v-if="role == 'F'"></HeaderSeller>
      <Headers v-if="role == 'C'"></Headers>
    </div>
    <div class="Sidebarudpf">
      <Sidebarpf></Sidebarpf>
    </div>

    <!-- <div id="content" class="">
    <div class="container-profile">
      <form  class="form-profile">
        <div class="field">
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Username</label
          >
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.username"
          />
          <div style="display: flex; flex-direction: row; justify-content: space-between">
            <div class="left" style="width:40%">
               <label class="form-label mt-5" style="float: left" for="form3Example3"
            >First Name</label
          >
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.firstName"
          />
            </div>
            <div class="right" style="width:40%">
              <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Last Name</label
          >
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.lastName"
          />
            </div>
             
          </div>
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Phone Number</label>
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.phone"
          />
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Description</label>
            <textarea
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.description"
          />
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Image</label>
            <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.image"
          />
        
          <div class="mt-5" style="display:flex;flex-direction:row;justify-content:space-between">
            <div class="left" style="width:40%">
              <span class="form-label mt-5">Upload CV</span>
            </div>
            <div class="right" style="width:15%">
              <input type="button" value="Upload">
            </div>
          </div>
          <button id="btn-sub" type="submit" @click="updateProfile" class="btn btn-primary">
            Update
          </button>
        </div>

      
          
        
      </form>
    </div>
  </div> -->
    <div id="content" class="">
      <div class="container-profile list-group">
        <div class="form-profile">
          <div class="field">
            <label
              class="form-label mt-5"
              style="float: left"
              for="form3Example3"
              >Username</label
            >
            <input
              type="text"
              id="form3Example3"
              class="form-control form-control-lg"
              v-model="currentAccountInfo.Username"
              readonly
            />

            <!-- if role is customer -->
            <div v-if="role === 'C'">
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                "
              >
                <div class="left" style="width: 40%">
                  <label
                    class="form-label mt-5"
                    style="float: left"
                    for="form3Example3"
                    >First Name</label
                  >
                  <input
                    type="text"
                    id="form3Example3"
                    class="form-control form-control-lg"
                    v-model="currentAccountInfo.First_Name"
                    ref="firstName"
                  />
                  <div>
                    <p class="errmessage" style="color: red">
                      {{ validationErrors.firstName }}
                    </p>
                  </div>
                </div>
                <div class="right" style="width: 40%">
                  <label
                    class="form-label mt-5"
                    style="float: left"
                    for="form3Example3"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    id="form3Example3"
                    class="form-control form-control-lg"
                    v-model="currentAccountInfo.Last_Name"
                    ref="lastName"
                  />
                  <div>
                    <p class="errmessage" style="color: red">
                      {{ validationErrors.lastName }}
                    </p>
                  </div>
                </div>
              </div>
              <label
                class="form-label mt-5"
                style="float: left"
                for="form3Example3"
                >Phone Number</label
              >
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                v-model="currentAccountInfo.Phoneno"
                ref="phoneNo"
              />
              <div>
                <p class="errmessage" style="color: red">
                  {{ validationErrors.phoneNo }}
                </p>
              </div>
              <label
                class="form-label mt-5"
                style="float: left"
                for="form3Example3"
                >Location</label
              >
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                v-model="currentAccountInfo.Location"
                ref="location"
              />
              <div>
                <p class="errmessage" style="color: red">
                  {{ validationErrors.location }}
                </p>
              </div>
              <label
                class="form-label mt-5"
                style="float: left"
                for="form3Example3"
                >Company</label
              >
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                v-model="currentAccountInfo.CompanyName"
                readonly
              />
              <label
                class="form-label mt-5"
                style="float: left"
                for="form3Example3"
                >Company Address</label
              >
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                v-model="currentAccountInfo.CompanyAddress"
                readonly
              />
              <label
                class="form-label mt-5"
                style="float: left"
                for="form3Example3"
                >Tax Code</label
              >
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                v-model="currentAccountInfo.TaxCode"
                readonly
              />
            </div>

            <!-- if role is Freelancer -->
            <div v-if="role == 'F'">
              <div
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                "
              >
                <div class="left" style="width: 40%">
                  <label
                    class="form-label mt-5"
                    style="float: left"
                    for="form3Example3"
                    >First Name</label
                  >
                  <input
                    type="text"
                    id="form3Example3"
                    class="form-control form-control-lg"
                    v-model="currentAccountInfo.First_Name"
                    ref="firstName"
                  />
                  <div>
                    <p class="errmessage" style="color: red">
                      {{ validationErrors.firstName }}
                    </p>
                  </div>
                </div>
                <div class="right" style="width: 40%">
                  <label
                    class="form-label mt-5"
                    style="float: left"
                    for="form3Example3"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    id="form3Example3"
                    class="form-control form-control-lg"
                    v-model="currentAccountInfo.Last_Name"
                    ref="lastName"
                  />
                  <div>
                    <p class="errmessage" style="color: red">
                      {{ validationErrors.lastName }}
                    </p>
                  </div>
                </div>
              </div>
              <label
                class="form-label mt-5"
                style="float: left"
                for="form3Example3"
                >Phone Number</label
              >
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                v-model="currentAccountInfo.Phoneno"
                ref="phoneNo"
              />
              <div>
                <p class="errmessage" style="color: red">
                  {{ validationErrors.phoneNo }}
                </p>
              </div>
              <label
                class="form-label mt-5"
                style="float: left"
                for="form3Example3"
                >Location</label
              >
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                v-model="currentAccountInfo.Location"
                ref="location"
              />
              <div>
                <p class="errmessage" style="color: red">
                  {{ validationErrors.location }}
                </p>
              </div>
              <label
                class="form-label mt-5"
                style="float: left"
                for="form3Example3"
                >Description</label
              >
              <input
                type="text"
                id="form3Example3"
                class="form-control form-control-lg"
                v-model="currentAccountInfo.Description"
                ref="description"
              />
              <div>
                <p class="errmessage" style="color: red">
                  {{ validationErrors.description }}
                </p>
              </div>
              <label
                class="form-label mt-5"
                style="float: left"
                for="form3Example3"
                >CV</label
              >
              <div>
                <input
                  id="form3Example3"
                  class="form-control form-control-lg"
                  type="file"
                  ref="fileCV"
                  accept=".pdf"
                />
                (.pdf only)
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="showCV(currentAccountInfo.CV_Upload)"
                  :disabled="isButtonDisabled"
                >
                  View CV
                </button>
              </div>
            </div>

            <!-- <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Image</label>
            <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.image"
          /> -->

            <button
              id="btn-sub"
              type="submit"
              @click="updateProfile"
              class="btn btn-primary"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "../components/Header.vue";
import Sidebarpf from "../components/Sidebarprf.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";
import HeaderSeller from "../components/HeaderSeller.vue";
import Footer from "../components/Footer.vue";
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import api from "../../api";
import _ from 'lodash';

export default {
  name: "App",
  components: {
    Headers,
    HeaderAdmin,
    HeaderSeller,
    Sidebarpf,
    Footer,
  },
  data() {
    return {
      user: {},
      currentAccountInfo: {},
      role: "",
      checkPhone: false,
      isButtonDisabled: false,
      validationErrors: {
        firstName: "",
        lastName: "",
        phoneNo: "",
        location: "",
        description: "",
      },
      inputCheckFreelancer: false,
      inputCheckCustomer: false,
    };
  },
  computed:{
    
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    let token = localStorage.getItem("token");
    //account is not authorized
    if (!token) {
      this.account = null;
    } else {
      let decoded = VueJwtDecode.decode(token);
      console.log(decoded.role);
      if (decoded.role === "F") {
        api
          .get("/freelancers/info", {
            headers: { token: localStorage.getItem("token") },
          })
          .then(
            (res) => {
              this.currentAccountInfo = res.data.freelancer;
              this.role = "F";
              console.log(this.currentAccountInfo);
            },
            (err) => {
              console.log(err.response);
            }
          );
      } else if (decoded.role === "C") {
        api
          .get("/customers/info", {
            headers: { token: localStorage.getItem("token") },
          })
          .then(
            (res) => {
              this.currentAccountInfo = res.data.customer;
              this.role = "C";
            },
            (err) => {
              console.log(err.response);
            }
          );
      } else if (decoded.role === "A") {
        api
          .get("/accounts/info", {
            headers: { token: localStorage.getItem("token") },
          })
          .then(
            (res) => {
              this.currentAccountInfo = res.data.account;
              this.role = "A";
            },
            (err) => {
              console.log(err.response);
            }
          );
      }
    }
  },
  methods: {
    isValidPhoneNumber(phone) {
      this.checkPhone = /^(03[2-9]|05[2689]|07[06-9]|08[1-9]|09\d)\d{7}$/.test(
        phone
      );
    },
    validateField(fieldName) {
      const value = this.$refs[fieldName].value.trim();
      //check phone input
      this.isValidPhoneNumber(this.currentAccountInfo.Phoneno)
      console.log(this.checkPhone)

      console.log(`${fieldName} ` + value);
      if (value == "") {
        this.validationErrors[fieldName] = `This field cannot be empty.`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      if (fieldName == "phoneNo" && !this.checkPhone) {
        this.validationErrors[fieldName] = `Invalid phone number`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      
      //if field input OK
      this.validationErrors[fieldName] = "";
      this.setBorderColor(fieldName, true);
      return true;
    },
    checkInputCustomer() {
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
      console.log(errCount);
      //if no error -> true
      if (errCount == 0) {
        this.inputCheckCustomer = true;
      } else {
        this.inputCheckCustomer = false;
      }
    },
    checkInputFreelancer() {
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
      if (!this.validateField("description")) {
        errCount++;
      }
      console.log(errCount);
      //if no error -> true
      if (errCount == 0) {
        this.inputCheckFreelancer = true;
      } else {
        this.inputCheckFreelancer = false;
      }
    },
    setBorderColor(fieldName, value) {
      if (value == true) {
        this.$refs[`${fieldName}`].style.borderColor = "initial";
      } else {
        this.$refs[`${fieldName}`].style.borderColor = "red";
      }
    },
    showCV: _.debounce(async function(cvName) {
      //disable button
      this.isButtonDisabled = true;
      const apiUrl = "/cv/" + cvName;
      const resData = await api.get(apiUrl, { responseType: "arraybuffer" });
      console.log(resData);
      const blob = new Blob([resData.data], { type: "application/pdf" });

      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(blob);
      this.blobUrl = blobUrl;
      console.log(this.blobUrl);

      // Open a new window or tab and display the PDF
      const pdfWindow = window.open();
      pdfWindow.document.write(`
      <html>
      <head>
      <title>CV Viewer</title>
      </head>
      <body>
      <embed src="${this.blobUrl}" type="application/pdf" width="100%" height="100%">
      </body>
      </html>
              `);
      pdfWindow.onbeforeunload = function () {
        URL.revokeObjectURL(this.blobUrl);
      };
      // Enable after 3 sec
      setTimeout(() => {
        this.isButtonDisabled = false;
      }, 1000);
    }),
    updateProfile() {
      // console.log(this.user)
      if (this.currentAccountInfo.Role == "F") {
        this.checkInputFreelancer();
        if (this.inputCheckFreelancer) {
          api
            .put(
              `/freelancers/info/${this.currentAccountInfo.AccountID}/update`,
              {
                First_Name: this.currentAccountInfo.First_Name,
                Last_Name: this.currentAccountInfo.Last_Name,
                Phoneno: this.currentAccountInfo.Phoneno,
                Profile_Picture: this.currentAccountInfo.Profile_Picture,
                Location: this.currentAccountInfo.Location,
                Description: this.currentAccountInfo.Description,
                MainCategoryID: this.currentAccountInfo.MainCategoryID,
              }
            )
            .then(
              (res) => {
                //if cv updated successfully
                if (this.updateCV()) {
                  toast.success("Profile updated successfully!", {
                    theme: "colored",
                    autoClose: 2000,
                  });
                } else {
                  toast.warn("Update CV Failed!", {
                    theme: "colored",
                    autoClose: 2000,
                  });
                }
              },
              (err) => {
                //message
                toast.error("Profile updated failed", {
                  theme: "colored",
                  autoClose: 2000,
                  // onClose: () => location.replace("/sendmessage"),
                });
              }
            );
        }
      } else if (this.currentAccountInfo.Role == "C") {
        this.checkInputCustomer();
        if (this.inputCheckCustomer) {
          api
            .put(
              `/customers/info/${this.currentAccountInfo.AccountID}/update`,
              {
                First_Name: this.currentAccountInfo.First_Name,
                Last_Name: this.currentAccountInfo.Last_Name,
                Phoneno: this.currentAccountInfo.Phoneno,
                Profile_Picture: this.currentAccountInfo.Profile_Picture,
                Location: this.currentAccountInfo.Location,
                CompanyName: this.currentAccountInfo.CompanyName,
                CompanyAddress: this.currentAccountInfo.CompanyAddress,
                TaxCode: this.currentAccountInfo.TaxCode,
              }
            )
            .then(
              (res) => {
                // console.log(res.data);
                //message
                toast.success("Profile updated successfully!", {
                  theme: "colored",
                  autoClose: 2000,
                });
              },
              (err) => {
                //message
                toast.error("Profile updated failed", {
                  theme: "colored",
                  autoClose: 2000,
                });
              }
            );
        }
      }
    },
    updateCV() {
      const fileInput = this.$refs.fileCV;
      console.log(
        "🚀 ~ file: BecomeSeller.vue:278 ~ saveFreelancer ~ fileCV:",
        fileInput.files
      );
      console.log("🚀 ~ ", this.cvTitle + "   " + this.cvDescription);

      // if a file is chosen
      if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        formData.append("FreelancerID", this.currentAccountInfo.FreelancerID);
        formData.append("CV_Upload", this.currentAccountInfo.CV_Upload);
        console.log(formData);
        api
          .post("/cv/updateCV", formData)
          .then((response) => {
            // Handle the successful upload response
            console.log("File updated successfully", response);
            console.log(response);
            console.log(response.data);
            //update cv name to view in page (no page reloading needed)
            this.currentAccountInfo.CV_Upload = response.data;
            return true;
          })
          .catch((error) => {
            // update CV failed
            console.error("Error updatefile", error);
            return false;
          });
      }
      //if no file is chosen then keep old cv name
      return true;
    },
  },
};
</script>

<style>
/* html {
  background-color: #ededed;
} */
.Sidebarudpf {
  float: left;
  width: 17%;
}
.footer {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  z-index: 600;
  margin-top: 15px;
}
#content {
  float: right;
  width: 80%;
  padding-top: 2%;
  /* position: fixed; */
  top: 0;
  bottom: 0;
  right: 0;
  padding: 85.8px 0 0;
  margin-top: 3%;

  z-index: 600;
  position: sticky;
}

.container-profile {
  margin: 10px 20%;
  width: 60%;
  border: 1px #ccc solid;
  padding: 35px;
  background-color: #fff;
  height: 1100px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
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
.form-profile {
  padding: 30px;

  position: relative;
  height: 900px;
}

.field {
  float: left;
  /* padding-right: 100px; */
  width: 60%;
  margin-left: 20%;
  position: absolute;
}
.content-uppro {
  height: 100px;
  border: 1px #ccc solid;
  background-color: #fff;
  float: right;
  width: 80%;
  margin-top: 2%;
}
</style>
