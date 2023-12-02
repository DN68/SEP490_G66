<template>
  <Doughnut
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)


export default {
  name: 'BarChart',
  components: { Doughnut },
  methods: {
    randomColor(id) {
      const r = () => Math.floor(256 * Math.random());

      return this.colorCache[id] || (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`);
    }
  },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March','August' ],
        datasets: [ { 
          data: [40, 20, 12],
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          } ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>