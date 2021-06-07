<template>
  <div class="mt-5">
    <div v-if="profilePrivate" class="mb-1">
      <h3 class="d-inline">Profile is private.</h3>
      <span class="ml-3">
        <v-btn rounded color="teal accent-3" @click="profilePrivate = false; update();">
          Make public
        </v-btn>
      </span>
    </div>
    <div v-else class="mb-1">
      <h3 class="d-inline">Profile is public.</h3>
      <span class="ml-3">
        <v-btn rounded color="red accent-1" @click="profilePrivate = true; update();">
          Make private
        </v-btn>
      </span>
    </div>
    <v-switch
        v-model="messagesFromNonFollowersAllowed"
        label="Allow messages from non followers."
        @change="update()"
    ></v-switch>
    <v-switch
        v-model="taggable"
        label="Allow other people to tag you in posts."
        @change="update()"
    ></v-switch>
  </div>
</template>

<script>
  export default {
    name: 'PrivacyData',
    mounted() {
      this.$store.dispatch('getPrivacyData');
    },
    computed: {
      profilePrivate: {
        get() {
          return this.$store.getters.profilePrivate;
        },
        set(value) {
          this.$store.commit('setProfilePrivate', value);
        }
      },
      messagesFromNonFollowersAllowed: {
        get() {
          return this.$store.getters.messagesFromNonFollowersAllowed;
        },
        set(value) {
          this.$store.commit('setMessagesFromNonFollowersAllowed', value);
        }
      },
      taggable: {
        get() {
          return this.$store.getters.taggable;
        },
        set(value) {
          this.$store.commit('setTaggable', value);
        }
      }
    },
    methods: {
      update() {
        this.$store.dispatch('updatePrivacyData');
      }
    }
  }
</script>

<style scoped>

</style>
