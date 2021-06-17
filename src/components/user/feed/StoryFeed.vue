<template>
	<v-row
		class="content-wrap"
		align="center"
		justify="center"
		v-if="storiesLoaded"
	>
		<v-slide-group class="pa-4" show-arrows>
			<v-slide-item
				v-for="(storyGroup, index) in closeFriendStoryGroups"
				:key="index"
				v-slot="{ toggle }"
			>
				<v-card
					shaped
					:color="'teal darken-3'"
					class="ma-4"
					height="150"
					width="100"
					outlined
					@click="toggle && selectStoryGroup(storyGroup)"
				>
					<v-row align="center" justify="center" class="mt-4">
						<v-icon
							color="grey lighten-3"
							size="48"
							v-text="'mdi-account-circle'"
						></v-icon>
					</v-row>
					<v-row align="center" justify="center" class="mt-4">
						<v-chip small>{{ storyGroup.publisher }}</v-chip>
					</v-row>
				</v-card>
			</v-slide-item>
		</v-slide-group>
		<v-slide-group class="pa-4" show-arrows>
			<v-slide-item
				v-for="(storyGroup, index) in storyGroups"
				:key="index"
				v-slot="{ toggle }"
			>
				<v-card
					shaped
					color="grey darken-1"
					class="ma-4"
					height="150"
					width="100"
					outlined
					@click="toggle && selectStoryGroup(storyGroup)"
				>
					<v-row align="center" justify="center" class="mt-4">
						<v-icon
							color="grey lighten-3"
							size="48"
							v-text="'mdi-account-circle'"
						></v-icon>
					</v-row>
					<v-row align="center" justify="center" class="mt-4">
						<v-chip small>{{ storyGroup.publisher }}</v-chip>
					</v-row>
				</v-card>
			</v-slide-item>
		</v-slide-group>
		<v-dialog v-model="storyDialog" width="1000" v-if="selectedStoryGroup">
			<story-view :stories="getStoriesFromStoryGroup(selectedStoryGroup)"></story-view>
		</v-dialog>
	</v-row>
	<v-row align="center" justify="center" class="content-wrap" v-else>
		<v-progress-circular :size="50" indeterminate></v-progress-circular>
	</v-row>
</template>

<script>
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
import PostCardSmall from './PostCardSmall.vue';
import StoryView from "@/components/common/story/StoryView";
export default {
	name: 'StoryFeed',
	components: {StoryView, videoPlayer, PostCardSmall },
	data() {
		return {
			selectedStoryGroup: null,
			storyDialog: false,
			storiesLoaded: false
		};
	},
	methods: {
		selectStoryGroup(storyGroup) {
			this.selectedStoryGroup = storyGroup;
			this.storyDialog = true;
			console.log(storyGroup);
		},
		isVideo(url) {
			return url.includes('videos');
		},
    getStoriesFromStoryGroup(storyGroup) {
		  return storyGroup.entries.map(entry => entry.storyData);
    }
	},
	computed: {
		storyGroups: {
			get() {
				return this.$store.getters.storyGroups;
			}
		},
		closeFriendStoryGroups: {
			get() {
				return this.$store.getters.closeFriendStoryGroups;
			}
		}
	},
	async mounted() {
		await this.$store.dispatch('fetchCloseFriendStories');
		await this.$store.dispatch('fetchStories');
		this.storiesLoaded = true;
	}
};
</script>

<style></style>
