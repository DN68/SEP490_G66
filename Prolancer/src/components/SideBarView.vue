<template>
  
    <!-- Sidebar -->
    <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
      
      
        
          <img
            src="../assets/image/large_1588936738888.png"
            
            alt=""
          />
          <br />
          <h5>Duy Nguyen</h5>
        
      
    </nav>
    <!-- Sidebar -->

    <!-- Navbar -->
    <!-- <nav
      id="main-navbar"
      class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
    >
        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
            
    </nav> -->
    <!-- Navbar -->
  
  <!--Main Navigation-->

  <!--Main layout-->
  <!-- <main style="margin-top: 58px">
    <div class="container pt-4"></div>
  </main> -->
</template>

<script>
export default {};
</script>

<style>
/* body {
  background-color: #fbfbfb;
} */
@media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 58px 0 0; /* Height of navbar */
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 240px;
  z-index: 600;
}

@media (max-width: 991.98px) {
  .sidebar {
    width: 100%;
  }
}
.sidebar .active {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
.list-group-item {
  text-align: left;
}
.list-group-item.active {
  background-color: #e37e7f;
  border: none;
}

#sidebarMenu > img{
  width: 60%;
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 60%;
  border-radius: 40% ;
}
h5{
  text-align: center;
  font-family: face;
}
@font-face {
  font-family: face;
  src: url(D:\Prolancers\SEP490_G66\Prolancer\src\assets\font\Tilt_Neon\TiltNeon-Regular-VariableFont_XROT,YROT.ttf);
}
</style>
