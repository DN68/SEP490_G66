<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="container-managigad">
      <div class="manage_title row">
        <div class="col-md-3"><h3></h3></div>
        <div class="col-md-3 search_bar">
          <div class="input-group rounded">
            <input
              type="search"
              class="form-control order_search"
              placeholder="Search Gig ..."
              v-model="searchGig"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <router-link
              :to="{
                path: '/managegigad',
                query: {
                  search: searchGig,
                  userID: user.userId,
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
      </div>
      <div class="order_status row">
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Active' }"
        >
          <router-link
            @click="(this.status = 'Active'), (selectedPage = '1')"
            :to="{
              path: '/managegigad',
              query: {
                search: searchGig,
                userID: user.userId,
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
              path: '/managegigad',
              query: {
                page: 1,
                search: searchGig,
                userID: user.userId,
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
              path: '/managegigad',
              query: {
                page: 1,
                search: searchGig,
                userID: user.userId,
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
          :class="{ status_item_active: this.status == 'Block' }"
        >
          <router-link
            @click="(this.status = 'Block'), (selectedPage = '1')"
            :to="{
              path: '/managegigad',
              query: {
                page: 1,
                search: searchGig,
                userID: user.userId,
                status: 'Block',
              },
            }"
            class="text-decoration-none"
          >
            <h6>
              Block<span
                v-if="this.status == 'Block'"
                class="badge bg-secondary"
                >{{ pagination.totalRow }}</span
              >
            </h6>
          </router-link>
        </div>
      </div>
      <div class="order_table">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr style="border-bottom: 2px solid #dcd8d8">
              <th class="th_no">NO.</th>
              <th class="th_Freelancer">FREELANCER</th>
              <th class="th_Title">TITLE</th>
              <th class="th_description">DESCRIPTION</th>
              <th class="th_img">GIG IMAGE</th>
              <th class="th_category">CATEGORY NAME</th>
              <th class="th_creationDate">CREATION DATE</th>
              <th class="th_deliveryDays">DELEVERY DAY</th>
              <th class="th_status">STATUS</th>
              <th class="th_numberPage">NUMBER OF PAGE</th>
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
              <td class="td_user">
                <div class="d-flex align-items-center">
                  <img
                    :src="gig.Profile_Picture"
                    alt=""
                    style="width: 45px; height: 45px"
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">
                      {{
                        gig.First_Name +
                        " " +
                        gig.Last_Name
                      }}
                    </p>
                  </div>
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
                <img :src="gig.Gig_IMG" width="200" height="100"/>
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
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ gig.Delivery_Day }}
                  </p>
                </div>
              </td>
              <td class="td_gigs">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ gig.Status }}
                  </p>
                </div>
              </td>
              <td class="td_gigs">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ gig.Numberpage }}
                  </p>
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
                <div class="dropdown">
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
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="gigs.length == 0" class="text-center">
          <h5>Order Not Found</h5>
        </div>

        <div class="pagination">
          <router-link
            v-if="pagination.page - 1 == 0 && pagination.totalPage != 0"
            class="page-number"
            @click="selectedPage = pagination.page - 1"
            :to="{
              path: '/managegigad',
              query: {
                page: 1,
                search: searchGig,
                userID: user.userId,
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
              path: '/managegigad',
              query: {
                page: pagination.page - 1,
                search: searchGig,
                userID: user.userId,
                status: status,
              },
            }"
            ><i class="bi bi-arrow-left"></i
          ></router-link>
          <router-link
            :to="{
              path: '/managegigad',
              query: {
                page: index,
                search: searchGig,
                userID: user.userId,
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
              path: '/managegigad',
              query: {
                page: pagination.page + 1,
                search: searchGig,
                userID: user.userId,
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
import Header from "../components/HeaderAdmin.vue";
import Sidebar from "../components/Sidebar.vue";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

var moment = require("moment");

export default {
  name: "CreateOrderDetailPage",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      user: {},
      gigs: [],
      pagination: [],
      moment: moment,
      searchGig: "",
      selectedPage: 1,
      status: "Active",
    };
  },
  methods: {
    //format date
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },
  async created() {
    await axios
      .get("/users/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.user = res.data.user;
          if (this.user.role != "A") {
            this.$router.push("/");
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
  },
  async created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    const responseUserInfor = await axios.get("/users/info", {
      headers: { token: localStorage.getItem("token") },
    });
    const userInfor = responseUserInfor.data.user;
    this.user = userInfor;
    console.log(this.user.userId);
    const responseData = await axios.get("/gigs/index", {
      params: {
        page: this.selectedPage,
        search: this.searchOrder,
        filterBy1: "",
        filterBy2: "",
        filterBy3: ""
      },
    });
    const gigs = responseData.data.gig;
    console.log(gigs)
    this.gigs = gigs;
    const paging = responseData.data.pagination;
    this.pagination = paging;
    console.log(this.pagination);
    // const responseOrderReqData = await axios.get("/orders/getOrderRequest", {
    //   params: {
    //     user: this.user,
    //     requestType: this.user.role == "C" ? "Extend" : "Cancel",
    //     status: "Pending",
    //   },
    // });
    // const totalNewRequest = responseOrderReqData.data.pagination;
    // this.totalOrderRequest = totalNewRequest.totalRow;
  },
};
</script>
  
  <style>
.container-managigad {
  margin-left: 17%;
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
.order_search {
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
.order_table .table th {
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
.order_table .table th {
  font-weight: 600;
  color: #a8a7a7;
  font-size: 13px;
}
</style>