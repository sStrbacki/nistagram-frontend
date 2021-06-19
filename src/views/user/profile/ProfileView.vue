<template>
  <v-container>
    <profile-header></profile-header>
    <div v-if="profilePrivate === false || following || username === currentUser">
      <profile-highlights-bar></profile-highlights-bar>
      <v-tabs class="d-flex justify-center">
        <v-tab @click="goToPosts()">Posts</v-tab>
        <v-tab @click="goToTagged()">Tagged</v-tab>
      </v-tabs>
      <v-card>
        <router-view></router-view>
      </v-card>
    </div>
    <v-card class="d-flex justify-center my-5 py-5" v-else-if="profilePrivate && following === false">
      This profile is private!
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
      },
      profilePrivate() {
        return this.$store.getters.viewingProfilePrivate;
      },
      following() {
        return this.$store.getters.followingViewingProfile;
      },
      currentUser() {
        return this.$store.getters.username;
      }
    },
    mounted() {
      this.getProfile();
    },
    watch: {
      $route () {
        this.getProfile();
      }
    },
    methods: {
      goToPosts() {
        this.$router.push('/' + this.username);
      },
      goToTagged() {
        this.$router.push('/' + this.username + '/tagged');
      },
      async getProfile() {
				await this.$store.dispatch('getViewingProfilePrivate', this.username);
				if (this.profilePrivate) {
					this.getData();
				} else {
					console.log('get data for public profile');
				}
			},
			getData() {
				this.$store.dispatch('getProfile');
				this.$store.dispatch('getViewingProfilePosts', this.username);
				this.$store.dispatch('getViewingProfile', this.username);
				this.$store.dispatch('getFollowingViewingProfile', this.username);
				this.$store.dispatch('getPendingViewingProfile', this.username);
				this.$store.dispatch('getViewingProfileStats', this.username);
				this.$store.dispatch('getViewingProfileHighlights', this.username);
			}
    }
  }
</script>

<style scoped>

</style>
