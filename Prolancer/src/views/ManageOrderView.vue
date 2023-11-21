<template>
  <div >
    <Header v-if="user.role == 'C'"></Header>
    <HeaderSell v-else-if="user.role == 'F'"></HeaderSell>
    <header-admin v-else></header-admin>
    <div :class="{'row' : user.role == 'A'}">
      <div v-if="user.role == 'A'" :class="{'col-md-2' : user.role == 'A'}" >
      <Sidebar ></Sidebar>
      </div>
      <div class="container " :class="{'col-md-9' : user.role == 'A'}">
      <div class="manage_title row">
        <div class="col-md-3"><h3>Manage Orders</h3></div>
          <div class="col-md-3 search_bar" v-if="isOrderList">
            <div class="input-group rounded">
              <input
              type="search"
              class="form-control order_search"
              placeholder="Search Order History ..."
              aria-label="Search"
              aria-describedby="search-addon"
              v-model="searchOrder"  
              />

            <router-link
              :to="{
                path: '/manageorder',
                query: {
                  search: searchOrder,
                  user: user,
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
            @click="(this.status = 'Active'), (selectedPage = '1'), getOrder('user',selectedPage)"
            :to="{
              path: '#',           
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
        <!-- <div class="col-md-2 status_item"><h6>New</h6></div> -->

        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Late' }"
         
        >
          <router-link
            @click="(this.status = 'Late'), (selectedPage = '1'), getOrder('user',selectedPage)"
            :to="{
              path: '#',
            
            }"
            class="text-decoration-none"


          >
            <h6>
              Late<span
                v-if="this.status == 'Late'"
                class="badge bg-secondary"
                >{{ pagination.totalRow }}</span
              >
            </h6>
          </router-link>
        </div>
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Delivered' }"
        >
          <router-link
            @click="(this.status = 'Delivered'), (selectedPage = '1'), getOrder('user',selectedPage)"
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
            @click="(this.status = 'Completed'), (selectedPage = '1'), getOrder('user',selectedPage)"
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
            @click="(this.status = 'Cancelled'), (selectedPage = '1'), getOrder('user',selectedPage)"
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
          <h6 class="position-relative">
            <span
              class="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style="left: 120%"
            >
              {{ totalOrderRequest }}+
              <span class="visually-hidden">unread messages</span>
            </span>
            Change Request
          </h6>
        </div>
      </div>
      <div
        class="order_table"
        :style="{ display: isOrderList ? 'block' : 'none' }"
      >
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr style="border-bottom: 2px solid #dcd8d8">
              <th >
                ID
              </th>
              <th class="th_user">
                ORDER FROM
              </th>

              <th class="th_gig">JOB DESCRIPTION</th>
              <th>DUE ON</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody v-if="orders.length >= 1">
            <tr v-for="(order, index) in orders" :key="index">

              <td  >{{ order.OrderID }}</td>
              <td class="td_user" >
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
                        order.CustomerFirstName + " " + order.CustomerLastName
                      }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="td_user" v-if="user.role == 'A'">
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
                <div class=" align-items-center JobDescription">
                  <p class="fw-normal mb-1 ">
                    {{ order.JobDescription }}
                  </p>
                </div>
              </td>

              <td class="td_dueon">
                {{
                  moment(order.EndAt)
                    
                    .format("MMMM Do")
                }}
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
                  @click="
                    (isshowModal = !isshowModal),
                      (slectedOrderID = order.OrderID)
                  "
                  class="bi bi-gear-fill"
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
        <div v-if="orders.length == 0" class="text-center">
          <h5>Order Not Found</h5>
        </div>

        <div class="pagination" v-if="orders.length > 0">
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
              @click="getOrder(user, pagination.page - 1)"
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
              @click="getOrder(user, index)"
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
              @click="getOrder(user, pagination.page + 1)"
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
                @click="changeOrderStatus(selectedStatus, slectedOrderID),isshowModal = !isshowModal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm_request">
      <div
        class="modal fade show"
        style="display: block; background-color: #000000ad; padding-top: 10%"
        v-if="isshowConfirmRequestModal"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div
              class="modal-header text-end"
              style="background-color: #33b5e5; color: white"
            >
              <h5 class="modal-title" style="text-align: center">
                Are you sure?
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="isshowConfirmRequestModal = !isshowConfirmRequestModal"
                aria-label="Close"
                style="color: white"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div>
                  <p class="modal-title">
                    Do you really want to {{ messageModal }} these request?
                  </p>
                  <p class="modal-title">This process cannot be undone.</p>
                </div>
              </div>
            </div>

            <div class="modal-footer justify-content-center">
              <a
                type="button"
                class="btn btn-info waves-effect waves-light text-white"
                @click="
                  acceptRequest(selectedRequest),
                    (isshowConfirmRequestModal = !isshowConfirmRequestModal)
                "
                >Save</a
              >
              <a
                type="button"
                class="btn btn-outline-info waves-effect"
                @click="isshowConfirmRequestModal = !isshowConfirmRequestModal"
                data-dismiss="modal"
                >Cancel</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Header from "../components/Header.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue"
