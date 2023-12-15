<template>
  <div class="sel">
    <Headerseller></Headerseller>
    <div class="body">
      <div class="header-content mt-5 mb-5">
        <h1 style="float: left; font-weight: bold; margin:0 100px;">Earnings</h1>
      </div> <br>
      <div class="chart mt-5 mb-5">
        <Chartearning></Chartearning>
        <p style="font-weight: bold">Chart express your earnings follow month</p>
      </div>
    </div>
    <!-- <div class="footer mt-5">
      <Footer></Footer>
    </div> -->
    <footer class="panel panel-default">
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Headerseller from "../components/HeaderSeller.vue";
import Footer from "../components/Footer.vue";
import SideBar from "../components/Sidebarprf.vue";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import Chartearning from "../components/chartearning.vue";

export default {
  name: "App",
  components: {
    Headerseller,
    Footer,
    SideBar,
    Chartearning,
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
    if (localStorage.getItem("token") == null) {
      this.$router.push("/login");
    } else {
      await axios
        .get("/accounts/info", {
          headers: { token: localStorage.getItem("token") },
        })
        .then(
          (res) => {
            this.account = res.data.account;
            if (this.account.Role != "F") {
              this.$router.push("/");
            }
          },
          (err) => {
            // console.log(err.response);
          }
        );
    }
    await axios
      .get("/freelancers/info", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(
        (res) => {
          this.freelancer = res.data.freelancer;
          if(this.freelancer.Status != 'Active'){
            this.$router.push('/seldash')
          }
          // this.showAvatar(res.data.freelancer.Profile_Picture)
        },
        (err) => {
          this.$router.push("/");
          // console.log(err.response);
        }
      );
  },
  methods: {
    // async showAvatar(imgName){
    //   const apiUrl = "/freelancers/image/" + imgName;
    //   console.log(apiUrl)
    //   const resData = await axios.get(apiUrl, { responseType: "arraybuffer" });
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
    //   this.$axios.get('/orderrequest/getGigTitle')
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

<style scoped>
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
</style>