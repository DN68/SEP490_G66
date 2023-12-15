<template>
  <div class="sel">
    <Headerseller></Headerseller>
    <div class="body">
      <div
        class="content"
        style="float: left; width: 25%; margin-top: 2%; margin-bottom: 50px"
      >
        <div class="inbox-side">
          <nav id="sidebarMenu" class="">
            <img ref="profileImage" :src="freelancer.Profile_Picture" alt="" />
            <br />
            <div class="info-user">
              <h5 class="">
                {{ freelancer.First_Name + " " + freelancer.Last_Name }}
              </h5>
              <h7>Freelancer</h7>
            </div>
          </nav>
          <div class="inbox-content nonetextalign">
            <div
              class="first"
              style="
                padding: 15px;
                margin-left: 10px;
                margin-right: 10px;
              "
            >
              <span style="font-weight: 400; font-size: 20px">Inbox</span>
              <router-link
                to="/chat"
                style="text-decoration: none; float: right; font-size: 20px"
                >View All</router-link
              >
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
          <h4>Statistics Chart</h4>
          <div class="me-10" style="margin-right: 200px;">
          <ChartGig class="mb-5 "></ChartGig>
        </div>
          <!-- <div class="activeorder mb-5">
            <span>Active orders - 0</span>
            <span>Completed Orders - 0</span>
            <span>Cancel Orders - 0</span>
          </div> -->
          <router-link to="/uppro" style="text-decoration: none; color: black">
            <div class="adddevlang mb-5">
              <span>Update your profile to get buyers</span>
              <p style="font-weight: 300; font-size: 15px">
                Prolancer search results will include dev languages soon, so make
                sure to add all of yours under your profile skills.
              </p>
            </div>
          </router-link>
          <!-- <router-link to="#" style="text-decoration: none; color: black">
            <div class="inbox">
              <span>Set up inbox auto replies</span>
              <p style="font-weight: 300; font-size: 15px">
                Greet new potential buyers with an auto reply to their first
                message.
              </p>
            </div>
          </router-link> -->
        </div>
      </div>
    </div>
    <!-- <div class="footer">
      <Footer></Footer>
    </div> -->
    <ChatAuth></ChatAuth>
  </div>
</template>

<script>
import Headerseller from "../components/HeaderSeller.vue";
import Footer from "../components/Footer.vue";
import SideBar from "../components/Sidebarprf.vue";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import ChartGig from "../components/chartgigsuccess.vue";
import ChatAuth from "../components/ChatAuth.vue";
import api from '../../api';
export default {
  name: "App",
  components: {
    Headerseller,
    Footer,
    SideBar,
    ChartGig,ChatAuth
  },
  data() {
    return {
      freelancer: {},
      chartData: [],
    };
  },
  async mounted() {
    // this.fetchData();
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      this.$router.push("/error");
    } else {
      await api
        .get("/accounts/info", {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.account = res.data.account;
            if (this.account.Role != "F") {
              this.$router.push("/error");
            }
          },
          (err) => {
            // console.log(err.response);
          }
        );
    }
    await api
      .get("/freelancers/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.freelancer = res.data.freelancer;
          // this.showAvatar(res.data.freelancer.Profile_Picture)
        },
        (err) => {
          this.$router.push("/error");
          // console.log(err.response);
        }
      );
    
  },
  methods: {
    // async showAvatar(imgName){
    //   const apiUrl = "/freelancers/image/" + imgName;
    //   console.log(apiUrl)
    //   const resData = await api.get(apiUrl, { responseType: "arraybuffer" });
    //   console.log(resData);
    //   const blob = new Blob([resData.data], { type: "application/png" });
    //   // Create a URL for the Blob
    //   const blobUrl = URL.createObjectURL(blob);
    //   //set src for image element
    //   const avatarElement = this.$refs.profileImage;
    //   console.log(avatarElement)
    //   avatarElement.src = blobUrl
    // }
    // fetchData() {
    //   this.$api.get('/orderrequest/getGigTitle')
    //     .then(response => {
    //       this.chartData = response.data;
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);
    //     });
    // },
  },
};
</script>

<style >
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
.sel #sidebarMenu {
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
.sel #sidebarMenu > img {
  width: 30%;
  margin: 20px;
}

.info-user {
  margin-top: 0px;
  margin-left: 0px;
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
.sel .dropdown-menu::before {
  content: "";
  height: 10px;
  left: 0;
  right: 0;
  top: 90%;
  position: absolute;
  background-color: transparent;
  transform: translateY(-1900%);
} 
.sel .dropdown-menu{
  top: 40px;
}
</style>