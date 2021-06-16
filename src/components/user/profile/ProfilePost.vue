<template>
  <div v-if="!isVideo(post.mediaUrls[0])">
    <v-img aspect-ratio="1" :src="post.mediaUrls[0]"></v-img>
  </div>
  <div v-else>
    <video-player>
      <source :src="post.mediaUrls[0]" />
    </video-player>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-md-player';
  import 'vue-md-player/dist/vue-md-player.css';

  export default {
    name: 'ProfilePost',
    props: {
      post: Object
    },
    components: {
      videoPlayer
    },
    methods: {
      isVideo(url) {
        return url.includes('videos');
      }
    }
  }
</script>

<style scoped>

</style>
