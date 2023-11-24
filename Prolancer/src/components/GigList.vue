<template>
  <div class="container">
    <body>
      <div class="container-xl">
        <div class="row">
          <div class="col-md-12">
            <div class="row gigList" >
              <div class="col-sm-3 itemList" v-for="(gig, index) in listGigs" :key="index">
              <router-link :to="'/gigdetail/'+ gig.GigID" style="text-decoration: none;">

                <div class="thumb-wrapper">
                  <span class="wish-icon"><i class="fa fa-heart-o"></i></span>
                  <div class="img-box">
                    <img
                      :src="gig.Gig_IMG"
                      class="img-fluid rounded"
                      alt="Macbook"
                    />
                  </div>
                  <div class="thumb-content">
                    <div class="row userRow">
                      <div class="col-md-7">
                        <img
                          :src="gig.Profile_Picture"
                          class="rounded-circle"
                          height="25"
                          alt=""
                          loading="lazy"
                          style="width: 30px; border: 1px solid"
                        />
                        <span
                          class="userInfor"
                          style="text-align: left; color: #222325"
                          >{{gig.First_Name+' '+gig.Last_Name}}</span
                        >
                      </div>
                      <div class="col-md-5">
                        <h3 class="userLevel">{{ gig.Delivery_Day}} day(s)</h3>
                      </div>
                    </div>

                    <h3 class="gigDescription">
                      <!-- I will write js and fix bug for you will write js and fix
                      bug for you -->
                      {{ gig.Title}}
                    </h3>
                    <div class="row">
                      <div class="star-rating">
                        <ul class="list-inline starRatingUl">
                          <li class="list-inline-item">
                            <div style="display: inline">
                              <i class="fa fa-star"
                                ><b class="ratingScore">5.0</b></i
                              >
                            </div>
                          </li>
                        </ul>
                      </div>
                    
                    </div>
                    <div class="row">
                      <div class="orderPrice col-md-3">
                        <span class="gigPrice"
                          >From&nbsp;<span>US${{ gig.Price }}</span></span
                        >
                      </div>
                      <div class="getOrder col-md-9">
                        <a href="#" class="btn btn-primary btnOrder"
                          >Get Order</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
               </router-link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </body> 
  </div>
</template>

<script>
export default {
  props: [
    'listGigs'
  ]

};
</script>

<style>
.wish-icon {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 99;
  cursor: pointer;
  font-size: 16px;
  color: #abb0b8;
}
.thumb-wrapper {
  color: #747d89;
  margin: 10px;
  padding: 25px 15px;
  background: #fff;
  border-radius: 6px;
  text-align: center;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.thumb-wrapper .img-box {
  height: 120px;
  margin-bottom: 20px;
  width: 100%;
  position: relative;
}
.img-box img {
  width: 110%;
  height: 110%;
    
  display: inline-block;
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
}

.thumb-content .btn {
  color: #e37e7f;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  background: none;
  border: 1px solid #e37e7f;
  padding: 6px 14px;
  line-height: 16px;
  border-radius: 20px;
}
.thumb-content .btn:hover,
.thumb-content .btn:focus {
  color: #fff;
  background: #e37e7f;
  box-shadow: none;
}
.itemList {
  background-color: #fafafa;
}
.userRow {
  justify-content: space-around;
}
.userInfor {
  text-align: left;
  color: #222325;
  font: 700 16px/24px Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
  margin-left: 4px;
}
.gigDescription {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  margin-top: 10px;
  color: #525357;
}
.userLevel {
  font-size: 16px;
  color: #525357;
}
.starRatingUl {
  margin: 0;
}
.starRatingUl i {
  color: #222325;
  font-size: 18px;
}
.ratingScore {
  padding-left: 4px;
  font-size: 14px;
  line-height: 21px;
}
.list-inline {
  text-align: left;
}
.orderPrice {
  text-align: left;
}
.gigPrice {
  font-weight: 700;
  color: #222325;
}
.gigList .itemList .btnOrder {
  float: right;
  right: 20px;
  position: relative;
}

.container-xl{
  background-color: #fafafa;
}
</style>