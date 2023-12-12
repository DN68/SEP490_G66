<template>
  <div class="view_order_detail">
    <Header v-if="currentAccountInfo.Role == 'C'"></Header>
    <HeaderSell v-else-if="currentAccountInfo.Role == 'F'"></HeaderSell>
    <HeaderAdmin v-else></HeaderAdmin>
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

          <div
            class="col-md-2 status_item"
            @click="
              (isdetail = false),
                (isrequirement = true),
                (isdelivery = false),
                (isChangeRequest = false)
            "
            :class="{ status_item_active: isrequirement }"
            style="display: none"
          >
            <h6>Job Description</h6>
          </div>
          <div v-if="currentAccountInfo.Role != 'A'"
            class="col-md-2 status_item"
            @click="
              (isdetail = false),
                (isrequirement = false),
                (isdelivery = true),
                (isChangeRequest = false),
                getDeliveryByOrderID()
            "
            :class="{ status_item_active: isdelivery }"
          >
            <h6>Delivery</h6>
          </div>
          <div
            v-if="currentAccountInfo.Role != 'A'"
            class="col-md-2 status_item"
            @click="
              (isdetail = false),
                (isrequirement = false),
                (isdelivery = false),
                (isChangeRequest = true)
            "
            :class="{ status_item_active: isChangeRequest }"
          >
            <h6>Order Change</h6>
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
                        <div v-if="order.Extend_Day != 0" class="mt-1">
                          <span class="delivery_time_right"
                            >Extend Day
                            <span class="text-danger"
                              >{{ order.Extend_Day }} day(s)</span
                            >
                          </span>
                        </div>
                        <div class="mt-1">
                          <span class="delivery_time_right"
                            >Job Description:
                            <span class="text-danger"
                              >{{ order.JobDescription }}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 order_detail_title">
                    <h5 class="text-end" style="font-size: 20px">
                      ${{
                        order.Price * order.TotalEstimation +
                        (order.Price * order.TotalEstimation * 10) / 100
                      }}
                    </h5>
                  </div>
                </div>
              </div>
              <hr class="featurette-divider" style="height: 0" />
              <div class="order_detail_overview_body row">
                <div class="order_detail_title order_table_head text-start">
                  <span class="col-md-6 order_number_right"
                    ><i class="bi bi-box-seam me-1"></i>YOUR ORDER
                  </span>
                  <span class="delivery_time_left fst-italic"
                    >{{ moment(order.Order_Date).format("MMMM Do, h:mm A") }}
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
                          ${{
                            (order.Price * order.TotalEstimation * 10) / 100
                          }}
                        </th>
                      </tr>

                      <tr class="backgroud_gray">
                        <th scope="row">TOTAL</th>
                        <th colspan="2"></th>
                        <th class="order_price">
                          ${{
                            order.Price * order.TotalEstimation +
                            (order.Price * order.TotalEstimation * 10) / 100
                          }}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-md-8 order_detail_information step2"
            style="display: none"
          >
            <div class="container">
              <div class="order_detail_overview">
                <div class="order_detail_overview_head row">
                  <div class="col-md-12 order_detail_title">
                    <h6 class="text-start">
                      <i class="bi bi-1-circle-fill icon_number"></i> Writing
                      job description here. Do you have any ideals of what you
                      want ?
                    </h6>
                  </div>
                </div>
              </div>
              <div class="order_detail_overview_body_requirement row">
                <div class="requirement_text text-start">
                  <div class="text_hello">
                    <span>Hello!</span>
                  </div>
                  <p class="lh-lg">
                    Here is job description: {{ order.JobDescription }}
                  </p>
                  <div class="text_thanks">
                    <span>Thanks!</span>
                  </div>
                </div>
              </div>
              <hr class="featurette-divider" />

              <div
                class="order_detail_overview"
                v-if="currentAccountInfo.Role == 'C'"
              >
                <div class="order_detail_overview_head row">
                  <div class="col-md-12 order_detail_title">
                    <h6 class="text-start">
                      <i class="bi bi-2-circle-fill icon_number"></i> You can
                      send more job description here. Do you have any new ideals
                      of what you want ?
                    </h6>
                  </div>
                  <div class="form-outline more_requirment">
                    <textarea
                      class="form-control"
                      id="textAreaExample6"
                      rows="5"
                      v-model="addRequirement"
                      required
                    ></textarea>
                    <label class="form-label" for="textAreaExample6"></label>
                    <p class="text-danger" v-if="notInputRequirement">
                      Please input requirement
                    </p>
                  </div>
                  <div class="start_order text-start">
                    <button
                      class="co-white bg-co-black start_btn"
                      type="submit"
                      @click="
                        addRequirement != ''
                          ? (isshowConfirmAddRequirementModal =
                              !isshowConfirmAddRequirementModal)
                          : (notInputRequirement = true)
                      "
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-md-8 order_detail_information step3"
            :style="{ display: isdelivery ? 'block' : 'none' }"
          >
            <div class="container">
              <div class="order_delivery">
                <div class="order_detail_overview_head row">
                  <div
                    class="col-md-12 order_detail_title"
                    v-if="currentAccountInfo.Role == 'F'"
                  >
                    <!-- if freelancer has been delivered before -->
                    <div
                      v-if="order.Status == 'Delivered'"
                      class="Free_Delivered"
                    >
                      <div>
                        <label for="uploadProduct">
                          <i
                            class="bi bi-box-seam-fill box_icon_delivery text-black"
                          ></i>
                        </label>
                      </div>
                      <!-- if freelancer not upload new file -->

                      <h6 class="text-center text_sologan">
                        Packages Delivered at the Speed of Need.
                      </h6>
                      <div class="delivery_infomation">
                        <span class="ordered_from_right">You </span>
                        <span class="delivery_infomation_date">
                          has delivered this order.</span
                        >
                      </div>

                      <div
                        class="deliver_order mt-4"
                        v-if="
                          order.Status != 'Delivered' &&
                          order.Status != 'Completed'
                        "
                      >
                        <button
                          class="co-white bg-co-black deliver_btn"
                          type="btn"
                        >
                          Deliver
                        </button>
                      </div>
                    </div>
                    <div
                      v-else-if="
                        order.Status != 'Delivered' &&
                        order.Status != 'Completed'
                      "
                      class="Free_NotDelivered"
                    >
                      <div>
                        <i class="bi bi-box-seam box_icon_delivery"></i>
                      </div>

                      <h6 class="text-center text_sologan">
                        Packages Delivered at the Speed of Need.
                      </h6>
                      <div class="delivery_infomation">
                        <span class="ordered_from_right">You </span>
                        <span class="delivery_infomation_date">
                          should deliver this order on
                          {{
                            moment(order.EndAt)
                              .add(24 * order.Extend_Day, "h")
                              .format("MMMM Do, h:mm A")
                          }}</span
                        >
                      </div>

                      <div class="deliver_order mt-4">
                        <button
                          class="co-white bg-co-black deliver_btn"
                          type="btn"
                          @click="
                            (modalMessage = 'deliver this order'),
                              (action = 'Deliver'),
                              (this.isshowConfirmSendRequestModal =
                                !this.isshowConfirmSendRequestModa)
                          "
                        >
                          Deliver
                        </button>
                      </div>
                    </div>
                    <div v-else-if="order.Status == 'Completed'">
                      <div>
                        <i
                          class="bi bi-box-seam-fill box_icon_delivery text-black"
                        ></i>
                      </div>
                      <h6 class="text-center text_sologan">
                        Your order has been completed!
                      </h6>
                      <div class="delivery_infomation">
                        <span class="ordered_from_right"> </span>
                        <span
                          class="delivery_infomation_date fs-5"
                          v-if="reviews.length == 0"
                        >
                          Waiting review from hirer for you!
                        </span>
                        <span class="delivery_infomation_date fs-5" v-else>
                          Here is review from hirer for you!
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- if user are Customer, Admin -->
                  <div class="col-md-12 order_detail_title" v-else>
                    <!-- if freelancer has not delivered before -->
                    <div
                      v-if="
                        order.Status != 'Delivered' &&
                        order.Status != 'Completed'
                      "
                    >
                      <div>
                        <i class="bi bi-box-seam box_icon_delivery"></i>
                      </div>

                      <h6 class="text-center text_sologan">
                        Packages Delivered at the Speed of Need. Please wait.
                      </h6>
                      <div class="delivery_infomation">
                        <span class="ordered_from_right"
                          >{{
                            order.FreelancerFirstName +
                            " " +
                            order.FreelancerLastName
                          }}
                        </span>
                        <span class="delivery_infomation_date">
                          should deliver this order on
                          {{
                            moment(order.EndAt)
                              .add(24 * order.Extend_Day, "h")
                              .format("MMMM Do, h:mm A")
                          }}</span
                        >
                      </div>
                    </div>
                    <!-- if freelancer has been delivered before -->
                    <div
                      v-if="
                        order.Status == 'Delivered' ||
                        order.Status == 'Completed'
                      "
                    >
                      <div>
                        <i
                          class="bi bi-box-seam-fill box_icon_delivery text-black"
                        ></i>
                      </div>
                      <div v-if="order.Status == 'Delivered'">
                        <h6 class="text-center text_sologan">
                          Your order has been delivered!
                        </h6>
                        <div class="delivery_infomation">
                          <span class="ordered_from_right"> </span>
                          <span class="delivery_infomation_date">
                            Please check delivery product on this order. Are you
                            are satisfied with the delivery?
                          </span>
                        </div>
                        <!-- <div class="common_btn_class mt-4">
                          <button
                            class="co-white bg-co-black common_btn"
                            type="btn"
                            style="width: 20%"
                            data-bs-toggle="modal"
                            data-bs-target="#completeModal"
                          >
                            <span>Yes, I Approve</span>
                          </button>
                          <button
                            class="co-white bg-co-black common_btn ms-2"
                            type="btn"
                            style="width: 20%"
                          >
                            <span>I'm Not Ready</span>
                          </button>
                        </div> -->
                      </div>
                      <!-- if order is completed -->
                      <div v-else>
                        <!-- if order is not review -->
                        <div v-if="reviews.length == 0">
                          <h6 class="text-center text_sologan">
                            Your order has been completed!
                          </h6>
                          <div class="delivery_infomation">
                            <span class="ordered_from_right"> </span>
                            <span class="delivery_infomation_date">
                              We hope you're satisfied with your order. Please
                              take a moment to leave your feedback about the
                              freelancer here. Thank you!
                            </span>
                          </div>
                          <div>
                            <hr class="featurette-divider" style="height: 0" />
                            <div class="mt-4 text-start">
                              <div>
                                <h6 class="text-secondary fs-5">
                                  Public Feedback
                                </h6>
                                <div class="mb-4">
                                  <h5 class="common_title fs-6">
                                    Share your experience about this order and
                                    freelancer
                                  </h5>
                                </div>
                              </div>
                              <div
                                class="row mb-3"
                                style="justify-content: space-between"
                              >
                                <h5 class="common_title fs-6">Common Rating</h5>

                                <div class="col-md-6 feedback_infomation">
                                  <h6>
                                    Are you satisfied with the freelancer?
                                  </h6>
                                </div>
                                <div
                                  class="col-md-3"
                                  style="width: fit-content"
                                >
                                  <star-rating
                                    v-model="rating"
                                    star-size="20"
                                    :show-rating="false"
                                    @update:rating="setRating"
                                  ></star-rating>
                                </div>
                              </div>

                              <div class="text-start">
                                <label for="comments"
                                  ><h5 class="fs-6">
                                    What was It like working with this Seller?
                                  </h5></label
                                >

                                <textarea
                                  rows="6"
                                  id="comments"
                                  name="comments"
                                  placeholder="Your feedback here..."
                                  class="formbold-form-input"
                                  v-model="feedBack"
                                  maxlength="250"
                                  required
                                ></textarea>
                                <span v-if="notInputRating" class="text-danger"
                                  >Please input rating score and feedback!</span
                                >
                              </div>
                              <div class="button text-end mt-1">
                                <button
                                  id="btn-sub"
                                  type="submit"
                                  class="btn btn-primary bg-danger"
                                  style="border: none; width: 150px"
                                  @click="sendReview()"
                                >
                                  Send Feedback
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- if order is reviewed -->
                        <div v-else>
                          <h6 class="text-center text_sologan">
                            Your order has been completed!
                          </h6>
                          <div class="delivery_infomation">
                            <span class="ordered_from_right"> </span>
                            <span class="delivery_infomation_date fs-5">
                              Thanks for your Review!
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="reviews.length > 0 && order.Status == 'Completed'">
                    <div class="text-start">
                      <h5 class="">Reviews</h5>
                    </div>
                    <Review :reviewList="reviews"></Review>
                  </div>
                  <div
                    v-if="
                      order.Status == 'Delivered' ||
                      currentAccountInfo.Role == 'F' ||
                      order.Status == 'Completed'
                    "
                  >
                    <hr class="featurette-divider" style="height: 0" />
                    <div class="product_delivery">
                      <div style="float: left">
                        <h5 class="product_delivery_start">Product Delivery</h5>
                      </div>
                      <div
                        v-if="
                          currentAccountInfo.Role == 'F' &&
                          order.Status != 'Completed'
                        "
                        class="float-end product_delivery_end px-2 rounded-1"
                        data-bs-toggle="modal"
                        data-bs-target="#commonModal"
                      >
                        <i
                          class="bi bi-plus-circle"
                          style="font-size: 14px"
                        ></i>
                        <span style="font-size: 14px"> Add Product </span>
                      </div>
                    </div>
                    <div class="order_table mb-5">
                      <table class="table align-middle mb-0 bg-white">
                        <thead class="bg-light">
                          <tr style="border-bottom: 2px solid #dcd8d8">
                            <th>ID</th>
                            <th style="width: 20%">PRODUCT NAME</th>
                            <th style="width: 17%">PLAN END</th>
                            <th style="width: 17%">ACTUAL END</th>
                            <th style="width: 20%">NOTE</th>

                            <th style="width: 15%">STATUS</th>
                            <th>ACTION</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            v-for="(delivery, index) in deliveries"
                            :key="index"
                          >
                            <td>{{ index + 1 }}</td>
                            <td >
                              <div class="scrollable-row">
                                {{ delivery.DeliveryName }}
                              </div>
                            </td>
                            <td class="">
                              <div>
                                {{
                                  moment(delivery.PlanEndDate).format(
                                    "yyyy-MM-DD hh:mm A"
                                  )
                                }}
                              </div>
                            </td>

                            <td class="">
                              {{
                                moment(delivery.ActualEndDate).format(
                                  "yyyy-MM-DD hh:mm A"
                                )
                              }}
                            </td>
                            <td class="text-start ">
                              <div class="scrollable-row">
                                {{ delivery.Note }}
                              </div>
                            </td>

                            <td>
                              <div>
                                
                                <div v-if="delivery.Status == 'Delivered'">
                                  <span
                                    class="status text-primary request_status"
                                    >•</span
                                  ><span class="fs-6">Delivered</span>
                                </div>
                               
                                <div v-if="delivery.Status == 'Accept'">
                                  <span
                                    class="status text-success request_status"
                                    >•</span
                                  ><span>Accept</span>
                                </div>
                                <div v-if="delivery.Status == 'Reject'">
                                  <span
                                    class="status text-danger request_status"
                                    >•</span
                                  ><span >Reject</span>
                                </div>
                               
                              </div>
                            </td>

                            <td>
                              <!-- v-if="user.role == 'C'" -->
                              <div
                                v-if="
                                  currentAccountInfo.Role == 'C' &&
                                  delivery.Status == 'Delivered'
                                "
                              >
                                <span
                                  class="badge rounded-pill bg-info text-light me-1"
                                  style="cursor: pointer"
                                  @click="
                                    (modalMessage = 'approve this deliver'),
                                      (action = 'ApproveDeliver'),
                                      (this.isshowConfirmSendRequestModal =
                                        !this.isshowConfirmSendRequestModa),
                                      (selectedDeliverID = delivery.DeliveryID)
                                  "
                                  >Accept</span
                                >

                                <span
                                  class="badge rounded-pill text-info decline_button"
                                  style="cursor: pointer"
                                  @click="
                                    (modalMessage = 'decline this deliver'),
                                      (action = 'DeclineDeliver'),
                                      (this.isshowConfirmSendRequestModal =
                                        !this.isshowConfirmSendRequestModa),
                                      (selectedDeliverID = delivery.DeliveryID)
                                  "
                                  >Decline</span
                                >
                              </div>

                              <div
                                v-if="
                                  currentAccountInfo.Role == 'F' &&
                                  delivery.Status == 'Reject'
                                "
                              >
                                <span
                                  class="badge rounded-pill text-info decline_button me-1"
                                  style="cursor: pointer"
                                  @click="
                                    (modalMessage = 'deliver again'),
                                      (action = 'ReDeliver'),
                                      (this.isshowConfirmSendRequestModal =
                                        !this.isshowConfirmSendRequestModa),
                                      (selectedDeliverID = delivery.DeliveryID)
                                  "
                                  >Deliver Again</span
                                >
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-md-8 order_detail_information step3"
            :style="{ display: isChangeRequest ? 'block' : 'none' }"
          >
            <div class="container text-start">
              <h3
                class="my-3 co-text-darkest text-start"
                style="
                  color: #222325;
                  margin-bottom: 24px;
                  font: 700 25px/24px 'Macan', 'Helvetica Neue', Helvetica,
                    Arial, sans-serif;
                "
              >
                <span>Create Order Change</span>
              </h3>
              <form>
                <div class="formbold-input-group">
                  <label class="formbold-form-label">
                    Which type of request you want to create?
                  </label>
                  <div class="custom-select">
                    <select
                      class="formbold-form-select"
                      name="occupation"
                      id="occupation"
                      v-model="requestType"
                    >
                      <option value="Cancel" data-custom-style="top: 30px;">
                        Cancel order request
                      </option>
                      <option
                        value="Extend"
                        v-if="currentAccountInfo.Role != 'C'"
                      >
                        Extend deliver date
                      </option>
                    </select>
                  </div>
                  <div class="custom-select" v-if="requestType == 'Extend'">
                    <label class="formbold-form-label">
                      Select extend date
                    </label>
                    <select
                      class="formbold-form-select"
                      name="occupation"
                      id="occupation"
                      v-model="requestExtend"
                    >
                      <option value="1" data-custom-style="top: 30px;">
                        1 day
                      </option>
                      <option value="3">3 days</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                    </select>
                  </div>
                </div>

                <div class="formbold-input-group">
                  <label for="requestTitle" class="formbold-form-label">
                    Title Request</label
                  >
                  <input
                    type="text"
                    name="lastname"
                    id="requestTitle"
                    placeholder="Type here ..."
                    class="formbold-form-input"
                    v-model="requestTitle"
                    maxlength="100"
                    required
                  />
                  <p class="text-danger" v-if="notInputRequestTitle">
                    Please input request title
                  </p>
                </div>
                <div>
                  <label for="message" class="formbold-form-label">
                    Description
                  </label>
                  <textarea
                    rows="6"
                    name="message"
                    id="message"
                    placeholder="By describing the most important facts, we can quickly resolve your request."
                    class="formbold-form-input"
                    v-model="requestDescription"
                    maxlength="200"
                    required
                  ></textarea>
                  <p class="text-danger" v-if="notInputRequestDescription">
                    Please input request description
                  </p>
                </div>
                <div class="save_change text-start mt-2">
                  <button
                    class="co-white bg-co-black save_btn"
                    type="button"
                    @click="checkRequestForm(), (action = 'Request')"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-4 order_detail_tab">
            <div class="packages-tabs single">
              <div class="">
                <div class="package-content">
                  <span class="order_detail_head">Order Details</span>
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
                        (order.Price * order.TotalEstimation * 10) / 100
                      }}
                    </span>
                  </div>
                  <div class="order_number row">
                    <span class="col-md-6 order_number_left">Order number</span>
                    <span class="col-md-6 order_number_right text-end"
                      >#FO200{{ order.OrderID }}
                    </span>
                  </div>
                  <div v-if="order.Status == 'Completed'">
                    <div class="order_number row">
                      <span class="col-md-8 order_number_left"
                        >Add effort(hour)</span
                      >
                      <span class="col-md-4 order_number_right text-end"
                        ><input
                          type="number"
                          class="form-control w-100"
                          v-model="addEffort"
                          style="padding: 0 5px"
                          :readonly="
                            currentAccountInfo.Role == 'A' ||
                            currentAccountInfo.Role == 'F'
                          "
                        />
                      </span>
                    </div>
                    <div>
                      <p v-if="!isInputAddEffort" class="text-danger">
                        Please input valid effort
                      </p>
                    </div>
                    <div
                      v-if="currentAccountInfo.Role == 'C'"
                      class="order_number row"
                    >
                      <span class="col-md-8 order_number_left"> </span>
                      <span class="col-md-4 order_number_right text-center">
                        <button
                          id="btn-sub"
                          type="submit"
                          class="btn btn-primary bg-danger mt-1"
                          style="border: none; padding: 0 5px; font-size: 14px"
                          @click="checkInputEffort()"
                        >
                          Save
                        </button></span
                      >
                      <div class="button text-start"></div>
                    </div>
                  </div>
                  <hr class="featurette-divider" />
                  <span class="order_detail_head">Track Order</span>
                  <div class="track_order row">
                    <div
                      class="col-md-12 track_order_requirement"
                      v-if="order.Description != ''"
                    >
                      <i class="bi bi-check-circle-fill checked_active"></i>
                      <span
                        class="col-md-6 track_order_requirment_text text-end"
                        >Requirement submitted</span
                      >
                    </div>
                    <div
                      class="col-md-12 track_order_progress"
                      v-if="order.Status == 'Active'"
                    >
                      <i class="bi bi-play-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_progress_text text-end"
                        >Order in progress</span
                      >
                    </div>

                    <div
                      class="col-md-12 track_order_cancel"
                      v-if="order.Status == 'Cancel'"
                    >
                      <i class="bi bi-x-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Order cancelled</span
                      >
                    </div>
                    <div
                      class="col-md-12 track_order_late"
                      v-if="order.Status == 'Late'"
                    >
                      <i
                        class="bi bi-exclamation-circle-fill checked_active"
                      ></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Order late</span
                      >
                    </div>
                    <div
                      class="col-md-12 track_order_delivered"
                      v-if="order.Status == 'Delivered'"
                    >
                      <i class="bi bi-play-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Order delivered</span
                      >
                    </div>

                    <div
                      class="col-md-12 track_order_completed_status"
                      v-if="order.Status == 'Completed'"
                    >
                      <i class="bi bi-check-circle-fill checked_active"></i>

                      <span class="col-md-6 track_order_text text-end"
                        >Order completed</span
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
    <div class="confirm_add_requirment">
      <div
        class="modal fade show"
        style="display: block; background-color: #000000ad; padding-top: 10%"
        v-if="isshowConfirmAddRequirementModal"
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
                  isshowConfirmAddRequirementModal =
                    !isshowConfirmAddRequirementModal
                "
                aria-label="Close"
                style="color: white"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div>
                  <p class="modal-title">
                    Do you really want to save these change?
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
                  addChangeRequirement(
                    order.JobDescription,
                    addRequirement,
                    order.OrderRequestID
                  ),
                    (isshowConfirmAddRequirementModal =
                      !isshowConfirmAddRequirementModal)
                "
                >Save</a
              >
              <a
                type="button"
                class="btn btn-outline-info waves-effect"
                @click="
                  isshowConfirmAddRequirementModal =
                    !isshowConfirmAddRequirementModal
                "
                data-dismiss="modal"
                >Cancel</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm_send_request">
      <div
        class="modal fade show"
        style="display: block; background-color: #000000ad; padding-top: 10%"
        v-if="isshowConfirmSendRequestModal"
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
                  isshowConfirmSendRequestModal = !isshowConfirmSendRequestModal
                "
                aria-label="Close"
                style="color: white"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div>
                  <p class="modal-title">
                    Do you really want to {{ modalMessage }}?
                  </p>
                  <p class="modal-title">This process cannot be undone.</p>
                </div>
                <div v-if="action == 'DeclineDeliver' || action == 'ReDeliver'">
                  <form>
                    <div class="mb-3 text-start">
                      <label for="message-text" class="col-form-label"
                        >Message:</label
                      >
                      <textarea
                        class="form-control"
                        id="message-text"
                        v-model="deliveryMessage"
                      ></textarea>
                    </div>
                    <p v-if="!isInputMessage" class="text-danger">
                      <span v-if="action == 'DeclineDeliver'">
                        Please input decline deliver reason</span
                      >
                      <span v-if="action == 'ReDeliver'">
                        Please input some message for hirer</span
                      >
                    </p>
                    <div
                      class="mb-3 text-start text-dark"
                      v-if="action == 'DeclineDeliver'"
                    >
                      Note: Please provide reason you decline deliver here.
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div
              class="modal-footer justify-content-center"
              v-if="action == 'Request'"
            >
              <a
                type="button"
                class="btn btn-info waves-effect waves-light text-white"
                @click="
                  sendOrderRequest(
                    requestType,
                    requestTitle,
                    requestDescription,
                    order.OrderID,
                    currentAccountInfo.AccountID,
                    requestExtend
                  ),
                    (isshowConfirmSendRequestModal =
                      !isshowConfirmSendRequestModal)
                "
                >Send</a
              >
              <a
                type="button"
                class="btn btn-outline-info waves-effect"
                @click="
                  isshowConfirmSendRequestModal = !isshowConfirmSendRequestModal
                "
                data-dismiss="modal"
                >Cancel</a
              >
            </div>

            <div
              class="modal-footer justify-content-center"
              v-else-if="action == 'Deliver'"
            >
              <a
                type="button"
                class="btn btn-info waves-effect waves-light text-white"
                @click="
                  deliverOrder(),
                    (isshowConfirmSendRequestModal =
                      !isshowConfirmSendRequestModal)
                "
                >Save</a
              >
              <a
                type="button"
                class="btn btn-outline-info waves-effect"
                @click="
                  isshowConfirmSendRequestModal = !isshowConfirmSendRequestModal
                "
                data-dismiss="modal"
                >Cancel</a
              >
            </div>
            <div
              class="modal-footer justify-content-center"
              v-else-if="action == 'ApproveDeliver'"
            >
              <a
                type="button"
                class="btn btn-info waves-effect waves-light text-white"
                @click="
                  (isshowConfirmSendRequestModal =
                    !isshowConfirmSendRequestModal),
                    approveDeliver()
                "
                >Save</a
              >
              <a
                type="button"
                class="btn btn-outline-info waves-effect"
                @click="
                  isshowConfirmSendRequestModal = !isshowConfirmSendRequestModal
                "
                data-dismiss="modal"
                >Cancel</a
              >
            </div>
            <div
              class="modal-footer justify-content-center"
              v-else-if="action == 'DeclineDeliver'"
            >
              <a
                type="button"
                class="btn btn-info waves-effect waves-light text-white"
                @click="declineDeliver()"
                >Save</a
              >
              <a
                type="button"
                class="btn btn-outline-info waves-effect"
                @click="
                  isshowConfirmSendRequestModal = !isshowConfirmSendRequestModal
                "
                data-dismiss="modal"
                >Cancel</a
              >
            </div>
            <div
              class="modal-footer justify-content-center"
              v-else-if="action == 'ReDeliver'"
            >
              <a
                type="button"
                class="btn btn-info waves-effect waves-light text-white"
                @click="deliverAgain()"
                >Save</a
              >
              <a
                type="button"
                class="btn btn-outline-info waves-effect"
                @click="
                  isshowConfirmSendRequestModal = !isshowConfirmSendRequestModal
                "
                data-dismiss="modal"
                >Cancel</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="commonModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-light">
            <h5 class="modal-title" id="exampleModalLabel">Deliver Order</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3 text-start">
                <label for="recipient-name" class="col-form-label"
                  >Product Name:</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="deliveryName"
                />
                <p v-if="!isdeliveryName" class="text-danger">
                  Please input product name
                </p>
              </div>
              <!-- <div class="mb-3 text-start">
                <label for="message-text" class="col-form-label"
                  >Message:</label
                >
                <textarea class="form-control" id="message-text"></textarea>
              </div> -->
              <div class="mb-3 text-start text-dark">
                Note: Please check your delivery before send.
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deliverProduct()"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="completeModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-info text-light">
            <h5 class="modal-title" id="exampleModalLabel">Complete Order</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div>
                <p class="modal-title">Do you really want to add effort?</p>
                <p class="modal-title">This process cannot be undone.</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-info text-light"
              @click="addEffortAfterOrderCompleted()"
            >
              Save
            </button>
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
import HeaderAdmin from "../components/HeaderAdmin.vue";
import HeaderSell from "../components/HeaderSeller.vue";
import StarRating from "vue-star-rating";
import Review from "../components/Review.vue";
export default {
  name: "OrderDetailView",
  components: {
    Header,
    HeaderAdmin,
    HeaderSell,
    StarRating,
    Review,
  },
  data() {
    return {
      isdetail: true,
      isrequirement: false,
      isdelivery: false,
      order: {},
      moment: moment,
      isChangeRequest: false,
      addRequirement: "",
      requestType: "Cancel",
      requestTitle: "",
      requestDescription: "",
      currentAccountInfo: [],
      isshowConfirmAddRequirementModal: false,
      notInputRequirement: false,
      isshowConfirmSendRequestModal: false,
      requestExtend: 1,
      notInputRequestTitle: false,
      notInputRequestDescription: false,
      fileInput: [],
      modalMessage: "",
      isUploadFile: false,
      messageDanger: "",
      checkInputFile: false,
      deliveries: [],
      deliveryName: "",
      isdeliveryName: true,
      action: "",
      isInputActualAfford: true,
      actualAfford: 1,
      isInputAddEffort: true,
      addEffort: 1,
      rating: 0,
      feedBack: "",
      notInputRating: false,
      reviews: [],
      isInputMessage: true,
      selectedDeliverID: "",
      deliveryMessage: "",
    };
  },
  async created() {
    await this.onUpdateAccountInfo();
    await this.getOrderByID();
    // if (
    //   this.user.userId != this.order.CustomerID &&
    //   this.user.userId != this.order.FreelancerID &&
    //   this.user.role != "A"
    // ) {
    //   this.$router.push("/");
    // }
    await this.getReviewByOrderID();
  },
  methods: {
    async getOrderByID() {
      await axios
        .get("/orders/details/" + this.$route.params.id)
        .then((response) => {
          const order = response.data[0];
          this.order = order;
          this.addEffort = this.order.AddEffort;
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });
    },
    async addChangeRequirement(JobDescription, addRequirement, OrderRequestID) {
      var newRequirement = JobDescription + " " + addRequirement;
      if (addRequirement == "") {
        return;
      }
      const data = await axios
        .put("/orderrequest/updateOrderRequestJobDescription", {
          newJobDescription: newRequirement,
          OrderRequestID: OrderRequestID,
        })
        .then((response) => {
          toast.success("Add Job Description Successfully!", {
            theme: "colored",
            autoClose: 2000,
            onClose: () => location.reload(),
          });
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });
    },
    checkRequestForm() {
      if (this.requestTitle != "" && this.requestDescription == "") {
        this.notInputRequestDescription = true;
      } else if (this.requestTitle == "" && this.requestDescription != "") {
        this.notInputRequestTitle = true;
      } else if (this.requestDescription == "" && this.requestTitle == "") {
        this.notInputRequestTitle = true;
        this.notInputRequestDescription = true;
      } else {
        this.isshowConfirmSendRequestModal =
          !this.isshowConfirmSendRequestModal;
        this.modalMessage = "send these request";
      }
    },

    async sendOrderRequest(
      requestType,
      requestTitle,
      requestDescription,
      OrderID,
      userId,
      extendDay
    ) {
      const data = await axios
        .post("/changerequest/createChangeRequest", {
          changeRequest: {
            CreateByID: userId,
            Request_Title: requestTitle,
            Request_Description: requestDescription,
            requestType: requestType,
            OrderID: OrderID,
            ExtendDay: parseInt(extendDay),
          },
        })
        .then((response) => {
          toast.success("Send Request Successfully!", {
            theme: "colored",
            autoClose: 2000,
            onClose: () => location.reload(),
          });
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });
    },
    async uploadFiles() {
      // this.files = this.$refs.myFiles.files

      const fileInput = this.$refs.fileInput;
      if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        formData.append("orderID", this.order.OrderID);
        console.log(formData);
        axios
          .post("/orders/deliverOrder", formData)
          .then((response) => {
            // Handle the successful upload response
            console.log("File uploaded successfully", response);
            console.log(response);
            console.log(response.data);
            toast.success("Deliver Order Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.reload(),
            });
          })
          .catch((error) => {
            // Handle the error
            console.error("Error uploading file", error);
            toast.warn("Deliver Order Faild!", { autoClose: 2000 });
          });
      } else {
        // Handle case when no file is selected
        console.warn("Please select a file to upload");
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

    async getDeliveryByOrderID() {
      await axios
        .get("/delivery/getDeliveryByOrderId", {
          params: {
            id: this.order.OrderID,
          },
        })
        .then((response) => {
          const delivery = response.data.delivery;

          this.deliveries = delivery;
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });
    },
    async deliverProduct() {
      if (!this.deliveryName) {
        this.isdeliveryName = false;
      } else {
        $("#commonModal").modal("hide");
        await axios
          .post("/delivery/createDelivery", {
            Delivery: {
              DeliveryName: this.deliveryName,
              OrderID: this.order.OrderID,
              PlanEndDate: this.order.EndAt,
            },
          })
          .then((response) => {
            toast.success("Send Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => this.getDeliveryByOrderID(),
            });
          })
          .catch((error) => {
            // Handle the error
            console.error("Error here:", error);
            toast.warn("Failed!", { autoClose: 2000 });
          });
      }
    },

    async deliverOrder() {
      const data = await axios
        .put("/orders/updateStatus", {
          status: "Delivered",
          orderID: this.order.OrderID,
        })
        .then((response) => {
          toast.success("Deliver Order Successfully!", {
            theme: "colored",
            autoClose: 2000,
            onClose: () => location.reload(),
          });
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Deliver Order Failed!", { autoClose: 2000 });
        });
    },
    async checkInputEffort() {
      const inputValue = parseInt(this.addEffort);

      if (isNaN(inputValue) || !/^-?\d+$/.test(this.addEffort)) {
        // Display an error message or handle the invalid input as needed
        // Optionally reset the input to a valid value
        this.isInputAddEffort = false;
        return;
      } else {
        this.isInputAddEffort = true;
        $("#completeModal").modal("show");
      }
    },

    async addEffortAfterOrderCompleted() {
      if (!this.actualAfford) {
        this.isInputActualAfford = false;
      } else {
        $("#completeModal").modal("hide");
        await axios
          .put("/orders/addOrderEffort", {
            addEffort: this.addEffort,
            orderID: this.order.OrderID,
          })
          .then((response) => {
            toast.success("Add Order Effort Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.reload(),
            });
          })
          .catch((error) => {
            // Handle the error
            console.error("Error here:", error);
            toast.warn("Add Order Effort Failed!", { autoClose: 2000 });
          });
      }
    },
    setRating(rating) {
      this.rating = rating;
    },

    async sendReview() {
      var review = {
        ReviewerID: this.order.CustomerID,
        ReceiverID: this.order.FreelancerID,
        Rating_Score: this.rating,
        Comment: this.feedBack,
        OrderID: this.order.OrderID,
      };

      if (this.rating == 0 || !this.feedBack) {
        this.notInputRating = true;
      } else {
        await axios
          .post("/review/createReview", {
            Review: review,
          })
          .then((response) => {
            toast.success("Send Review Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => location.reload(),
            });
          })
          .catch((error) => {
            // Handle the error
            console.error("Error here:", error);
            toast.warn("Send Review Failed!", { autoClose: 2000 });
          });
      }
    },

    async getReviewByOrderID() {
      await axios
        .get("/review/getReviewByOrderId", {
          params: {
            id: this.order.OrderID,
          },
        })
        .then((response) => {
          const review = response.data.review;
          if(review)
          this.reviews = review;
          else this.reviews =[];
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });
    },
    async approveDeliver() {
      await axios
        .put("/delivery/approveDelivery", {
          status: "Accept",
          deliverID: this.selectedDeliverID,
        })
        .then((response) => {
          toast.success("Approve Delivery Successfully!", {
            theme: "colored",
            autoClose: 2000,
            onClose: () => {
              this.getDeliveryByOrderID();
              this.getOrderByID();
            },
          });
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Failed!", { autoClose: 2000 });
        });
    },
    async declineDeliver() {
      if (!this.deliveryMessage) {
        this.isInputMessage = false;
        return;
      } else {
        this.isshowConfirmSendRequestModal =
          !this.isshowConfirmSendRequestModal;
        await axios
          .put("/delivery/declineDelivery", {
            status: "Reject",
            deliverID: this.selectedDeliverID,
            declineReason: this.deliveryMessage,
          })
          .then((response) => {
            toast.success("Decline Delivery Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => this.getDeliveryByOrderID(),
            });
          })
          .catch((error) => {
            // Handle the error
            console.error("Error here:", error);
            toast.warn("Failed!", { autoClose: 2000 });
          });
      }
    },
    async deliverAgain() {
      if (!this.deliveryMessage) {
        this.isInputMessage = false;
        return;
      } else {
        this.isshowConfirmSendRequestModal =
          !this.isshowConfirmSendRequestModal;
        await axios
        .put("/delivery/deliverAgain", {
          status: "Delivered",
          deliverID: this.selectedDeliverID,
          deliveryMessage: this.deliveryMessage
        })
        .then((response) => {
          toast.success("Deliver Again Successfully!", {
              theme: "colored",
              autoClose: 2000,
              onClose: () => this.getDeliveryByOrderID(),
            });
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
          toast.warn("Deliver Again Failed!", { autoClose: 2000 });
        });
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

.order_detail_page .order_detail_title h5,
.product_delivery h5,
.common_title {
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

.order_table .table th,
.order_request_table .table th {
  padding: 10px;
}

.table .th_gig {
  width: 30%;
}

.table .th_user {
  width: 20%;
}

.table .th_user span {
  margin-left: 20px;
}

.order_table .table th {
  font-weight: 600;
  color: #a8a7a7;
  font-size: 13px;
  background-color: #f9f9f9;
}

.scrollable-row {
  /* max-width: 0px;
  overflow-x: auto;
  white-space: nowrap; */
  max-height: 50px; 
  overflow-y: auto; 
}

.product_delivery_end {
  background-color: #dc3545;
  color: white;
}

.product_delivery {
  cursor: pointer;
}
.request_status {
  font-size: 40px;
  margin: 2px 2px 3px 0;
  display: inline-block;
  vertical-align: middle;
  line-height: 10px;
}

.feedback_infomation {
  color: #9f9fa0;
}
.decline_button {
  border: 1px solid #0dcaf0;
}
</style>