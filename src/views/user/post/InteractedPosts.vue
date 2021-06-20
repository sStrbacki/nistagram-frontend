<template>
  <div class="content-wrap text-center">
    <div class="mb-5">
      <h1>Liked and disliked posts</h1>
    </div>
    <div>
      <v-list>
        <v-row dense no-gutters>
          <v-col v-for="post in posts" :key="post.id">
            <PostCard :post="post"></PostCard>
          </v-col>
        </v-row>
      </v-list>
    </div>

  </div>
</template>

<script>
import PostCard from "@/components/user/feed/PostCard";
export default {
  name: "InteractedPosts",
  components: {PostCard},
  computed: {
    posts: {
      get() {
        return this.$store.getters.interactedPosts;
      },
    }
  },
  mounted() {
    this.$store.dispatch('fetchInteractedPosts');
  }
}
</script>

<style scoped>

</style>