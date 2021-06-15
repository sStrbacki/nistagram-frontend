<template>
  <v-container>
    <profile-header></profile-header>
    <profile-highlights-bar></profile-highlights-bar>
    <v-tabs class="d-flex justify-center">
      <v-tab @click="goToPosts()">Posts</v-tab>
      <v-tab @click="goToTagged()">Tagged</v-tab>
    </v-tabs>
    <v-card>
      <router-view></router-view>
    </v-card>
  </v-container>
</template>

<script>
  import ProfileHeader from '../../../components/user/profile/ProfileHeader';
  import ProfileHighlightsBar from '../../../components/user/profile/ProfileHighlightsBar';

  export default {
    name: 'ProfileView.vue',
    components: {ProfileHighlightsBar, ProfileHeader},
    computed: {
      username() {
        return this.$route.params.username
      }
    },
    methods: {
      goToPosts() {
        this.$router.push('/' + this.username);
      },
      goToTagged() {
        this.$router.push('/' + this.username + '/tagged')
      }
    }
  }
</script>

<style scoped>

</style>
