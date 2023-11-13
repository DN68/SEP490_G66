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
              <div
                data-testid="personalized-header"
                class="personalized-header"
              >
                Hello, {{ user.username }}
              </div>
            </div>
            <div class="col-sm-6"></div>
            <div class="col-sm-6"></div>

            <div class="guilde">
              <div class="row">
                <div class="col-sm-12">
                  <div class="row">
                    <div class="col-sm-12">
                      <h4 class="guildeMessage">
                        <b>Here's what you are looking for your website</b>
                      </h4>
                    </div>
                    <!-- <div class="col-sm-4">
                      <a
                        target="_blank"
                        href="#"
                        class="carousel-link text-display-4"
                        ><span>View checklist </span></a
                      >
                    </div> -->
                  </div>
                </div>
                <div
                  class="row"
                  style="justify-content: space-between; margin: 0 auto"
                >
                  <div class="col-sm-2 guildeIteam">
                    <div class="guildeBack">
                      <i class="bi bi-database" style="font-size: 20px"></i>
                    </div>
                    <p class="textDefault">Database</p>
                  </div>
                  <div class="col-sm-2 guildeIteam">
                    <div class="guildeBack">
                      <i class="bi bi-easel" style="font-size: 20px"></i>
                    </div>

                    <p class="textDefault">Website Design</p>
                  </div>
                  <div class="col-sm-2 guildeIteam">
                    <div class="guildeBack">
                      <i class="bi bi-laptop" style="font-size: 20px"></i>
                    </div>
                    <p class="textDefault">Website Development</p>
                  </div>
                  <div class="col-sm-2 guildeIteam">
                    <div class="guildeBack">
                      <i class="bi bi-gear" style="font-size: 20px"></i>
                    </div>
                    <p class="textDefault">Website Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <article class="col-sm-12">
          <body>
            <section>
              <div class="col-sm-12">
                <div
                  data-testid="personalized-header"
                  class="personalized-header"
                >
                  <h4>
                    <span>Most popular Gigs in</span>&nbsp;<a
                      target="_blank"
                      href=""
                      class="carousel-link text-display-4"
                      ><span>Software Development</span></a
                    >&nbsp;
                  </h4>
                </div>
                <GigCarousel :listGigs="gigs"></GigCarousel>
              </div>
            </section>

            <section>
              <div class="col-sm-12">
                <div
                  data-testid="personalized-header"
                  class="personalized-header"
                >
                  <!-- <h4><span>Gigs may you find</span>&nbsp;</h4> -->
                </div>
                <!-- <ProductCarouselSuggest></ProductCarouselSuggest> -->
              </div>
            </section>
            <section>
              <div
                class="col-sm-12"
                style="background-color: #fafafa; padding-bottom: 10px"
              >
                <div
                  data-testid="personalized-header"
                  class="personalized-header"
                >
                  <h4 style="margin-left: 10px; padding-top: 10px">
                    <span>Trending Gigs in</span>&nbsp;<a
                      target="_blank"
                      href=""
                      class="carousel-link text-display-4"
                      ><span>Software Development</span></a
                    >&nbsp;eller
                  </h4>
                </div>
                <GigList :listGigs="gigs"></GigList>
              </div>
            </section>
            <hr class="featurette-divider" />
            <div class="row featurette">
              <div class="col-md-7">
                <h3 class="featurette-heading">
                  Connecting Businesses with Top Freelancers, Seamlessly.
                  <span class="text-muted">It’ll blow your mind.</span>
                </h3>
                <p class="lead">
                  Your Project, Our Freelancers: A Perfect Match Every Time.
                </p>
              </div>
              <div class="col-md-5">
                <img
                  class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                  width="200px"
                  height="200px"
                  src="../assets/image/logo2.png"
                  aria-label="Placeholder: 500x500"
                />
              </div>
            </div>
          </body>
        </article>
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
import GigCarousel from "../components/GigCarousel.vue";
import GigList from "../components/GigList.vue";
// import ProductCarouselSuggest from "../components/ProductCarouselSuggest.vue";
import NavCategory from "../components/NavCategory.vue";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "HomePage",
  components: {
    Header,
    Footer,
    GigCarousel,
    GigList,
    NavCategory,
    // ProductCarouselSuggest,
  },
  data() {
    return {
      categories: [],
      gigs: [],
      user: {},
    };
  },
  async created() {
    await axios
      .get("/users/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.user = res.data.user;
          if (this.user.role == "F") {
            this.$router.push("/seldash");
          }
          if (this.user.role == "A") {
            this.$router.push("/managegigad");
          }
        },
        (err) => {
          console.log(err.response);
        }
      );

    const responseCategory = await axios.get("/categories/get");
    const categories = responseCategory.data;
    this.categories = categories;

    const responseGig = await axios.get("/gigs/index");
    const gigs = responseGig.data.gig;
    console.log(gigs[0].Title + "1");

    this.gigs = gigs;
  },
  mounted() {
    axios
      .get("/users/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.user = res.data.user;
        },
        (err) => {
          console.log(err.response);
        }
      );
  },
};
</script>

<style>
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

.guilde {
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: center;
  position: relative;
  padding: 24px 24px 24px 24px;
  border: 1px solid #dadbdd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
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

.guildeIteam {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 72px;
  padding: 12px;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e4e5e7;
  cursor: pointer;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  width: 300px;
}
.textDefault {
  margin: 0;
}
.guildeBack {
  background-color: rgb(212, 222, 251);
  justify-content: center;
  min-width: 40px;
  min-height: 40px px;
  border-radius: 8px;
  margin-right: 12px;
}
</style>