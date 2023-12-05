<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="container-manageFreelancer">
      <div class="manage_title row">
        <div class="col-md-3"><h3>Manage freelancers</h3></div>
        <div class="col-md-3"><h3></h3></div>
        <div class="col-md-3 search_bar">
          <div class="input-group rounded">
            <input
              type="search"
              class="form-control Interview_search"
              placeholder="Search account ..."
              v-model="searchFreelancer"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <router-link
              :to="{
                path: '/manageaccount/freelancer',
                query: {
                  search: searchFreelancer,
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
        <!-- <div class="col-md-2">
            <router-link to="/manageaccount/freelancer/freelancer" style="text-decoration: none">
              <h6
                style="
                  color: #fff;
                  border: 1px #ccc solid;
                  background-color: red;
                  line-height: 35px;
                "
              >
                Manage Freelancers
              </h6>
            </router-link>
          </div> -->
      </div>
      <div class="account_status row">
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Pending' }"
        >
          <router-link
            @click="(this.status = 'Pending'), (selectedPage = '1')"
            :to="{
              path: '/manageaccount/freelancer',
              query: {
                status: 'Pending',
                search: searchFreelancer,
              },
            }"
            class="text-decoration-none"
          >
            <h6>
              Pending
              <span
                v-if="this.status == 'Pending'"
                class="badge bg-secondary"
                >{{ pagination.totalRow }}</span
              >
            </h6></router-link
          >
        </div>

        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Active' }"
        >
          <router-link
            @click="(this.status = 'Active'), (selectedPage = '1')"
            :to="{
              path: '/manageaccount/freelancer',
              query: {
                page: 1,
                status: 'Active',
                search: searchFreelancer,
              },
            }"
            class="text-decoration-none"
          >
            <h6>
              Active<span
                v-if="this.status == 'Active'"
                class="badge bg-secondary"
                >{{ pagination.totalRow }}</span
              >
            </h6>
          </router-link>
        </div>

        <!-- <div
            class="col-md-2 status_item"
            :class="{ status_item_active: this.status == 'Finished' }"
          >
            <router-link
              @click="(this.status = 'Finished'), (selectedPage = '1')"
              :to="{
                path: '/manageaccount/freelancer',
                query: {
                  page: 1,
                  status: 'Finished',
                },
              }"
              class="text-decoration-none"
            >
              <h6>
                Finished<span
                  v-if="this.status == 'Finished'"
                  class="badge bg-secondary"
                  >{{ pagination.totalRow }}</span
                >
              </h6>
            </router-link>
          </div> -->
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Blocked' }"
        >
          <router-link
            @click="(this.status = 'Blocked'), (selectedPage = '1')"
            :to="{
              path: '/manageaccount/freelancer',
              query: {
                page: 1,
                status: 'Blocked',
                search: searchFreelancer,
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
      <div class="account_table">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr style="border-bottom: 2px solid #dcd8d8">
              <th class="th_no">NO.</th>
              <th class="th_AccountID">ACCOUNTID</th>
              <th class="th_freelancer">FREELANCER</th>
              <th class="th_Email">EMAIL</th>
              <th class="th_Status">STATUS</th>
              <th class="th_actions">ACTIONS</th>
            </tr>
          </thead>
          <tbody v-if="freelancers.length >= 1">
            <tr v-for="(freelancer, index) in freelancers" :key="index">
              <td class="td_Interviews">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                          coding -->
                    {{ index + 1 }}
                  </p>
                </div>
              </td>

              <td class="td_AccountID">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                          coding -->
                    <!-- {{ getFormattedDate(account.ScheduledDate) }} -->
                    ACC-{{ freelancer.AccountID }}
                  </p>
                </div>
              </td>
              <td class="td_freelancer">
                <div class="d-flex align-items-center">
                  <img
                    :src="freelancer.Profile_Picture"
                    alt=""
                    style="width: 45px; height: 45px"
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">
                      {{ freelancer.Username }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="td_email">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                          coding -->
                    {{ freelancer.Email }}
                  </p>
                </div>
              </td>
              <td class="td_Status">
                <div class="d-flex align-items-center">
                  <span
                    v-if="freelancer.Status == 'Active'"
                    class="badge bg-primary rounded-pill d-inline"
                  >
                    Active</span
                  >
                  <span
                    v-if="freelancer.Status == 'Pending'"
                    class="badge rounded-pill bg-info d-inline"
                  >
                    Pending</span
                  >
                  <span
                    v-if="freelancer.Status == 'Blocked'"
                    class="badge rounded-pill bg-secondary"
                    >Blocked</span
                  >
                </div>
              </td>
              <td class="td_actions">
                <i
                  @click="
                    (isshowModal = !isshowModal),
                      (slectedAccountID = freelancer.AccountID)
                  "
                  class="bi bi-gear-fill"
                ></i>
                &nbsp;
                <i
                  @click="
                    (isShowInfoModal = !isShowInfoModal),
                      (selectedFreelancer = freelancer)
                  "
                  class="bi bi-eye-fill"
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
                          <li><a class="dropdown-item" href="#">Pending</a></li>
                          <li><a class="dropdown-item" href="#">Pause</a></li>
                          <li><a class="dropdown-item" href="#">Delete</a></li>
                          <li><a class="dropdown-item" href="#">Block</a></li>
                          <li><a class="dropdown-item" href="#">Unblock</a></li>
                        </ul>
                      </div> -->
            </tr>
          </tbody>
        </table>
        <div v-if="freelancers.length == 0" class="text-center">
          <h5>Account Not Found</h5>
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
                  <h5 class="modal-title">Change Freelancer Status</h5>
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
                      <option class="" value="Blocked">
                        <span>Blocked</span>
                      </option>
                      <!-- <option class="" value="Finished">
                          <span>Finished</span>
                        </option> -->
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
                      changeAccountStatus(selectedStatus, slectedAccountID),
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
        <div>
          <div
            class="modal fade show"
            style="
              display: block;
              background-color: #000000ad;
              padding-top: 10%;
            "
            v-if="isShowInfoModal"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Freelancer Info</h5>
                  <button
                    type="button"
                    class="btn-close"
                    @click="isShowInfoModal = !isShowInfoModal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row" style="padding-left: 25px">
                    <div>
                      <table class="freelancerInfoForm">
                        <tr>
                          <td class="line-info"><span>Full Name:</span></td>
                          <td>
                            {{
                              selectedFreelancer.First_Name +
                              " " +
                              selectedFreelancer.Last_Name
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td class="line-info"><span>Phone: </span></td>
                          <td>
                            {{ selectedFreelancer.Phoneno }}
                          </td>
                        </tr>
                        <tr>
                          <td class="line-info"><span>Address: </span></td>
                          <td>
                            {{ selectedFreelancer.Location }}
                          </td>
                        </tr>
                        <!-- <tr>
                          <td class="line-info">
                            <span>Profile Picture </span>
                          </td>
                          <td>
                            <input
                              style="width: 80%"
                              type="file"
                              ref="fileImage"
                              accept=".jpeg, .jpg, .png"
                            />
                            (.jpeg, .jpg, .png)
                          </td>
                        </tr> -->
                        <tr>
                          <td class="line-info"><span>Description: </span></td>
                          <td>
                            {{ selectedFreelancer.Description }}
                          </td>
                        </tr>
                        <tr>
                          <td class="line-info"><span>Category: </span></td>
                          <td>
                            {{ selectedFreelancer.Category_Name }}
                          </td>
                        </tr>
                        <!-- <tr>
                          <td class="line-info"><span>Language </span></td>
                          <td>
                            <div class="dropdown">
                              <button
                                type="button"
                                data-bs-toggle="dropdown"
                                style="
                                  border: 1px #ccc solid;
                                  background-color: #fff;
                                  padding-top: 10px;
                                  padding-bottom: 10px;
                                  width: 100%;
                                "
                              >
                                <span style="float: left"> Vietnamese </span>
                                <i
                                  class="fa-solid fa-chevron-down"
                                  style="float: right; align-self: center"
                                ></i>
                              </button>
                              <ul class="dropdown-menu">
                                <li class="dropdown-item" href="#">
                                  Vietnamese
                                </li>
                                <li class="dropdown-item" href="#">English</li>
                              </ul>
                            </div>
                          </td>
                        </tr> -->
                      </table>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="isShowInfoModal = !isShowInfoModal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="showCV(selectedFreelancer.CV_Upload)"
                  >
                    View CV
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
              path: '/manageaccount/freelancer',
              query: {
                page: 1,
                search: searchFreelancer,
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
              path: '/manageaccount/freelancer',
              query: {
                page: pagination.page - 1,
                status: status,
                search: searchFreelancer,
              },
            }"
            ><i class="bi bi-arrow-left"></i
          ></router-link>
          <router-link
            :to="{
              path: '/manageaccount/freelancer',
              query: {
                page: index,
                status: status,
                search: searchFreelancer,
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
              path: '/manageaccount/freelancer',
              query: {
                page: pagination.page + 1,
                search: searchFreelancer,
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

var moment = require("moment");

export default {
  name: "CreateAccountDetailPage",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      account: {},
      freelancers: [],
      pagination: [],
      moment: moment,
      // searchInterview: "",
      selectedPage: 1,
      // status: this.$route.query.status,
      status: "Pending",
      searchFreelancer: "",
      isshowModal: false,
      isShowInfoModal: false,
      selectedStatus: "Active",
    };
  },
  methods: {
    //format date
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    async changeAccountStatus(status, accountID) {
      const data = await axios.put("/accounts/updateStatus", {
        status: status,
        accountID: accountID,
      });
      // console.log(data);
      if (data.data.message == "Change Status Success") {
        toast.success("Change account Status Successfully!", {
          theme: "colored",
          autoClose: 2000,
          onClose: () => location.reload(),
        });
      } else {
        toast.warn("Change account Status Failed!", { autoClose: 2000 });
      }
    },
    async showCV(cvName) {
      const apiUrl = "/cv/" + cvName;
      const resData = await axios.get(apiUrl, { responseType: "arraybuffer" });
      console.log(resData);
      const blob = new Blob([resData.data], { type: "application/pdf" });

      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(blob);
      this.blobUrl = blobUrl;
      console.log(this.blobUrl);

      // Open a new window or tab and display the PDF
      const pdfWindow = window.open();
      pdfWindow.document.write(`
      <html>
      <head>
      <title>CV Viewer</title>
      </head>
      <body>
      <embed src="${this.blobUrl}" type="application/pdf" width="100%" height="100%">
      </body>
      </html>
              `);
      pdfWindow.onbeforeunload = function () {
        URL.revokeObjectURL(this.blobUrl);
      };
    },
  },
  async created() {
    //Admin role permission
    await axios
      .get("/accounts/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.account = res.data.account;
          if (this.account.Role != "A") {
            this.$router.push("/");
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    // const responseAccountInfor = await axios.get("/accounts/info", {
    //   headers: { token: localStorage.getItem("token") },
    // });
    // const accountInfor = responseAccountInfor.data.account;
    // this.account = accountInfor;
    // console.log(this.account.accountID);
    const responseData = await axios.get("/freelancers/index", {
      params: {
        page: this.selectedPage,
        status: this.status,
        search: this.searchFreelancer,
      },
    });
    const freelancers = responseData.data.freelancer;
    // console.log(accounts)
    this.freelancers = freelancers;
    const paging = responseData.data.pagination;
    this.pagination = paging;
    console.log(this.pagination.totalRow);
    // console.log(this.status)
    // const responseInterviewReqData = await axios.get("/orders/getInterviewRequest", {
    //   params: {
    //     user: this.user,
    //     requestType: this.user.role == "C" ? "Extend" : "Cancel",
    //     status: "Pending",
    //   },
    // });
    // const totalNewRequest = responseInterviewReqData.data.pagination;
    // this.totalInterviewRequest = totalNewRequest.totalRow;
  },
  async beforeRouteUpdate() {
    console.log("Run Here");
    const responseDateWithPage = await axios.get("/freelancers/index", {
      params: {
        page: this.selectedPage,
        search: this.searchFreelancer,
        status: this.status,
      },
    });

    const freelancers = responseDateWithPage.data.freelancer;
    this.freelancers = freelancers;
    console.log(freelancers);
    // const searchQuery = responseDateWithPage.data.searchQuery;
    // this.searchInterview = searchQuery.search;
    const paging = responseDateWithPage.data.pagination;
    this.pagination = paging;
    console.log("this.selectedPage " + (this.pagination.page + 1));
  },
};
</script>
        
<style scoped>
.container-manageFreelancer {
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
.Interview_search {
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
.account_status {
  padding-bottom: 10px;
  border-bottom: 1px solid #dcd8d8;
}
.account_status {
  margin: 20px 0;
}

.account_status .status_item {
  text-align: left;
  width: fit-content;
  text-transform: uppercase;
}
.account_status .status_item h6 {
  font-weight: 500;
  color: #9f9fa0;

  font-size: 15px;
}

.account_status .status_item_active h6 {
  color: #303032;
}
.manage_title h3 {
  text-align: left;
  font-weight: 600;
}
.account_table .table th {
  padding: 10px;
}
/* scroll handling */
.account_table {
  max-width: 100%; /* Set a maximum width for the container */
  overflow-x: auto;
  max-height: 100%; /* Set a maximum height for the container */
  overflow-y: auto;
}
.table .th_user,
.th_Interview {
  text-align: left;
}

.table .th_Interview {
  width: 30%;
}

.table .td_Interview p {
  color: #757575 !important;
}
.table .th_user {
  width: 25%;
}

.table .th_user span {
  margin-left: 20px;
}
.td_Interview {
  text-align: left;
}
.account_table .table th {
  font-weight: 600;
  color: #a8a7a7;
  font-size: 13px;
}
.d-flex {
  justify-content: left;
  padding-left: 53px;
}
.freelancerInfoForm {
  width: 100%;
}
.line-info {
  margin-top: 5%;
  display: flex;
  color: red;
}
.freelancerInfoForm td {
  text-align: right;
  padding-right: 25px;
}
</style>