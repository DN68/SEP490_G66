<template>
  <div class="container">
    <body>
      <div class="container-xl">
        <div class="row">
          <div class="col-md-12">
            <!-- <h2>Featured <b>Products</b></h2> -->
            <div
              id="myCarousel"
              class="carousel slide"
              data-bs-ride="carousel"
              data-interval="0"
            >
              <!-- Carousel indicators -->

              <ol class="carousel-indicators">
                <li
                  data-bs-target="#myCarousel"
                  data-bs-slide-to="0"
                  class="listCarouse active"
                  style="
                    width: 10px;
                    height: 10px;
                    margin: 4px px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(0, 0, 0, 0.4);
                  "
                ></li>
                <li
                  class="listCarouse"
                  data-bs-target="#myCarousel"
                  data-bs-slide-to="1"
                  style="
                    width: 10px;
                    height: 10px;
                    margin: 4px px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(0, 0, 0, 0.4);
                  "
                ></li>
                <li
                  class="listCarouse"
                  data-bs-target="#myCarousel"
                  data-bs-slide-to="2"
                  style="
                    width: 10px;
                    height: 10px;
                    margin: 4px px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(0, 0, 0, 0.4);
                  "
                ></li>
              </ol>
              <!-- Wrapper for carousel items -->
              <div class="carousel-inner">
                <div class="item carousel-item active">
                  <div class="row">
                    <div
                      class="col-sm-3 itemList"
                      v-for="(gig, index) in listGigs"
                      :key="index"
                    >
                      <router-link
                        :to="'/gigdetail/' + gig.GigID"
                        style="text-decoration: none"
                      >
                        <div class="thumb-wrapper" v-if="index < 4">
                          <!-- <span class="wish-icon"
                            ><i class="fa fa-heart-o"></i
                          ></span> -->
                          <div class="img-box">
                            <img
                              :src="gig.Gig_IMG"
                              class="img-fluid rounded"
                              alt="Img"
                            />
                          </div>
                          <div class="thumb-content">
                            <div class="row userRow">
                              <div class="col-md-12">
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
                                  >{{
                                    gig.First_Name + " " + gig.Last_Name
                                  }}</span
                                >
                              </div>
                              <div class="col-md-10">
                                <span style="font-size: 14px; color: #74767e"
                                  >@</span
                                >
                                <span
                                  style="text-align: left; color: #74767e"
                                  >{{ gig.Username }}</span
                                >
                              </div>
                              <!-- <div class="col-md-4">
                                <h3 class="userLevel">Level 3</h3>
                              </div> -->
                            </div>

                            <h3 class="gigDescription">
                              {{ gig.Title }}
                            </h3>
                            <div class="row">
                              <div class="star-rating">
                                <ul class="list-inline starRatingUl">
                                  <li class="list-inline-item">
                                    <div style="display: inline">
                                      <i class="fa fa-star"
                                        ><b class="ratingScore">{{
                                          gig.Rating
                                            ? parseFloat(gig.Rating).toFixed(1)
                                            : "..."
                                        }}</b></i
                                      >
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="row">
                              <div class="orderPrice col-md-3">
                                <span class="gigPrice"
                                  >From&nbsp;<span
                                    >US${{ gig.Price }}</span
                                  ></span
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
                <div class="item carousel-item">
                  <div class="row">
                    <div
                      class="col-sm-3 itemList"
                      v-for="(gig, index) in listGigs"
                      :key="index"
                    >
                      <router-link
                        :to="'/gigdetail/' + gig.GigID"
                        style="text-decoration: none"
                      >
                        <div
                          class="thumb-wrapper"
                          v-if="index >= 4 && index < 8"
                        >
                          <!-- <span class="wish-icon"
                            ><i class="fa fa-heart-o"></i
                          ></span> -->
                          <div class="img-box">
                            <img
                              :src="gig.Gig_IMG"
                              class="img-fluid rounded"
                              alt="Img"
                            />
                          </div>
                          <div class="thumb-content">
                            <div class="row userRow">
                              <div class="col-md-12">
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
                                  >{{
                                    gig.First_Name + " " + gig.Last_Name
                                  }}</span
                                >
                              </div>
                              <div class="col-md-10">
                                <span style="font-size: 14px; color: #74767e"
                                  >@</span
                                >
                                <span
                                  style="text-align: left; color: #74767e"
                                  >{{ gig.Username }}</span
                                >
                              </div>
                              <!-- <div class="col-md-4">
                                <h3 class="userLevel">Level 3</h3>
                              </div> -->
                            </div>

                            <h3 class="gigDescription">
                              {{ gig.Title }}
                            </h3>
                            <div class="row">
                              <div class="star-rating">
                                <ul class="list-inline starRatingUl">
                                  <li class="list-inline-item">
                                    <div style="display: inline">
                                      <i class="fa fa-star"
                                        ><b class="ratingScore">{{
                                          gig.Rating
                                            ? parseFloat(gig.Rating).toFixed(1)
                                            : "..."
                                        }}</b></i
                                      >
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="row">
                              <div class="orderPrice col-md-3">
                                <span class="gigPrice"
                                  >From&nbsp;<span
                                    >US${{ gig.Price }}</span
                                  ></span
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
                <div class="item carousel-item">
                  <div class="row">
                    <div
                      class="col-sm-3 itemList"
                      v-for="(gig, index) in listGigs"
                      :key="index"
                    >
                      <router-link
                        :to="'/gigdetail/' + gig.GigID"
                        style="text-decoration: none"
                      >
                        <div
                          class="thumb-wrapper"
                          v-if="index >= 8 && index < 12"
                        >
                          <!-- <span class="wish-icon"
                            ><i class="fa fa-heart-o"></i
                          ></span> -->
                          <div class="img-box">
                            <img
                              :src="gig.Gig_IMG"
                              class="img-fluid rounded"
                              alt="Img"
                            />
                          </div>
                          <div class="thumb-content">
                            <div class="row userRow">
                              <div class="col-md-12">
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
                                  >{{
                                    gig.First_Name + " " + gig.Last_Name
                                  }}</span
                                >
                              </div>
                              <div class="col-md-10">
                                <span style="font-size: 14px; color: #74767e"
                                  >@</span
                                >
                                <span
                                  style="text-align: left; color: #74767e"
                                  >{{ gig.Username }}</span
                                >
                              </div>
                              <!-- <div class="col-md-4">
                                <h3 class="userLevel">Level 3</h3>
                              </div> -->
                            </div>

                            <h3 class="gigDescription">
                              {{ gig.Title }}
                            </h3>
                            <div class="row">
                              <div class="star-rating">
                                <ul class="list-inline starRatingUl">
                                  <li class="list-inline-item">
                                    <div style="display: inline">
                                      <i class="fa fa-star"
                                        ><b class="ratingScore">{{
                                          gig.Rating
                                            ? parseFloat(gig.Rating).toFixed(1)
                                            : "..."
                                        }}</b></i
                                      >
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="row">
                              <div class="orderPrice col-md-3">
                                <span class="gigPrice"
                                  >From&nbsp;<span
                                    >US${{ gig.Price }}</span
                                  ></span
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
              <!-- Carousel controls -->
              <a
                class="carousel-control-prev"
                href="#myCarousel"
                data-bs-slide="prev"
                style="
                  width: 30px;

                  background-color: red;
                "
              >
                <i class="fa fa-angle-left"></i>
              </a>
              <a
                class="carousel-control-next"
                href="#myCarousel"
                data-bs-slide="next"
                style="
                  width: 30px;

                  background-color: red;
                "
              >
                <i class="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  props: ["listGigs"],
};
</script>

