<template>
  <div
    class="container"
    style="height: auto; max-width: -webkit-fill-available"
  >
    <header class="row">
      <Header></Header>
    </header>
    <NavCategory :listCategories="categories"></NavCategory>

    <div class="container">
      <div class="row">
        <!-- <aside class="col-sm-3">
            <div>
              <Sidebar></Sidebar>
            </div>
          </aside> -->
        <article class="col-sm-12">
          <div class="row">
            <div class="col-sm-12">
              <div class="row page_title col-md-12">
                <div class="col-md-1 col-sm-1 page_title_item">
                  <a class="" target="_self" href="/"
                    ><svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentFill"
                    >
                      <path
                        d="M12.773 14.5H3.227a.692.692 0 0 1-.482-.194.652.652 0 0 1-.2-.468V7.884H.5l7.041-6.212a.694.694 0 0 1 .918 0L15.5 7.884h-2.046v5.954a.652.652 0 0 1-.2.468.692.692 0 0 1-.481.194Zm-4.091-1.323h3.409V6.664L8 3.056 3.91 6.664v6.513h3.408v-3.97h1.364v3.97Z"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div class="col-md-1 col-sm-1 page_title_item">
                  <p class="">/</p>
                </div>

                <div class="col-md-3 col-md-3 d-inline page_title_category">
                  <a
                    class=""
                    target="_self"
                    href="/categories/programming-tech?source=gig_category_link"
                    >Gig Details</a
                  >
                </div>
              </div>
            </div>
          </div>
        </article>
        <div class="gig-page">
          <section class="row">
            <div class="col-md-7 main_information">
              <div class="gig_overview">
                <h1 class="gig_description">
                  <!-- I will convert your design layout into email template HTML
                  coding -->
                  {{ gig.Title }}
                </h1>
                <div style="display: inline">
                  <i class="fa fa-star"><b class="ratingScore">5.0</b></i>
                </div>
              </div>
              <div class="seller_overview row">
                <div class="user_image col-md-3">
                  <img
                    src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/795d7cb1444717c90dd23c3333fed16b-1604937118910/71a4c9ab-9941-441d-a03f-aa7e320f05ec.jpg"
                    class="profile-pict-img jumkns0"
                    alt="riketa"
                  />
                </div>
                <div class="user_information col-md-8">
                  <div class="row">
                    <div class="user_name col-md-4">
                      <a> <h1>Rickey</h1></a>
                    </div>
                    <div class="user_contact col-md-8">
                      <button class="btn_contract">Contact me</button>
                    </div>
                  </div>
                  <div class="user_other_information">
                    <span>I speake English, from Viet Nam</span>
                  </div>
                </div>
              </div>
              <div class="something_about_me">
                <div class="main_title">
                  <h5 class="">Something about me</h5>
                </div>
                <div class="something_about_me_text">
                  <span
                    >
                    Hi, I am expert for email development. I can help you for
                    build emails for various ESP platforms such as Mailchimp,
                    Campaign Monitor, Salseforce Marketing Cloud, Pardot,
                    Marketo, Sendgrid, Hubspot, Constant Contact, Active
                    Campaign, iContact, Klaviyo
                  </span>
                </div>
              </div>
              <div class="gig_information">
                <div class="main_title">
                  <h5 class="">About this Gig</h5>
                </div>

                <div class="gig_main_information">
                  <div class="gig_category">
                    <p>
                      Our's service promote business &amp; increase sales.
                    </p>
                  </div>
                  <div class="gig_descrription">
                    <p>
                      <!-- I am an Expert Email coder. Also, I have knowledge of lots
                      of ESP: MailChimp, Campaign Monitor, Salesforce, Exact
                      Target, Pardot, Sendgrid, Dotmailer, iContact, Bronto,
                      Marketo, Hubspot, Constant Contact & more... -->
                    {{ gig.Description }}

                    </p>
                  </div>
                </div>

                <section class="gig-gallery-component" tabindex="-1">
                  <div class="gallery-slideshow minimal-view">
                    <div class="swipe-events-wrapper">
                      <div class="slide slide-image">
                        <figure class="thumbnail" tabindex="0">
                          <img
                            alt="convert your design layout into email template HTML coding"
                            :src="gig.Gig_IMG"
                            class=""
                            style="height: 174px; width: 290px;"
                          />
                        </figure>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div class="gig_review">
                <div class="main_title">
                  <h5 class="">Reviews</h5>
                </div>
                <hr class="featurette-divider" />
                <Review></Review>
              </div>
            </div>
            <div class="col-md-5 order_tab">
              <div class="packages-tabs single">
                <div class="">
                  <div class="package-content">
                    <div class="order_default row">
                      <div class="col-md-7 order_title">
                        <h3>
                          <b>Premium Order Service</b>
                        </h3>

                        <div class="additional_info">
                          <div class="delivery_order">
                            <span
                              class="delivery_icon"
                              aria-hidden="true"
                              style="width: 16px; height: 16px"
                              ><svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
                                ></path>
                                <path d="M9 4H7v5h5V7H9V4z"></path></svg></span
                            ><b class="delivery">1 Day Delivery</b>
                          </div>
                        </div>
                      </div>

                      <div class="order_price col-md-5">
                        <h3>
                          <span class="price">US${{gig.Price}}</span>
                        </h3>
                      </div>
                      <div class="get_order">
                        <button
                          class="co-white bg-co-black order_btn"
                          type="button"
                        >
                          Get Order
                        </button>
                      </div>
                    </div>
                    <article></article>
                  </div>
                </div>
              </div>
              <div class="seller_contact">
                <div>
                  <button
                    class="co-white bg-co-black btn_seller_contact"
                    type="button"
                  >
                    Contact me
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section class="gig-detail-information"></section>
        </div>
      </div>
    </div>
    <footer class="panel panel-default">
      <Footer></Footer>
    </footer>
  </div>
