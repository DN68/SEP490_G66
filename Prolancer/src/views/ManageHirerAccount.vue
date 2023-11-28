<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="container-manaInterviewad">
      <div class="manage_title row">
        <div class="col-md-3"><h3>Manage Hirers</h3></div>
        <div class="col-md-3"><h3></h3></div>
        <div class="col-md-3 search_bar">
          <div class="input-group rounded">
            <input
              type="search"
              class="form-control Interview_search"
              placeholder="Search account ..."
              v-model="searchHirer"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <router-link
              :to="{
                path: '/manageaccount/hirer',
                query: {
                  search: searchHirer,
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
          <router-link to="/manageaccount/hirer/freelancer" style="text-decoration: none">
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
              path: '/manageaccount/hirer',
              query: {
                status: 'Pending',
                search: searchHirer,
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
              path: '/manageaccount/hirer',
              query: {
                page: 1,
                status: 'Active',
                search: searchHirer,
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
              path: '/manageaccount/hirer',
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
              path: '/manageaccount/hirer',
              query: {
                page: 1,
                status: 'Blocked',
                search: searchHirer,
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
              <th class="th_Hirer">HIRER</th>
              <th class="th_Username">USERNAME</th>
              <th class="th_Email">EMAIL</th>
              <th class="th_Status">STATUS</th>
              <th class="th_actions">ACTIONS</th>
            </tr>
          </thead>
          <tbody v-if="customers.length >= 1">
            <tr v-for="(customer, index) in customers" :key="index">
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
                    ACC-{{ customer.AccountID }}
                  </p>
                </div>
              </td>
              <td class="td_hirer">
                <div class="d-flex align-items-center">
                  <img
                    :src="customer.Profile_Picture"
                    alt=""
                    style="width: 45px; height: 45px"
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">
                      {{ customer.First_Name + " " + customer.Last_Name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="td_username">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                        coding -->
                    {{ customer.Username }}
                  </p>
                </div>
              </td>
              <td class="td_email">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                        coding -->
                    {{ customer.Email }}
                  </p>
                </div>
              </td>
              <td class="td_Status">
                <div class="d-flex align-items-center">
                  <span
                    v-if="customer.Status == 'Active'"
                    class="badge bg-primary rounded-pill d-inline"
                  >
                    Active</span
                  >
                  <span
                    v-if="customer.Status == 'Blocked'"
                    class="badge rounded-pill bg-info d-inline"
                  >
                    Blocked</span
                  >
                  <span
                    v-if="customer.Status == 'Blocked'"
                    class="badge rounded-pill bg-secondary"
                    >Blocked</span
                  >
                  <span
                    v-if="customer.Status == 'Finished'"
                    class="badge rounded-pill bg-success"
                    >Finished</span
                  >
                </div>
              </td>
              <td class="td_actions">
                <i
                  @click="
                    (isshowModal = !isshowModal),
                      (slectedAccountID = customer.AccountID)
                  "
                  class="bi bi-gear-fill"
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
        <div v-if="customers.length == 0" class="text-center">
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
                  <h5 class="modal-title">Change account Status</h5>
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
                      <option class="" value="Pending">
                        <span>Pending</span>
                      </option>
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
        <div class="pagination">
          <router-link
            v-if="pagination.page - 1 == 0 && pagination.totalPage != 0"
            class="page-number"
            @click="selectedPage = pagination.page - 1"
            :to="{
              path: '/manageaccount/hirer',
              query: {
                page: 1,
                search: searchHirer,
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
              path: '/manageaccount/hirer',
              query: {
                page: pagination.page - 1,
                status: status,
                search: searchHirer,
              },
            }"
            ><i class="bi bi-arrow-left"></i
          ></router-link>
          <router-link
            :to="{
              path: '/manageaccount/hirer',
              query: {
                page: index,
                status: status,
                search: searchHirer,
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
              path: '/manageaccount/hirer',
              query: {
                page: pagination.page + 1,
                search: searchHirer,
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
      customers: [],
      pagination: [],
      moment: moment,
      // searchInterview: "",
      selectedPage: 1,
      // status: this.$route.query.status,
      status: "Pending",
      searchHirer: "",
      isshowModal: false,
      selectedStatus: "Pending",
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
          if (this.account.role != "A") {
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
    const responseData = await axios.get("/customers/index", {
      params: {
        page: this.selectedPage,
        status: this.status,
        search: this.searchHirer,
      },
    });
    const customers = responseData.data.customer;
    // console.log(accounts)
    this.customers = customers;
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
    const responseDateWithPage = await axios.get("/customers/index", {
      params: {
        page: this.selectedPage,
        search: this.searchHirer,
        status: this.status,
      },
    });

    const customers = responseDateWithPage.data.customer;
    this.customers = customers;
    console.log(customers);
    // const searchQuery = responseDateWithPage.data.searchQuery;
    // this.searchInterview = searchQuery.search;
    const paging = responseDateWithPage.data.pagination;
    this.pagination = paging;
    console.log("this.selectedPage " + (this.pagination.page + 1));
  },
};
</script>
      
      <style>
.container-manaInterviewad {
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
/* scroll handling */
.account_table {
  max-width: 100%; /* Set a maximum width for the container */
  overflow-x: auto;
  max-height: 100%; /* Set a maximum height for the container */
  overflow-y: auto;
}
.d-flex {
  justify-content: center;
}
</style>