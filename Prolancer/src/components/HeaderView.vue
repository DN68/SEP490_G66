<template>

 <!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <!-- Container wrapper -->
  <div class="container" >
    <!-- Navbar brand -->
    
        <router-link to="/"><img
        src="../assets/image/386858860_6484307888364663_6310575723905631009_n-removebg-preview.png"
          height="70"
          alt=""
          loading="lazy"
        /></router-link>
    <!-- Search form -->
    <form class="input-group" style="width: 700px">
      <input type="search" class="form-control" placeholder="What are you looking for ?" aria-label="Search" />
      <button id="btn_search" class="btn btn-outline-primary" type="button" data-mdb-ripple-color="dark" style="padding: .45rem 1.5rem .35rem; ">
        <i class="bi bi-search" style="color: white;"></i>
      </button>
    </form>

    <!-- Toggle button -->
    <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
      aria-label="Toggle navigation">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Left links -->
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <!-- <li class="nav-item">
          <a class="nav-link active d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-home fa-lg"></i><span class="small">Home</span></a>
        </li> -->
        
        <!-- <li class="nav-item">
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="fas fa-user-friends fa-lg"></i><span class="small">My Network</span></a>
        </li> -->
        <li class="nav-item">
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="bi bi-box-seam"></i><span class="small">Orders</span></a>
        </li>
        <li class="nav-item">
 
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="bi bi-chat"></i><span class="small">Messaging</span></a> 
        </li>
        <li class="nav-item">
          <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"><i class="bi bi-heart"></i> <span class="small">Favourite</span></a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle d-flex align-items-center"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
              class="rounded-circle"
              height="30"
              alt=""
              loading="lazy"
            />
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">My profile</a></li>
            <li><a class="dropdown-item" href="#">Change password</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
      <!-- Left links -->
    </div>
    <!-- Collapsible wrapper -->
  </div>
  <!-- Container wrapper -->
</nav>
  <!-- Navbar -->

</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
export default {

}
</script>

<style>

.navbar-scroll .nav-link,
.navbar-scroll .navbar-toggler-icon,
.navbar-scroll .navbar-brand {
  color: #262626;
}

/* Color of the navbar BEFORE scroll */
.navbar-scroll {
  background-color: #FFC017;
}

/* Color of the links AFTER scroll */
.navbar-scrolled .nav-link,
.navbar-scrolled .navbar-toggler-icon,
.navbar-scroll .navbar-brand {
  color: #262626;
}

/* Color of the navbar AFTER scroll */
.navbar-scrolled {
  background-color: #fff;
}

/* An optional height of the navbar AFTER scroll */
.navbar.navbar-scroll.navbar-scrolled {
  padding-top: auto;
  padding-bottom: auto;
}
.navbar-brand {
  font-size: unset;
  height: 3.5rem;
}
.nav-item:hover .dropdown-menu{
  display: block;
}
#btn_search {
  background-color: black;
  width: 10%;
  border: none;
}
</style>