</template>
    
    <script>
// @ is an alias to /src
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Review from "../components/Review.vue";
import NavCategory from "../components/NavCategory.vue";
import axios from 'axios';
export default {
  name: "HomePage",
  components: {
    Header,
    Footer,
    Review, NavCategory
  },
  data() {
    return {
      categories: [], gig: {},
    };
  },async created() {
    const responseCategory = await axios.get('/categories/get');
    const categories = responseCategory.data;
    this.categories = categories;

    const responseGig = await axios.get('/gigs/details/'+ this.$route.params.id);
    const gig = responseGig.data[0];
    this.gig = gig;
    
  }
};
</script>
    
    <style>
.dropdown-menu {
  width: 300px;
  position: fixed;
  margin-top: 8px;
  margin-left: 5%;
}
.dropdown-menu::before {
  content: "";
  height: 10px;
  left: 0;
  right: 0;
  top: 100%;
  position: absolute;
  background-color: transparent;
  transform: translateY(-1400%);
}

@media screen and (max-width: 990px) {
  #navCategory {
    display: none;
  }
}
.personalized-header {
  min-height: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 700;
  color: #222325;
  line-height: 140%;
  text-align: left;
}

.navCategory {
  color: #62646a;
  font: 400 16px/24px Macan, Helvetica Neue, Helvetica, Arial, sans-serif !important;
  display: block;
  font-size: 18px !important;
  line-height: 15px !important;
  position: relative;
}

.guildeMessage {
  margin-bottom: 20px;
}
.featurette-divider {
  margin: 30px 0;
}

.personalized-header h4 {
  font-size: 25px !important;
  line-height: 150% !important;
  color: #62646a;
}

.textDefault {
  margin: 0;
}

.page_title {
  text-align: left;
  margin-top: 30px;
}
.page_title_item {
  width: fit-content;
  font: 400 16px/24px Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
}
.page_title_item p {
  color: #c5c6c9;
  line-height: 28px;
}
.page_title_category a {
  text-decoration: none;
  color: #222325;
}
.gig_overview {
  text-align: left;
}
.gig_overview h1 {
  overflow-wrap: break-word;
  padding-bottom: 16px;
  line-height: 130%;
  font-size: 30px;
  color: #404145;
  font-family: Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: 700;
}

.seller_overview .user_information {
  text-align: left;
}
.user_name h1 {
  font-family: Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 25px;
  color: #222325;
}
.btn_contract {
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
.seller_overview .user_image img {
  width: 120px;
  height: 120px;
  font-size: 2.4em;
  border-radius: 50%;
}
.user_other_information {
  margin: 20px 0;
}
.seller_overview {
  margin: 30px 0;
}
.something_about_me {
  text-align: left;
}
.something_about_me p {
  font-family: Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
  color: #222325;
  font-size: 20px;
  font-weight: 500;
}
.something_about_me .something_about_me_text {
  max-height: 100px;
  overflow: hidden;
  color: #404145;
  font-family: Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 300;
}
.main_information {
  text-align: left;
}
.main_title {
  margin: 20px 0;
}
.main_title h5 {
  line-height: 130%;
  font-size: 26px;
  color: #404145;
  font-family: Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: 700;
}
.gig_main_information {
  color: #62646a;
}
.order_title h3 {
  font-size: 16px;
  line-height: 24px;
  margin: 0;
}
.order_price h3 {
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
}
.delivery_order {
  color: #62646a;
  font: 400 16px/24px Macan, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
}
.delivery_order b {
  margin-left: 4px;
}
.get_order .order_btn {
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
  width: 80%;
  margin: 30px 0;
}

.seller_contact .btn_seller_contact {
  border: 1px solid black;
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
  background-color: white;
  color: #404145;
  width: 80%;
  margin: 30px 0;
}
.package-content {
  border: 1px solid #dadbdd;
  margin-bottom: 32px;
  padding-top: 30px;
}
</style>