<template>
  <div>
  <v-container class="mt-15">
    <follower-request-list></follower-request-list>
  </v-container>
  </div>
</template>

<script>
  import FollowerRequestList from "@/components/user/profile/FollowerRequestList";
  export default {
    name: 'FollowerRequestsView',
    components: {FollowerRequestList}
  }
</script>

<style scoped>

</style>
