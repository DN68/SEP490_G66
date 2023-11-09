<template>
  <div>
    <nav id="navCategory" class="navbar navbar-inverse">
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto ">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Programming & Tech</h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Programming & Tech</h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Programming & Tech</h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Programming & Tech</h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Programming & Tech</h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li v-for="category in listCategories" :key="category.id">
            <a class="dropdown-item dropdown-item1" :href="'/giglist/?filterBy1='+ category.CategoryID">{{category.Category_Name}}</a>
          </li>       
        </ul>
      </div>
      <div class="nav-item col-md-2 col-lg-2 col-xl-2 mx-auto">
        <!-- Links -->
        <h6 class="fw-bold my-1 navCategory">Programming & Tech</h6>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
  ]
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
</style>