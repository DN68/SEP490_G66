<template></template>

<script>
export default {
  mounted() {
    localStorage.clear();
    this.$router.push("/login");
  },
};
</script>

<style>
</style>