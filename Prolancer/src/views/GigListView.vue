<template>
  <div
    class="container"
    style="height: auto; max-width: -webkit-fill-available"
  >
    <header class="row">
      <Header :searchText="search"></Header>
    </header>
    <NavCategory></NavCategory>
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
                    >Programming & Tech</a
                  >
                </div>
                <div class="col-md-1 col-sm-1 page_title_item">
                  <p class="">/</p>
                </div>

                <div class="col-md-3 col-md-3 d-inline page_title_category">
                  <a
                    class=""
                    target="_self"
                    href="/categories/programming-tech?source=gig_category_link"
                    >Website development</a
                  >
                </div>
              </div>
              <div class="type_title"><h1>Web Application</h1></div>
            </div>
          </div>
        </article>
        <div class="row" style="justify-content: space-between">
          <div class="col-md-6 row list_filter">
            <div
              class="col-sm-2 guildeFilterIteam"
              @click="isshowListProgram = !isshowListProgram"
              v-click-outside="() => onClickOutside(1)"
            >
              <p class="textDefault">Programming language</p>
              <i class="bi bi-chevron-down"></i>
              <ul
                class="dropdown-menu program_dropdown"
                :style="{ display: isshowListProgram ? 'block' : 'none' }"
              >
                <li v-for="category in categories" :key="category.CategoryID">
                  <router-link
                    class="dropdown-item"
                    @click="filterBy1 = category.CategoryID,selectedPage='1'"
                    :to="{
                      path: '/giglist',
                      query: {
                        page: '1',
                        search: this.$route.query.search,
                        sort: sortBy,
                        filterBy1: category.CategoryID,
                        filterBy2: this.filterBy2,
                        filterBy3: this.filterBy3,
                      },
                    }"
                  >
                    {{ category.Category_Name }}</router-link
                  >
                </li>
              </ul>
            </div>
            <div
              class="col-sm-2 guildeFilterIteam"
              @click="isshowListFreelancer = !isshowListFreelancer"
              v-click-outside="() => onClickOutside(2)"
            >
              <p class="textDefault">Delivery Time</p>
              <i class="bi bi-chevron-down"></i>
              <ul
                class="dropdown-menu freelancer_dropdown"
                :style="{ display: isshowListFreelancer ? 'block' : '' }"
              >
                <li>
                  <router-link
                    class="dropdown-item"
                    @click="filterBy2 = '1',selectedPage='1'"
                    :to="{
                      path: '/giglist',
                      query: {
                        page: selectedPage,
                        search: this.$route.query.search,
                        sort: sortBy,
                        filterBy1: filterBy1,
                        filterBy2: '1',
                        filterBy3: filterBy3,
                      },
                    }"
                  >
                    1 day</router-link
                  >
                  <!-- <a class="dropdown-item" href="#">1 day</a> -->
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    @click="filterBy2 = '3',selectedPage='1'"
                    :to="{
                      path: '/giglist',
                      query: {
                        page: selectedPage,
                        search: this.$route.query.search,
                        sort: sortBy,
                        filterBy1: filterBy1,
                        filterBy2: '3',
                        filterBy3: filterBy3,
                      },
                    }"
                  >
                    Up to 3 days</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    @click="filterBy2 = '7',selectedPage='1'"
                    :to="{
                      path: '/giglist',
                      query: {
                        page: selectedPage,
                        search: this.$route.query.search,
                        sort: sortBy,
                        filterBy1: filterBy1,
                        filterBy2: '7',
                        filterBy3: filterBy3,
                      },
                    }"
                  >
                    Up to 7 days</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    @click="filterBy2 = 'Anytime',selectedPage='1'"
                    :to="{
                      path: '/giglist',
                      query: {
                        page: selectedPage,
                        search: this.$route.query.search,
                        sort: sortBy,
                        filterBy1: filterBy1,
                        filterBy2: 'Anytime',
                        filterBy3: filterBy3,
                      },
                    }"
                  >
                    Anytime</router-link
                  >
                </li>
              </ul>
            </div>
            <div
              class="col-sm-2 guildeFilterIteam"
              @click="isshowListBuget = !isshowListBuget"
              v-click-outside="() => onClickOutside(3)"
            >
              <p class="textDefault">Buget</p>
              <i class="bi bi-chevron-down"></i>
              <ul
                class="dropdown-menu buget_dropdown"
                :style="{ display: isshowListBuget ? 'block' : '' }"
              >
                <li>
                  <router-link
                    class="dropdown-item"
                    @click="filterBy3 = '10',selectedPage='1'"
                    :to="{
                      path: '/giglist',
                      query: {
                        page: selectedPage,
                        search: this.$route.query.search,
                        sort: sortBy,
                        filterBy1: filterBy1,
                        filterBy2: filterBy2,
                        filterBy3: '10',
                      },
                    }"
                  >
                    Up to 10$</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    @click="filterBy3 = '50',selectedPage='1'"
                    :to="{
                      path: '/giglist',
                      query: {
                        page: selectedPage,
                        search: this.$route.query.search,
                        sort: sortBy,
                        filterBy1: filterBy1,
                        filterBy2: filterBy2,
                        filterBy3: '50',
                      },
                    }"
                  >
                    Up to 50$</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    @click="filterBy3 = '100',selectedPage='1'"
                    :to="{
                      path: '/giglist',
                      query: {
                        page: selectedPage,
                        search: this.$route.query.search,
                        sort: sortBy,
                        filterBy1: filterBy1,
                        filterBy2: filterBy2,
                        filterBy3: '100',
                      },
                    }"
                  >
                    Up to 100$</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="dropdown-item"
                    @click="filterBy3 = '1000',selectedPage='1'"
                    :to="{
                      path: '/giglist',
                      query: {
                        page: selectedPage,
                        search: this.$route.query.search,
                        sort: sortBy,
                        filterBy1: filterBy1,
                        filterBy2: filterBy2,
                        filterBy3: '1000',
                      },
                    }"
                  >
                    Up to 1000$</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div
            class="col-md-4"
            style="text-align: right; width: fit-content"
            v-click-outside="() => onClickOutside(4)"
          >
            <span class="pre-title co-grey-900"
              >Sort by:
              <span
                class="filter_type"
                @click="isshowlistfilter = !isshowlistfilter"
                >{{ sortBy }}<i class="bi bi-chevron-down"></i
              ></span>
            </span>
            <ul
              class="dropdown-menu filter_dropdown"
              :style="{ display: isshowlistfilter ? 'block' : '' }"
            >
              
              <li>
                <router-link
                  class="dropdown-item"
                  @click="
                    (isshowlistfilter = !isshowlistfilter), (sortBy = 'Best Seller')
                  "
                  :to="{
                    path: '/giglist',
                    query: {
                      page: this.$route.query.page,
                      search: this.$route.query.search,
                      sort: 'BestSeller',
                      filterBy1: filterBy1,
                      filterBy2: filterBy2,
                      filterBy3: filterBy3,
                    },
                  }"
                >
                Best Seller</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  @click="
                    (isshowlistfilter = !isshowlistfilter), (sortBy = 'Price')
                  "
                  :to="{
                    path: '/giglist',
                    query: {
                      page: this.$route.query.page,
                      search: this.$route.query.search,
                      sort: 'Price',
                      filterBy1: filterBy1,
                      filterBy2: filterBy2,
                      filterBy3: filterBy3,
                    },
                  }"
                >
                  Price</router-link
                >

              </li>
            </ul>
          </div>
        </div>
        <div class="gig_content">
          <GigList :listGigs="sortFilter"></GigList>

        </div>
      </div>

      <div class="pagination">
        <router-link
          v-if="pagination.page - 1 > 0"
          class="page-number"
          @click="selectedPage = (pagination.page - 1)"
          :to="{
          path:'/giglist',query: {
                      page: (pagination.page - 1),
                      search: this.$route.query.search,
                      sort: sortBy,
                      filterBy1: filterBy1,
                      filterBy2: filterBy2,
                      filterBy3: filterBy3,
                    }}"
          ><i class="bi bi-arrow-left"></i
        ></router-link>
        <router-link :to="{
          path:'/giglist',query: {
                      page: index,
                      search: this.$route.query.search,
                      sort: sortBy,
                      filterBy1: filterBy1,
                      filterBy2: filterBy2,
                      filterBy3: filterBy3,
                    }}"
          class="page-number" @click="selectedPage = index" v-for="index in pagination.totalPage" :key="index" href="#"  :class="{active: index==pagination.page}"><span>{{ index }}</span> </router-link>

        <router-link
          v-if="pagination.page + 1 <= pagination.totalPage"
          class="page-number"
          @click="selectedPage = (pagination.page + 1)"
          :to="{
          path:'/giglist',query: {
                      page: (pagination.page + 1),
                      search: this.$route.query.search,
                      sort: sortBy,
                      filterBy1: filterBy1,
                      filterBy2: filterBy2,
                      filterBy3: filterBy3,
                    }}"
          ><i class="bi bi-arrow-right"></i
        ></router-link>
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
import GigList from "../components/GigList.vue";
import vClickOutside from "click-outside-vue3";
import NavCategory from "../components/NavCategory.vue";
import axios from "axios";

