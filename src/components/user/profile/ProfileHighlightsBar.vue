<template>
  <div class="d-flex justify-space-around my-5">
    <div v-bind:key="item" v-for="item in [0, 1, 2, 3, 4]">
      <v-avatar :size="avatarHeight">
        <v-img src="https://www.hellomagazin.rs/data/images/2021-01-23/44486_ana-nikolic-printscreen-yputube_f.jpg"></v-img>
      </v-avatar><br/>
      <v-chip :small="avatarHeight >= 60" :x-small="avatarHeight < 60">highlight</v-chip>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileHighlightsBar.vue',
    computed: {
      avatarHeight() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 40;
          case 'md': return 50;
          default: return 60;
        }
      }
    }
  }
</script>

<style scoped>

</style>
