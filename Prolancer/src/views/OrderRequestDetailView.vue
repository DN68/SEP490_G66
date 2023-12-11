<template>
  <div class="view_order_detail">
    <Header v-if="currentAccountInfo.Role == 'C'"></Header>
    <HeaderSell v-else-if="currentAccountInfo.Role == 'F'"></HeaderSell>
    <div class="container">
      <div class="row">
        <div class="order_status row">
          <div
            class="col-md-2 status_item"
            @click="
              (isdetail = true),
                (isrequirement = false),
                (isdelivery = false),
                (isChangeRequest = false)
            "
            :class="{ status_item_active: isdetail }"
          >
            <h6>Details</h6>
          </div>
        </div>
        <div class="text-start">
            <i  class="fa-solid fa-arrow-left-long text-danger " @click="goBack()" style="cursor: pointer;"></i>
        </div>
        <div class="order_detail_page row">
          <div
            class="col-md-8 order_detail_information pb-4 step1"
            :style="{ display: isdetail ? 'block' : 'none' }"
          >
            <div class="container">
              <div class="order_detail_overview">
                <div class="order_detail_overview_head row">
                  <div class="col-md-8 order_detail_title">
                    <h5 class="text-start">{{ order.Title }}</h5>
                  </div>
                  <div class="col-md-4 order_detail_title">
                    <h5 class="text-end" style="font-size: 20px">
                      Total Price
                    </h5>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-9 order_detail_title">
                    <div class="ordered_from row">
                      <div class="col-md-12 text-start">
                        <span class="ordered_from_left">Ordered from </span>

                        <span class="ordered_from_right">{{
                          order.CompanyName 
                        }}</span>

                        <span class="" style="margin: 0 10px"> | </span>
                        <span class="delivery_time_left">Delivery Day </span>
                        <span class="col-md-6 delivery_time_right text-end"
                          >{{
                            moment(order.EndAt)
                              .add(24 * order.Extend_Day, "h")
                              .format("MMMM Do, h:mm A")
                          }}
                        </span>
                        <div  class="mt-1">
                          <span class="delivery_time_right"
                            >Job Description: 
                            <span class="text-danger"
                              >{{ order.JobDescription }} </span
                            >
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 order_detail_title">
                    <h5 class="text-end" style="font-size: 20px">
                      ${{
                        order.Price * order.TotalEstimation +
                        order.Price * order.TotalEstimation * 10/100
                      }}
                    </h5>
                  </div>
                </div>
              </div>
              <hr class="featurette-divider"  style="height: 0;"/>
              <div class="order_detail_overview_body row">
                <div class="order_detail_title order_table_head text-start">
                  <span class="col-md-6 order_number_right"
                    ><i class="bi bi-box-seam me-1"></i>YOUR ORDER REQUEST
                  </span>
                  
                </div>
                <div class="order_detail_table">
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" class="th_item text-start">ITEM</th>
                        <th scope="col">ESTIMATION</th>
                        <th scope="col">DURATION</th>
                        <th scope="col">PRICE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">{{ order.Title }}</td>
                        <td>{{ order.TotalEstimation }} hour</td>
                        <td>
                          {{
                            moment(order.StartFrom).format("MMMM Do, h:mm A")
                          }}
                          - {{ moment(order.EndAt).format("MMMM Do, h:mm A") }}
                        </td>
                        <td>${{ order.Price }}</td>
                      </tr>
                      <tr>
                        <td scope="row"></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td scope="row"></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td scope="row"></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr class="backgroud_gray">
                        <th scope="row">SUBTOTAL</th>
                        <th colspan="2"></th>
                        <th class="order_price">
                          ${{ order.Price * order.TotalEstimation }}
                        </th>
                      </tr>
                      <tr class="backgroud_gray">
                        <th scope="row">SERVICE FEE</th>
                        <th colspan="2"></th>
                        <th class="order_price">
                          ${{ order.Price * order.TotalEstimation * 10/100 }}
                        </th>
                      </tr>

                      <tr class="backgroud_gray">
                        <th scope="row">TOTAL</th>
                        <th colspan="2"></th>
                        <th class="order_price">
                          ${{
                            order.Price * order.TotalEstimation +
                            order.Price * order.TotalEstimation * 10/100
                          }}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
            <div class="mt-3 text-start"> 
              <span class="delivery_time_right "
                            >Note: 
                            <span class="text-danger "
                              >{{ order.Note }} </span
                            >
                          </span>
                        </div>
          </div>

          <div class="col-md-4 order_detail_tab">
            <div class="packages-tabs single">
              <div class="">
                <div class="package-content">
                  <span class="order_detail_head">Order Request Details</span>
                  <div class="row">
                    <div class="order_detail_tab_inside row">
                      <div class="order_detail_tab_gig_img col-md-6">
                        <img
                          :src="order.Gig_IMG"
                          class="profile-pict-img jumkns0"
                          alt="riketa"
                          style="width: 100px; height: 70px"
                        />
                      </div>
                      <div class="order_detail_tab_information col-md-6">
                        <div class="row">
                          <div class="information_gig_title col-md-4">
                            <a>
                              <h6 class="information_gig_title_h6">
                                {{ order.Title }}
                              </h6></a
                            >
                          </div>
                        </div>
                        <div class="information_order_status">
                          <span v-if="order.Status == 'Pending'"
                           class="badge bg-primary rounded-pill d-inline">
                           Pending</span
                          >
                          <span
                            v-if="order.Status == 'Accept'"
                            class="badge bg-success rounded-pill d-inline"
                          >
                          Accept</span
                          >
                          <span
                            v-if="order.Status == 'Cancelled'"
                            class="badge rounded-pill bg-danger"
                            >Cancelled</span
                          >
                          
                          <span
                            v-if="order.Status == 'Reject'"
                            class="badge rounded-pill bg-secondary d-inline"
                            >Reject</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="featurette-divider" />
                  <div class="ordered_from row">
                    <span class="col-md-6 ordered_from_left text-start"
                      >Ordered from</span
                    >

                    <span class="col-md-6 ordered_from_right text-end">{{
                      order.CompanyName + " "
                    }}</span>
                  </div>
                  <div class="delivery_time row">
                    <span class="col-md-6 delivery_time_left"
                      >Delivery Time</span
                    >
                    <span class="col-md-6 delivery_time_right text-end"
                      >{{
                        moment(order.EndAt)
                          .add(24 * order.Extend_Day, "h")
                          .format("MMMM Do, h:mm A")
                      }}
                    </span>
                  </div>
                  <div class="total_price row">
                    <span class="col-md-6 total_price_left">Total price</span>
                    <span class="col-md-6 total_price_right text-end"
                      >${{
                        order.Price * order.TotalEstimation +
                        order.Price * order.TotalEstimation * 10/100
                      }}
                    </span>
                  </div>
                  <div class="order_number row">
                    <span class="col-md-6 order_number_left">Order number</span>
                    <span class="col-md-6 order_number_right text-end"
                      >#FO200{{ order.OrderRequestID }}
                    </span>
                  </div>
                  <hr class="featurette-divider" />
                  <span class="order_detail_head">Track Order Request</span>
                  <div class="track_order row">
                    <div
                      v-if="order.Status == 'Reject'"
                      class="col-md-12 track_order_cancel"
                    >
                      <i class="bi bi-x-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Is rejected</span
                      >
                    </div>
                    <div
                      v-if="order.Status == 'Cancelled'"
                      class="col-md-12 track_order_late"
                    >
                      <i
                        class="bi bi-exclamation-circle-fill checked_active"
                      ></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Is cancelled</span
                      >
                    </div>
                    <div
                      v-if="order.Status == 'Pending'"
                      class="col-md-12 track_order_delivered"
                    >
                      <i class="bi bi-play-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Is pending</span
                      >
                    </div>

                    <div
                      v-if="order.Status == 'Accept'"
                      class="col-md-12 track_order_completed_status"
                    >
                      <i class="bi bi-check-circle-fill checked_active"></i>

                      <span class="col-md-6 track_order_text text-end"
                        >Is accepted</span
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
  </div>
