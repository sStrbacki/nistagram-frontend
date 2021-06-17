<template>
  <v-slide-group class="pa-4" active-class="success" show-arrows>
    <v-slide-item
        v-for="story in stories"
        :key="story.id"
    >
      <v-card class="ma-4" height="500" width="500">
        <post-card-small
            :post="story.post"
            v-if="story.reshare"
        />
        <v-img
            contain
            v-else-if="!isVideo(story.mediaUrl)"
            :src="story.mediaUrl"
            height="300px"
            aspect-ratio="1"
        >
        </v-img>
        <video-player v-else>
          <source :src="story.mediaUrl" />
        </video-player>
        <v-card-title>
          <v-row>
            <v-col cols="1">
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-col>
            <v-col class="subtitle-2 mt-2">
              <p>{{ story.author }}</p>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-subtitle>
          <v-row>
            <v-col cols="1">
              <v-icon dark>
                mdi-closed-caption
              </v-icon>
            </v-col>
            <v-col>
              {{ story.caption }}
            </v-col>
          </v-row>
          <v-row v-if="story.location">
            <v-col cols="1">
              <v-icon dark>
                mdi-map-marker
              </v-icon>
            </v-col>
            <v-col>
              {{ story.location.name }}
            </v-col>
          </v-row>
        </v-card-subtitle>
      </v-card>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
  export default {
    name: 'StoryView',
    props: {
      stories: Array
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
