<template>
  <v-list>
    <follow-request-item
        v-for="request in followerRequests"
        :key="followerRequests.username"
        :request="request"
    ></follow-request-item>
    <v-list-item v-if="!followerRequests.length" class="d-flex justify-center">
      You have no follower requests at the moment.
    </v-list-item>
  </v-list>
</template>

<script>
  import FollowRequestItem from "@/components/common/notification/FollowRequestItem";
  export default {
    name: 'FollowerRequestList',
    components: {FollowRequestItem},
    mounted() {
      this.$store.dispatch('getFollowerRequests');
    },
    computed: {
      followerRequests: {
        get() {
          return this.$store.getters.followerRequests;
        }
      }
    }
  }
</script>

<style scoped>

</style>
