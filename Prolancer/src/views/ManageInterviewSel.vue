<template>
  <div>
    <Headerseller></Headerseller>
    <div class="container-manaInterviewsel">
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
                    path: '/manageinterviewselad',
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
        <div class="col-md-2">
          <!-- <router-link to="/creategig" style="text-decoration: none"> -->
          <button
            style="
              color: #fff;
              border: 1px #ccc solid;
              background-color: red;
              line-height: 35px;
            "
            @click="isShowInfoModal = !isShowInfoModal"
          >
            Make interview request
          </button>
          <!-- </router-link> -->
        </div>
      </div>
      <div class="interview_status row">
        <div
          class="col-md-2 status_item"
          :class="{ status_item_active: this.status == 'Pending' }"
        >
          <router-link
            @click="(this.status = 'Pending'), (selectedPage = '1')"
            :to="{
              path: '/manageinterviewsel',
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
              path: '/manageinterviewsel',
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
              path: '/manageinterviewsel',
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
          :class="{ status_item_active: this.status == 'Cancelled' }"
        >
          <router-link
            @click="(this.status = 'Cancelled'), (selectedPage = '1')"
            :to="{
              path: '/manageinterviewsel',
              query: {
                page: 1,
                status: 'Cancelled',
              },
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
      </div>
      <div class="interview_table">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr style="border-bottom: 2px solid #dcd8d8">
              <th class="th_no">NO.</th>
              <th class="th_description">DESCRIPTION</th>
              <th class="th_ScheduledDate">DATE</th>
              <th class="th_Location">VENUE</th>
              <th class="th_status">STATUS</th>
              <th class="th_actions" v-if="status == 'Pending'">ACTIONS</th>
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
                    v-if="interview.Status == 'Cancelled'"
                    class="badge rounded-pill bg-danger"
                    >Cancelled</span
                  >
                  <span
                    v-if="interview.Status == 'Finished'"
                    class="badge rounded-pill bg-success"
                    >Finished</span
                  >
                </div>
              </td>
              <td class="td_actions" v-if="interview.Status == 'Pending'">
                <i
                  v-if="interview.Status == 'Pending'"
                  @click="
                    (isshowConfirmRequestModal = !isshowConfirmRequestModal),
                      (slectedInterview = interview),
                      (action = 'Cancel')
                  "
                  class="bi bi-x-square-fill"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="interviews.length == 0" class="text-center">
          <h5>Interview Not Found</h5>
        </div>
        <!-- Interview request form -->
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
                  <h5 class="modal-title">Interview Description</h5>
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
                          <td class="line-info"><span>Description</span></td>
                          <td>
                            <textarea
                              class="formInput"
                              id=""
                              cols="50"
                              rows="2"
                              v-model="description"
                              placeholder="What skill do you need to interview, your free time,..."
                              required
                              maxlength="100"
                            ></textarea>
                          </td>
                        </tr>
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
                    class="btn btn-danger"
                    @click="
                      isShowInfoModal = !isShowInfoModal;
                      isshowConfirmRequestModal = !isshowConfirmRequestModal;
                      action = 'Create';
                      // createInterview();
                    "
                  >
                    Make interview request
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                <div class="modal-body">
                  <div class="row" v-if="action == 'Create'">
                    <div>
                      <p class="modal-title">
                        Do you really want to create this interview request ?
                      </p>
                      <p class="modal-title">This process cannot be undone.</p>
                    </div>
                  </div>
                  <div class="row" v-if="action == 'Cancel'">
                    <div>
                      <p class="modal-title">
                        Do you really want to cancel this interview? 
                      </p>
                      <p class="modal-title">This process cannot be undone.</p>
                    </div>
                  </div>
                </div>

                <div class="modal-footer justify-content-center">
                  <a
                    v-if="action == 'Create'"
                    type="button"
                    class="btn btn-info waves-effect waves-light text-white"
                    @click="
                      createInterview(),
                        (isshowConfirmRequestModal = !isshowConfirmRequestModal)
                    "
                    >Save</a
                  >
                  <a
                    v-if="action == 'Cancel'"
                    type="button"
                    class="btn btn-info waves-effect waves-light text-white"
                    @click="
                      cancelInterview(slectedInterview),
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
        <div class="pagination">
          <router-link
            v-if="pagination.page - 1 == 0 && pagination.totalPage != 0"
            class="page-number"
            @click="selectedPage = pagination.page - 1"
            :to="{
              path: '/manageinterviewsel',
              query: {
                page: 1,
                // search: searchInterview,
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
              path: '/manageinterviewsel',
              query: {
                page: pagination.page - 1,
                status: status,
              },
            }"
            ><i class="bi bi-arrow-left"></i
          ></router-link>
          <router-link
            :to="{
              path: '/manageinterviewsel',
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
              path: '/manageinterviewselad',
              query: {
                page: pagination.page + 1,
                // search: searchInterview,
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Headerseller from "../components/HeaderSeller.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import api from "../../api";
var moment = require("moment");

export default {
  name: "CreateInterviewDetailPage",
  components: {
    name: "OrderDetailPage",
    Headerseller,
    VueDatePicker,
  },
  data() {
    return {
      account: {},
      freelancer: {},
      interviews: [],
      pagination: [],
      moment: moment,
      // searchInterview: "",
      selectedPage: 1,
      // status: this.$route.query.status,
      status: "Pending",
      isshowModal: false,
      selectedStatus: "Pending",
      isShowInfoModal: false,
      description: "",
      isshowConfirmRequestModal: false,
    };
  },
  methods: {
    createInterview() {
      api
        .post("/interviews/create", {
          CreateByID: this.freelancer.FreelancerID,
          ScheduledDate: moment().format("YYYY-MM-DD"),
          Location: "",
          Description: this.description,
          Status: "Pending",
        })
        .then(
          (res) => {
            toast.success("Interview Request Created Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.reload(),
            });
          },
          (err) => {
            console.log(err.response);
          }
        );
    },
    //format date
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    async changeInterviewStatus(status, interview) {
      const data = await api.put("/interviews/updateStatus", {
        status: status,
        interviewID: interview.InterviewID,
      });
      // console.log(data);
      if (data.data.message == "Change Status Success") {
        if (status == "Finished") {
          //if interview passed --> change acc status to "Active"
          this.changeFreelancerAccountStatus(interview.CreateByID);
        }
        toast.success("Change Interview Status Successfully!", {
          theme: "colored",
          autoClose: 2000,
          onClose: () => location.reload(),
        });
      } else {
        toast.warn("Change interview Status Failed!", { autoClose: 2000 });
      }
    },
    async updateInterview(selectedInterviewID) {
      console.log(this.newScheduledDate);
      const data = await api.put("/interviews/update", {
        date: this.newScheduledDate,
        location: this.newLocation,
        id: selectedInterviewID,
      });
      console.log(data);
      if (data.data.message == "Interview updated successfully") {
        toast.success("Update interview Schedule Successfully!", {
          theme: "colored",
          autoClose: 2000,
          onClose: () => location.reload(),
        });
      } else {
        toast.warn("Change interview Schedule Failed!", { autoClose: 2000 });
      }
    },
    async cancelInterview(interview) {
      this.changeInterviewStatus("Cancelled", interview);
    },
  },
  async created() {
    await api
      .get("/accounts/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.account = res.data.account;
          if (this.account.Role != "F") {
            this.$router.push("/error");
          }
        },
        (err) => {
          console.log(err.response);
        }
      );
    if (localStorage.getItem("token") === null) {
      this.$router.push("/error");
    }
    if (localStorage.getItem("token") === null) {
      this.$router.push("/error");
    }
    await api
      .get("/freelancers/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.freelancer = res.data.freelancer;
          if (!res.data.freelancer) {
            this.$router.push("/error");
          }
        },
        (err) => {
          console.log(err.response);
        }
      );

    console.log(this.freelancer.FreelancerID);
    // Get all interviews by status
    const responseData = await api
      .get(`/interviews/index/${this.freelancer.FreelancerID}`, {
        params: {
          page: this.selectedPage,
          status: this.status,
        },
      })
      .then(
        (res) => {
          const interviews = res.data.interview;
          console.log(interviews);
          this.interviews = interviews;
          const paging = res.data.pagination;
          this.pagination = paging;
          console.log(this.pagination.totalRow);
        },
        (err) => {
          console.log(err.response);
        }
      );

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
    const responseDateWithPage = await api.get(
      `/interviews/index/${this.freelancer.FreelancerID}`,
      {
        params: {
          page: this.selectedPage,
          // search: this.searchInterview,
          status: this.status,
        },
      }
    );
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
.container-manaInterviewsel {
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
.freelancerInfoForm {
  width: 100%;
}
.line-info {
  text-align: left;
}
.formInput {
  width: 90%;
}
.container-manaInterviewsel .align-items-center {
  justify-content: center;
}
.interview_table {
  max-height: 70vh;
  overflow-y: scroll;
}

.interview_table::-webkit-scrollbar {
  width: 12px;
}

.interview_table::-webkit-scrollbar-thumb {
  background-color: #888;
}

.interview_table::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}
</style>