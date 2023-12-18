<template></template>

<script>
import api from '../../api';
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
const projectID = process.env.VUE_APP_CHAT_ENGINE_PROJECT_ID;
const privateKey = process.env.VUE_APP_CHAT_ENGINE_PRIVATE_KEY;
export default {
  data() {
    return {
      currentChatAuthen: [],
      currentAccountInfo: [],
    };
  },
  components: {},
  async created() {
    await this.onUpdateAccountInfo();
    if (Object.keys(this.currentAccountInfo).length >0) {
      await this.loginRest(
        this.currentAccountInfo.Username,
        this.currentAccountInfo.AccountID
      );
      if (Object.keys(this.currentChatAuthen).length == 0) {
        console.error(
          "Chat Authen Failed:" +
            this.currentAccountInfo.Username +
            "..." +
            this.currentAccountInfo.AccountID
        );
        if (this.currentAccountInfo.Role == "F") {
          //Sign up as Freelancer
          console.log("Sign up as Freelancer");
          await this.signupRest(
            this.currentAccountInfo.Username,
            this.currentAccountInfo.AccountID,
            this.currentAccountInfo.Email,
            this.currentAccountInfo.First_Name,
            this.currentAccountInfo.Last_Name +
              " (" +
              this.currentAccountInfo.Username +
              ")"
          );
        }
        //Sign up as Conpany
        else if (this.currentAccountInfo.Role == "C"){
          console.log("Sign up as Conpany");
          await this.signupRest(
            this.currentAccountInfo.Username,
            this.currentAccountInfo.AccountID,
            this.currentAccountInfo.Email,
            this.currentAccountInfo.CompanyName,
            "Company"
          );
        }
      } else {
        console.log(
          "Chat Auth Suscces This User " + this.currentChatAuthen.username
        );
      }
    } else {
      console.log(
          "User guest not authen chat "
        );
    }
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
        // Nothing
      } else {
        let decoded = VueJwtDecode.decode(token);
        console.log(decoded);
        if (decoded.role === "F") {
          await api
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
          await api
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
</style>