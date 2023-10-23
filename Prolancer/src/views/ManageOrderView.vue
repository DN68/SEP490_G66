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
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span
              class="input-group-text border-0 icon_search"
              id="search-addon"
            >
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="order_status row">
        <div class="col-md-2 status_item status_item_active">
          <h6>Active <span class="badge bg-secondary">4</span></h6>
        </div>
        <div class="col-md-2 status_item"><h6>New</h6></div>

        <div class="col-md-2 status_item"><h6>Late</h6></div>
        <div class="col-md-2 status_item"><h6>Delivered</h6></div>
        <div class="col-md-2 status_item"><h6>Completed</h6></div>
        <div class="col-md-2 status_item"><h6>Cancelled</h6></div>
      </div>
      <div class="order_table">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr style="border-bottom: 2px solid #dcd8d8">
              <th class="th_user"><span>FREELANCER</span></th>
              <th class="th_gig">GIG</th>
              <th>DUE ON</th>
              <th>TOTAL</th>
              <th>NOTE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td_user">
                <div class="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style="width: 45px; height: 45px"
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">John Doe</p>
                  </div>
                </div>
              </td>
              <td class="td_gig">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    I will convert your design layout into email template HTML
                    coding
                  </p>
                </div>
              </td>
              <td class="td_dueon">Mar 14</td>
              <td class="td_price">$20</td>
              <td class="td_note">No</td>
              <td class="td_status">
                <span class="badge bg-primary rounded-pill d-inline">
                  In Progress</span
                >
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                    class="rounded-circle"
                    alt=""
                    style="width: 45px; height: 45px"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Alex Ray</p>
                  </div>
                </div>
              </td>
              <td class="td_gig">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    I will convert your design layout into email template HTML
                    coding
                  </p>
                </div>
              </td>
              <td class="td_dueon">Mar 14</td>
              <td class="td_price">$20</td>
              <td class="td_note">No</td>
              <td class="td_status">
                <span class="badge rounded-pill bg-success d-inline">
                  Completed</span
                >
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                    class="rounded-circle"
                    alt=""
                    style="width: 45px; height: 45px"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Kate Hunington</p>
                  </div>
                </div>
              </td>
              <td class="td_gig">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    I will convert your design layout into email template HTML
                    coding
                  </p>
                </div>
              </td>
              <td class="td_dueon">Mar 14</td>
              <td class="td_price">$20</td>
              <td class="td_note">No</td>
              <td class="td_status">
                <span class="badge rounded-pill bg-secondary d-inline"
                  >Cancel</span
                >
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                    class="rounded-circle"
                    alt=""
                    style="width: 45px; height: 45px"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Kate Hunington</p>
                  </div>
                </div>
              </td>
              <td class="td_gig">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    I will convert your design layout into email template HTML
                    coding
                  </p>
                </div>
              </td>
              <td class="td_dueon">Mar 14</td>
              <td class="td_price">$20</td>
              <td class="td_note">No</td>
              <td class="td_status">
                <span class="badge rounded-pill bg-danger">Late</span>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                    class="rounded-circle"
                    alt=""
                    style="width: 45px; height: 45px"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Kate Hunington</p>
                  </div>
                </div>
              </td>
              <td class="td_gig">
                <div class="d-flex align-items-center">
                  <p class="fw-normal mb-1">
                    I will convert your design layout into email template HTML
                    coding
                  </p>
                </div>
              </td>
              <td class="td_dueon">Mar 14</td>
              <td class="td_price">$20</td>
              <td class="td_note">No</td>
              <td class="td_status">
                <span class="badge rounded-pill bg-info text-dark">New</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <a class="page-link" href="#">Prev</a>
          <a class="page-link" href="#">1</a>
          <a  class="page-link active" href="#">2</a>
          <a class="page-link" href="#">3</a>
          <a class="page-link" href="#">4</a>
          <a class="page-link" href="#">Next</a>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Header from "../components/Header.vue";
export default {
  name: "OrderDetailPage",
  components: {
    Header,
  },
  data() {
    return {};
  },
};
</script>
  
  <style>
  .pagination {
  display: inline-block;
  margin: 20px 0;
}

.pagination a {
  color: black;
  float: left;
  padding: 5px 12px;
  text-decoration: none;
  background-color: #f8f9fa;
}

.pagination a.active {
  background-color: #212020;
  color: white;
}

.pagination a:hover:not(.active) {background-color: #ddd;}
.input-group-text {
  background-color: white;
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