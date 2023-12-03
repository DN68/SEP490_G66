<template>
  <div class="sel"> 
  <Headerseller></Headerseller>
  <div class="body" > 
  <div
    class="content" 
    style="float: left; width: 25%; margin-top: 2%; margin-bottom: 50px;"
  >
    <div class="inbox-side">
      <nav id="sidebarMenu" class="">
        <img :src="freelancer.Profile_Picture" alt="" />
        <br />
        <div class="info-user">
          <h5 class="">{{ freelancer.First_Name + " " + freelancer.Last_Name }}</h5>
          <h7>Freelancer</h7>
        </div>
      </nav>
      <div class="inbox-content nonetextalign">
        <div
          class="first"
          style="
            padding: 15px;
            border-bottom: 1px #ccc solid;
            margin-left: 10px;
            margin-right: 10px;
          "
        >
          <span style="font-weight: 400; font-size: 20px">Inbox</span>
          <router-link
            to="#"
            style="text-decoration: none; float: right; font-size: 20px"
            >View All</router-link
          >
        </div>
        <div
          class="chatdetail"
          style="
            padding: 15px;
            border-bottom: 1px #ccc solid;
            margin-left: 10px;
            margin-right: 10px;
          "
        >
          <img
            style="width: 15%; border-radius: 40%"
            src="../assets/image/large_1588936738888.png"
            alt=""
          />
          <div class="right" style="float: right; width: 75%">
            <span class="">Duy Nguyen</span> <br />
            <span style="font-weight: 400">The key to your success</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="content nonetextalign"
    style="float: right; width: 70%; margin-top: 2%; margin-bottom: 25%"
  >
    <h1>Welcome, {{ freelancer.First_Name }}</h1>
    <p style="color: #818181; margin-bottom: 30px">
      Find important messages, tips, and links to helpful resources here:
    </p>
    <div class="abc">
      <div class="activeorder mb-5">
        <span>Active orders - 0</span>
        <span>Completed Orders - 0</span>
        <span>Cancel Orders - 0</span>
      </div>
      <router-link to="#" style="text-decoration: none; color: black">
        <div class="adddevlang mb-5">
          <span>Add your dev language to get buyers</span>
          <p style="font-weight: 300; font-size: 15px">
            Fiverr search results will include dev languages soon, so make sure
            to add all of yours under your profile skills.
          </p>
        </div>
      </router-link>
      <router-link to="#" style="text-decoration: none; color: black">
        <div class="inbox">
          <span>Set up inbox auto replies</span>
          <p style="font-weight: 300; font-size: 15px">
            Greet new potential buyers with an auto reply to their first
            message.
          </p>
        </div>
      </router-link>
    </div>
  </div>
  </div>
  <div class="footer">
    <Footer></Footer>
  </div>
</div>
</template>

<script>
import Headerseller from "../components/HeaderSeller.vue";
import Footer from "../components/Footer.vue";
import SideBar from "../components/Sidebarprf.vue";
import axios from "axios"
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "App",
  components: {
    Headerseller,
    Footer,
    SideBar,
  },
  data() {
    return {
      freelancer: {}
    };
  },
  async mounted() {
    await axios
      .get("/freelancers/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.freelancer = res.data.freelancer
          console.log(this.freelancer)
        },
        (err) => {
          this.$router.push("/");
          console.log(err.response);
        }
      );
  },
};
</script>

<style>
html {
  position: relative;

}
.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 600;
  margin-top: 15px;
}
.activeorder {
  border: 1px #ccc solid;
  background-color: #fff;
  width: 80%;
  padding: 20px;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.adddevlang,
.inbox {
  border: 1px #ccc solid;
  background-color: #fff;
  width: 80%;
  padding: 20px;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  flex-direction: column;
}
#sidebarMenu {
  border: 1px #ccc solid;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
}
.inbox-content {
  border: 1px #ccc solid;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
#sidebarMenu > img {
  width: 20%;
  margin: 20px;
}

.info-user {
  margin-top: 45px ;
  margin-left: 55px;
  /* padding-left: 25px;
  border-left: 1px #ccc solid; */
}
.info-user h5 {
  margin: 45px 55px;
  padding-left: 25px;
  border-left: 1px #ccc solid;

}
.nonetextalign {
  text-align: start;
  line-height: 1.6;
}
</style>