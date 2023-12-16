<template>
  <div>
    <Header @update-account-info="onUpdateAccountInfo"></Header>
    <div class="container">
      <div class="row">
        <article class="col-sm-12">
          <div class="row order_header">
            <div
              class="col-sm-3 order_header_item"
              :class="{ active: isstep1 }"
              @click="isstep2 ? changeStep(1) : ''"
            >
              <span>1. Order Request Details</span>
              <i class="bi bi-chevron-right ms-4"></i>
            </div>
            <div
              class="col-sm-3 order_header_item"
              :class="{ active: isstep2 }"
              @click="isstep3 ? changeStep(2) : ''"
            >
              <span>2. Duration</span>
              <i class="bi bi-chevron-right ms-4"></i>
            </div>
            <div
              class="col-sm-3 order_header_item"
              :class="{ active: isstep3 }"
              @click="isstep2 ? changeStep(2) : ''"
            >
              <span>3. Job Description</span>
            </div>
          </div>
        </article>
        <div class="order-page">
          <section class="row">
            <div
              class="col-md-7 order_information step1"
              :style="{ display: isstep1 ? 'block' : 'none' }"
            >
              <div class="seller_overview row">
                <div class="user_image col-md-3">
                  <img
                    :src="gig.Gig_IMG"
                    class="profile-pict-img jumkns0"
                    alt="riketa"
                    style="width: 100%"
                  />
                </div>
                <div class="user_information col-md-8">
                  <div class="row gig_overview">
                    <div class="">
                      <h4 class="gig_description">
                        {{ gig.Title }}
                      </h4>
                      <!-- <div style="display: inline">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"><b class="ratingScore">5.0</b></i>
                      </div> -->
                      <div class="row quantity">
                        <span class="col-md-2 qty_title">Estimation </span>
                        <input
                          type="number"
                          class="form-control form-icon-trailing me-2"
                          style="width: 14%"
                          min="1"
                          v-model="orderRequest.TotalEstimation"
                          max="1000"
                        />
                        hour
                      </div>
                    </div>
                    <div class="user_other_information">
                      <p>
                        <span
                          class="view_description"
                          data-toggle="collapse"
                          href="#collapseExample"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          View gig description
                          <i class="bi bi-chevron-down"></i>
                        </span>
                      </p>
                      <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                          {{ gig.Description }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="featurette-divider" />
              <div class="main_title">
                <h5 class="">Upgrade your order</h5>
              </div>
            </div>
            <div
              class="col-md-7 order_information step2"
              :style="{ display: isstep2 ? 'block' : 'none' }"
            >
              <div class="container">
                <!-- For demo purpose -->

                <!-- End -->
                <div class="row">
                  <div class="col-lg-12 mx-auto">
                    <div>
                      <div>
                        <h5 class="text-start">
                          You need to specify the start and end times for your
                          work.
                        </h5>
                      </div>
                      <div class="text-start">
                        <span>Start Date</span>
                        <VueDatePicker
                          v-model="orderRequest.StartFrom"
                          class="my-2"
                          :format="'yyyy-MM-dd hh:mm a'"
                        />
                      </div>
                      <div class="text-start">
                        <span>End Date</span>
                        <VueDatePicker
                          v-model="orderRequest.EndAt"
                          class="my-2"
                          :format="'yyyy-MM-dd hh:mm a'"
                        />
                      </div>
                      <p>
                        Note: Please check your start date and end date before
                        go to the next step.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-md-7 rqm_information step3"
              :style="{ display: isstep3 ? 'block' : 'none' }"
            >
              <div class="container" style="text-align: left">
                <div class="rqm_header">
                  <form>
                    <h4>Submit job description to send your order request</h4>
                    <hr class="featurette-divider rqm_featurette" />
                    <h5>
                      You need to provide the information to start working on
                      your order:
                    </h5>
                    <p>
                      1. Writing your job description here. Do you have any
                      ideals of what you want ?
                    </p>
                    <div class="form-outline mb-4">
                      <textarea
                        class="form-control"
                        id="textAreaExample6"
                        v-model="orderRequest.JobDescription"
                        rows="5"
                        required
                      ></textarea>
                      <label class="form-label" for="textAreaExample6"></label>
                    </div>

                    <p>2. Comfirm</p>

                    <div class="confirm_submit">
                      <input
                        class="form-check-input col-md-2"
                        type="checkbox"
                        v-model="confirmSubmit"
                        id="flexCheckChecked"
                        required
                      />
                      <label
                        class="form-check-label col-md-10 check_legal"
                        for="flexCheckChecked"
                      >
                        The information I provided is accurate and complete. Any
                        changes will require the seller's approval, and may be
                        subject to additional costs.
                      </label>
                    </div>
                    <div class="start_order">
                      <button
                        class="co-white bg-co-black start_btn"
                        type="button"
                        @click="sendOrderRequest()"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-5 order_tab">
              <div class="packages-tabs single">
                <div class="">
                  <div class="package-content">
                    <span class="price_summary">Price summary</span>
                    <div class="subtotal row">
                      <span class="col-md-6">Subtotal</span>
                      <span class="col-md-6 subtotal_price"
                        >${{ gig.Price }}x{{
                          orderRequest.TotalEstimation
                        }}</span
                      >
                    </div>
                    <div class="service_fee row">
                      <span class="col-md-6">Service Fee</span>
                      <span class="col-md-6 service_price"
                        >${{
                          (gig.Price * orderRequest.TotalEstimation * 10) / 100
                        }}</span
                      >
                    </div>
                    <hr class="featurette-divider" />
                    <div class="total_price row">
                      <span class="col-md-6">Total</span>
                      <span class="col-md-6 total_all"
                        >${{
                          gig.Price * orderRequest.TotalEstimation +
                          (gig.Price * orderRequest.TotalEstimation * 10) / 100
                        }}</span
                      >
                    </div>
                    <div class="delivery_time row">
                      <span class="col-md-6">Estimation Time</span>
                      <span class="col-md-6 delivery_day"
                        >{{ orderRequest.TotalEstimation }} hour</span
                      >
                    </div>
                    <div class="checkout_order">
                      <button
                        class="co-white bg-co-black checkout_btn"
                        type="button"
                        @click="changeStep(currentStep)"
                        :style="{ display: isstep3 ? 'none' : '' }"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="gig-detail-information"></section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Header from "../components/Header.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
var moment = require("moment");
import api from '../../api';
export default {
  name: "OrderDetailPage",
  components: {
    Header,
    VueDatePicker,
  },
  async created() {
    const responseGig = await api.get(
      "/gigs/details/" + this.$route.query.gigID
    );
    const gig = responseGig.data;
    this.gig = gig;
    console.log("Run here 1");
    // await this.onUpdateAccountInfo();
    console.log("🚀 ~ file: HERE", JSON.stringify(this.user));  
  },
  data() {
    return {
      iscreditcard: true,
      isstep1: true,
      isstep2: false,
      isstep3: false,
      currentStep: 2,
      confirmSubmit: "",
      gig: {},

      orderRequest: {
        OrderRequestID: "",
        CustomerID: "",
        GigID: "",
        JobDescription: "",
        TotalEstimation: 1,
        StartFrom: new Date(),
        EndAt: moment(new Date()).add(24, "h"),
        Description: "",
        Status: "Pending",
      },
      user: null,
      moment: moment,
    };
  },
  methods: {
    onUpdateAccountInfo(newAccountInfo) {
      // Update parent's currentAccountInfo based on the data received from the child
      this.user = newAccountInfo;

      console.log(
        "🚀 ~ file: CreateOrderDetailView.vue:369 ~ onUpdateAccountInfo ~ user:",
        JSON.stringify(this.user)
      );
      if (this.user == null) {
        this.$router.push("/login");
      }else if(this.user.Role == "F"){
        this.$router.push("/error");
      }else if(this.user.Role == "C"&&this.user.Status != "Active"){
        this.$router.push("/error");
      }else if(this.user.Role == "A"){
        this.$router.push("/error");
      }
    },
    changeStep: function (step) {
      if (step == 2) {      
        if (!/^(?:[1-9]\d{0,2}|10000)$/.test(this.orderRequest.TotalEstimation)) {
        alert("Please input valid estimate number! From 1 to 10000!");
        return;
        }
        this.isstep2 = true;
        this.isstep1 = false;
        this.isstep3 = false;
        this.currentStep = 3;
      } else if (step == 3) {
        var isAfterCurrentDate = moment(this.orderRequest.StartFrom).isBefore(
          moment(new Date())
        );
        if (isAfterCurrentDate) {
          alert("Start date can not before current date!");
          return;
        }
        var isafter = moment(this.orderRequest.EndAt).isAfter(
          this.orderRequest.StartFrom
        );
        if (!isafter) {
          alert("End date must be after start date!");
          return;
        }
        this.isstep2 = false;
        this.isstep1 = false;
        this.isstep3 = true;
        this.currentStep = 4;
      } else {
        this.isstep2 = false;
        this.isstep1 = true;
        this.isstep3 = false;
        this.currentStep = 2;
      }
    },
    async sendOrderRequest() {
      if (!/^(?:[1-9]\d{0,2}|10000)$/.test(this.orderRequest.TotalEstimation)) {
        alert("Please input valid estimate number! From 1 to 10000!");
        return;
      }
      if (this.orderRequest.JobDescription == "" || !this.confirmSubmit) {
        alert("Please Submit Job Description And Click On Confirm Checkbox!");
        return;
      } else {
        this.orderRequest.CustomerID = this.user.CustomerID;
        this.orderRequest.GigID = this.gig.GigID;
        console.log(this.orderRequest);
        await api
          .post("/orderrequest/createOrderRequest", {
            orderRequest: this.orderRequest,
          })
          .then((response) => {
            console.log(response.data);
            toast.success("Send successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => {this.$router.push('/manageOrderRequest')}
            });
          })
          .catch((error) => {
            // Handle the error
            console.error("Error here:", error);
            toast.warn("Failed!", { autoClose: 2000 });
          });
      }
    },
  },
};
</script>

