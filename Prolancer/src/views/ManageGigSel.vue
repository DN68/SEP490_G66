<template>
  <div>
    <HeaderSeller></HeaderSeller>
    <div class="container-managigsel">
      <div class="manage_title row">
        <div class="col-md-3"><h3>Manage Gigs</h3></div>
        <div class="col-md-3"><h3></h3></div>
        <div class="col-md-3 search_bar">
          <div class="input-group rounded">
            <input
              type="search"
              class="form-control gig_search"
              placeholder="Search Gig ..."
              v-model="searchGig"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <router-link
              :to="{
                path: '/managegigsel',
                query: {
                  search: searchGig,
                  freelancerId: freelancerId,
                  status: status,
                },
              }"
              class="text-decoration-none"
            >
              <span
                class="input-group-text border-0 icon_search"
                id="search-addon"
              >
                <i class="fas fa-search"></i>
              </span>
            </router-link>
          </div>
        </div>
        <div class="col-md-2">
          <router-link to="/creategig" style="text-decoration: none">
            <h6
              style="
                color: #fff;
                border: 1px #ccc solid;
                background-color: red;
                line-height: 35px;
              "
            >
              Create Gig
            </h6>
          </router-link>
        </div>
      </div>
      <div class="order_status row">
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Active' }"
        >
          <router-link
            @click="(this.status = 'Active'), (selectedPage = '1')"
            :to="{
              path: '/managegigsel',
              query: {
                search: searchGig,
                freelancerId: freelancerId,
                status: 'Active',
              },
            }"
            class="text-decoration-none"
          >
            <h6>
              Active
              <span v-if="this.status == 'Active'" class="badge bg-secondary">{{
                pagination.totalRow
              }}</span>
            </h6></router-link
          >
        </div>

        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Paused' }"
        >
          <router-link
            @click="(this.status = 'Paused'), (selectedPage = '1')"
            :to="{
              path: '/managegigsel',
              query: {
                page: 1,
                search: searchGig,
                freelancerId: freelancerId,
                status: 'Paused',
              },
            }"
            class="text-decoration-none"
          >
            <h6>
              Paused<span
                v-if="this.status == 'Paused'"
                class="badge bg-secondary"
                >{{ pagination.totalRow }}</span
              >
            </h6>
          </router-link>
        </div>
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Deleted' }"
        >
          <router-link
            @click="(this.status = 'Deleted'), (selectedPage = '1')"
            :to="{
              path: '/managegigsel',
              query: {
                page: 1,
                search: searchGig,
                freelancerId: freelancerId,
                status: 'Deleted',
              },
            }"
            class="text-decoration-none"
          >
            <h6>
              Deleted<span
                v-if="this.status == 'Deleted'"
                class="badge bg-secondary"
                >{{ pagination.totalRow }}</span
              >
            </h6>
          </router-link>
        </div>
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Blocked' }"
        >
          <router-link
            @click="(this.status = 'Blocked'), (selectedPage = '1')"
            :to="{
              path: '/managegigsel',
              query: {
                page: 1,
                search: searchGig,
                freelancerId: freelancerId,
                status: 'Blocked',
              },
            }"
            class="text-decoration-none"
          >
            <h6>
              Blocked<span
                v-if="this.status == 'Blocked'"
                class="badge bg-secondary"
                >{{ pagination.totalRow }}</span
              >
            </h6>
          </router-link>
        </div>
      </div>
      <div class="gig_table">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr style="border-bottom: 2px solid #dcd8d8">
              <th class="th_no">NO.</th>
              <th class="th_Title">TITLE</th>
              <th class="th_description">DESCRIPTION</th>
              <th class="th_img">GIG IMAGE</th>
              <th class="th_category">CATEGORY NAME</th>
              <th class="th_creationDate">CREATION DATE</th>
              <th class="th_status">STATUS</th>
              <th class="th_price">PRICE</th>
              <th class="th_actions">ACTIONS</th>
            </tr>
          </thead>
          <tbody v-if="gigs.length >= 1">
            <tr v-for="(gig, index) in gigs" :key="index">
              <td class="td_gigs">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ index + 1 }}
                  </p>
                </div>
              </td>
              <td class="td_gigs">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ gig.Title }}
                  </p>
                </div>
              </td>
              <td class="td_gigs">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ gig.Description }}
                  </p>
                </div>
              </td>

              <td class="td_image">
                <img :src="gig.Gig_IMG" width="200" height="100" />
              </td>

              <td class="td_gigs">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ gig.Category_Name }}
                  </p>
                </div>
              </td>
              <td class="td_gigs">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ getFormattedDate(gig.Creation_Date) }}
                  </p>
                </div>
              </td>

              <td class="td_gigs">
                <div class="d-flex align-items-center">
                  <span
                    v-if="gig.Status == 'Active'"
                    class="badge bg-primary rounded-pill d-inline"
                  >
                    Active</span
                  >
                  <span
                    v-if="gig.Status == 'Paused'"
                    class="badge rounded-pill bg-info d-inline"
                  >
                    Paused</span
                  >
                  <span
                    v-if="gig.Status == 'Deleted'"
                    class="badge rounded-pill bg-danger"
                    >Deleted</span
                  >
                  <span
                    v-if="gig.Status == 'Blocked'"
                    class="badge rounded-pill bg-secondary"
                    >Blocked</span
                  >
                </div>
              </td>

              <td class="td_gigs">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ gig.Price }}
                  </p>
                </div>
              </td>
              <td class="td_actions">
                <i
                  @click="
                    (isshowModal = !isshowModal), (slectedGigID = gig.GigID)
                  "
                  v-if="status != 'Blocked'"
                  class="bi bi-gear-fill"
                ></i>
                &nbsp;
                <i
                  @click="this.$router.push('/updategig/' + gig.GigID)"
                  class="bi bi-pencil-fill"
                ></i>
              </td>

              <!-- <div class="dropdown">
                  <button
                    type="button"
                    data-bs-toggle="dropdown"
                    style="border: none; width: 35px"
                  >
                    ...
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Active</a></li>
                    <li><a class="dropdown-item" href="#">Pause</a></li>
                    <li><a class="dropdown-item" href="#">Delete</a></li>
                    <li><a class="dropdown-item" href="#">Block</a></li>
                    <li><a class="dropdown-item" href="#">Unblock</a></li>
                  </ul>
                </div> -->
            </tr>
          </tbody>
        </table>
        <div v-if="gigs.length == 0" class="text-center">
          <h5>Gig Not Found</h5>
        </div>

        <div>
          <div
            class="modal fade show"
            style="
              display: block;
              background-color: #000000ad;
              padding-top: 10%;
            "
            v-if="isshowModal"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Change Order Status</h5>
                  <button
                    type="button"
                    class="btn-close"
                    @click="isshowModal = !isshowModal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div>
                      <p class="modal-title">Select status here</p>
                    </div>
                    <select
                      v-model="selectedStatus"
                      style="margin-bottom: 15px"
                      class="text-center py-2"
                    >
                      <option class="" value="Active">
                        <span>Active</span>
                      </option>
                      <option class="" value="Paused">
                        <span>Paused</span>
                      </option>
                      <option class="" value="Deleted">
                        <span>Deleted</span>
                      </option>
                    </select>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="isshowModal = !isshowModal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="
                      changeGigStatus(selectedStatus, slectedGigID),
                        (isshowModal = !isshowModal)
                    "
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <router-link
            v-if="pagination.page - 1 == 0 && pagination.totalPage != 0"
            class="page-number"
            @click="selectedPage = pagination.page - 1"
            :to="{
              path: '/managegigsel',
              query: {
                page: 1,
                search: searchGig,
                status: status,
              },
            }"
            ><i class="bi bi-arrow-left"></i
          ></router-link>
          <router-link
            v-if="pagination.page - 1 > 0"
            class="page-number"
            @click="selectedPage = pagination.page - 1"
            :to="{
              path: '/managegigsel',
              query: {
                page: pagination.page - 1,
                search: searchGig,
                freelancerId: freelancerId,
                status: status,
              },
            }"
            ><i class="bi bi-arrow-left"></i
          ></router-link>
          <router-link
            :to="{
              path: '/managegigsel',
              query: {
                page: index,
                search: searchGig,
                freelancerId: freelancerId,
                status: status,
              },
            }"
            class="page-number"
            @click="selectedPage = index"
            v-for="index in pagination.totalPage"
            :key="index"
            href="#"
            :class="{ active: index == pagination.page }"
            ><span>{{ index }}</span>
          </router-link>

          <router-link
            v-if="pagination.page + 1 <= pagination.totalPage"
            class="page-number"
            @click="selectedPage = pagination.page + 1"
            :to="{
              path: '/managegigsel',
              query: {
                page: pagination.page + 1,
                search: searchGig,
                freelancerId: freelancerId,
                status: status,
              },
            }"
            ><i class="bi bi-arrow-right"></i
          ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import HeaderSeller from "../components/HeaderSeller.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import VueJwtDecode from "vue-jwt-decode";

