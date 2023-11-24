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
            <span> Personal Information</span>
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

            <span> Account Setup</span>
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
        <div class="line-info">
          <div class="left">
            <span>Full Name* </span>
          </div>
          <div class="right">
            <input type="text" placeholder="First Name" />
            <input class="ms-2" placeholder="Last Name" type="text" />
          </div>
        </div>
        <div class="line-info">
          <div class="left">
            <span>Your Email </span>
          </div>
          <div class="right">
            <input type="text" style="width: 40%" />
          </div>
        </div>
        <div class="line-info">
          <div class="left text-start">
            <span>Phone </span>
          </div>
          <div class="right">
            <input type="text" style="width: 40%" />
          </div>
        </div>
        <div class="line-info">
          <div class="left">
            <span>Description </span>
          </div>
          <div class="right">
            <textarea
              name=""
              id=""
              cols="48"
              rows="5"
              style="width: 60%; margin-left: 20%"
              placeholder="  Share a bit about your work experience,cool project you've completed"
            ></textarea>
          </div>
        </div>
        <div class="line-info">
          <div class="left">
            <span>Language </span>
          </div>
          <div class="right">
            <div class="dropdown" style="margin-left: -11%">
              <button
                type="button"
                data-bs-toggle="dropdown"
                style="
                  border: 1px #ccc solid;
                  background-color: #fff;
                  padding-top: 10px;
                  padding-bottom: 10px;
                  width: 300px;
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
          </div>
        </div>
      </div>

      <div v-if="isstep2">
        <div class="line-info">
          <div class="left">
            <span>User Name </span>
          </div>
          <div class="right">
            <input type="text" style="width: 40%" />
          </div>
        </div>
        <div class="line-info">
          <div class="left text-start">
            <span>Password </span>
          </div>
          <div class="right">
            <input type="text" style="width: 40%" />
          </div>
        </div>
        <div class="line-info">
          <div class="left text-start">
            <span>Confirm Password </span>
          </div>
          <div class="right">
            <input type="text" style="width: 40%" />
          </div>
        </div>
      </div>
      <div v-if="isstep3">
        <div class="line-info">
          <div class="left">
            <span>CV Title </span>
          </div>
          <div class="right">
            <input type="text" v-model="cvTitle" style="width: 40%" />
          </div>
        </div>
        <div class="line-info">
          <div class="left">
            <span>Upload CV </span>
          </div>
          <div class="right">
            <input type="file" ref="fileCV" accept=".pdf" />
            (.pdf only)
          </div>
        </div>
        <div class="line-info">
          <div class="left">
            <span>Description </span>
          </div>
          <div class="right">
            <textarea
              name=""
              id=""
              cols="48"
              rows="5"
              style="width: 60%; margin-left: 20%"
              placeholder="  Share a bit about your work experience,cool project you've completed"
              v-model="cvDescription"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="button" v-if="isstep3">
        <button
          id="btn-sub"
          type="submit"
          class="btn btn-primary bg-danger"
          style="border: none; width: 100px; margin-top: 40px"
          @click="saveFreelancer()"
        >
          Save
        </button>
      </div>
      <div class="button" v-else>
        <button
          id="btn-sub"
          type="submit"
          class="btn btn-primary bg-danger"
          style="border: none; width: 100px; margin-top: 40px"
          @click="changeStep(currentStep + 1)"
        >
          Continue
        </button>
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
      isstep1: true,
      isstep2: false,
      isstep3: false,
      currentStep: 1,
      completedStep1: false,
      completedStep2: false,
      cvTitle: "",
      // fileCV: '',
      cvDescription: "",
      blobUrl: "",
      CV_Uploads: "AnhLTHE153286.pdf",
      account: {}
    };
  },
  methods: {
    changeStep(step) {
      // Implement your logic to change steps based on the parameter
      if (step == 2) {
        this.isstep2 = true;
        this.isstep1 = false;
        this.isstep3 = false;
        this.currentStep = 2;
        this.completedStep1 = true;
      } else if (step == 3) {
        this.isstep2 = false;
        this.isstep1 = false;
        this.isstep3 = true;
        this.currentStep = 3;
        this.completedStep2 = true;
      } else {
        this.isstep2 = false;
        this.isstep1 = true;
        this.isstep3 = false;
        this.currentStep = 1;
      }
    },
    async saveFreelancer() {
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
            toast.warn("Upload CV Faild!", { autoClose: 2000 });
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
    }
  },
  mounted() {
    if(this.$route.query.data){
      this.account = JSON.parse(decodeURIComponent(this.$route.query.data))
      axios
      .post("/accounts/create", {
        email: this.account.email,
        username: this.account.username,
        password: this.account.password,
        role: this.account.role
      })
      .then(
        (res) => {
          console.log(res.data);
          // console.log("Added successfully");
        },
        (err) => {
          console.log(err.response);
        }
      );
    }
  },
}
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
</style>