<style>
.order_header {
  margin: 20px 0;
  border-bottom: 1px solid #dcd8d8;
  padding-bottom: 20px;
}
.order_header .order_header_item {
  width: fit-content;
  font-weight: 600;
}

.order_header .active span {
  color: #d73436;
}

.gig_overview {
  text-align: left;
}
.view_description {
  color: #ef5c5f;
}
.user_other_information {
  margin-top: 20px;
}

.main_title h5 {
  text-align: left;
  line-height: 130%;
  font-size: 26px;
  color: #404145;
  font-family: Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: 700;
}

.order-page .package-content {
  margin-left: 20%;
  border: 1px solid #dadbdd;
  margin-bottom: 32px;
  padding-top: 20px;
  width: 60%;
  text-align: left;
  padding: 20px;
}
.package-content .price_summary {
  font-weight: 600;
  font-size: 18px;
}
.checkout_order {
  text-align: center;
}
.checkout_order .checkout_btn {
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
  width: 90%;
  margin: 20px 0;
}

.start_order .start_btn {
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
  width: 20%;
  margin: 10px 0;
}

.subtotal,
.service_fee,
.delivery_time {
  color: gray;
}

.subtotal_price,
.service_price,
.total_all,
.delivery_day {
  text-align: right;
}
.quantity {
  margin: 10px 0;
  text-align: left;
}
.quantity .qty_title {
  width: fit-content;
  padding-left: 0;
}
.quantity .form-control {
  padding: 0;
}
.step1 {
  display: none;
}

.card_title {
  text-align: left;
  margin: 5px 0;
}

.card_title h6 {
  margin: 0;
  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
  color: black;
}

.nav-link {
  color: #000;
}
.payment_card .select_payment .active {
  background-color: #da3032 !important;
  color: white;
}
.card-footer .btn-primary {
  background-color: #000;
  border: none;
}

.form-group .btn-primary {
  margin: 10px 0;
  background-color: #000;
  border: none;
}

.confirm_submit {
  margin: 20px 0;
}

.rqm_header h4,
h5 {
  font-weight: 700;
}

.rqm_header p {
  margin-top: 15px;
}
.check_legal {
  font-size: 15px;
}
.rqm_header .rqm_featurette {
  margin: 15px 0;
}

.attach_file {
  width: 15%;
  border: 1px solid #dcd8d8;
  border-radius: 2px;
  background-color: #eeeeee;
}
</style>