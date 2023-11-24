<template>
  <div>
    <Header v-if="user.role == 'C'"></Header>
    <HeaderSell v-else></HeaderSell>
    <div :class="{ row: user.role == 'A' }">
      <div v-if="user.role == 'A'" :class="{ 'col-md-2': user.role == 'A' }">
        <Sidebar></Sidebar>
      </div>
      <div class="container" :class="{ 'col-md-9': user.role == 'A' }">
        <div class="manage_title row">
          <div class="col-md-4"><h3>Manage Order Request</h3></div>
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
        <div class="major_head row">
          <div
            class="col-md-2 major_head_item"
            :class="{
              major_head_item_active: this.majorItem == 1,
            }"
            @click="
              ((majorItem = 1), (status = 'Pending')), getOrderRequest(user, 1)
            "
          >
            <router-link
              :to="{
                path: '#',
              }"
              class="text-decoration-none"
              disabled
            >
              <h6>
                Pending
                <span
                  v-if="this.status == 'Pending'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                >
              </h6>
            </router-link>
          </div>

          <div
            class="col-md-2 major_head_item"
            :class="{
              major_head_item_active: this.majorItem == 2,
            }"
            @click="
              ((majorItem = 2), (status = 'Accept')), getOrderRequest(user, 1)
            "
          >
            <router-link
              :to="{
                path: '#',
              }"
              class="text-decoration-none"
              disabled
            >
              <h6>Accept<span
                  v-if="this.status == 'Accept'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                ></h6>
            </router-link>
          </div>

          <div
            class="col-md-2 major_head_item"
            :class="{
              major_head_item_active: this.majorItem == 3,
            }"
            @click="
              ((majorItem = 3), (status = 'Reject')), getOrderRequest(user, 1)
            "
          >
            <router-link
              :to="{
                path: '#',
              }"
              class="text-decoration-none"
              disabled
            >
              <h6>Reject<span
                  v-if="this.status == 'Reject'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                ></h6>
            </router-link>
          </div>
          <!-- <div class="col-md-2 status_item"><h6>New</h6></div> -->
        </div>
        <div class="base_table">
          <table class="table align-middle mb-0 bg-white">
            <thead class="bg-light">
              <tr style="border-bottom: 2px solid #dcd8d8">
                <th class="w-10">ID</th>
                <th style="width: 20%">CUSTOMER</th>
                <!-- <th v-for="childSkill in childSkills" :key="childSkill.SkillID">
                    {{ childSkill.Skill_Name }}
                  </th> -->
                <th class="w-25">Job Description</th>
                <th>Estimation</th>

                <th>Start On</th>
                <th>End At</th>
                <th>Status</th>

                <th>Action</th>

                <!-- <th>Action</th> -->
              </tr>
            </thead>

            <tbody>
              <tr v-for="(orderRequest, index) in orderRequests" :key="index">
                <td>
                  {{ orderRequest.OrderRequestID }}
                </td>
                <td>
                  <img
                    :src="orderRequest.Profile_Picture"
                    alt=""
                    style="width: 35px; height: 35px"
                    class="rounded-circle"
                  />
                  {{ orderRequest.First_Name + " " + orderRequest.Last_Name }}
                </td>
                <td>
                  <div class="JobDescription">
                    {{ orderRequest.JobDescription }}
                  </div>
                </td>
                <td>
                  {{ orderRequest.TotalEstimation }}
                </td>
                <td>
                  {{
                    moment(orderRequest.StartFrom).format("yyyy-MM-DD hh:mm A")
                  }}
                </td>
                <td>
                  {{ moment(orderRequest.EndAt).format("yyyy-MM-DD hh:mm A") }}
                </td>
                <td>
                  <div v-if="orderRequest.Status == 'Pending'">
                    <span
                      class="status text-warning"
                      style="
                        font-size: 40px;
                        margin: 2px 2px 0 0;
                        display: inline-block;
                        vertical-align: middle;
                        line-height: 10px;
                      "
                      >•</span
                    ><span>Pending</span>
                  </div>
                  <div v-if="orderRequest.Status == 'Accept'">
                    <span
                      class="status text-success"
                      style="
                        font-size: 40px;
                        margin: 2px 2px 0 0;
                        display: inline-block;
                        vertical-align: middle;
                        line-height: 10px;
                      "
                      >•</span
                    ><span>Accept</span>
                  </div>

                  <div v-if="orderRequest.Status == 'Reject'">
                    <span
                      class="status text-secondary"
                      style="
                        font-size: 40px;
                        margin: 2px 2px 0 0;
                        display: inline-block;
                        vertical-align: middle;
                        line-height: 10px;
                      "
                      >•</span
                    ><span>Reject</span>
                  </div>
                </td>
                <td>
                  <!-- v-if="user.role == 'C'" -->
                  <div>
                    <span
                      class="badge rounded-pill bg-info text-light me-1"
                      style="cursor: pointer"
                      @click="
                        (messageModal = 'accept this order request'),
                          (isshowConfirmRequestModal =
                            !isshowConfirmRequestModal),
                          (action = 'Accept'),
                          (selectedOrderRequestID = orderRequest.OrderRequestID)
                      "
                      >Accept</span
                    >

                    <span
                      class="badge rounded-pill text-info decline_button"
                      style="cursor: pointer"
                      @click="
                        (messageModal = 'decline'),
                          (isshowConfirmRequestModal =
                            !isshowConfirmRequestModal),
                          (action = 'Reject'),
                          (selectedOrderRequestID = orderRequest.OrderRequestID)
                      "
                      >Decline</span
                    >
                  </div>
                  <!-- <div v-else>
                        None
                  </div> -->
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="orderRequests.length == 0" class="text-center">
            <h5>Not Found</h5>
          </div>
          <div class="pagination" v-if="orderRequests.length > 0">
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
              @click="getOrderRequest(user, pagination.page - 1)"
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
              @click="getOrderRequest(user, index)"
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
              @click="getOrderRequest(user, pagination.page + 1)"
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
          <div class="confirm_request">
            <div
              class="modal fade show"
              style="
                display: block;
                background-color: #000000ad;
                padding-top: 10%;
              "
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
                      @click="
                        isshowConfirmRequestModal = !isshowConfirmRequestModal
                      "
                      aria-label="Close"
                      style="color: white"
                    ></button>
                  </div>
                  <div class="modal-body" v-if="action == 'Accept'">
                    <div class="row">
                      <div>
                        <p class="modal-title">
                          Do you really want to {{ messageModal }}
                        </p>
                        <p class="modal-title">
                          This process cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="modal-body" v-else>
                    <div class="row">
                      <div>
                        <p class="modal-title">
                          Do you really want to {{ messageModal }}
                        </p>
                      </div>
                      <div>
                        <p class="modal-title">Want to say something</p>
                        <select
                          v-model="selectedReason"
                          style="margin-bottom: 15px"
                          class="text-center py-2 w-100"
                        >
                          <option
                            class=""
                            value="Due to prior commitments and deadlines, I won't be able to allocate the necessary time to meet your project requirements."
                          >
                            <span
                              >Due to prior commitments and deadlines, I won't
                              be able to allocate the necessary time to meet
                              your project requirements.</span
                            >
                          </option>
                          <option
                            class=""
                            value="I currently have a full workload and am unable to take on additional projects at this time."
                          >
                            <span
                              >I currently have a full workload and am unable to
                              take on additional projects at this time.</span
                            >
                          </option>
                          <option
                            class=""
                            value="Due to unforeseen personal or health-related circumstances, I am currently unable to take on projects."
                          >
                            <span
                              >Due to unforeseen personal or health-related
                              circumstances, I am currently unable to take on
                              projects.</span
                            >
                          </option>
                          <option
                            class=""
                            value="After reviewing the project details, I believe that the project is not suitable and I cannot work effectively on this project."
                          >
                            <span
                              >After reviewing the project details, I believe
                              that the project is not suitable and I cannot work
                              effectively on this project.</span
                            >
                          </option>
                        </select>
                        <p class="modal-title">
                          This process cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer justify-content-center">
                    <a
                      type="button"
                      class="btn btn-info waves-effect waves-light text-white"
                      @click="
                        updateOrderRequestStatus(
                          action,
                          selectedOrderRequestID,
                          selectedReason
                        ),
                          (isshowConfirmRequestModal =
                            !isshowConfirmRequestModal)
                      "
                      >Save</a
                    >
                    <a
                      type="button"
                      class="btn btn-outline-info waves-effect"
                      @click="
                        isshowConfirmRequestModal = !isshowConfirmRequestModal
                      "
                      data-dismiss="modal"
                      >Cancel</a
                    >
                  </div>
                </div>
              </div>
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
      user: [],
      pagination: [],
      orderRequests: [],
      moment: moment,
      selectedPage: 1,
      majorItem: 1,
      isshowModal: false,
      selectedStatus: "Active",
      messageModal: "",
      status: "Pending",
      isshowConfirmRequestModal: false,
      action: "",
      selectedOrderRequestID: "",
      selectedReason: "I currently have a full workload and am unable to take on additional projects at this time.",
    };
  },
  async created() {
    // if (localStorage.getItem("token") === null) {
    //   this.$router.push("/login");
    // }
    // const responseUserInfor = await axios.get("/users/info", {
    //   headers: { token: localStorage.getItem("token") },
    // });
    // const userInfor = responseUserInfor.data.user;
    // this.user = userInfor;

    this.getOrderRequest("user", 1);
  },
  methods: {
    async getOrderRequest(user, currentPage) {
      const responseData = await axios
        .get("/orderrequest/getOrderRequest", {
          params: {
            page: currentPage,
            user: { userId: 4, role: "C" },
            status: this.status,
          },
        })
        .then((response) => {
          console.log(response.data);
          const orderRequests = response.data.orderRequest;
          this.orderRequests = orderRequests;
          const paging = response.data.pagination;
          this.pagination = paging;
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });
    },
    async updateOrderRequestStatus(status, orderRequestID, selectedReason) {
      if (status == "Accept") {
        try {
          const responseStep1 = await axios.put(
            "/orderrequest/changeOrderRequestStatus",
            {
              status: status,
              orderRequestID: orderRequestID,
            }
          );
          if (responseStep1) {
            const responseStep2 = await axios.post("/orders/createOrder", {
              order: { OrderRequestID: orderRequestID },
            });
            if (responseStep2) {
              toast.success("Successfully!", {
                theme: "colored",
                autoClose: 2000,
                onClose: () => location.reload(),
              });
            }
          }
        } catch (error) {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        }
      } else {
        const responseStep1 = await axios.put(
            "/orderrequest/changeOrderRequestStatus",
            {
              status: status,
              orderRequestID: orderRequestID,
            }
          );
          if (responseStep1) {
            const responseStep2 = await axios.put("/orderrequest/updateOrderRequestNote", {
               OrderRequestID: orderRequestID ,
               Note: selectedReason
            });
            if (responseStep2) {
              toast.success("Successfully!", {
                theme: "colored",
                autoClose: 2000,
                onClose: () => location.reload(),
              });
            }
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
.major_head {
  padding-bottom: 10px;
  border-bottom: 1px solid #dcd8d8;
}
.major_head {
  margin: 20px 0;
}

.major_head .major_head_item {
  text-align: left;
  width: fit-content;
  text-transform: uppercase;
}
.major_head .major_head_item h6 {
  font-weight: 500;
  color: #9f9fa0;

  font-size: 15px;
}

.major_head .major_head_item_active h6 {
  color: #303032;
}
.manage_title h3 {
  text-align: left;
  font-weight: 600;
}
.base_table .table th,
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
.base_table .table th,
.order_request_table .table th {
  font-weight: 600;
  color: #a8a7a7;
  font-size: 13px;
  background-color: #f9f9f9;
}

.decline_button {
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