export default {
  /* eslint-disable */
  name: "HomePage",
  directives: {
    ClickOutside: vClickOutside.directive,
  },
  components: {
    Header,
    Footer,
    GigList,
    NavCategory,
  },
  data() {
    return {
      isshowlistfilter: false,
      isshowListProgram: false,
      isshowListFreelancer: false,
      isshowListBuget: false,
      isshowModal: false,
      categories: [],
      gigs: [],
      pagination: [],
      search: "",
      sortBy: "Best Seller",
      filterBy1: "",
      filterBy2: "",
      filterBy3: "",
      searchQuery: [],
      selectedPage: "1"
    };
  },
  methods: {
    onClickOutside: function (type) {
      if (type == 1) {
        this.isshowListProgram = false;
      } else if (type == 2) {
        this.isshowListFreelancer = false;
      } else if (type == 3) {
        this.isshowListBuget = false;
      } else if (type == 4) {
        this.isshowlistfilter = false;
      }
    }, 

    

  },
  async created() {

    const responseCategory = await axios.get("/categories/get");
    const categories = responseCategory.data;
    this.categories = categories;

    console.log("created");

    var searchFilterQuery = this.$route.query;
    console.log(searchFilterQuery.searchQuery + "1");
    const responseGig = await axios.get("/gigs/index", {
      params: {
        page: '1',
        search: searchFilterQuery.search,
            filterBy1: this.$route.query.filterBy1,
            filterBy2: this.$route.query.filterBy2,
            filterBy3: this.$route.query.filterBy3,
      },
    });
    const gigs = responseGig.data.gig;
    this.gigs = gigs;
    
    const paging = responseGig.data.pagination;
    this.pagination = paging;
    this.filterBy1 =this.$route.query.filterBy1
    this.filterBy2 =this.$route.query.filterBy2
    this.filterBy3 =this.$route.query.filterBy3

  },
  
  async beforeRouteUpdate   () {
  
     var searchFilterQuery = this.$route.query;
     console.log('Q Here '+searchFilterQuery)
     console.log('Run before update '+searchFilterQuery)

        console.log('Category Here '+this.filterBy1)
        console.log('Delivery Here '+this.filterBy2)
        console.log('Buget Here '+this.filterBy3)

             const responseWithFilter =await axios.get("/gigs/index", {
          params: {
            page: this.selectedPage,
            search: searchFilterQuery.search,
            filterBy1: this.filterBy1,
            filterBy2: this.filterBy2,
            filterBy3: this.filterBy3,
          },
        });
        
        const gigsFilter = responseWithFilter.data.gig;
        this.gigs = gigsFilter;

        const searchQuery = responseWithFilter.data.searchQuery;
        this.searchQuery = searchQuery;
        this.filterBy1 = searchQuery.filterBy1
        console.log('filterBy1 ID = '+this.filterBy1)
        this.filterBy2 = searchQuery.filterBy2
        console.log('filterBy2 ID = '+this.filterBy2)
        this.filterBy3 = searchQuery.filterBy3
        console.log('filterBy3 ID = '+this.filterBy3)
        const paging = responseWithFilter.data.pagination;
        this.pagination = paging;
  },
  computed: {
    sortFilter: function () {
      this.search = this.$route.query.search;
      var sortQuery = this.$route.query.sort;
      if (sortQuery != null) {

        var filterGig = this.gigs;
        console.log("Sorted By "+sortQuery);

        if ((this.$route.query.sort == "Price")) {
          console.log("Sorted");
          console.log("================");

          return filterGig.sort((a, b) => {
            if (a.Price < b.Price) return -1;
            if (a.Price > b.Price) return 1;
            return 0;
          });
        } else {
        console.log("Sorted By Best sell");

          return filterGig.sort((a, b) => {
            if (a.GigID < b.GigID) return -1;
            if (a.GigID > b.GigID) return 1;
            return 0;
          });;
        }
      } else {
        console.log("run here");
        return this.gigs;
      }
    },
  }
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

.guildeFilterIteam {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 50px;
  padding: 12px;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e4e5e7;
  cursor: pointer;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  width: fit-content;
  margin-left: 10px;
}

.list_filter {
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 20px;
}
.guildeFilterIteam .bi-chevron-down {
  margin-left: 5px;
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

.page_title_category {
  width: fit-content;
}
.type_title {
  text-align: left;
}
.type_title h1 {
  color: #222325;
  font-size: 33px;
  font-weight: 700;
  line-height: 36px;
  padding: 8px 0;
}

.gig_content {
  margin: 20px 0;
}
.filter_dropdown {
  width: 200px;
  position: absolute;
  margin-left: -1%;
}
.filter_type {
  border-radius: 8px;
  color: #222325;
  cursor: pointer;
  padding: 10px 8px;
}
.filter_type:hover {
  background-color: #f5f5f5;
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
.program_dropdown {
  margin-top: 13%;
  margin-left: -1%;
  position: absolute;
  width: 350px;
}
.freelancer_dropdown {
  margin-top: 13%;
  margin-left: -1%;
  position: absolute;
  width: 2 50px;
}
.buget_dropdown {
  margin-top: 13%;
  margin-left: -1%;
  position: absolute;
  width: 150px;
}
</style>