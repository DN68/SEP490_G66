<template>
<div class="create_gig">

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
            required
            maxlength="100"
          ></textarea>
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
          >
            <option :value="-1">Select a category</option>
            <!-- <option
              v-for="category in categories"
              :key="category.id"
              :value="category.CategoryID"
            >
              <span v-if="category.CategoryID === 1">{{ category.Category_Name }}</span>
            </option> -->
            <option value="1">
              Programming & Tech
            </option>
          </select>
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
            <div class="numpage" style="display:none">
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
              />
            </div>
            <div class="price">
              <label for="">Price($)</label> <br />
              <input
                type="number"
                class="third"
                v-model="price"
                min="0"
                step="5"
              />
              $
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
            required
          ></textarea>
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
            required
            maxlength="500"
          ></textarea>
        </div>
      </div>
      <div class="button">
        <button
          id="btn-sub"
          type="submit"
          class="btn btn-primary bg-danger"
          style="border: none; width: 100px; margin-top: 40px"
          @click="createGig"
        >
          Save
        </button>
      </div>
      <span ref="message">{{ message }}</span>
    </div>
  </div>
 
</div>

</template>

<script>
import Headers from "../components/HeaderSeller.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import VueJwtDecode from "vue-jwt-decode";
import api from '../../api';

export default {
  name: "App",
  components: {
    Headers,
    Footer,
  },
  data() {
    return {
      categories: [],
      category: -1,
      description: "",
      numOfPage: "",
      dayDeliveries: 0,
      price: 0,
      image: "",
      freelancer: {},
      message: "",
    };
  },
  methods: {
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
                if(this.freelancer.Status != 'Active'){
                  this.$router.push('/seldash')
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
    },
    displayCategory() {
      console.log(this.category);
    },
  },
  mounted() {
    this.onUpdateAccountInfo()
    api.get("/categories/get").then((res) => {
      this.categories = res.data;
      // console.log(res.data);
    })
    
  },
};
</script>

<style>
/* html {
  background-color: #ededed;
} */

.footer {
  width: 100%;
  bottom: 0;
  z-index: 600;
}
.create_gig #content {
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
.create_gig textarea{
  width: 100%;
}
</style>
