<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="row">
        <article class="col-sm-12">
          <div class="row order_header">
            <div
              class="col-sm-3 order_header_item"
              :class="{ active: isstep1 }"
              @click="isstep2 ? changeStep(1) : ''"
            >
              <span>1. Order Details</span> <i class="bi bi-chevron-right"></i>
            </div>
            <div
              class="col-sm-3 order_header_item"
              :class="{ active: isstep2 }"
              @click="isstep3 ? changeStep(2) : ''"
            >
              <span>2. Confirm & Payment</span>
              <i class="bi bi-chevron-right"></i>
            </div>
            <div
              class="col-sm-3 order_header_item"
              :class="{ active: isstep3 }"
              @click="isstep2 ? changeStep(2) : ''"
            >
              <span>3. Submit Requirements</span>
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
                      <div style="display: inline">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"><b class="ratingScore">5.0</b></i>
                      </div>
                      <div class="row quantity">
                        <span class="col-md-2 qty_title">Qty</span>
                        <input
                          type="number"
                          class="form-control form-icon-trailing"
                          style="width: 10%"
                          min="1"
                          v-model="order.orderAmout"
                        />
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
                    <div class="payment_card">
                      <div class="card-header">
                        <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                          <!-- Credit card form tabs -->
                          <ul
                            role="tablist"
                            class="nav bg-light nav-pills rounded nav-fill mb-3"
                          >
                            <li class="nav-item select_payment">
                              <a
                                href="#"
                                class="nav-link"
                                :class="{ active: iscreditcard }"
                                @click="changeTypePayment(1)"
                              >
                                <i class="fas fa-credit-card mr-2"></i> Credit
                                Card
                              </a>
                            </li>

                            <li class="nav-item select_payment">
                              <a
                                href="#"
                                class="nav-link"
                                :class="{ active: !iscreditcard }"
                                @click="changeTypePayment(2)"
                              >
                                <i class="fas fa-mobile-alt mr-2"></i> Net
                                Banking
                              </a>
                            </li>
                          </ul>
                        </div>
                        <!-- End -->
                        <!-- Credit card form content -->
                        <div class="tab-content">
                          <!-- credit card info-->
                          <div
                            id="credit-card"
                            class="tab-pane fade show active pt-3"
                            :style="{
                              display: iscreditcard ? 'block' : 'none',
                            }"
                          >
                            <form role="form" onsubmit="">
                              <div class="form-group">
                                <div class="card_title">
                                  <label for="username">
                                    <h6>Card Owner</h6>
                                  </label>
                                </div>
                                <input
                                  type="text"
                                  name="username"
                                  placeholder="Card Owner Name"
                                  required
                                  class="form-control"
                                />
                              </div>
                              <div class="form-group">
                                <div class="card_title">
                                  <label for="cardNumber" class="card_title">
                                    <h6>Card number</h6>
                                  </label>
                                </div>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Valid card number"
                                    class="form-control"
                                    required
                                  />
                                  <div class="input-group-append">
                                    <span class="input-group-text text-muted">
                                      <i class="fab fa-cc-visa mx-1"></i>
                                      <i class="fab fa-cc-mastercard mx-1"></i>
                                      <i class="fab fa-cc-amex mx-1"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-sm-8">
                                  <div class="form-group">
                                    <label
                                      ><span class="hidden-xs">
                                        <h6>Expiration Date</h6>
                                      </span></label
                                    >
                                    <div class="input-group">
                                      <input
                                        type="number"
                                        placeholder="MM"
                                        name=""
                                        class="form-control"
                                        required
                                      />
                                      <input
                                        type="number"
                                        placeholder="YY"
                                        name=""
                                        class="form-control"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-sm-4">
                                  <div class="form-group mb-4">
                                    <label
                                      data-toggle="tooltip"
                                      title="Three digit CV code on the back of your card"
                                    >
                                      <h6>
                                        CVV
                                        <i
                                          class="fa fa-question-circle d-inline"
                                        ></i>
                                      </h6>
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      class="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="card-footer">
                                <button
                                  type="button"
                                  class="subscribe btn btn-primary btn-block shadow-sm"
                                >
                                  Confirm Payment
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <!-- End -->

                        <!-- End -->
                        <!-- bank transfer info -->
                        <div
                          id="net-banking"
                          class="tab-pane pt-3"
                          :style="{ display: !iscreditcard ? 'block' : 'none' }"
                        >
                          <div class="form-group">
                            <div class="card_title">
                              <label for="Select Your Bank">
                                <h6>Select your Bank</h6>
                              </label>
                            </div>
                            <select class="form-control" id="ccmonth">
                              <option value="" selected disabled>
                                --Please select your Bank--
                              </option>
                              <option>Bank 1</option>
                              <option>Bank 2</option>
                              <option>Bank 3</option>
                              <option>Bank 4</option>
                              <option>Bank 5</option>
                              <option>Bank 6</option>
                              <option>Bank 7</option>
                              <option>Bank 8</option>
                              <option>Bank 9</option>
                              <option>Bank 10</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <p>
                              <button type="button" class="btn btn-primary">
                                <i class="fas fa-mobile-alt mr-2"></i> Proceed
                                Payment
                              </button>
                            </p>
                          </div>
                          <p class="text-muted">
                            Note: After clicking on the button, you will be
                            directed to a secure gateway for payment.
                          </p>
                        </div>
                        <!-- End -->
                        <!-- End -->
                      </div>
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
                    <h4>Submit Requirement to send your order</h4>
                    <hr class="featurette-divider rqm_featurette" />
                    <h5>
                      You need to provide the information to start working on
                      your order:
                    </h5>
                    <p>
                      1. Writing your requirement here. Do you have any ideals
                      of what you want ?
                    </p>
                    <div class="form-outline mb-4">
                      <textarea
                        class="form-control"
                        id="textAreaExample6"
                        v-model="order.orderDescription"
                        rows="5"
                        required
                      ></textarea>
                      <label class="form-label" for="textAreaExample6"></label>
                    </div>

                    <p>
                      2. You can send more requirement after start your order
                    </p>

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
                        @click="startOrder()"
                      >
                        Start Order
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
                        >${{ gig.Price }}x{{ order.orderAmout }}</span
                      >
                    </div>
                    <div class="service_fee row">
                      <span class="col-md-6">Service Fee</span>
                      <span class="col-md-6 service_price"
                        >${{ gig.Price * order.orderAmout * 0.1 }}</span
                      >
                    </div>
                    <hr class="featurette-divider" />
                    <div class="total_price row">
                      <span class="col-md-6">Total</span>
                      <span class="col-md-6 total_all"
                        >${{
                          gig.Price * order.orderAmout +
                          gig.Price * order.orderAmout * 0.1
                        }}</span
                      >
                    </div>
                    <div class="delivery_time row">
                      <span class="col-md-6">Delivery Time</span>
                      <span class="col-md-6 delivery_day"
                        >{{ gig.Delivery_Day }} day</span
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

