<template>
  <div class="d-flex justify-space-around my-5">
    <div class="d-flex flex-column align-center" v-bind:key="highlight.id" v-for="highlight in highlights" @click="openHighlight(highlight)">
      <v-avatar :size="avatarHeight">
        <v-img :src="highlight.stories[0].mediaUrl"></v-img>
      </v-avatar><br/>
      <v-chip :small="avatarHeight >= 60" :x-small="avatarHeight < 60">{{ highlight.name }}</v-chip>
    </div>
    <v-dialog v-model="showHighlight" width="1000" v-if="stories">
      <story-view :stories="stories" :display="showHighlight"></story-view>
    </v-dialog>
  </div>
</template>

<script>
  import StoryView from "@/components/common/story/StoryView";
  export default {
    name: 'ProfileHighlightsBar.vue',
    components: {StoryView},
    data: () => {
      return {
        stories: [],
        showHighlight: false
      }
    },
    methods: {
      openHighlight(highlight) {
        this.stories = highlight.stories;
        this.showHighlight = true;
      }
    },
    computed: {
      avatarHeight() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 40;
          case 'md': return 50;
          default: return 60;
        }
      },
      highlights: {
        get() {
          return this.$store.getters.viewingProfileHighlights;
        }
      }
    }
  }
</script>

<style scoped>

</style>
