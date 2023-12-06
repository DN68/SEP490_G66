<template>
  <div style="height: 100vh">
    <Header v-if="currentAccountInfo.Role == 'C'"></Header>
    <HeaderSell v-else></HeaderSell>
    <div v-if="isDataLoaded" style="height: 100vh">
    <PrettyChatWindow
      :projectId="projectId"
      :username="currentAccountInfo.Username"
      :secret="currentAccountInfo.AccountID"
      :timezoneOffset="7"
      style="background-color:#fff"
    />
    </div>
  </div>
  <!-- <div>{{ projectId }} </div> -->
</template>
 
  
  <script>
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { applyReactInVue } from "veaury";
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
const projectID = process.env.VUE_APP_CHAT_ENGINE_PROJECT_ID;
const privateKey = process.env.VUE_APP_CHAT_ENGINE_PRIVATE_KEY;
import Header from "../components/Header.vue";
import HeaderSell from "../components/HeaderSeller.vue";
export default {
  data() {
    return {
      projectId: projectID,
      currentChatAuthen: [],
      currentAccountInfo: [],
      isDataLoaded: false,
    };
  },
  components: {
    PrettyChatWindow: applyReactInVue(PrettyChatWindow),Header,HeaderSell
  },
  async created() {
    await this.onUpdateAccountInfo();
    await this.loginRest(this.currentAccountInfo.Username, this.currentAccountInfo.AccountID);
    if (this.currentChatAuthen.length ==0 ) {
      console.error("ChatAuthen Failed:" + this.currentAccountInfo.Username + "..."+ this.currentAccountInfo.AccountID);
      await this.signupRest(this.currentAccountInfo.Username, this.currentAccountInfo.AccountID, this.currentAccountInfo.Email, this.currentAccountInfo.First_Name, this.currentAccountInfo.Last_Name);
    }
    console.log("Chat suscces This User " + this.username);
    this.isDataLoaded = true;
  },
  methods: {
    async loginRest(username, secret) {
      await axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "Project-ID": projectID,
            "User-Name": username,
            "User-Secret": secret,
          },
        })
        .then((response) => {
          this.currentChatAuthen = response.data;
          
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
        });
    },

    async signupRest(username, secret, email, first_name, last_name) {
      await axios
        .post(
          "https://api.chatengine.io/users/",
          { username, secret, email, first_name, last_name },
          {
            headers: {
              "Private-Key": privateKey,
            },
          }
        )
        .then((response) => {
          this.currentChatAuthen = response.data;
        })
        .catch((error) => {
          // Handle the error
          console.error("Error here:", error);
        });
    },

    async onUpdateAccountInfo() {
      let token = localStorage.getItem("token");
      //account is not authorized
      if (!token) {
        this.$router.push("/login");
      } else {
        let decoded = VueJwtDecode.decode(token);
        console.log(decoded);
        if (decoded.role === "F") {
          await axios
            .get("/freelancers/info", {
              headers: { token: localStorage.getItem("token") },
            })
            .then(
              (res) => {
                this.currentAccountInfo = res.data.freelancer;
                console.log(this.currentAccountInfo);
              },
              (err) => {
                console.log(err.response);
              }
            );
        } else if (decoded.role === "C") {
          await axios
            .get("/customers/info", {
              headers: { token: localStorage.getItem("token") },
            })
            .then(
              (res) => {
                this.currentAccountInfo = res.data.customer;
                console.log(this.currentAccountInfo);
              },
              (err) => {
                console.log(err.response);
              }
            );
        } else {
          this.currentAccountInfo = {
            Email: decoded.email,
            Role: decoded.role,
          };
        }
      }
    },
  },
};
</script>
   
   <style>
.ce-new-chat-button {
  width: 32px;
  position: relative;
  bottom: 22px;
}

.ce-chat-card {
  text-align: left !important; /* Align text to the left */
}
.ce-their-message {
  text-align: left !important;
}


</style>