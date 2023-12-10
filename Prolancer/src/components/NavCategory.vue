<template>
  <div>
    <nav id="navCategory" class="navbar navbar-inverse nav_header">
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto " v-for="ca in listCategories" :key="ca.CategoryID">
        <!-- Links -->
        <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ ca.CategoryID">
        <h6 class="fw-bold my-1 navCategory"><span class="nav_title " @mouseover="isHovered=!isHovered,hoveredOn=ca.CategoryID" @mouseout="isHovered=!isHovered"  :class="{ 'isHovered': isHovered&&hoveredOn==ca.CategoryID }">{{ca.Category_Name}}</span></h6>
        <!-- <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="isHovered=!isHovered" @mouseout="isHovered=!isHovered"> -->
         </a>
        <!-- </ul> -->
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isHovered: false,
      hoveredOn: '',
      listCategories: []
    };
  },
  async created() {
    
    const responseCategory = await axios.get("/categories/get");
    const categories = responseCategory.data;
    this.listCategories = categories;

  },
}
</script>

<style>
.nav_header .navbar .dropdown-menu {
  width: 300px;
  position: fixed;
  margin-top: 8px;
  margin-left: 2%;

}
/* #navCategory .dropdown-menu::before {
  content: "";
  height: 10px;
  left: 0;
  right: 0;
  top: 90%;
  position: absolute;
  background-color: transparent;
  transform: translateY(-1400%);
} */

@media screen and (max-width: 990px) {
  #navCategory {
    display: none;
  }

}

#navCategory .navCategory {
  color: #62646a;
  font: 400 16px/24px Macan, Helvetica Neue, Helvetica, Arial, sans-serif !important;
  display: block;
  font-size: 18px !important;
  line-height: 15px !important;
  position: relative;
}
.nav_header .navCategory .isHovered{
  padding-bottom: 8px;
    border-bottom: 3px solid #f31e1e;
}


</style>