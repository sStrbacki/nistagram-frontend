<template>
  <div class="d-flex justify-space-around my-5">
    <div class="d-flex flex-column align-center" v-bind:key="highlight.id" v-for="highlight in highlights">
      <v-avatar :size="avatarHeight">
        <v-img :src="highlight.stories[0].mediaUrl"></v-img>
      </v-avatar><br/>
      <v-chip :small="avatarHeight >= 60" :x-small="avatarHeight < 60">{{ highlight.name }}</v-chip>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileHighlightsBar.vue',
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