</template>
  
  <script>
import Header from "../components/Header.vue";
import axios from "axios";
var moment = require("moment");
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import VueJwtDecode from "vue-jwt-decode";
import HeaderSell from "../components/HeaderSeller.vue";

export default {
  name: "OrderDetailView",
  components: {
    Header,HeaderSell
  },
  data() {
    return {
      isdetail: true,
      isrequirement: false,
      isdelivery: false,
      order: {},
      moment: moment,
      currentAccountInfo: []
    };
  },
  async created() {
    await this.onUpdateAccountInfo();
    const responseOrder = await axios.get(
      "/orderrequest/details/" + this.$route.params.id
    ).then((response) => {
            const order = response.data[0];
            this.order = order;
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });;
    
    // if (
    //   this.user.userId != this.order.CustomerID &&
    //   this.user.userId != this.order.FreelancerID &&
    //   this.user.role != "A"
    // ) {
    //   this.$router.push("/");
    // }
  },
  methods: {
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
    goBack() {
      this.$router.back();
    },
  },
};
</script>
  
  <style>
.order_detail_page {
  margin: 20px 0;
}
.view_order_detail .order_status {
  padding-bottom: 10px;
  border-bottom: 1px solid #dcd8d8;
}
.view_order_detail .order_status {
  margin: 20px 0;
}

.view_order_detail .order_status .status_item {
  text-align: left;
  width: fit-content;
  text-transform: uppercase;
  margin-right: 30px;
  padding: 0;
  cursor: pointer;
}
.view_order_detail .order_status .status_item h6 {
  font-weight: 600;
  color: #9f9fa0;

  font-size: 15px;
}
.view_order_detail .order_status .status_item_active {
  border-bottom: 3px solid #f31e1e;
}
.view_order_detail .order_status .status_item_active h6 {
  color: #f31e1e;
}

