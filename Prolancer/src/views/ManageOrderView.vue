<template>
  <div>
    <Header v-if="currentAccountInfo.Role == 'C'"></Header>
    <HeaderSell v-else-if="currentAccountInfo.Role == 'F'"></HeaderSell>
    <HeaderAdmin v-else></HeaderAdmin>
    <div :class="{ row: currentAccountInfo.Role == 'A' }">
      <div v-if="currentAccountInfo.Role == 'A'" class="col-md-2">
        <Sidebar></Sidebar>
      </div>
      <div
        class="container"
        :class="{ 'col-md-9 ms-0': currentAccountInfo.Role == 'A' }"
      >
        <div class="manage_title row">
          <div class="col-md-3"><h3>Manage Orders</h3></div>
          <div class="col-md-3 search_bar">
            <div class="input-group rounded">
              <input
                type="search"
                class="form-control order_search"
                placeholder="Search Order ..."
                aria-label="Search"
                aria-describedby="search-addon"
                v-model="searchOrder"
              />

              <!-- <router-link
              :to="{
                path: '/manageorder',
                query: {
                  search: searchOrder,
                  user: user,
                  status: status,
                },
              }"
              class="text-decoration-none"
            > -->
              <span
                class="input-group-text border-0 icon_search"
                id="search-addon"
              >
                <i class="fas fa-search"> </i>
              </span>
              <!-- </router-link> -->
            </div>
          </div>
        </div>
        <div class="order_status row">
          <div
            class="col-md-2 status_item"
            :class="{ status_item_active: this.status == 'Active' }"
          >
            <router-link
              @click="
                (this.status = 'Active'),
                  (selectedPage = '1'),
                  getOrder(selectedPage)
              "
              :to="{
                path: '#',
              }"
              class="text-decoration-none"
            >
              <h6>
                Active
                <span
                  v-if="this.status == 'Active'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                >
              </h6></router-link
            >
          </div>
          <!-- <div class="col-md-2 status_item"><h6>New</h6></div> -->

          <div
            class="col-md-2 status_item"
            :class="{ status_item_active: this.status == 'Delivered' }"
          >
            <router-link
              @click="
                (this.status = 'Delivered'),
                  (selectedPage = '1'),
                  getOrder(selectedPage)
              "
              :to="{
                path: '#',
              }"
              class="text-decoration-none"
            >
              <h6>
                Delivered<span
                  v-if="this.status == 'Delivered'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                >
              </h6>
            </router-link>
          </div>
          <div
            class="col-md-2 status_item"
            :class="{ status_item_active: this.status == 'Completed' }"
          >
            <router-link
              @click="
                (this.status = 'Completed'),
                  (selectedPage = '1'),
                  getOrder(selectedPage)
              "
              :to="{
                path: '#',
              }"
              class="text-decoration-none"
            >
              <h6>
                Completed<span
                  v-if="this.status == 'Completed'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                >
              </h6>
            </router-link>
          </div>
          <div
            class="col-md-2 status_item"
            :class="{ status_item_active: this.status == 'Cancelled' }"
          >
            <router-link
              @click="
                (this.status = 'Cancelled'),
                  (selectedPage = '1'),
                  getOrder(selectedPage)
              "
              :to="{
                path: '#',
              }"
              class="text-decoration-none"
            >
              <h6>
                Cancelled<span
                  v-if="this.status == 'Cancelled'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                >
              </h6>
            </router-link>
          </div>
          <div
            class="col-md-2 status_item"
            :class="{ status_item_active: this.status == 'OrderRequest' }"
            style="margin-left: 40%"
          >
            <router-link
              :to="{
                path: '/manageChangeRequest',
              }"
              class="text-decoration-none"
            >
              <h6 class="position-relative">
                <span
                  class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                  style="left: 120%"
                >
                  +
                  <span class="visually-hidden">unread messages</span>
                </span>
                Order Change Request
              </h6>
            </router-link>
          </div>
        </div>
        <div
          class="order_table"
          :style="{ display: isOrderList ? 'block' : 'none' }"
        >
          <table class="table align-middle mb-0 bg-white">
            <thead class="bg-light">
              <tr style="border-bottom: 2px solid #dcd8d8">
                <th>ID</th>
                <th
                  class="th_user"
                  v-if="
                    currentAccountInfo.Role == 'F' ||
                    currentAccountInfo.Role == 'A'
                  "
                >
                  HIRER
                </th>
                <th
                  class="th_user"
                  v-if="
                    currentAccountInfo.Role == 'C' ||
                    currentAccountInfo.Role == 'A'
                  "
                >
                  FREELANCER
                </th>
                <th class="th_gig">JOB DESCRIPTION</th>
                <th>DUE ON</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody v-if="orders.length >= 1">
              <tr v-for="(order, index) in filterOrder" :key="index">
                <td>{{ order.OrderID }}</td>
                <td
                  class="td_user"
                  v-if="
                    currentAccountInfo.Role == 'F' ||
                    currentAccountInfo.Role == 'A'
                  "
                >
                  <div class="d-flex align-items-center">
                    <img
                      :src="order.CustomerProfilePicture"
                      alt=""
                      style="width: 45px; height: 45px"
                      class="rounded-circle"
                    />
                    <div class="ms-3">
                      <p class="fw-bold mb-1">
                        {{
                          order.CompanyName 
                        }}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  class="td_user"
                  v-if="
                    currentAccountInfo.Role == 'C' ||
                    currentAccountInfo.Role == 'A'
                  "
                >
                  <div class="d-flex align-items-center">
                    <img
                      :src="order.FreelancerProfilePicture"
                      alt=""
                      style="width: 45px; height: 45px"
                      class="rounded-circle"
                    />
                    <div class="ms-3">
                      <p class="fw-bold mb-1">
                        {{
                          order.FreelancerFirstName +
                          " " +
                          order.FreelancerLastName
                        }}
                      </p>
                    </div>
                  </div>
                </td>

                <td class="td_gig">
                  <div class="align-items-center JobDescription">
                    <p class="fw-normal mb-1">
                      {{ order.JobDescription }}
                    </p>
                  </div>
                </td>

                <td class="td_dueon">
                  {{ moment(order.EndAt).format("MMMM Do") }}
                </td>

                <td class="td_price">
                  ${{
                    order.Price * order.TotalEstimation +
                    order.Price * order.TotalEstimation * 0.1
                  }}
                </td>
                <td class="td_status">
                  <span
                    v-if="order.Status == 'Active'"
                    class="badge bg-primary rounded-pill d-inline"
                  >
                    In Progress</span
                  >
                  <span
                    v-if="order.Status == 'Late'"
                    class="badge rounded-pill bg-danger"
                    >Late</span
                  >
                  <span
                    v-if="order.Status == 'Delivered'"
                    class="badge rounded-pill bg-info"
                    >Delivered</span
                  >
                  <span
                    v-if="order.Status == 'Completed'"
                    class="badge rounded-pill bg-success d-inline"
                  >
                    Completed</span
                  >
                  <span
                    v-if="order.Status == 'Cancelled'"
                    class="badge rounded-pill bg-secondary d-inline"
                    >Cancelled</span
                  >
                </td>

                <td>
                  <i
                    v-if="currentAccountInfo.Role == 'A'"
                    @click="
                      (isshowModal = !isshowModal),
                        (slectedOrderID = order.OrderID)
                    "
                    class="bi bi-gear-fill"
                    style="cursor: pointer"
                  ></i>
                  <router-link
                    :to="{
                      path: '/vieworderdetail/' + order.OrderID,
                    }"
                    class="text-decoration-none text-dark"
                  >
                    <i class="bi bi-eye-fill ms-2"></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="orders.length == 0 || filterOrder.length == 0"
            class="text-center"
          >
            <h5>Order Not Found</h5>
          </div>

          <div
            class="pagination"
            v-if="orders.length > 0 && filterOrder.length > 0"
          >
            <router-link
              v-if="pagination.page - 1 == 0"
              class="page-number"
              :disabled="true"
              :to="{
                path: '#',
              }"
              ><i class="bi bi-arrow-left text-black-50"></i
            ></router-link>
            <router-link
              v-if="pagination.page - 1 > 0"
              class="page-number"
              :disabled="true"
              @click="getOrder(pagination.page - 1)"
              :to="{
                path: '#',
              }"
              ><i class="bi bi-arrow-left"></i
            ></router-link>
            <router-link
              :to="{
                path: '#',
              }"
              class="page-number"
              @click="getOrder(index)"
              v-for="index in pagination.totalPage"
              :key="index"
              :disabled="true"
              :class="{ active: index == pagination.page }"
              ><span>{{ index }}</span>
            </router-link>

            <router-link
              v-if="pagination.page + 1 <= pagination.totalPage"
              class="page-number"
              :disabled="true"
              @click="getOrder(pagination.page + 1)"
              :to="{
                path: '#',
              }"
              ><i class="bi bi-arrow-right"></i
            ></router-link>
            <router-link
              v-if="pagination.page == pagination.totalPage"
              class="page-number"
              :disabled="true"
              :to="{
                path: '#',
              }"
              ><i class="bi bi-arrow-right text-black-50"></i
            ></router-link>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        class="modal fade show"
        style="display: block; background-color: #000000ad; padding-top: 10%"
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
                    <span>In Progress</span>
                  </option>
                  <option class="" value="Late"><span>Late</span></option>
                  <option class="" value="Delivered">
                    <span>Delivered</span>
                  </option>
                  <option class="" value="Completed">
                    <span>Completed</span>
                  </option>

                  <option class="" value="Cancelled">
                    <span>Cancelled</span>
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
                  changeOrderStatus(selectedStatus, slectedOrderID),
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
  </div>
