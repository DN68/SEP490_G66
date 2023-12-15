<template>
  
</template>

<script>
import axios from "axios"
import api from '../../api';
export default {
    mounted(){
        console.log(this.$route.params.Status)
        api.put(`/gigs/${this.$route.params.GigID}/updateStatus`, {
            Status: this.$route.params.Status
        }).then(
            res => {
                this.$router.push("/managegigsel/Active")
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