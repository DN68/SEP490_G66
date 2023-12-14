<template>
<div>


  <div class="header">
    <HeaderAdmin v-if="user.role == 'A'"></HeaderAdmin>
    <Headers v-else></Headers>
  </div>
  <div class="Sidebarudpf">
    <Sidebarpf></Sidebarpf>
  </div>
  
  <!-- <div id="content" class="">
    <div class="container-profile">
      <form  class="form-profile">
        <div class="field">
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Username</label
          >
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.username"
          />
          <div style="display: flex; flex-direction: row; justify-content: space-between">
            <div class="left" style="width:40%">
               <label class="form-label mt-5" style="float: left" for="form3Example3"
            >First Name</label
          >
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.firstName"
          />
            </div>
            <div class="right" style="width:40%">
              <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Last Name</label
          >
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.lastName"
          />
            </div>
             
          </div>
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Phone Number</label>
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.phone"
          />
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Description</label>
            <textarea
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.description"
          />
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Image</label>
            <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.image"
          />
        
          <div class="mt-5" style="display:flex;flex-direction:row;justify-content:space-between">
            <div class="left" style="width:40%">
              <span class="form-label mt-5">Upload CV</span>
            </div>
            <div class="right" style="width:15%">
              <input type="button" value="Upload">
            </div>
          </div>
          <button id="btn-sub" type="submit" @click="updateProfile" class="btn btn-primary">
            Update
          </button>
        </div>

      
          
        
      </form>
    </div>
  </div> -->
 <div id="content" class="">
     <div class="container-profile">
      <form  class="form-profile">
        <div class="field">
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Company Name</label
          >
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.username"
            readonly
          />
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Email</label>
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.email"
          />
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Phone Number</label>
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.phone"
          />
          
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Tax Code</label>
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.taxcode"
          />
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Legal Representative</label>
          <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.legelrepresentative"
          />
          <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Address</label>
            <textarea
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.address"
          />
          <!-- <label class="form-label mt-5" style="float: left" for="form3Example3"
            >Image</label>
            <input
            type="text"
            id="form3Example3"
            class="form-control form-control-lg"
            v-model="user.image"
          /> -->
        
         
          <button id="btn-sub" type="submit" @click="updateProfile" class="btn btn-primary">
            Update
          </button>
        </div>

      
          
        
      </form>
    </div>
  </div>
 </div>
</template>

<script>
import Headers from "../components/Header.vue";
import Sidebarpf from "../components/Sidebarprf.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";
import Footer from "../components/Footer.vue";

import axios from "axios"
import api from '../../api';

export default {
  name: "App",
  components: {
    Headers,
    Sidebarpf,
    Footer,
    HeaderAdmin
},
  data(){
    return{
      user: {},
    }
  },
  created(){
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted(){
    api
      .get("/users/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.user = res.data.user;
        },
        err => {
          console.log(err.response);
        }
      );
  },
  methods:{
    updateProfile(){
      // console.log(this.user)
      api.put(`users/${this.user.email}/info/update`, {
        //add more fields here
        Username: this.user.username,
        First_Name: this.user.firstName,
        Last_Name: this.user.lastName,
        Phoneno: this.user.phone,
        Description: this.user.description,
        Profile_Picture: this.user.image
      })
    }
  }
};
</script>

<style>
/* html {
  background-color: #ededed;
  
} */
.Sidebarudpf {
  float: left;
  width: 17%;
}
.footer {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  z-index: 600;
  margin-top: 15px;
}
#content {
  float: right;
  width: 80%;
  padding-top: 2%;
  /* position: fixed; */
  top: 0;
  bottom: 0;
  right: 0;
  padding: 85.8px 0 0;
  margin-top: 3%;

  z-index: 600;
  position: sticky;

}

.container-profile {
  margin: 10px 20% 50px;
  width: 60%;
  border: 1px #ccc solid;
  padding: 35px;
  background-color: #fff;
  height: 1400px;
}
#btn-sub {
  display: block;
  margin-top: 30px;
  border-radius: 10px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  background-color: #dc3545 !important;
  border: none;
}
.form-profile {
  
  padding: 30px;
  
  position: relative;
  height: 900px;
}

.field {
  float: left;
  /* padding-right: 100px; */
  width: 60%;
  margin-left: 20%;
  position: absolute;
}
.content-uppro{
  height: 100px;
  border: 1px #ccc solid;
  background-color: #fff;
  float: right;
  width: 80%;
  margin-top: 2%;
}

</style>
