<template>
  
</template>

<script>
import axios from "axios"

export default {
    mounted(){
        console.log(this.$route.params.Status)
        axios.put(`/gigs/${this.$route.params.GigID}/updateStatus`, {
            Status: this.$route.params.Status
        }).then(
            res => {
                this.$router.push("/managegigsel")
            },
            err => {
                console.log(err.response)
            }
        )
    }
}
</script>

<style>

</style>