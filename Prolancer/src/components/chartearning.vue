<template>
  <div class="mt-5">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
import api from '../../api';
// Register necessary modules
Chart.register(...registerables);

export default {
  data() {
    return {
      currentAccountInfo: {},
      chartData: [],
    };
  },
  async created() {
    await this.onUpdateAccountInfo();
    try {
      // Replace '/orders/getchartearning' with the actual API endpoint
      const response = await api.get('/orders/getchartearning', {
        params: {
          FreelancerID: this.currentAccountInfo.FreelancerID,
        },
      });
      this.chartData = response.data;
      console.log(this.chartData);

      if (this.chartData && this.chartData.length > 0) {
        this.renderChart();
      } else {
        console.error('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    generateRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');
      const labels = this.chartData.map(item => item.MONTH);
      const values = this.chartData.map(item => item.Price);

      const randomColor = this.generateRandomColor();

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Earnings',
              data: values,
              backgroundColor: randomColor,
              borderColor: randomColor,
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              
            
            },
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return '$' + value.toFixed(2); // Set the unit here, e.g., '$'
                },
              },
            },
          },
        },
      });
    },
    async onUpdateAccountInfo() {
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
      } else {
        let decoded = VueJwtDecode.decode(token);
        if (decoded.role === 'F') {
          await api
            .get('/freelancers/info', {
              headers: { token: localStorage.getItem('token') },
            })
            .then(
              (res) => {
                this.currentAccountInfo = res.data.freelancer;
              },
              (err) => {
                console.log(err.response);
              }
            );
        } else if (decoded.role === 'C') {
          await api
            .get('/customers/info', {
              headers: { token: localStorage.getItem('token') },
            })
            .then(
              (res) => {
                this.currentAccountInfo = res.data.customer;
              },
              (err) => {
                console.log(err.response);
              }
            );
        } else {
          this.currentAccountInfo = { Email: decoded.email, Role: decoded.role };
        }
      }
    },
  },
};
</script>

<style scoped>
  canvas {
    max-width: 3000px;
    height:500px;
    margin:0 100px;
  }
</style>
