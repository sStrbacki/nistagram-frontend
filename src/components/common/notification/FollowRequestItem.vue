<template>
  <v-list-item>
    <v-list-item-content class="d-flex">
      <v-list-item-title>{{request.username}}</v-list-item-title>
      <v-list-item-subtitle>New follower request from {{request.username}}</v-list-item-subtitle>
    </v-list-item-content>
    <span v-if="accepted === true">Accepted</span>
    <span v-else-if="accepted === false">Deleted</span>
    <div class="d-inline-flex" v-else>
      <v-btn color="primary" @click="accept">Accept</v-btn>
      <v-btn @click="decline()">Delete</v-btn>
    </div>
  </v-list-item>
</template>

<script>
import { acceptFollowerRequest, declineFollowerRequest } from '@/services/graphService';
import { notifyError } from '@/services/notificationService';

  export default {
    name: 'FollowRequestItem',
    props: {
      request: Object
    },
    data: () => {
      return {
        accepted: null
      }
    },
    methods: {
      accept() {
        const response = acceptFollowerRequest(this.request.username);
        if (response.status >= 400) {
          notifyError(response.data);
        } else {
          this.accepted = true;
        }
      },
      decline() {
        const response = declineFollowerRequest(this.request.username);
        if (response.status >= 400) {
          notifyError(response.data);
        } else {
          this.accepted = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