</template>
  
  <script>
import Header from "../components/Header.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";
import axios from "axios";
var moment = require("moment");
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import HeaderSell from "../components/HeaderSeller.vue";
import Sidebar from "../components/Sidebar.vue";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "CreateOrderDetailPage",
  components: {
    Header,
    HeaderAdmin,
    HeaderSell,
    Sidebar,
  },
  data() {
    return {
      currentAccountInfo: [],
      orders: [],
      pagination: [],
      moment: moment,
      searchOrder: "",
      selectedPage: 1,
      status: "Active",
      isshowModal: false,
      selectedStatus: "Active",
      slectedOrderID: "",
      isOrderList: true,
      messageModal: "",
    };
  },
  async created() {
    await this.onUpdateAccountInfo();
    console.log(
      "🚀 ~ file: CreateOrderDetailView.vue:369 ~ onUpdateAccountInfo ~ user:",
      JSON.stringify(this.currentAccountInfo)
    );
    await this.getOrder(1);
  },

  methods: {
    async getOrder(user, currentPage) {
      const responseData = await axios
        .get("/orders/index", {
          params: {
            page: currentPage,
            user: this.currentAccountInfo,
            status: this.status,
          },
        })
        .then((response) => {
          console.log(response.data);
          const orders = response.data.order;
          this.orders = orders;
          const paging = response.data.pagination;
          this.pagination = paging;
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });
    },
    async changeOrderStatus(status, orderID) {
      const data = await axios.put("/orders/updateStatus", {
        status: status,
        orderID: orderID,
      });
      console.log(data);
      if (data.data.message == "Change Status Success") {
        toast.success("Change Order Status Successfully!", {
          theme: "colored",
          autoClose: 2000,
          onClose: () => location.reload(),
        });
      } else {
        toast.warn("Change Order Status Failed!", { autoClose: 2000 });
      }
    },
    async onUpdateAccountInfo() {
      let token = localStorage.getItem("token");
      //account is not authorized
      if (!token) {
        this.$router.push("/login");
      } else {
        let decoded = VueJwtDecode.decode(token);
        console.log(decoded);
        if (decoded.role === "F") {
          await axios
            .get("/freelancers/info", {
              headers: { token: localStorage.getItem("token") },
            })
            .then(
              (res) => {
                this.currentAccountInfo = res.data.freelancer;
                console.log(this.currentAccountInfo);
              },
              (err) => {
                console.log(err.response);
              }
            );
        } else if (decoded.role === "C") {
          await axios
            .get("/customers/info", {
              headers: { token: localStorage.getItem("token") },
            })
            .then(
              (res) => {
                this.currentAccountInfo = res.data.customer;
                console.log(this.currentAccountInfo);
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
  },
  computed: {
    filterOrder: function () {
      console.log("filterOrder computed is called");

      if (this.searchOrder != "") {
        if ((this.currentAccountInfo.Role == "F")) {

          var filterOrder = this.orders.filter((order) => {
            // Add your filtering logic here based on searchOrder and sortBy
            // For example, let's assume you want to filter by gig name
            return (
              order.CustomerFirstName.toLowerCase().includes(
                this.searchOrder.toLowerCase()
              ) ||
              order.CustomerLastName.toLowerCase().includes(
                this.searchOrder.toLowerCase()
              )
            );
          });
        }else if(this.currentAccountInfo.Role == "C"){
          console.log("Customer");
          var filterOrder = this.orders.filter((order) => {
            // Add your filtering logic here based on searchOrder and sortBy
            // For example, let's assume you want to filter by gig name
            return (
              order.FreelancerFirstName.toLowerCase().includes(
                this.searchOrder.toLowerCase()
              ) ||
              order.FreelancerLastName.toLowerCase().includes(
                this.searchOrder.toLowerCase()
              )
            );
          });
        }else{
          var filterOrder = this.orders.filter((order) => {
            // Add your filtering logic here based on searchOrder and sortBy
            // For example, let's assume you want to filter by gig name
            return (
              order.FreelancerFirstName.toLowerCase().includes(
                this.searchOrder.toLowerCase()
              ) ||
              order.FreelancerLastName.toLowerCase().includes(
                this.searchOrder.toLowerCase()
              ) || order.FreelancerFirstName.toLowerCase().includes(
                this.searchOrder.toLowerCase()
              ) ||
              order.FreelancerLastName.toLowerCase().includes(
                this.searchOrder.toLowerCase()
              )
            );
          });
        }

        console.log("Search By " + this.searchOrder);
        return filterOrder;
      } else {
        console.log("Not  serch");
        return this.orders;
      }
    },
  },
};
</script>
  
  <style>
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
.input-group-text {
  background-color: white;
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
.order_table .table th,
.order_request_table .table th {
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
.order_table .table th,
.order_request_table .table th {
  font-weight: 600;
  color: #a8a7a7;
  font-size: 13px;
  background-color: #f9f9f9;
}

.order_request_table .decline_button {
  border: 1px solid #0dcaf0;
}

.JobDescription {
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
</style>