<template>
  <div class="d-flex flex-wrap justify-center">
    <div class="d-flex flex-column">
      <v-col id="profile-username-div" class="d-flex flex-wrap justify-space-between">
        <h2 class="d-inline mr-10 align-center">{{ username }}</h2>
        <div v-if="username !== currentUser && pending !== null && following !== null">
          <v-btn rounded color="blue accent-2" v-if="following" @click="unfollow()">Unfollow</v-btn>
          <v-btn rounded color="blue accent-1" disabled v-else-if="pending">Pending</v-btn>
          <v-btn rounded color="blue accent-1" v-else @click="follow()">Follow</v-btn>
        </div>
      </v-col>
      <v-col class="d-none d-sm-flex justify-space-between" id="profile-stats-div">
        <span class="mx-1">{{ postCount }} posts</span>
        <span class="mx-1">{{ followersCount }} followers</span>
        <span class="mx-1">{{ followingCount }} following</span>
      </v-col>
      <v-col id="personal-info-div">
        <h4>{{ fullName }}</h4>
        <div>{{ bio }}</div>
        <a class="text-truncate" v-bind:href="website">{{ website }}</a>
      </v-col>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileHeader.vue",
    methods: {
      unfollow() {
        this.$store.dispatch('unfollowViewingProfile');
      },
      follow() {
        this.$store.dispatch('followViewingProfile');
      }
    },
    computed: {
      username: {
        get() {
          return this.$route.params.username
        }
      },
      currentUser: {
        get() {
          return this.$store.getters.username;
        }
      },
      fullName: {
        get() {
          return this.$store.getters.viewingProfileFullName;
        }
      },
      bio: {
        get() {
          return this.$store.getters.viewingProfileBio;
        }
      },
      website: {
        get() {
          return this.$store.getters.viewingProfileWebsite;
        }
      },
      following: {
        get() {
          return this.$store.getters.followingViewingProfile;
        }
      },
      pending: {
        get() {
          return this.$store.getters.pendingViewingProfile;
        }
      },
      postCount: {
        get() {
          return this.$store.getters.viewingProfileStats.postCount;
        }
      },
      followersCount: {
        get() {
          return this.$store.getters.viewingProfileStats.followers;
        }
      },
      followingCount: {
        get() {
          return this.$store.getters.viewingProfileStats.following;
        }
      }
    }
  }
</script>

<style scoped>
  #profile-picture {
    max-width: 180px;
    max-height: 180px;
  }
</style>
