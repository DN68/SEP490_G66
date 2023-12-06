<template>
  <div id="app">
    <chart :data="chartData"></chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$axios.get('http://localhost:3000/api/data')
        .then(response => {
          this.chartData = response.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
