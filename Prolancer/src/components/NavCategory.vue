<template>
  <div>
    <nav id="navCategory" class="navbar navbar-inverse nav_header">
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto ">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory"><span class="nav_title " @mouseover="isHovered=!isHovered, hoveredOn='1'" @mouseout="isHovered=!isHovered"  :class="{ 'isHovered': isHovered&&hoveredOn=='1' }">Programming & Tech</span></h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="isHovered=!isHovered" @mouseout="isHovered=!isHovered">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory"><span class="nav_title " @mouseover="isHovered=!isHovered,hoveredOn='2'" @mouseout="isHovered=!isHovered"  :class="{ 'isHovered': isHovered&&hoveredOn=='2' }">Programming & Tech</span></h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="isHovered=!isHovered" @mouseout="isHovered=!isHovered">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory"><span class="nav_title " @mouseover="isHovered=!isHovered,hoveredOn='3'" @mouseout="isHovered=!isHovered"  :class="{ 'isHovered': isHovered&&hoveredOn=='3' }">Programming & Tech</span></h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="isHovered=!isHovered" @mouseout="isHovered=!isHovered">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory"><span class="nav_title " @mouseover="isHovered=!isHovered,hoveredOn='4'" @mouseout="isHovered=!isHovered"  :class="{ 'isHovered': isHovered&&hoveredOn=='4' }">Programming & Tech</span></h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="isHovered=!isHovered" @mouseout="isHovered=!isHovered">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory"><span class="nav_title " @mouseover="isHovered=!isHovered,hoveredOn='5'" @mouseout="isHovered=!isHovered"  :class="{ 'isHovered': isHovered&&hoveredOn=='5' }">Programming & Tech</span></h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="isHovered=!isHovered" @mouseout="isHovered=!isHovered">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory"><span class="nav_title " @mouseover="isHovered=!isHovered,hoveredOn='6'" @mouseout="isHovered=!isHovered"  :class="{ 'isHovered': isHovered&&hoveredOn=='6' }">Programming & Tech</span></h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="isHovered=!isHovered" @mouseout="isHovered=!isHovered">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    props: [
    'listCategories'
  ],
  data() {
    return {
      isHovered: false,
      hoveredOn: ''
    };
  },
}
</script>

<style>
.navbar .dropdown-menu {
  width: 300px;
  position: fixed;
  margin-top: 8px;
  margin-left: 2%;

}
#navCategory .dropdown-menu::before {
  content: "";
  height: 10px;
  left: 0;
  right: 0;
  top: 90%;
  position: absolute;
  background-color: transparent;
  transform: translateY(-1400%);
}

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