import api from '../../api';
var moment = require("moment");

export default {
  name: "CreateOrderDetailPage",
  components: {
    HeaderSeller,
  },
  data() {
    return {
      freelancer: {},
      gigs: [],
      pagination: [],
      moment: moment,
      searchGig: "",
      freelancerId: "",
      selectedPage: 1,
      // status: this.$route.query.status,
      status: "Active",
      isshowModal: false,
      selectedStatus: "Active",
    };
  },
  methods: {
    //format date
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    async changeGigStatus(status, gigID) {
      const data = await api.put("/gigs/updateStatus", {
        status: status,
        gigID: gigID,
      });
      // console.log(data);
      if (data.data.message == "Change Status Success") {
        toast.success("Change Gig Status Successfully!", {
          theme: "colored",
          autoClose: 2000,
          onClose: () => location.reload(),
        });
      } else {
        toast.warn("Change Gig Status Failed!", { autoClose: 2000 });
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

    async getGig(currentPage) {
      const responseData = await api
        .get("/gigs/index/freelancer", {
          params: {
            page: currentPage,
            search: this.searchGig,
            freelancerId: this.freelancer.FreelancerID,
            status: this.status,
          },
        })
        .then((response) => {
          const gigs = response.data.gig;
          console.log(gigs);
          this.gigs = gigs;
          const paging = response.data.pagination;
          this.pagination = paging;
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          // toast.warn("Failed!", { autoClose: 2000 });
        });
    },
  },
  async created() {
    await this.onUpdateAccountInfo();
    console.log(
      "🚀 ~ file: CreateOrderDetailView.vue:369 ~ onUpdateAccountInfo ~ user:",
      JSON.stringify(this.freelancer)
    );
    await this.getGig(this.selectedPage);
  },

  async beforeRouteUpdate() {
    // console.log("Run Here");
    // const responseDateWithPage = await axios.get("/gigs/index/freelancer", {
    //   params: {
    //     page: this.selectedPage,
    //     search: this.searchGig,
    //     freelancerId: this.freelancerId,
    //     status: this.status,
    //   },
    // });

    // const gigs = responseDateWithPage.data.gig;
    // this.gigs = gigs;

    // const searchQuery = responseDateWithPage.data.searchQuery;
    // this.searchGig = searchQuery.search;
    // const paging = responseDateWithPage.data.pagination;
    // this.pagination = paging;
    // console.log("this.selectedPage " + (this.pagination.page + 1));
    await this.getGig(this.selectedPage);
  },
};
</script>
  
  <style scoped>
.container-managigsel {
  margin-left: 5%;
  margin-right: 5%;
}
.input-group-text {
  background-color: white;
}
.pagination {
  display: inline-block;
  margin: 20px 0;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active span,
.pagination a:hover span {
  color: black;
  border-bottom: 2px solid;
  padding-bottom: 4px;
}
.gig_search {
  border: none;
}
.icon_search {
  margin-right: 50px;
  color: #a8a7a7;
}
.manage_title {
  margin: 20px 0;
  justify-content: space-between;
}
.search_bar {
  border-bottom: 1px solid #dcd8d8;
}
.order_status {
  padding-bottom: 10px;
  border-bottom: 1px solid #dcd8d8;
}
.order_status {
  margin: 20px 0;
}

.order_status .status_item {
  text-align: left;
  width: fit-content;
  text-transform: uppercase;
}
.order_status .status_item h6 {
  font-weight: 500;
  color: #9f9fa0;

  font-size: 15px;
}

.order_status .status_item_active h6 {
  color: #303032;
}
.manage_title h3 {
  text-align: left;
  font-weight: 600;
}
.gig_table .table th {
  padding: 10px;
}
.table .th_user,
.th_gig {
  text-align: left;
}

.table .th_gig {
  width: 30%;
}

.table .td_gig p {
  color: #757575 !important;
}
.table .th_user {
  width: 25%;
}

.table .th_user span {
  margin-left: 20px;
}
.td_gig {
  text-align: left;
}
.gig_table .table th {
  font-weight: 600;
  color: #a8a7a7;
  font-size: 13px;
}
.align-items-center {
  justify-content: center;
}
.gig_table {
  max-height: 70vh;
  overflow-y: scroll;  
}

.gig_table::-webkit-scrollbar {
  width: 12px; 
}

.gig_table::-webkit-scrollbar-thumb {
  background-color: #888; 
}

.gig_table::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}
</style>