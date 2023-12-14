<template>
  <div
    class="container"
    style="height: auto; max-width: -webkit-fill-available"
  >
    <header class="row">
      <Header :searchText="searchQuery"></Header>
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
                    href="#"
                    >Programming & Tech</a
                  >
                </div>
                <!-- <div class="col-md-1 col-sm-1 page_title_item">
                  <p class="">/</p>
                </div>

                <div class="col-md-3 col-md-3 d-inline page_title_category">
                  <a
                    class=""
                    target="_self"
                    href="/categories/programming-tech?source=gig_category_link"
                    >Website development</a
                  >
                </div> -->
              </div>
              <div class="type_title"><h1>Web Application</h1></div>
            </div>
          </div>
        </article>
        <div class="row" style="justify-content: space-between">
          <div class="col-md-6 row list_filter">
            <div
              class="col-sm-2 guildeFilterIteam"
              v-click-outside="() => onClickOutside(1)"
            >
              <div
                @click="isshowListProgram = !isshowListProgram"
                style="display: flex; align-items: center"
              >
                <p class="textDefault">Service options</p>
                <i class="bi bi-chevron-down"></i>
              </div>
              <ul
                class="dropdown-menu program_dropdown"
                :style="{ display: isshowListProgram ? 'block' : 'none' }"
              >
                <li class="ms-2 row">
                  <h5>Programming language</h5>
                  <div
                    class="col-md-6"
                    v-for="(language, index) in allLanguages"
                    :key="index"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="selectedLanguages"
                        :value="language.value"
                        :id="language.value"
                        :name="language.value"
                      />
                      <label class="form-check-label" :for="language.value">
                        {{ language.label }}
                      </label>
                    </div>
                  </div>
                </li>

                <li class="ms-2 row">
                  <hr style="height: 0; width: 330px" />
                  <h5>Databases</h5>
                  <div
                    class="col-md-6"
                    v-for="(database, index) in allDatabases"
                    :key="index"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="selectedDatabases"
                        :value="database.value"
                        :id="database.value"
                        :name="database.value"
                      />
                      <label class="form-check-label" :for="database.value">
                        {{ database.label }}
                      </label>
                    </div>
                  </div>
                </li>

                <li>
                  <div class="bottom_nav" style="border-top: 1px solid #dcd8d8">
                    <div class="row" style="justify-content: space-around">
                      <button
                        class="clear-all col-sm-3"
                        @click="clearSelectedLanguageAndDatabase()"
                      >
                        Clear All
                      </button>

                      <button
                        class="apply my-2 col-sm-3"
                        @click="
                          getGigWithFilterAndSearch(1),
                            (isshowListProgram = false)
                        "
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div
              class="col-sm-2 guildeFilterIteam"
              v-click-outside="() => onClickOutside(3)"
            >
              <div
                @click="isshowListBuget = !isshowListBuget"
                style="display: flex; align-items: center"
              >
                <p class="textDefault">Price</p>
                <i class="bi bi-chevron-down"></i>
              </div>
              <ul
                class="dropdown-menu buget_dropdown"
                :style="{ display: isshowListBuget ? 'block' : '' }"
              >
                <li>
                  <input
                    type="radio"
                    class="ms-2 my-2"
                    v-model="selectedPriceRange"
                    :value="'Under 5$'"
                    name="radioGroupName1"
                    id="radioUnder5"
                  /><label for="radioUnder5"><span class="ms-1">Under 5$</span></label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="ms-2 my-2"
                    v-model="selectedPriceRange"
                    :value="'5$ to 10$'"
                    name="radioGroupName2"
                    id="radioUnder5to10"
                  /><label for="radioUnder5to10"><span class="ms-1">From 5$-10$</span></label>
                </li>
                <li>
                  <input
                    type="radio"
                    class="ms-2 my-2"
                    v-model="selectedPriceRange"
                    :value="'Above 10$'"
                    name="radioGroupName3"
                    id="radioAbove10"
                  /><label for="radioAbove10"><span class="ms-1">Above 10$</span></label>
                </li>

                <li>
                  <div class="bottom_nav" style="border-top: 1px solid #dcd8d8">
                    <div class="row" style="justify-content: space-around">
                      <button
                        class="clear-all col-sm-3"
                        @click="clearSelectedPrice()"
                      >
                        Clear All
                      </button>

                      <button
                        class="apply my-2 col-sm-3"
                        @click="
                          getGigWithFilterAndSearch(1),
                            (isshowListBuget = false)
                        "
                      >
                        Apply
                      </button>
                    </div>
                  </div>
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
                    (isshowlistfilter = !isshowlistfilter), (sortBy = 'Rating')
                  "
                  :to="{
                    path: '/giglist',
                  }"
                >
                  Rating</router-link
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
                  }"
                >
                  Price</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="filter_list">
          <span
            class="badge rounded-pill d-inline text-dark ms-2"
            style="background-color: #efeff0; font-size: 16px; float: left"
            v-for="(selectedlanguage, index) in selectedLanguages"
            :key="index"
            >{{ selectedlanguage }}</span
          >

          <span
            class="badge rounded-pill d-inline text-dark ms-2"
            style="background-color: #efeff0; font-size: 16px; float: left"
            v-for="(selecteddatabase, index) in selectedDatabases"
            :key="index"
            >{{ selecteddatabase }}</span
          >

          <span
            v-if="selectedPriceRange"
            class="badge rounded-pill d-inline text-dark ms-2"
            style="background-color: #efeff0; font-size: 16px; float: left"
            >{{ selectedPriceRange }}</span
          >
        </div>
        <div class="gig_content">
          <GigList :listGigs="sortFilter"></GigList>
        </div>
      </div>

      <div class="pagination" v-if="gigs.length > 0">
        <router-link
          v-if="pagination.page - 1 == 0"
          class="page-number"
          :disabled="true"
          :to="{
            path: '#',
          }"
          ><i class="bi bi-arrow-left text-black-50"></i
        ></router-link>
        <router-link
          v-if="pagination.page - 1 > 0"
          class="page-number"
          :disabled="true"
          @click="getGigWithFilterAndSearch(pagination.page - 1)"
          :to="{
            path: '#',
          }"
          ><i class="bi bi-arrow-left"></i
        ></router-link>
        <router-link
          :to="{
            path: '#',
          }"
          class="page-number"
          @click="getGigWithFilterAndSearch(index)"
          v-for="index in pagination.totalPage"
          :key="index"
          :disabled="true"
          :class="{ active: index == pagination.page }"
          ><span>{{ index }}</span>
        </router-link>

        <router-link
          v-if="pagination.page + 1 <= pagination.totalPage"
          class="page-number"
          :disabled="true"
          @click="getGigWithFilterAndSearch(pagination.page + 1)"
          :to="{
            path: '#',
          }"
          ><i class="bi bi-arrow-right"></i
        ></router-link>
        <router-link
          v-if="pagination.page == pagination.totalPage"
          class="page-number"
          :disabled="true"
          :to="{
            path: '#',
          }"
          ><i class="bi bi-arrow-right text-black-50"></i
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
import api from '../../api';
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
      sortBy: "None",
      filterBy1: "",
      filterBy2: "",
      filterBy3: "",
      searchQuery: [],
      selectedPage: "1",
      status: "Active",
      selectedPriceRange: "",
      allLanguages: [
        { label: "Java", value: "java" },
        { label: "PHP", value: "php" },
        { label: ".NET", value: ".net" },
        { label: "Javascript", value: "javascript" },
      ],
      selectedLanguages: [],
      allDatabases: [
        { label: "MS SQL", value: "MS SQL" },
        { label: "MySQL", value: "MySQL" },
        { label: "Oracle", value: "Oracle" },
        { label: "Postgre", value: "Postgre" },
      ],
      selectedDatabases: [],
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

    async getGigWithFilterAndSearch(currentPage) {
      var searchFilterQuery = this.$route.query;
      console.log("Filter By Progaming L " + this.selectedLanguages);
      console.log("Filter By Database " + this.selectedDatabases);
      this.sortBy = "None";
      const responseWithFilter = await api
        .get("/gigs/index", {
          params: {
            page: currentPage,
            search: searchFilterQuery.search,
            status: this.status,
            filterByCategory: 1,
            filterByPriceRange: this.selectedPriceRange,
            filterByLanguage: this.selectedLanguages,
            filterByDatabase: this.selectedDatabases,
          },
        })
        .then((response) => {
          const gigsFilter = response.data.gig;
          this.gigs = gigsFilter;

          const searchQuery = response.data.searchQuery;
          this.searchQuery = searchQuery.search;
          console.log(
            "🚀 ~ file: GigListView.vue:464 ~ getGigWithFilterAndSearch ~ this.searchQuery:",
            this.searchQuery
          );

          const paging = response.data.pagination;
          this.pagination = paging;
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
        });
    },

    clearSelectedLanguageAndDatabase() {
      this.selectedLanguages = [];
      this.selectedDatabases = [];
    },
    clearSelectedPrice() {
      this.selectedPriceRange = "";
    },
  },
  async created() {
    await this.getGigWithFilterAndSearch(1);
  },

  computed: {
    sortFilter: function () {
      if (this.sortBy != "None") {
        var filterGig = this.gigs;
        console.log("Sorted By " + this.sortBy);

        if (this.sortBy == "Price") {
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
            if (a.Rating < b.Rating) return 1;
            if (a.Rating > b.Rating) return -1;
            return 0;
          });
        }
      } else {
        console.log("run here");
        return this.gigs;
      }
    },
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
  margin-top: 22%;
  margin-left: -1%;
  width: 350px;
  overflow: scroll;
  max-height: 350px;
}
.freelancer_dropdown {
  margin-top: 13%;
  margin-left: -1%;
  position: absolute;
  width: 2 50px;
}
.buget_dropdown {
  margin-top: 14.5%;
  margin-left: -1%;
  position: absolute;
  width: 210px;
}

.apply {
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
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
  color: white;
  background-color: #000;
  width: 90px;
}

.clear-all {
  border: none;
  line-height: 24px;
  padding: 0;
  background: none;
  width: 80px;
}
</style>