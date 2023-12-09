<template>
  <div>
    <Header v-if="currentAccountInfo.Role == 'C'"></Header>
    <HeaderSell v-else-if="currentAccountInfo.Role == 'F'"></HeaderSell>
    <header-admin v-else></header-admin>
    <div :class="{ row: currentAccountInfo.Role == 'A' }">
      <div v-if="currentAccountInfo.Role == 'A'" class="col-md-2">
        <Sidebar></Sidebar>
      </div>
      <div
        class="container"
        :class="{ 'col-md-9 ms-0': currentAccountInfo.Role == 'A' }"
      >
        <div class="manage_title row">
          <div class="col-md-4"><h3>Manage Change Request</h3></div>
          <div class="text-start" v-if="currentAccountInfo.Role != 'A'">
            <router-link :to="'/manageOrder'">
              <i
                class="fa-solid fa-arrow-left-long text-danger"
                style="cursor: pointer"
              ></i>
            </router-link>
          </div>
          <!-- <div class="col-md-3 search_bar" >
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
          </div> -->
        </div>
        <div class="major_head row">
          <div
            class="col-md-2 major_head_item"
            :class="{
              major_head_item_active: this.majorItem == 1,
            }"
            @click="
              ((majorItem = 1), (requestType = 'Cancel')), getChangeRequest(1)
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
                Cancel
                <span
                  v-if="this.requestType == 'Cancel'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                >
              </h6>
            </router-link>
          </div>

          <div
            v-if="currentAccountInfo.Role != 'A'"
            class="col-md-2 major_head_item"
            :class="{
              major_head_item_active: this.majorItem == 2,
            }"
            @click="
              ((majorItem = 2), (requestType = 'Extend')), getChangeRequest(1)
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
                Extend
                <span
                  v-if="this.requestType == 'Extend'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                >
              </h6>
            </router-link>
          </div>

          <!-- <div class="col-md-2 status_item"><h6>New</h6></div> -->
        </div>
        <div class="base_table">
          <table class="table align-middle mb-0 bg-white">
            <thead class="bg-light">
              <tr style="border-bottom: 2px solid #dcd8d8">
                <th class="w-10">ON ORDER ID</th>
                <th style="width: 10%" v-if="currentAccountInfo.Role == 'A'">
                  CREATE BY
                </th>
                <!-- <th v-for="childSkill in childSkills" :key="childSkill.SkillID">
                      {{ childSkill.Skill_Name }}
                    </th> -->
                <th style="width: 20%">TITLE</th>
                <th class="w-25">NOTE</th>

                <th>CREATE ON</th>
                <th v-if="requestType == 'Extend'">EXTEND</th>
                <th>STATUS</th>

                <th>ACTION</th>

                <!-- <th>Action</th> -->
              </tr>
            </thead>

            <tbody>
              <tr v-for="(changeRequest, index) in changeRequests" :key="index">
                <td>
                  {{ changeRequest.OrderID }}
                </td>
                <td v-if="currentAccountInfo.Role == 'A'">
                  {{ changeRequest.Username }}
                  <!-- <img
                    :src="orderRequest.Profile_Picture"
                    alt=""
                    style="width: 35px; height: 35px"
                    class="rounded-circle"
                  />
                  {{ orderRequest.First_Name + " " + orderRequest.Last_Name }} -->
                </td>
                <td>
                  <div class="scrollable-row">
                    {{ changeRequest.Request_Title }}
                  </div>
                </td>
                <td>
                  <div class="scrollable-row">
                    {{ changeRequest.Request_Description }}
                  </div>
                </td>
                <td>
                  {{
                    moment(changeRequest.Create_At).format("yyyy-MM-DD hh:mm A")
                  }}
                </td>
                <td v-if="requestType == 'Extend'">
                  {{ changeRequest.Request_Extend_Day }} day(s)
                </td>
                <td>
                  <div v-if="changeRequest.Status == 'Pending'">
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
                  <div v-if="changeRequest.Status == 'Accept'">
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

                  <div v-if="changeRequest.Status == 'Reject'">
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
                  <div v-if="currentAccountInfo.Role == 'C'">
                    <div
                      v-if="
                        changeRequest.Status == 'Pending' &&
                        requestType == 'Extend'
                      "
                    >
                      <span
                        class="badge rounded-pill bg-info text-light me-1"
                        style="cursor: pointer"
                        @click="
                          (messageModal = 'accept'),
                            (isshowConfirmRequestModal =
                              !isshowConfirmRequestModal),
                            (action = 'Accept'),
                            (changeRequestObj = changeRequest)
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
                            (changeRequestObj = changeRequest)
                        "
                        >Decline</span
                      >
                    </div>
                  </div>

                  <div v-else-if="currentAccountInfo.Role == 'A'">
                    <div v-if="changeRequest.Status == 'Pending'">
                      <span
                        class="badge rounded-pill bg-info text-light me-1"
                        style="cursor: pointer"
                        @click="
                          (messageModal = 'accept'),
                            (isshowConfirmRequestModal =
                              !isshowConfirmRequestModal),
                            (action = 'Accept'),
                            (changeRequestObj = changeRequest)
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
                            (changeRequestObj = changeRequest)
                        "
                        >Decline</span
                      >
                    </div>
                  </div>
                  <div v-else></div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="changeRequests.length == 0" class="text-center">
            <h5>Not Found</h5>
          </div>
          <div class="pagination" v-if="changeRequests.length > 0">
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
              @click="getChangeRequest(pagination.page - 1)"
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
              @click="getChangeRequest(index)"
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
              @click="getChangeRequest(pagination.page + 1)"
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
                  @click="
                    isshowConfirmRequestModal = !isshowConfirmRequestModal
                  "
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
                    processingRequest(action, changeRequestObj),
                      (isshowConfirmRequestModal = !isshowConfirmRequestModal)
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
      pagination: [],
      changeRequests: [],
      moment: moment,
      selectedPage: 1,
      majorItem: 1,
      messageModal: "",
      status: "",
      isshowConfirmRequestModal: false,
      action: "",
      requestType: "Cancel",
      changeRequestObj: {},
    };
  },
  async created() {
    await this.onUpdateAccountInfo();

    await this.getChangeRequest(1);
  },
  methods: {
    async getChangeRequest(currentPage) {
      const responseData = await axios
        .get("/changerequest/getChangeRequest", {
          params: {
            page: currentPage,
            user: this.currentAccountInfo,
            requestType: this.requestType,
          },
        })
        .then((response) => {
          console.log(response.data);
          const changeRequest = response.data.changeRequest;
          this.changeRequests = changeRequest;
          const paging = response.data.pagination;
          this.pagination = paging;
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });
    },
    async updateChangeRequestStatus(action, changeRequestObj) {
      if (action == "Accept") {
        try {
          const responseStep1 = await axios.put(
            "/changerequest/changeChangeRequestStatus",
            {
              status: "Accept",
              changeRequestID: changeRequestObj.ChangeRequestID,
            }
          );
          toast.success("Successfully!", {
            theme: "colored",
            autoClose: 2000,
            onClose: () => location.reload(),
          });
        } catch (error) {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        }
      } else {
        try {
          const responseStep1 = await axios.put(
            "/changerequest/changeChangeRequestStatus",
            {
              status: "Reject",
              changeRequestID: changeRequestObj.ChangeRequestID,
            }
          );
          toast.success("Successfully!", {
            theme: "colored",
            autoClose: 2000,
            onClose: () => location.reload(),
          });
        } catch (error) {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        }
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
                console.log("Freelancer " + this.currentAccountInfo);
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

    async processingRequest(action, selectedRequest) {
      if (action == "Accept") {
        try {
          if (selectedRequest.Request_Type == "Cancel") {
            const changeOrderStatusRes = await axios.put(
              "/orders/updateStatus",
              {
                status: "Cancelled",
                orderID: selectedRequest.OrderID,
              }
            );
            if (changeOrderStatusRes.data.message == "Change Status Success") {
              const changeOrderRequestStatusRes = await axios.put(
                "/changerequest/changeChangeRequestStatus",
                {
                  status: "Accept",
                  changeRequestID: selectedRequest.ChangeRequestID,
                }
              );

              if (
                changeOrderRequestStatusRes.data.message ==
                "Change Request Status Success"
              ) {
                toast.success("Accept Order Change Successfully!", {
                  theme: "colored",
                  autoClose: 2000,
                  onClose: () => location.reload(),
                });
              } else {
                toast.warn("Accept Order Change Failed!", { autoClose: 2000 });
              }
            } else {
              toast.warn("Accept Order Change Failed!!", { autoClose: 2000 });
            }
          } else {
            // alert("Extend :" + selectedRequest.Request_Extend_Day);
            const updateOrderExtendDayRes = await axios.put(
              "/orders/updateOrderExtendDay",
              {
                extendDay: selectedRequest.Request_Extend_Day,
                orderID: selectedRequest.OrderID,
              }
            );
            if (
              updateOrderExtendDayRes.data.message ==
              "Update Extend Day Success"
            ) {
              const changeOrderRequestStatusRes = await axios.put(
                "/changerequest/changeChangeRequestStatus",
                {
                  status: "Accept",
                  changeRequestID: selectedRequest.ChangeRequestID,
                }
              );

              if (
                changeOrderRequestStatusRes.data.message ==
                "Change Request Status Success"
              ) {
                toast.success("Accept Order Change Successfully!", {
                  theme: "colored",
                  autoClose: 2000,
                  onClose: () => location.reload(),
                });
              } else {
                toast.warn("Accept Order Change Failed!", { autoClose: 2000 });
              }
            } else {
              toast.warn("Accept Order Change Failed!", { autoClose: 2000 });
            }
          }
        } catch (error) {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Accept Order Change Failed!", { autoClose: 2000 });
        }
      } else {
        try {
          const responseStep1 = await axios.put(
            "/changerequest/changeChangeRequestStatus",
            {
              status: "Reject",
              changeRequestID: selectedRequest.ChangeRequestID,
            }
          );
          toast.success("Decline Order Change Successfully!", {
            theme: "colored",
            autoClose: 2000,
            onClose: () => location.reload(),
          });
        } catch (error) {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
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
.scrollable-row {
  max-height: 50px;
  overflow-y: auto;
  white-space: pre-line;
}
</style>