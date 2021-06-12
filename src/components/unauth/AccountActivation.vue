<template>
  <v-container>
    <v-row class="content-wrap" align="center" justify="center">
      <h2>Account activation page. Please wait.</h2>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: "AccountActivation",
    mounted() {
        this.$store.commit('setAccountActivationUUID', this.$route.params.uuid);
        this.$store.dispatch('activateAccount')
    }
}
</script>

<style scoped>

</style>