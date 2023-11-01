<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="row">
        <div class="order_status row">
        <div class="col-md-2 status_item status_item_active">
          <h6>Activity</h6>
        </div>
        <div class="col-md-2 status_item"><h6>Details</h6></div>

        <div class="col-md-2 status_item"><h6>Requirments</h6></div>
        <div class="col-md-2 status_item"><h6>Delivery</h6></div>
      </div>

      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "OrderDetailView",
  components: {
    Header,
  },
  data() {
    return {};
  },
};
</script>

<style>
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
</style>