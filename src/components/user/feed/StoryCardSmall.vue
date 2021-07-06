<template>
	<v-card class="ma-4" height="450" width="500" v-if="!fetchStory">
		<post-card-small :post="story.post" v-if="story.reshare" />
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
	<v-card min-width="200" class="ma-2" v-else-if="!storyId">
		<v-list-item-subtitle class="ml-2 mr-2">
			<v-alert border="bottom" colored-border type="warning" elevation="2">
				This story is unavailable.
			</v-alert>
		</v-list-item-subtitle>
	</v-card>
	<v-card class="ma-4" height="450" width="500" v-else-if="fetchedStory">
		<post-card-small :post="fetchedStory.post" v-if="fetchedStory.reshare" />
		<v-img
			contain
			v-else-if="!isVideo(fetchedStory.mediaUrl)"
			:src="fetchedStory.mediaUrl"
			height="300px"
			aspect-ratio="1"
		>
		</v-img>
		<video-player v-else>
			<source :src="fetchedStory.mediaUrl" />
		</video-player>
		<v-card-title>
			<v-row>
				<v-col cols="1">
					<v-icon dark>
						mdi-account-circle
					</v-icon>
				</v-col>
				<v-col class="subtitle-2 mt-2">
					<p>{{ fetchedStory.author }}</p>
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
					{{ fetchedStory.caption }}
				</v-col>
			</v-row>
			<v-row v-if="fetchedStory.location">
				<v-col cols="1">
					<v-icon dark>
						mdi-map-marker
					</v-icon>
				</v-col>
				<v-col>
					{{ fetchedStory.location.name }}
				</v-col>
			</v-row>
		</v-card-subtitle>
	</v-card>
</template>

<script>
import { getStoryById } from '../../../services/contentService';
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'StoryCardSmall',
	components: { videoPlayer },
	data() {
		return {
			unavailable: false,
			fetchedStory: null
		};
	},
	props: {
		story: Object,
		fetchStory: Boolean,
		storyId: Number
	},
	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		async getStory(storyId) {
			let response = await getStoryById(storyId);
			if (response.status >= 400) this.unavailable = true;
			else this.fetchedStory = response.data;
		}
	},
	async mounted() {
		if (this.fetchStory) {
			await this.getStory(this.storyId);
		}
	}
};
</script>

<style></style>