.package-content {
  margin-left: 20%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border: 1px solid #dadbdd;
  margin-bottom: 32px;
  padding-top: 20px;
  width: 65%;
  text-align: left;
  padding: 20px;
}

.order_detail_page .order_detail_information {
  box-shadow: 0 1px 9px rgba(0, 0, 0, 0.2);
  border: 1px solid #dadbdd;
  background-color: white;
}

.order_detail_tab_information .information_gig_title {
  width: 100%;
}
.order_detail_tab_information .information_gig_title .information_gig_title_h6 {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.order_detail_tab_gig_img img {
  width: 100%;
}
.order_detail_tab_inside {
  margin-top: 20px;
}

.order_detail_head {
  font-weight: 600;
  color: #565656;
}
.order_detail_tab .featurette-divider {
  margin: 20px 0;
  height: 0.5px;
}
.ordered_from_left,
.delivery_time_left,
.total_price_left,
.order_number_left {
  color: #9f9fa0;
}
.ordered_from_right {
  color: #20f120;
  font-weight: 550;
}
.delivery_time_right,
.total_price_right,
.order_number_right {
  color: #565656;
  font-weight: 550;
  font-size: 14px;
}
.information_gig_title_h6 {
  margin: 0;
}
.order_detail_tab .package-content {
  box-shadow: 0 1px 9px rgba(0, 0, 0, 0.2);
  border: 1px solid #dadbdd;
  background-color: white;
}

.order_detail_tab .track_order_requirement {
  margin-top: 10px;
  margin-bottom: 5px;
}

.order_detail_tab .track_order_requirment_text,
.track_order_progress_text,
.track_order_text {
  margin-left: 15px;
  font-weight: 550;
}
.order_detail_tab .track_order_progress,
.track_order_cancel,
.track_order_late,
.track_order_delivered,
.track_order_completed_status {
  margin: 5px 0;
}
.order_detail_tab .track_order_requirment_text {
  color: #1b1b1b4a;
}
.order_detail_tab .track_order_completed {
  color: #1b1b1b4a;
}
.order_detail_tab .checked_active {
  color: #ff1212;
}

.order_detail_page .order_detail_title h5 {
  line-height: 130%;
  font-size: 22px;
  color: #404145;
  font-family: Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: 550;
}

.order_detail_page .order_detail_overview_head {
  margin-top: 20px;
}
.order_detail_table {
  padding: 0;
}
.order_detail_overview_body .order_table_head {
  background-color: #f8f9fa;
  padding: 10px;
}
.order_detail_table .table th,
.order_detail_table .table td {
  text-align: left;
}
.order_detail_table .table td {
  color: #9f9fa0;
}
.order_detail_table .table th {
  color: #565656;
  font-weight: 550;
  font-size: 14px;
  background-color: #f8f9fa;
}
.order_detail_table .table thead {
  background-color: #f8f9fa;
}

.order_detail_table .table .th_item {
  width: 65%;
}
.order_detail_table .table .backgroud_gray {
  background-color: #f8f9fa;
}
.order_detail_overview_body {
  border: 1px solid #f9f5f5;
  border-radius: 5px;
}
.order_detail_table .table-borderless {
  margin: 0;
}

.order_detail_table .table .order_price {
  color: #565656;
  font-weight: 550;
}
.order_detail_information .icon_number {
  color: #9f9fa0;
}
.order_detail_overview_body_requirement .requirement_text {
  color: #9f9fa0;
}
.order_detail_overview_body_requirement .text_hello {
  margin-bottom: 40px;
}
.order_detail_page .order_detail_overview_body_requirement {
  padding: 0 20px;
}
.order_detail_overview .start_order .start_btn,
.order_detail_information .save_change .save_btn,
.deliver_order .deliver_btn,
.common_btn_class .common_btn {
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  padding: 12px 24px;
  position: relative;
  text-align: center;
  text-decoration: none;
  background-color: #000;
  color: white;
  width: 15%;
  margin-bottom: 20px;
}
.order_detail_overview .more_requirment {
  margin: 0;
}
.order_delivery .box_icon_delivery {
  font-size: 100px;
}
.delivery_infomation .delivery_infomation_date {
  color: #9f9fa0;
}
.order_delivery .text_sologan {
  font-size: 22px;
}
.view_order_detail .step2 {
  margin-bottom: 30px;
}

.order_detail_information .formbold-form-select {
  width: 100%;
  padding: 12px 22px;
  border-radius: 5px;
  border: 1px solid #dde3ec;
  background: #ffffff;
  font-size: 16px;
  color: #536387;
  outline: none;
  resize: none;
}
.order_detail_information .formbold-form-input {
  width: 100%;
  padding: 13px 22px;
  border-radius: 5px;
  border: 1px solid #dde3ec;
  background: #ffffff;
  font-weight: 500;
  font-size: 16px;
  color: #07074d;
  outline: none;
  resize: none;
}

.order_detail_information .formbold-form-label {
  color: #07074d;
  font-size: 16px;
  line-height: 24px;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}

.order_detail_information .formbold-form-input:focus {
  border-color: #05041a;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}
</style>