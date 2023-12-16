<template>
  <div>
    <div class="header">
      <Headers></Headers>
    </div>

    <div id="content" class="">
      <div class="container-creagig">
        <div class="line" style="text-align: left; margin-top: 35px">
          <div style="float: left; width: 30%">
            <span style="font-weight: bold">Gig Title</span>
            <br />
            <span>
              As your Gig storefront, your title is the most important place to
              include keywords that buyers would likely use to search for a
              service like yours.
            </span>
          </div>
          <div class="right">
            <textarea
              name=""
              id=""
              cols="60"
              rows="3"
              v-model="title"
              ref="title"
              required
              maxlength="100"
            ></textarea>
            <div>
              <p class="errmessage" style="color: red">
                {{ validationErrors.title }}
              </p>
            </div>
          </div>
        </div>
        <div class="line" style="text-align: left; margin-top: 35px">
          <div style="float: left; width: 30%">
            <span style="font-weight: bold">Category</span>
            <br />
            <span>
              Choose the category and sub-category most suitable for your Gig.
            </span>
          </div>
          <div class="right">
            <select
              v-model="category"
              @change="displayCategory"
              class="form-select lefthalf"
              aria-label="Default select example"
              ref="category"
            >
              <option :value="-1">Select a category</option>
              <!-- <option
              v-for="category in categories"
              :key="category.id"
              :value="category.CategoryID"
            >
              <span v-if="category.CategoryID === 1">{{ category.Category_Name }}</span>
            </option> -->
              <option value="1">Programming & Tech</option>
            </select>
            <div>
              <p class="errmessage" style="color: red">
                {{ validationErrors.category }}
              </p>
            </div>

            <!-- <select
            class="form-select righthalf"
            aria-label="Default select example"
          >
            <option selected>Select a category</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select> -->
          </div>
        </div>
        <div class="line" style="text-align: left; margin-top: 35px">
          <div style="float: left; width: 30%">
            <span style="font-weight: bold">Scope & Pricing</span>
          </div>
          <div class="right">
            <div class="choice" style="display: flex; flex-direction: row">
              <div class="numpage" style="display: none">
                <label for="">Number of page</label>
                <select
                  class="form-select third"
                  aria-label="Default select example"
                  v-model="numOfPage"
                  required
                >
                  <option value="" dis>Select number of page</option>
                  <option value="less than 3">less than 3</option>
                  <option value="3-5">3-5</option>
                  <option value="more than 5">more than 5</option>
                </select>
              </div>
              <div class="daydeli third">
                <label for="">Day Deliveries</label><br />
                <input
                  type="number"
                  class="third"
                  v-model="dayDeliveries"
                  min="0"
                  ref="dayDeliveries"
                />
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.dayDeliveries }}
                  </p>
                </div>
              </div>
              <div class="price">
                <label for="">Price($)</label> <br />
                <input
                  type="number"
                  class="third"
                  v-model="price"
                  min="0"
                  step="5"
                  ref="price"
                />
                $
                <div>
                  <p class="errmessage" style="color: red">
                    {{ validationErrors.price }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line" style="text-align: left; margin-top: 35px">
          <div style="float: left; width: 30%">
            <span style="font-weight: bold">Description</span>
            <br />
            <span> Briefly Describe Your Gig </span>
          </div>
          <div class="right">
            <textarea
              name=""
              id=""
              cols="60"
              rows="3"
              v-model="description"
              ref="description"
              required
            ></textarea>
            <div>
              <p class="errmessage" style="color: red">
                {{ validationErrors.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="line" style="text-align: left; margin-top: 35px">
          <div style="float: left; width: 30%">
            <span style="font-weight: bold">Image URL</span>
            <br />
            <span>
              Get noticed by the right buyers with visual examples of your
              services.
            </span>
          </div>
          <div class="right">
            <!-- <div
            class="img-gig"
            style="
              padding-top: 40px;
              padding-left: 10px;
              padding-right: 10px;
              text-align: center;
            "
          >
            <span style="font-size: 12px"
              >Drag & drop a Photo or
              <span style="color: blue">Browse</span></span
            >
          </div> -->
            <textarea
              name=""
              id=""
              cols="60"
              rows="3"
              v-model="image"
              ref="image"
              required
              maxlength="500"
            ></textarea>
            <div>
              <p class="errmessage" style="color: red">
                {{ validationErrors.image }}
              </p>
            </div>
          </div>
        </div>
        <div class="button">
          <button
            id="btn-sub"
            type="submit"
            class="btn btn-primary bg-danger"
            style="border: none; width: 100px; margin-top: 40px"
            @click="createGig()"
          >
            Save
          </button>
        </div>
        <span ref="message">{{ message }}</span>
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Headers from "../components/HeaderSeller.vue";
import Sidebar from "../components/Sidebarprf.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import VueJwtDecode from "vue-jwt-decode";
import api from "../../api";

export default {
  name: "App",
  components: {
    Headers,
    Sidebar,
    Footer,
  },
  data() {
    return {
      categories: [],
      category: -1,
      title: "",
      description: "",
      dayDeliveries: 0,
      price: 0,
      image: "",
      freelancer: {},
      numOfPage: "",
      message: "",
      validationErrors: {
        title: "",
        category: "",
        dayDeliveries: "",
        price: "",
        description: "",
        image: "",
      },
      inputCheck: false,
    };
  },
  methods: {
    checkInput() {
      var errCount = 0;
      //input validation here
      if (!this.validateField("title")) {
        errCount++;
      }
      if (!this.validateField("category")) {
        errCount++;
      }
      if (!this.validateField("dayDeliveries")) {
        errCount++;
      }
      if (!this.validateField("price")) {
        errCount++;
      }
      if (!this.validateField("description")) {
        errCount++;
      }
      if (!this.validateField("image")) {
        errCount++;
      }
      console.log(errCount);
      //if no error -> true
      if (errCount == 0) {
        this.inputCheck = true;
      } else {
        this.inputCheck = false;
      }
    },
    validateField(fieldName) {
      const value = this.$refs[fieldName].value.trim();
      console.log(`${fieldName} ` + value);
      if (value == "") {
        this.validationErrors[fieldName] = `This field cannot be empty.`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      if (fieldName == "category" && this.category == -1) {
        this.validationErrors[fieldName] = `You must choose a category`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      if (fieldName == "dayDeliveries" && this.dayDeliveries == 0) {
        this.validationErrors[fieldName] = `You must set your day deliveries`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      if (fieldName == "price" && this.price == 0) {
        this.validationErrors[fieldName] = `You must set a price for your gig.`;
        this.setBorderColor(fieldName, false);
        return false;
      }

      //if field input OK
      this.validationErrors[fieldName] = "";
      this.setBorderColor(fieldName, true);
      return true;
    },
    setBorderColor(fieldName, value) {
      if (value == true) {
        this.$refs[`${fieldName}`].style.borderColor = "initial";
      } else {
        this.$refs[`${fieldName}`].style.borderColor = "red";
      }
    },
    async onUpdateAccountInfo() {
      let token = localStorage.getItem("token");
      //account is not authorized
      if (!token) {
        this.$router.push("/error");
      } else {
        let decoded = VueJwtDecode.decode(token);
        console.log(decoded);
        if (decoded.role === "F") {
          await api
            .get("/freelancers/info", {
              headers: { token: localStorage.getItem("token") },
            })
            .then(
              (res) => {
                this.freelancer = res.data.freelancer;
                // console.log(this.freelancer);
                if (this.freelancer.Status != "Active") {
                  this.$router.push("/seldash");
                }
              },
              (err) => {
                console.log(err.response);
              }
            );
        } else {
          this.currentAccountInfo = {
            Email: decoded.email,
            Role: decoded.role,
          };
        }
      }
    },
    createGig() {
      this.checkInput();
      if (this.inputCheck) {
        api
          .post("/gigs/create", {
            Title: this.title,
            Description: this.description,
            Gig_IMG: this.image,
            Numberpage: this.numOfPage,
            CategoryID: this.category,
            Price: this.price,
            Delivery_Day: this.dayDeliveries,
            FreelancerID: this.freelancer.FreelancerID,
          })
          .then(
            (res) => {
              // console.log(res.data);
              // this.$router.push("/giglist")
              toast.success("Gig created successfully", {
                theme: "colored",
                autoClose: 2000,
                onClose: () => location.replace("/managegigsel"),
              });
            },
            (err) => {
              toast.error("Add gig failed", {
                theme: "colored",
                autoClose: 2000,
                onClose: () => location.replace("/managegigsel"),
              });
            }
          );
      }
    },
    displayCategory() {
      console.log(this.category);
    },
  },
  mounted() {
    this.onUpdateAccountInfo();
    api.get("/categories/get").then((res) => {
      this.categories = res.data;
      // console.log(res.data);
    });
  },
};
</script>

<style scoped>
/* html {
  background-color: #ededed;
} */

.footer {
  width: 100%;
  bottom: 0;
  z-index: 600;
}
#content {
  background-color: #ccc;
  padding-top: 2%;
  padding-bottom: 2%;
}

.container-creagig {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  border: 1px #ccc solid;
  padding: 35px;
  background-color: #fff;
}

.left {
  float: left;
  width: 30%;
  margin: 5px 10px;
}
.right {
  float: right;
  width: 60%;
  margin: 5px 10px;
}
.lefthalf {
  float: left;
  width: 40%;
}
.righthalf {
  float: right;
  width: 40%;
}
.third {
  width: calc(100% / 2);
}
.img-gig {
  border: 1px #ccc solid;
  width: 30%;
  height: 130px;
}
.img-gig:hover {
  border: 1px blue dashed;
}
textarea {
  width: 100%;
}
.right{
  display: inline-grid
}
</style>
