<template>
  <div class="d-flex flex-wrap">
    <v-col cols="4" class="pa-2" v-for="item in [0, 1, 2, 3, 4, 5, 6]" v-bind:key="item">
      <!-- ovde ce neki v-if pa moze da bude i video ili sta vec -->
      <v-img  aspect-ratio="1" src="https://www.hellomagazin.rs/data/images/2021-01-23/44486_ana-nikolic-printscreen-yputube_f.jpg"></v-img>
    </v-col>
  </div>
</template>

<script>
  export default {
    name: 'ProfilePostsView.vue'
  }
</script>

<style scoped>

</style>
