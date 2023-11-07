<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="manage_title row">
        <div class="col-md-3"><h3>Manage Orders</h3></div>
        <div class="col-md-3 search_bar">
          <div class="input-group rounded">
            <input
              type="search"
              class="form-control order_search"
              placeholder="Search Order History ..."
              v-model="searchOrder"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <router-link
              :to="{
                path: '/manageorder',
                query: {
                  search: searchOrder,
                  userID: user.userId,
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
      </div>
      <div class="order_status row">
        <div class="col-md-2 status_item " :class="{status_item_active: this.status == 'Active'}">
          <router-link
            @click="this.status = 'Active',selectedPage='1'"
            :to="{
              path: '/manageorder',
              query: {
                search: searchOrder,
                userID: user.userId,
                status: 'Active',
              },
            }"
            class="text-decoration-none"
          >
            <h6>
              Active <span v-if="this.status == 'Active'" class="badge bg-secondary">{{pagination.totalRow}}</span>
            </h6></router-link
          >
        </div>
        <div class="col-md-2 status_item"><h6>New</h6></div>

        <div class="col-md-2 status_item" :class="{status_item_active: this.status == 'Late'}">
          <router-link
            @click="this.status = 'Late',selectedPage='1'"
            :to="{
              path: '/manageorder',
              query: {
                page: 1,
                search: searchOrder,
                userID: user.userId,
                status: 'Late',
              },
            }"
            class="text-decoration-none"
          >
            <h6>Late<span v-if="this.status == 'Late'" class="badge bg-secondary">{{pagination.totalRow}}</span></h6>
          </router-link>
        </div>
        <div class="col-md-2 status_item" :class="{status_item_active: this.status == 'Delivered'}">
          <router-link
            @click="this.status = 'Delivered',selectedPage='1'"
            :to="{
              path: '/manageorder',
              query: {
                page: 1,
                search: searchOrder,
                userID: user.userId,
                status: 'Delivered',
              },
            }"
            class="text-decoration-none"
          >
          <h6>Delivered<span v-if="this.status == 'Delivered'" class="badge bg-secondary">{{pagination.totalRow}}</span></h6>
        </router-link>
        </div>
        <div class="col-md-2 status_item" :class="{status_item_active: this.status == 'Completed'}">
          <router-link
            @click="this.status = 'Completed',selectedPage='1'"
            :to="{
              path: '/manageorder',
              query: {
                page: 1,
                search: searchOrder,
                userID: user.userId,
                status: 'Completed',
              },
            }"
            class="text-decoration-none"
          >
          <h6>Completed<span v-if="this.status == 'Completed'" class="badge bg-secondary">{{pagination.totalRow}}</span></h6>
        </router-link>
        </div>
        <div class="col-md-2 status_item" :class="{status_item_active: this.status == 'Cancelled'}">
          <router-link
            @click="this.status = 'Cancelled',selectedPage='1'"
            :to="{
              path: '/manageorder',
              query: {
                page: 1,
                search: searchOrder,
                userID: user.userId,
                status: 'Cancelled',
              },
            }"
            class="text-decoration-none"
          >
          <h6>Cancelled<span v-if="this.status == 'Cancelled'" class="badge bg-secondary">{{pagination.totalRow}}</span></h6>
        </router-link>
        </div>
      </div>
      <div class="order_table">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr style="border-bottom: 2px solid #dcd8d8">
              <th class="th_user"><span>FREELANCER</span></th>
              <th class="th_gig">GIG</th>
              <th>DUE ON</th>
              <th>QTY</th>
              <th>TOTAL</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody v-if="orders.length>=1">
            <tr v-for="(order, index) in orders" :key="index">
              <td class="td_user">
                <div class="d-flex align-items-center">
                  <img
                    :src="order.Profile_Picture"
                    alt=""
                    style="width: 45px; height: 45px"
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">
                      {{
                        order.CustomerFirstName + " " + order.CustomerLastName
                      }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="td_gig">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    <!-- I will convert your design layout into email template HTML
                    coding -->
                    {{ order.Title }}
                  </p>
                </div>
              </td>
              <td class="td_dueon">
                {{
                  moment(order.Order_Date)
                    .add(24 * order.Delivery_Day, "h")
                    .format("MMMM Do")
                }}
              </td>
              <td class="td_note">{{ order.Total_Amount }}</td>

              <td class="td_price">
                ${{
                  order.Price * order.Total_Amount +
                  order.Price * order.Total_Amount * 0.1
                }}
              </td>
              <td class="td_status">
                <span v-if="order.OrderStatus=='Active'" class="badge bg-primary rounded-pill d-inline">
                  In Progress</span
                >
                <span v-if="order.OrderStatus=='Late'" class="badge rounded-pill bg-danger">Late</span>
                <span v-if="order.OrderStatus=='Delivered'" class="badge rounded-pill bg-info">Delivered</span>
                <span v-if="order.OrderStatus=='Completed'" class="badge rounded-pill bg-success d-inline">
                  Completed</span
                >
                <span v-if="order.OrderStatus=='Cancelled'" class="badge rounded-pill bg-secondary d-inline"
                  >Cancel</span
                >
              </td>
            </tr>
            
          </tbody>

        </table>
        <div v-if="orders.length==0" class="text-center"><h5>Order Not Found</h5></div>

        <div class="pagination">
          <router-link
            v-if="pagination.page - 1 == 0&&pagination.totalPage!=0"
            class="page-number"
            @click="selectedPage = pagination.page - 1"
            :to="{
              path: '/manageorder',
              query: {
                page: 1,
                search: searchOrder,
                userID: user.userId,
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
              path: '/manageorder',
              query: {
                page: pagination.page - 1,
                search: searchOrder,
                userID: user.userId,
                status: status,
              },
            }"
            ><i class="bi bi-arrow-left"></i
          ></router-link>
          <router-link
            :to="{
              path: '/manageorder',
              query: {
                page: index,
                search: searchOrder,
                userID: user.userId,
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
              path: '/manageorder',
              query: {
                page: pagination.page + 1,
                search: searchOrder,
                userID: user.userId,
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
import Header from "../components/Header.vue";
import axios from "axios";
var moment = require("moment");

export default {
  name: "CreateOrderDetailPage",
  components: {
    Header,
  },
  data() {
    return {
      user: [],
      orders: [],
      pagination: [],
      moment: moment,
      searchOrder: "",
      selectedPage: 1,
      status: "Active",
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
    console.log(this.user.userId);
    const responseData = await axios.get("/orders/index", {
      params: {
        page: this.selectedPage,
        search: this.searchOrder,
        userID: this.user.userId,
        status: this.status,
      },
    });
    const orders = responseData.data.order;
    this.orders = orders;
    const paging = responseData.data.pagination;
    this.pagination = paging;
    console.log(this.pagination);
  },
  async beforeRouteUpdate() {
    console.log("Run Here");
    const responseDateWithPage = await axios.get("/orders/index", {
      params: {
        page: this.selectedPage,
        search: this.searchOrder,
        userID: this.user.userId,
        status: this.status,
      },
    });

    const orders = responseDateWithPage.data.order;
    this.orders = orders;

    const searchQuery = responseDateWithPage.data.searchQuery;
    this.searchOrder = searchQuery.search;
    const paging = responseDateWithPage.data.pagination;
    this.pagination = paging;
    console.log("this.selectedPage " + (this.pagination.page + 1));
  },
};
</script>
  
  <style>
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
.order_search {
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
.order_status {
  padding-bottom: 10px;
  border-bottom: 1px solid #dcd8d8;
}
.order_status {
  margin: 20px 0;
}

.order_status .status_item {
  text-align: left;
  width: fit-content;
  text-transform: uppercase;
}
.order_status .status_item h6 {
  font-weight: 500;
  color: #9f9fa0;

  font-size: 15px;
}

.order_status .status_item_active h6 {
  color: #303032;
}
.manage_title h3 {
  text-align: left;
  font-weight: 600;
}
.order_table .table th {
  padding: 10px;
}
.table .th_user,
.th_gig {
  text-align: left;
}

.table .th_gig {
  width: 30%;
}

.table .td_gig p {
  color: #757575 !important;
}
.table .th_user {
  width: 25%;
}

.table .th_user span {
  margin-left: 20px;
}
.td_gig {
  text-align: left;
}
.order_table .table th {
  font-weight: 600;
  color: #a8a7a7;
  font-size: 13px;
}
</style>