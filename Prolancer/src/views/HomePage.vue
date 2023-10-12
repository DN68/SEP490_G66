<template>
  <div></div>

  <div
    class="container"
    style="height: auto; max-width: -webkit-fill-available"
  >
    <header class="row">
      <Header></Header>
    </header>
    <nav id="navCategory" class="navbar navbar-inverse">
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Category</h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <a class="dropdown-item" href="#">Action</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Another action</a>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Category</h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <a class="dropdown-item" href="#">Action</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Another action</a>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Programming & Tech</h6>
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Category</h6>
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Category</h6>
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Category</h6>
      </div>
    </nav>
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
                Hello, anhlt1901
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
                <div class="row" style="justify-content: space-between">
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
                    <p class="textDefault">Website Developt</p>
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
                <Product></Product>
              </div>
            </section>

            <section>
              <div class="col-sm-12">
                <div
                  data-testid="personalized-header"
                  class="personalized-header"
                >
                  <h4><span>Gigs may you find</span>&nbsp;</h4>
                </div>
                <ProductCarouselSuggest></ProductCarouselSuggest>
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
                    >&nbsp;
                  </h4>
                </div>
                <ProductList></ProductList>
              </div>
            </section>
            <hr class="featurette-divider" />
            <div class="row featurette">
              <div class="col-md-7">
                <h2 class="featurette-heading">
                  First featurette heading.
                  <span class="text-muted">It’ll blow your mind.</span>
                </h2>
                <p class="lead">
                  Some great placeholder content for the first featurette here.
                  Imagine some exciting prose here.
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
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";
import Product from "../components/ProductCarousel.vue";
import ProductList from "../components/ProductList.vue";
import ProductCarouselSuggest from "../components/ProductCarouselSuggest.vue";

export default {
  name: "HomePage",
  components: {
    Header,
    Sidebar,
    Footer,
    Product,
    ProductList,
    ProductCarouselSuggest,
  },
  data() {
    return {
      isShow: function () {
        alert("Xin chào ");
      },
      counter: 0,
    };
  },
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
  /* .topnav a.icon {
    float: right;
    display: block;
  } */
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
  margin: 10px 0;
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