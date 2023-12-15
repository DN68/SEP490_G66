<template>
  <section class="vh-100" style="background-color: #eee">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <router-link to="/login">
                    <i
                      class="fa-solid fa-arrow-left-long text-danger"
                      style="float: left"
                    ></i>
                  </router-link>
                  <form class="mx-1 mx-md-4 bd p-5">
                    <p class="text-danger">Please choose your role you want</p>
                    
                    <div
                      id="btn-redirect"
                      class="d-flex flex-row align-items-center mb-4"
                      style="margin-top: 20%"
                    >
                      <router-link
                        to="becomesel"
                        class="bg-danger bg-gradient text-light"
                        style="
                          text-decoration: none;
                          color: #000;
                          padding: 15px 63px;
                          border: 1px #ccc solid;
                          width:90%
                        "
                      >
                        Register as Freelancer
                      </router-link>
                    </div>
                      
                    <div class="d-flex flex-row align-items-center mb-4"  >
                      <router-link
                        to="/becomehire"
                        class="bg-danger bg-gradient text-light"
                        style="
                          text-decoration: none;
                          color: #000;
                          padding: 15px 55px;
                          border: 1px #ccc solid;
                          width:90%
                        "
                      >
                        Register as company
                      </router-link>
                    </div>
                  </form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    src="../assets/image/386858860_6484307888364663_6310575723905631009_n-removebg-preview.png"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
};
</script>

<style scoped></style>
