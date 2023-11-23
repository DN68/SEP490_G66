<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="container-manaInterviewad">
      <div class="manage_title row">
        <div class="col-md-3"><h3>Manage Interviews</h3></div>
        <div class="col-md-3"><h3></h3></div>
        <!-- <div class="col-md-3 search_bar">
            <div class="input-group rounded">
              <input
                type="search"
                class="form-control Interview_search"
                placeholder="Search interview ..."
                v-model="searchInterview"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <router-link
                :to="{
                  path: '/manageInterviewad',
                  query: {
                    search: searchInterview,
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
      <div class="interview_status row">
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Pending' }"
        >
          <router-link
            @click="(this.status = 'Pending'), (selectedPage = '1')"
            :to="{
              path: '/manageinterview',
              query: {
                status: 'Pending',
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
          :class="{ status_item_active: this.status == 'Ongoing' }"
        >
          <router-link
            @click="(this.status = 'Ongoing'), (selectedPage = '1')"
            :to="{
              path: '/manageinterview',
              query: {
                page: 1,
                status: 'Ongoing',
              },
            }"
            class="text-decoration-none"
          >
            <h6>
              Ongoing<span
                v-if="this.status == 'Ongoing'"
                class="badge bg-secondary"
                >{{ pagination.totalRow }}</span
              >
            </h6>
          </router-link>
        </div>

        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Finished' }"
        >
          <router-link
            @click="(this.status = 'Finished'), (selectedPage = '1')"
            :to="{
              path: '/manageinterview',
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
        </div>
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Deleted' }"
        >
          <router-link
            @click="(this.status = 'Deleted'), (selectedPage = '1')"
            :to="{
              path: '/manageinterview',
              query: {
                page: 1,
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
      </div>
      <div class="interview_table">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr style="border-bottom: 2px solid #dcd8d8">
              <th class="th_no">NO.</th>
              <th class="th_Freelancer">CANDIDATE</th>
              <th class="th_ScheduledDate">DATE</th>
              <th class="th_Location">VENUE</th>
              <th class="th_description">DESCRIPTION</th>
              <th class="th_status">STATUS</th>
              <th class="th_actions">ACTIONS</th>
            </tr>
          </thead>
          <tbody v-if="interviews.length >= 1">
            <tr v-for="(interview, index) in interviews" :key="index">
              <td class="td_Interviews">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                      coding -->
                    {{ index + 1 }}
                  </p>
                </div>
              </td>
              <td class="td_freelancer">
                <div class="d-flex align-items-center">
                  <img
                    :src="interview.Profile_Picture"
                    alt=""
                    style="width: 45px; height: 45px"
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">
                      {{ interview.First_Name + " " + interview.Last_Name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="td_Interviews">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                      coding -->
                    {{ getFormattedDate(interview.ScheduledDate) }}
                  </p>
                </div>
              </td>
              <td class="td_Interviews">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                      coding -->
                    {{ interview.Location }}
                  </p>
                </div>
              </td>
              <td class="td_Interviews">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                      coding -->
                    {{ interview.Description }}
                  </p>
                </div>
              </td>

              <td class="td_Interviews">
                <div class="d-flex align-items-center">
                  <span
                    v-if="interview.Status == 'Pending'"
                    class="badge bg-primary rounded-pill d-inline"
                  >
                    Pending</span
                  >
                  <span
                    v-if="interview.Status == 'Ongoing'"
                    class="badge rounded-pill bg-info d-inline"
                  >
                    Ongoing</span
                  >
                  <span
                    v-if="interview.Status == 'Deleted'"
                    class="badge rounded-pill bg-secondary"
                    >Deleted</span
                  >
                  <span
                    v-if="interview.Status == 'Finished'"
                    class="badge rounded-pill bg-success"
                    >Finished</span
                  >
                </div>
              </td>
              <td class="td_actions">
                <i
                  @click="
                    (isshowModal = !isshowModal),
                      (slectedInterviewID = interview.InterviewID)
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
        <div v-if="interviews.length == 0" class="text-center">
          <h5>interview Not Found</h5>
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
                  <h5 class="modal-title">Change Interview Status</h5>
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
                      <option class="" value="Ongoing">
                        <span>Ongoing</span>
                      </option>
                      <option class="" value="Deleted">
                        <span>Deleted</span>
                      </option>
                      <option class="" value="Finished">
                        <span>Finished</span>
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
                      changeInterviewStatus(selectedStatus, slectedInterviewID),
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
              path: '/manageinterview',
              query: {
                page: 1,
                search: searchInterview,
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
              path: '/manageinterview',
              query: {
                page: pagination.page - 1,
                status: status,
              },
            }"
            ><i class="bi bi-arrow-left"></i
          ></router-link>
          <router-link
            :to="{
              path: '/manageinterview',
              query: {
                page: index,
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
              path: '/manageInterviewad',
              query: {
                page: pagination.page + 1,
                search: searchInterview,
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
  name: "CreateInterviewDetailPage",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      account: {},
      interviews: [],
      pagination: [],
      moment: moment,
      // searchInterview: "",
      selectedPage: 1,
      // status: this.$route.query.status,
      status: "Pending",
      isshowModal: false,
      selectedStatus: "Pending",
    };
  },
  methods: {
    //format date
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    async changeInterviewStatus(status, interviewID) {
      const data = await axios.put("/interviews/updateStatus", {
        status: status,
        interviewID: interviewID,
      });
      // console.log(data);
      if (data.data.message == "Change Status Success") {
        toast.success("Change interview Status Successfully!", {
          theme: "colored",
          autoClose: 2000,
          onClose: () => location.reload(),
        });
      } else {
        toast.warn("Change interview Status Failed!", { autoClose: 2000 });
      }
    },
  },
  async created() {
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
    const responseData = await axios.get("/interviews/index", {
      params: {
        page: this.selectedPage,
        status: this.status,
      },
    });
    const interviews = responseData.data.interview;
    // console.log(interviews)
    this.interviews = interviews;
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
    const responseDateWithPage = await axios.get("/interviews/index", {
      params: {
        page: this.selectedPage,
        // search: this.searchInterview,
        status: this.status,
      },
    });

    const interviews = responseDateWithPage.data.interview;
    this.interviews = interviews;
    console.log(interviews);
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
.interview_status {
  padding-bottom: 10px;
  border-bottom: 1px solid #dcd8d8;
}
.interview_status {
  margin: 20px 0;
}

.interview_status .status_item {
  text-align: left;
  width: fit-content;
  text-transform: uppercase;
}
.interview_status .status_item h6 {
  font-weight: 500;
  color: #9f9fa0;

  font-size: 15px;
}

.interview_status .status_item_active h6 {
  color: #303032;
}
.manage_title h3 {
  text-align: left;
  font-weight: 600;
}
.interview_table .table th {
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
.interview_table .table th {
  font-weight: 600;
  color: #a8a7a7;
  font-size: 13px;
}
</style>