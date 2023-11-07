<template>
  <div class="view_order_detail">
    <Header></Header>
    <div class="container">
      <div class="row">
        <div class="order_status row">          
          <div class="col-md-2 status_item"  @click="isdetail =true, isrequirement=false, isdelivery=false" :class="{ status_item_active: isdetail }">
            <h6>Details</h6>
          </div>

          <div class="col-md-2 status_item " @click="isdetail =false, isrequirement=true, isdelivery=false" :class="{ status_item_active: isrequirement }">
            <h6>Requirements</h6>
          </div>
          <div class="col-md-2 status_item" @click="isdetail =false, isrequirement=false, isdelivery=true" :class="{ status_item_active: isdelivery }"><h6>Delivery</h6></div>
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
                    <h5 class="text-start">{{order.Title}}</h5>
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
                        <span class="ordered_from_right">{{order.CustomerFirstName+' '+ order.CustomerLastName }}</span>
                        <span class="" style="margin: 0 10px"> | </span>
                        <span class="delivery_time_left">Delivery Day </span>
                        <span class="col-md-6 delivery_time_right text-end"
                          >{{moment(order.Order_Date).add((24*order.Delivery_Day), 'h').format("MMMM Do, h:mm A")}} </span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 order_detail_title">
                    <h5 class="text-end" style="font-size: 20px">${{
                          order.Price * order.Total_Amount +
                          order.Price * order.Total_Amount * 0.1
                        }}</h5>
                  </div>
                </div>
              </div>
              <hr class="featurette-divider" />
              <div class="order_detail_overview_body row">
                <div class="order_detail_title order_table_head text-start">
                  <span class="col-md-6 order_number_right"
                    ><i class="bi bi-box-seam me-1"></i>YOUR ORDER
                  </span>
                  <span class="delivery_time_left fst-italic">{{moment(order.Order_Date).format("MMMM Do, h:mm A")}} </span>
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
                        <td scope="row">{{order.Title}}</td>
                        <td>{{order.Total_Amount}}</td>
                        <td>{{order.Delivery_Day}} days</td>
                        <td>${{order.Price}}</td>
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
                        <td colspan="2"></td>
                        <td class="order_price">${{
                          order.Price * order.Total_Amount
                        }}</td>
                      </tr>
                      <tr class="backgroud_gray">
                        <th scope="row">SERVICE FEE</th>
                        <td colspan="2"></td>
                        <td class="order_price">${{                       
                          order.Price * order.Total_Amount * 0.1
                        }}</td>
                      </tr>

                      <tr class="backgroud_gray">
                        <th scope="row">TOTAL</th>
                        <td colspan="2"></td>
                        <td class="order_price">${{
                          order.Price * order.Total_Amount +
                          order.Price * order.Total_Amount * 0.1
                        }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8 order_detail_information step2" style="display: none;" :style="{ display: isrequirement ? 'block' : 'none' }"  >
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
                    Title: Rev Caption Tutorial: Finished Captions Example Lorem
                    Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. {{order.OrderDescription}}
                  </p>
                  <div class="text_thanks">
                    <span>Thanks!</span>
                  </div>
                </div>
              </div>
              <hr class="featurette-divider" />

              <div class="order_detail_overview">
                
                <div class="order_detail_overview_head row">
                  <div class="col-md-12 order_detail_title">
                    <h6 class="text-start">
                      <i class="bi bi-2-circle-fill icon_number" ></i> You can send more requiremnet here. Do you have any new ideals of what you
                      want ?
                    </h6>
                  </div>
                  <div class="form-outline more_requirment">
                      <textarea
                        class="form-control"
                        id="textAreaExample6"
                        rows="5"
                        required
                      ></textarea>
                      <label class="form-label" for="textAreaExample6"></label>
                    </div>
                    <div class="start_order text-start">
                      <button
                        class="co-white bg-co-black start_btn"
                        type="button"
                        @click="startOrder()"
                      >
                        Save
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8 order_detail_information step3" :style="{ display: isdelivery ? 'block' : 'none' }" >
            <div class="container">
              <div class="order_delivery">
                <div class="order_detail_overview_head row">
                  <div class="col-md-12 order_detail_title">
                    <div>
                      <i class="bi bi-box-seam box_icon_delivery" ></i>
                    </div>
                    <h6 class="text-center text_sologan">
                      Packages Delivered at the Speed of Need. Please wait.
                    </h6>
                    <div class="delivery_infomation">
                      <span class="ordered_from_right">leorubiano </span> <span class="delivery_infomation_date"> shoul deliver this order on {{moment(order.Order_Date).add((24*order.Delivery_Day), 'h').format("MMMM Do, h:mm A")}}</span>
                    </div>
                  </div>
                </div>
              </div>
              
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
                                {{order.Title}}
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
                    <span class="col-md-6 ordered_from_right text-end"
                      >{{order.CustomerFirstName+' '+ order.CustomerLastName }}</span
                    >
                  </div>
                  <div class="delivery_time row">
                    <span class="col-md-6 delivery_time_left"
                      >Delivery Time</span
                    >
                    <span class="col-md-6 delivery_time_right text-end"
                      >{{order.Delivery_Day}} days</span
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
                      >#FO200{{order.OrderID}}
                    </span>
                  </div>
                  <hr class="featurette-divider" />
                  <span class="order_detail_head">Track Order</span>
                  <div class="track_order row">
                    <div class="col-md-12 track_order_requirement" v-if="order.OrderDescription!=''">
                      <i class="bi bi-check-circle-fill checked_active"></i>
                      <span
                        class="col-md-6 track_order_requirment_text text-end"
                        >Requirement submitted</span
                      >
                    </div>
                    <div class="col-md-12 track_order_progress" v-if="order.OrderStatus=='Active'">
                      <i class="bi bi-play-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_progress_text text-end"
                        >Order in progress</span
                      >
                    </div>
                    
                    <div class="col-md-12 track_order_cancel " v-if="order.OrderStatus=='Cancel'">
                      <i class="bi bi-x-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Order cancelled</span
                      >
                    </div>
                    <div class="col-md-12 track_order_late " v-if="order.OrderStatus=='Late'">
                      <i class="bi bi-exclamation-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Order late</span
                      >
                    </div>
                    <div class="col-md-12 track_order_delivered" v-if="order.OrderStatus=='Delivered'">
                      <i class="bi bi-play-circle-fill checked_active"></i>
                      <span class="col-md-6 track_order_text text-end"
                        >Order delivered</span
                      >
                    </div>

                    <div class="col-md-12 track_order_completed_status" v-if="order.OrderStatus=='Completed'">
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
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from "axios";
var moment = require('moment');
export default {
  name: "OrderDetailView",
  components: {
    Header,
  },
  data() {
    return {
      isdetail:true,
      isrequirement:false,
      isdelivery:false,
      order: {},
      moment: moment
    };
  },
  async created() {
    const responseOrder = await axios.get('/orders/details/'+  this.$route.params.id);
    const order = responseOrder.data[0];
    this.order = order;
  }
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
.order_detail_tab .track_order_progress, .track_order_cancel, .track_order_late, .track_order_delivered, 
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
td {
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
.order_detail_overview .start_order .start_btn {
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
.order_detail_overview .more_requirment{
  margin: 0;
}
.order_delivery .box_icon_delivery {
  font-size: 100px;
}
.delivery_infomation .delivery_infomation_date {
  color: #9f9fa0;
}
.order_delivery .text_sologan{
  font-size: 22px;  
}
.view_order_detail .step2 {
  margin-bottom: 30px;
}
</style>