<style>
.carousel {
  margin: 10px auto;
  padding: 0 70px;
}
.carousel .item {
  color: #747d89;
  min-height: 325px;
  text-align: center;
  overflow: hidden;
}
.carousel .thumb-wrapper {
  margin: 10px;
  padding: 5px 15px 15px 15px;
  background: #fff;
  border-radius: 6px;
  text-align: center;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.carousel .img-box img {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
}
.carousel .item .img-box {
  height: 120px;
  margin-bottom: 20px;
  width: 100%;
  position: relative;
}
.fa-heart-o:before {
  margin-right: 10px;
}
.carousel .item h4 {
  font-size: 18px;
}
.carousel .item h4,
.carousel .item p,
.carousel .item ul {
  margin-bottom: 5px;
}
.carousel .thumb-content .btn {
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
.carousel .thumb-content .btn:hover,
.carousel .thumb-content .btn:focus {
  color: #fff;
  background: #e37e7f;
  box-shadow: none;
}
.carousel .thumb-content .btn i {
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
}
.carousel .item-price {
  font-size: 13px;
  padding: 2px 0;
}
.carousel .item-price strike {
  opacity: 0.7;
  margin-right: 5px;
}
.carousel-control-prev,
.carousel-control-next {
  height: 44px;
  width: 40px;
  background: #e37e7f;
  margin: auto 0;
  border-radius: 4px;
  opacity: 0.8;
}
.carousel-control-prev:hover,
.carousel-control-next:hover {
  background: #f53639;
  opacity: 1;
}
.carousel-control-prev i,
.carousel-control-next i {
  font-size: 36px;
  position: absolute;
  top: 50%;
  display: inline-block;
  margin: -19px 0 0 0;
  z-index: 5;
  left: 0;
  right: 0;
  color: #fff;
  text-shadow: none;
  font-weight: bold;
}
.carousel-control-prev i {
  margin-left: -2px;
}
.carousel-control-next i {
  margin-right: -4px;
}
.carousel-indicators {
  bottom: -50px;
}
.carousel-indicators li,
.carousel-indicators li.active {
  width: 10px;
  height: 10px;
  margin: 4px;
  border-radius: 50%;
  border: none;
}
.carousel-indicators li {
  background: rgba(0, 0, 0, 0.2);
}
.carousel-indicators li.active {
  background: rgba(0, 0, 0, 0.6);
}
.carousel .wish-icon {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 99;
  cursor: pointer;
  font-size: 16px;
  color: #abb0b8;
}
.carousel .wish-icon .fa-heart {
  color: #ff6161;
}
.star-rating li {
  padding: 0;
}
.star-rating i {
  font-size: 14px;
  color: #ffc000;
}
.listCarouse {
  list-style-type: none;
}
.carousel-item .btnOrder {
  float: right;
  position: relative;
}
</style>