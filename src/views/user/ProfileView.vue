<template>
  <v-container>
    <profile-header></profile-header>
    <profile-highlights-bar></profile-highlights-bar>
  </v-container>
</template>

<script>
  import ProfileHeader from '../../components/user/ProfileHeader';
  import ProfileHighlightsBar from '../../components/user/ProfileHighlightsBar';

  export default {
    name: 'ProfileView.vue',
    components: {ProfileHighlightsBar, ProfileHeader}
  }
</script>

<style scoped>

</style>
