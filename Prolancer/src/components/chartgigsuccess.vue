<template>
  <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "BarChart",
  components: { Doughnut },
  data() {
    return {
      gigs: [], // Initialize gigs array
      chartData: {
        labels: [],
        data:[],
        datasets: [
          {
            // label: [],
            data: [],
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#ccc",
            ],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    // this.chartData.labels=['January', 'February', 'March','August']

    let abc = this.chartData.labels;
    console.log(abc);

    console.log(this.chartData.labels);
    // console.log(this.chartData.labels);
    // console.log(this.chartData.datasets[0].label);

    let count = 0;
    await axios
      .get("/orderrequest/getGigTitle", {
        params: {
          FreelancerID: "1",
        },
      })
      .then(
        (res) => {
          this.gigs = res.data;
          for (const gig of this.gigs) {
            this.chartData.labels.push(gig.Title);
            this.chartData.data.push(gig.NUMBERGIG);

          }
          
        },
        
        (err) => {
          console.log(err.response);
        }
      );
    // this.chartData.labels=['January', 'February', 'March','August']
    // this.chartData.datasets[0].data= '1';
    console.log(this.chartData.labels);
    console.log(this.chartData.data)
  },
};
</script>