import axios from "axios";
var moment = require("moment");
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import HeaderSell from "../components/HeaderSeller.vue"
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "CreateOrderDetailPage",
  components: {
    Header,
    HeaderAdmin,
    HeaderSell,
    Sidebar
  },
  data() {
    return {
      user: [],
      orders: [],
      pagination: [],
      moment: moment,
      searchOrder: "",
      selectedPage: 1,
      status: "Active",
      isshowModal: false,
      selectedStatus: "Active",
      slectedOrderID: "",
      isOrderRequest: false,
      isOrderList: true,
      orderRequests: [],
      requestTypeStatus: "Cancel",
      isshowConfirmRequestModal: false,
      messageModal: "",
      selectedRequest: {},
      totalOrderRequest: 0,
    };
  },
  async created() {
    this.getOrder("user", 1);
  },
  async beforeRouteUpdate() {
    console.log("Run Here");
    const responseDateWithPage = await axios.get("/orders/index", {
      params: {
        page: this.selectedPage,
        search: this.searchOrder,
        user: this.user,
        status: this.status,
      },
    });

    const orders = responseDateWithPage.data.order;
    this.orders = orders;

    const searchQuery = responseDateWithPage.data.searchQuery;
    this.searchOrder = searchQuery.search;
    const paging = responseDateWithPage.data.pagination;
    this.pagination = paging;
    console.log("this.selectedPage " + (this.pagination.page + 1));
  },
  methods: {
    async getOrder(user, currentPage) {
      const responseData = await axios
        .get("/orders/index", {
          params: {
            page: currentPage,
            user: { userId: 4, role: "A" },
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

    async acceptRequest(selectedRequest) {
      if (selectedRequest.Request_Type == "Cancel") {
        const changeOrderStatusRes = await axios.put("/orders/updateStatus", {
          status: "Cancelled",
          orderID: selectedRequest.OrderID,
        });
        if (changeOrderStatusRes.data.message == "Change Status Success") {
          const changeOrderRequestStatusRes = await axios.put(
            "/orders/updateOrderRequestStatus",
            {
              status: "Accept",
              orderRequestID: selectedRequest.OrderRequestID,
            }
          );

          if (
            changeOrderRequestStatusRes.data.message ==
            "Change Order Request Status Success"
          ) {
            toast.success("Accept Request Status Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.reload(),
            });
          } else {
            toast.warn("Accept Request Status Faild!", { autoClose: 2000 });
          }
        } else {
          toast.warn("Request Faild!", { autoClose: 2000 });
        }
      } else {
        alert("Extend :" + selectedRequest.Request_Action);
        const updateOrderExtendDayRes = await axios.put(
          "/orders/updateOrderExtendDay",
          {
            extendDay: selectedRequest.Request_Action,
            orderID: selectedRequest.OrderID,
          }
        );
        if (
          updateOrderExtendDayRes.data.message == "Update Extend Day Success"
        ) {
          const changeOrderRequestStatusRes = await axios.put(
            "/orders/updateOrderRequestStatus",
            {
              status: "Accept",
              orderRequestID: selectedRequest.OrderRequestID,
            }
          );

          if (
            changeOrderRequestStatusRes.data.message ==
            "Change Order Request Status Success"
          ) {
            toast.success("Accept Request Status Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.reload(),
            });
          } else {
            toast.warn("Accept Request Status Faild!", { autoClose: 2000 });
          }
        } else {
          toast.warn("Request Faild!", { autoClose: 2000 });
        }
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