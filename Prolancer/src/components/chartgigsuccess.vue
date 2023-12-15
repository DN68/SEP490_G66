<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { createApp } from 'vue';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import VueJwtDecode from "vue-jwt-decode";
import api from '../../api';
// Register necessary modules
Chart.register(...registerables);

export default {
  data() {
    return {
      currentAccountInfo: [],
      chartData: [],
    };
  },
  async created(){
    await this.onUpdateAccountInfo()
    try {
      // Replace 'your_api_endpoint' with the actual API endpoint
      const response = await api.get('/orderrequest/getGigTitle', {
        params: {
          FreelancerID: this.currentAccountInfo.FreelancerID,
        },
      });
      this.chartData = response.data;
      console.log(this.chartData)
      if (this.chartData && this.chartData.length > 0) {
        this.renderChart();
      } else {
        console.error('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    },
  // async mounted() {
  //   try {
  //     // Replace 'your_api_endpoint' with the actual API endpoint
  //     const response = await api.get('/orderrequest/getGigTitle', {
  //       params: {
  //         FreelancerID: this.currentAccountInfo.FreelancerID,
  //       },
  //     });
  //     this.chartData = response.data;
  //     console.log(this.chartData)
  //     if (this.chartData && this.chartData.length > 0) {
  //       this.renderChart();
  //     } else {
  //       console.error('No data available');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // },
  methods: {
    generateRandomColors(length) {
      const randomColors = [];
    for (let i = 0; i < length; i++) {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      randomColors.push(color);
    }
    return randomColors;
    },
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');
      const labels = this.chartData.map(item => item.Title);
      console.log
      const values = this.chartData.map(item => item.NUMBERGIG);

      // Ensure values is an array
      const valuesArray = Array.isArray(values) ? values : [values];

      const randomColors = this.generateRandomColors(labels.length);

      const datasets = labels.map((label, index) => ({
        label: label,
        backgroundColor: randomColors[index],
        borderColor: randomColors[index],
        borderWidth: 1,
        data: [valuesArray[index]],
      }));

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: randomColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
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
        await  api
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
          await  api
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
          this.currentAccountInfo = {Email: decoded.email, Role: decoded.role};

        }
      }
    },
  },
};
</script>

<style scoped>
canvas {
  max-width: 600px;
  margin: 0 auto;
}
</style>
