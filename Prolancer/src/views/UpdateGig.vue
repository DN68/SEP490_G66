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
              v-model="gig.Title"
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
              v-model="gig.CategoryID"
              @change="displayCategory"
              class="form-select lefthalf"
              aria-label="Default select example"
            >
              <option :value="-1">Select a category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.CategoryID"
              >
                {{ category.Category_Name }}
              </option>
            </select>
          </div>
        </div>
        <div class="line" style="text-align: left; margin-top: 35px">
          <div style="float: left; width: 30%">
            <span style="font-weight: bold">Scope & Pricing</span>
          </div>
          <div class="right">
            <div class="choice" style="display: flex; flex-direction: row">
              <div class="daydeli third">
                <label for="">Day Deliveries</label><br />
                <input type="number" class="third" v-model="gig.Delivery_Day" />
              </div>
              <div class="price">
                <label for="">Price($)</label> <br />
                <input type="number" class="third" v-model="gig.Price" /> $
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
              v-model="gig.Description"
            ></textarea>
          </div>
        </div>
        <div class="line" style="text-align: left; margin-top: 35px">
          <div style="float: left; width: 30%">
            <span style="font-weight: bold">Image</span>
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
              v-model="gig.Gig_IMG"
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
            @click="updateGig"
          >
            Update
          </button>
        </div>
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
import VueJwtDecode from "vue-jwt-decode";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import api from '../../api';
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
      // category: -1,
      // description: "",
      // numOfPage: "",
      // dayDeliveries: 0,
      // price: 0,
      // image: "",
      gig: {},
      freelancer: {},
      role: "",
    };
  },
  created() {
    this.onUpdateAccountInfo()
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
    updateGig() {
      api
        .put(`/gigs/${this.$route.params.GigID}/update`, {
          Title: this.gig.Title,
          Description: this.gig.Description,
          Gig_IMG: this.gig.Gig_IMG,
          CategoryID: this.gig.CategoryID,
          Price: this.gig.Price,
          Delivery_Day: this.gig.Delivery_Day,
          FreelancerID: this.freelancer.FreelancerID,
        })
        .then(
          (res) => {
            // console.log(res.data);
            toast.success("Gig updated successfully", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.replace("/managegigsel"),
            });
          },
          (err) => {
            toast.error("Update gig failed", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.replace("/managegigsel"),
            });
          }
        );
    },
  },
  mounted() {
    api.get(`/gigs/details/${this.$route.params.GigID}`).then(
      (res) => {
        this.gig = res.data;
        console.log(this.gig);
      },
      (err) => {
        console.log(err.response);
      }
    );
    api.get("/categories/get").then((res) => {
      this.categories = res.data;
      // console.log(res.data);
    }),
      api
        .get("/freelancers/info", {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.freelancer = res.data.freelancer;
          },
          (err) => {
            console.log(err.response);
          }
        );
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
textarea{
  width: 100%
}
</style>