import Header from "../components/Header.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "OrderDetailPage",
  components: {
    Header,
  },
  async created() {
    const responseGig = await axios.get(
      "/gigs/details/" + this.$route.query.gigID
    );
    const gig = responseGig.data;
    this.gig = gig;
    console.log("Run here 1");
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    const responseUserInfor = await axios.get("/users/info", {
      headers: { token: localStorage.getItem("token") },
    });
    const userInfor = responseUserInfor.data.user;
    this.user = userInfor;
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

      order: {
        orderID: "",
        orderCustomerID: "4",
        orderFreelancerID: "",
        orderGigID: "",
        orderDate: new Date(),
        orderAmout: "1",
        orderStatus: "Active",
        orderDescription: "",
      },
      user:[]
    };
  },
  methods: {
    changeTypePayment: function (type) {
      if (type == 1) {
        this.iscreditcard = true;
      } else {
        this.iscreditcard = false;
      }
    },
    changeStep: function (step) {
      if (step == 2) {
        this.isstep2 = true;
        this.isstep1 = false;
        this.isstep3 = false;
        this.currentStep = 3;
      } else if (step == 3) {
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
    async startOrder() {
      if (this.order.orderDescription == "" || !this.confirmSubmit) {
        console.log("Please Submit Requirt", this.order.orderDescription);
        alert("Please Submit Requirment And Click On Confirm!");
      } else {
        this.order.orderCustomerID = this.user.userId;
        this.order.orderFreelancerID = this.gig.FreelancerID;
        this.order.orderGigID = this.gig.GigID;
        const data = await axios.post("/orders/index", {
          order: this.order,
        });       

        if (data.data.message == "Create Order Success") {
          toast.success("Create Order Successfully!", {
            theme: "colored",
            autoClose: 2000,
          });
          window.setTimeout(function () {
            window.location.href = '/vieworderdetail/'+data.data.insertId;
          }, 3000);
        } else {
          toast.warn("Create Order Faild!", { autoClose: 2000 });
        }
      }
    },
  }
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