<template>
  <div class="view_order_detail">
    <Header></Header>
    <div class="container">
      <div class="row">
        <div class="order_status row">
          <div
            class="col-md-2 status_item"
            @click="
              (isdetail = true),
                (isrequirement = false),
                (isdelivery = false),
                (isOrderRequest = false)
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
                (isOrderRequest = false)
            "
            :class="{ status_item_active: isrequirement }"
          >
            <h6>Requirements</h6>
          </div>
          <div
            class="col-md-2 status_item"
            @click="
              (isdetail = false),
                (isrequirement = false),
                (isdelivery = true),
                (isOrderRequest = false)
            "
            :class="{ status_item_active: isdelivery }"
          >
            <h6>Delivery</h6>
          </div>
          <div
            v-if="user.role != 'A'"
            class="col-md-2 status_item"
            @click="
              (isdetail = false),
                (isrequirement = false),
                (isdelivery = false),
                (isOrderRequest = true)
            "
            :class="{ status_item_active: isOrderRequest }"
          >
            <h6>Order Request</h6>
          </div>
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
                          order.CustomerFirstName + " " + order.CustomerLastName
                        }}</span>

                        <span class="" style="margin: 0 10px"> | </span>
                        <span class="delivery_time_left">Delivery Day </span>
                        <span class="col-md-6 delivery_time_right text-end"
                          >{{
                            moment(order.Order_Date)
                              .add(
                                24 * (order.Delivery_Day + order.Extend_Day),
                                "h"
                              )
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
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 order_detail_title">
                    <h5 class="text-end" style="font-size: 20px">
                      ${{
                        order.Price * order.Total_Amount +
                        order.Price * order.Total_Amount * 0.1
                      }}
                    </h5>
                  </div>
                </div>
              </div>
              <hr class="featurette-divider" />
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
                        <th scope="col">QTY</th>
                        <th scope="col">DURATION</th>
                        <th scope="col">PRICE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">{{ order.Title }}</td>
                        <td>{{ order.Total_Amount }}</td>
                        <td>{{ order.Delivery_Day }} days</td>
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
                          ${{ order.Price * order.Total_Amount }}
                        </th>
                      </tr>
                      <tr class="backgroud_gray">
                        <th scope="row">SERVICE FEE</th>
                        <th colspan="2"></th>
                        <th class="order_price">
                          ${{ order.Price * order.Total_Amount * 0.1 }}
                        </th>
                      </tr>

                      <tr class="backgroud_gray">
                        <th scope="row">TOTAL</th>
                        <th colspan="2"></th>
                        <th class="order_price">
                          ${{
                            order.Price * order.Total_Amount +
                            order.Price * order.Total_Amount * 0.1
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
            :style="{ display: isrequirement ? 'block' : 'none' }"
          >
            <div class="container">
              <div class="order_detail_overview">
                <div class="order_detail_overview_head row">
                  <div class="col-md-12 order_detail_title">
                    <h6 class="text-start">
                      <i class="bi bi-1-circle-fill icon_number"></i> Writing
                      your requiremnet here. Do you have any ideals of what you
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
                    Here is order requirement:  {{ order.OrderDescription }}
                  </p>
                  <div class="text_thanks">
                    <span>Thanks!</span>
                  </div>
                </div>
              </div>
              <hr class="featurette-divider" />

              <div class="order_detail_overview" v-if="user.role == 'C'">
                <div class="order_detail_overview_head row">
                  <div class="col-md-12 order_detail_title">
                    <h6 class="text-start">
                      <i class="bi bi-2-circle-fill icon_number"></i> You can
                      send more requiremnet here. Do you have any new ideals of
                      what you want ?
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
                          ? ((isshowConfirmAddRequirementModal =
                              !isshowConfirmAddRequirementModal),
                            (this.isUploadFile = false))
                          : (notInputRequirement = !notInputRequirement)
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
                    v-if="user.role == 'C'"
                  >
                     <!-- if freelancer has been delivered before -->
                    <div v-if="order.Delivery" class="Free_Delivered">
                      <div>
                        <label for="uploadProduct">
                          <i
                            class="bi bi-box-seam-fill box_icon_delivery text-black"
                          ></i>
                          <div>
                            <span class="d-inline">Click Here</span>
                          </div>
                        </label>
                        <input
                          id="uploadProduct"
                          type="file"
                          class="d-none"
                          name="sampleFile"
                          ref="fileInput"
                          accept="image/*,.pdf,.txt"
                          @change="checkInputFile=true"
                        />
                      </div>
                       <!-- if freelancer not upload new file -->
                      <p class="text-danger" v-if="!checkInputFile">
                        {{ messageDanger }}
                      </p>

                      <h6 class="text-center text_sologan">
                        Packages Delivered at the Speed of Need.
                      </h6>
                      <div class="delivery_infomation">
                        <span class="ordered_from_right">You </span>
                        <span class="delivery_infomation_date">
                          has delivered this order. You can upload your product again</span
                        >
                      </div>

                      <div class="deliver_order mt-4">
                        <button
                          class="co-white bg-co-black deliver_btn"
                          type="btn"
                          @click="
                            this.$refs.fileInput.files.length > 0
                              ? ((this.isshowConfirmSendRequestModal =
                                  !this.isshowConfirmSendRequestModal),
                                (this.modalMessage = 'deliver your product'),
                                (this.isUploadFile = true))
                              : (messageDanger = 'Please upload new file!')
                          "
                        >
                          Deliver
                        </button>
                      </div>
                    </div>
                    <div v-else class="Free_NotDelivered">
                      <div>
                        <input
                          id="uploadProduct"
                          type="file"
                          class="d-none"
                          name="sampleFile"
                          ref="fileInput"
                          accept="image/*,.pdf,.txt"
                          @change="checkInputFile=true"
                        />
                        <label for="uploadProduct">
                          <i
                            class="bi bi-box-seam-fill box_icon_delivery text-black"
                            v-if="checkInputFile"
                          ></i>
                          <i class="bi bi-box-seam box_icon_delivery" v-else></i>
                          <div>
                            <span class="d-inline">Click Here</span>
                          </div>
                        </label>
                        
                      </div>
                      <!-- if freelancer not upload file -->
                      <p class="text-danger" v-if="!checkInputFile">
                        {{ messageDanger }}
                      </p>

                      <h6 class="text-center text_sologan">
                        Packages Delivered at the Speed of Need.
                      </h6>
                      <div class="delivery_infomation">
                        <span class="ordered_from_right">You </span>
                        <span class="delivery_infomation_date">
                          should deliver this order on
                          {{
                            moment(order.Order_Date)
                              .add(
                                24 * (order.Delivery_Day + order.Extend_Day),
                                "h"
                              )
                              .format("MMMM Do, h:mm A")
                          }}</span
                        >
                      </div>

                      <div class="deliver_order mt-4">
                        <button
                          class="co-white bg-co-black deliver_btn"
                          type="btn"
                          @click="
                            this.$refs.fileInput.files.length > 0
                              ? ((this.isshowConfirmSendRequestModal =
                                  !this.isshowConfirmSendRequestModal),
                                (this.modalMessage = 'deliver your product'),
                                (this.isUploadFile = true))
                              : (messageDanger = 'Please upload file!')
                          "
                        >
                          Deliver
                        </button>
                      </div>
                    </div>
                  </div>
                   <!-- if user are Customer, Admin -->
                  <div class="col-md-12 order_detail_title" v-else>
                     <!-- if freelancer has not delivered before -->
                    <div v-if="!order.Delivery">
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
                            moment(order.Order_Date)
                              .add(
                                24 * (order.Delivery_Day + order.Extend_Day),
                                "h"
                              )
                              .format("MMMM Do, h:mm A")
                          }}</span
                        >
                      </div>
                    </div>
                     <!-- if freelancer has been delivered before -->
                    <div v-else>
                      <div>
                        <i
                          class="bi bi-box-seam-fill box_icon_delivery text-black"
                        ></i>
                      </div>

                      <h6 class="text-center text_sologan">
                        Your order has been delivered!
                      </h6>
                      <div class="delivery_infomation">
                        <span class="ordered_from_right"> </span>
                        <span class="delivery_infomation_date">
                          Please check delivery product on this order. If you
                          are satisfied please click on the completed button.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-md-8 order_detail_information step3"
            :style="{ display: isOrderRequest ? 'block' : 'none' }"
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
                <span>Create Order Request</span>
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
                      <option value="Extend" v-if="user.role != 'C'">
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
                  <label for="email" class="formbold-form-label">
                    Title Request</label
                  >
                  <input
                    type="email"
                    name="lastname"
                    id="email"
                    placeholder="Type here ..."
                    class="formbold-form-input"
                    v-model="requestTitle"
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
                    @click="checkRequestForm"
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
                          <span class="badge bg-primary rounded-pill d-inline">
                            In Progress</span
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
                      order.CustomerFirstName + " " + order.CustomerLastName
                    }}</span>
                  </div>
                  <div class="delivery_time row">
                    <span class="col-md-6 delivery_time_left"
                      >Delivery Time</span
                    >
                    <span class="col-md-6 delivery_time_right text-end"
                      >{{ order.Delivery_Day }} days</span
                    >
                  </div>
                  <div class="total_price row">
                    <span class="col-md-6 total_price_left">Total price</span>
                    <span class="col-md-6 total_price_right text-end"
                      >${{
                        order.Price * order.Total_Amount +
                        order.Price * order.Total_Amount * 0.1
                      }}
                    </span>
                  </div>
                  <div class="order_number row">
                    <span class="col-md-6 order_number_left">Order number</span>
                    <span class="col-md-6 order_number_right text-end"
                      >#FO200{{ order.OrderID }}
                    </span>
                  </div>
                  <hr class="featurette-divider" />
                  <span class="order_detail_head">Track Order</span>
                  <div class="track_order row">
                    <div
                      class="col-md-12 track_order_requirement"
                      v-if="order.OrderDescription != ''"
                    >
                      <i class="bi bi-check-circle-fill checked_active"></i>
                      <span
                        class="col-md-6 track_order_requirment_text text-end"
                        >Requirement submitted</span
                      >
                    </div>
                    <div
                      class="col-md-12 track_order_progress"
                      v-if="order.OrderStatus == 'Active'"
                    >
                      <i class="bi bi-play-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_progress_text text-end"
                        >Order in progress</span
                      >
                    </div>

                    <div
                      class="col-md-12 track_order_cancel"
                      v-if="order.OrderStatus == 'Cancel'"
                    >
                      <i class="bi bi-x-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Order cancelled</span
                      >
                    </div>
                    <div
                      class="col-md-12 track_order_late"
                      v-if="order.OrderStatus == 'Late'"
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
                      v-if="order.OrderStatus == 'Delivered'"
                    >
                      <i class="bi bi-play-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Order delivered</span
                      >
                    </div>

                    <div
                      class="col-md-12 track_order_completed_status"
                      v-if="order.OrderStatus == 'Completed'"
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
    <div class="confirm_send_request">
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
                    Do you really want to change these records?
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
                  addOrderRequirement(
                    order.OrderDescription,
                    addRequirement,
                    order.OrderID
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
    <div class="confirm_add_requirment">
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
              </div>
            </div>
            <div
              class="modal-footer justify-content-center"
              v-if="isUploadFile"
            >
              <a
                type="button"
                class="btn btn-info waves-effect waves-light text-white"
                @click="
                  uploadFiles(),
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

            <div class="modal-footer justify-content-center" v-else>
              <a
                type="button"
                class="btn btn-info waves-effect waves-light text-white"
                @click="
                  sendOrderOrderRequest(
                    requestType,
                    requestTitle,
                    requestDescription,
                    order.OrderID,
                    user.userId,
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
export default {
  name: "OrderDetailView",
  components: {
    Header,
  },
  data() {
    return {
      isdetail: true,
      isrequirement: false,
      isdelivery: false,
      order: {},
      moment: moment,
      isOrderRequest: false,
      addRequirement: "",
      requestType: "Cancel",
      requestTitle: "",
      requestDescription: "",
      user: [],
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
    };
  },
  async created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    const responseUserInfor = await axios.get("/users/info", {
      headers: { token: localStorage.getItem("token") },
    });
    const userInfor = responseUserInfor.data.user;
    this.user = userInfor;
    const responseOrder = await axios.get(
      "/orders/details/" + this.$route.params.id
    );
    const order = responseOrder.data[0];
    this.order = order;
    if (
      this.user.userId != this.order.CustomerID &&
      this.user.userId != this.order.FreelancerID &&
      this.user.role != "A"
    ) {
      this.$router.push("/");
    }
  },
  methods: {
    async addOrderRequirement(OrderDescription, addRequirement, orderID) {
      alert(OrderDescription + " " + addRequirement + " " + orderID);
      var newRequirement = OrderDescription + " " + addRequirement;
      const data = await axios.put("/orders/updateRequirement", {
        newRequirement: newRequirement,
        orderID: orderID,
      });
      console.log(data);
      if (data.data.message == "Add Requirement Success") {
        toast.success("Add Requirement Successfully!", {
          theme: "colored",
          autoClose: 2000,
          onClose: () => location.reload(),
        });
      } else {
        toast.warn("Add Requirement Faild!", { autoClose: 2000 });
      }
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

    async sendOrderOrderRequest(
      requestType,
      requestTitle,
      requestDescription,
      OrderID,
      userId,
      extendDay
    ) {
      alert(requestType + requestTitle + requestDescription + OrderID + userId);

      const data = await axios.post("/orders/createOrderRequest", {
        orderRequest: {
          CreateByID: userId,
          Request_Title: requestTitle,
          Request_Description: requestDescription,
          requestType: requestType,
          OrderID: OrderID,
          ExtendDay: parseInt(extendDay),
          Request_Action: "",
        },
      });

      console.log(data);

      if (data.data.message == "Send Request Success") {
        toast.success("Send Request Successfully!", {
          theme: "colored",
          autoClose: 2000,
          onClose: () => location.reload(),
        });
      } else {
        toast.warn("Send Request Faild!", { autoClose: 2000 });
      }
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
.deliver_order .deliver_btn {
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