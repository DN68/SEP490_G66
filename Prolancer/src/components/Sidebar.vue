<template>
  <header>
    <!-- Sidebar -->
    <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
          
          
          <router-link to="/managegigad" v-on:click="ChangeActive"
            class="list-group-item list-group-item-action py-2 ripple"
            id="btn-gig"><i class="bi bi-stack me-3"></i>
            <span>Gig Management</span>
          </router-link>
          <router-link to="/ordermanaad" v-on:click="ChangeActive"
            class="list-group-item list-group-item-action py-2 ripple"
            id="btn-gig"><i class="bi bi-stack me-3"></i>
            <span>Order Management</span>
          </router-link>
          <router-link to="/skilltest" v-on:click="ChangeActive"
            class="list-group-item list-group-item-action py-2 ripple"
            id="btn-gig"><i class="bi bi-stack me-3"></i>
            <span>Skill Test Management</span>
          </router-link>
          <router-link to="/interview" v-on:click="ChangeActive"
            class="list-group-item list-group-item-action py-2 ripple"
            id="btn-gig"><i class="bi bi-stack me-3"></i>
            <span>Interview Management</span>
          </router-link>
          <router-link to="/usermanage" v-on:click="ChangeActive"
            class="list-group-item list-group-item-action py-2 ripple"
            id="btn-gig"><i class="bi bi-stack me-3"></i>
            <span>Users Management</span>
          </router-link>
          
          <a
            href="/logout"
            class="list-group-item list-group-item-action py-2 ripple"
            ><i class="bi bi-box-arrow-left me-3"></i> <span>Logout</span></a
          >
        </div>
      </div>
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
  </header>
  <!--Main Navigation-->

  <!--Main layout-->
</template>

<script>
export default {
  
};
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
  background-color: #fe5c5d;
  border: none;
}
</style>