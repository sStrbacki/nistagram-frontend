<template>
	<v-container v-if="reportedStory">
		<v-row class="content-wrap" justify="center">
			<v-col>
				<v-row justify="center">
					<post-card-small
						:post="reportedStory.post"
						v-if="reportedStory.reshare"
					/>
					<v-img
						contain
						v-else-if="!isVideo(reportedStory.mediaUrl)"
						:src="reportedStory.mediaUrl"
						height="300px"
						aspect-ratio="1"
					>
					</v-img>
					<video-player v-else>
						<source :src="reportedStory.mediaUrl" />
					</video-player>
				</v-row>
				<v-row justify="center" class="mt-6">
					<v-col cols="1">
						<v-icon dark>
							mdi-account-circle
						</v-icon>
					</v-col>
					<v-col cols="2">
						{{ reportedStory.author }}
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="1">
						<v-icon dark>
							mdi-closed-caption
						</v-icon>
					</v-col>
					<v-col cols="2">
						{{ reportedStory.caption }}
					</v-col>
				</v-row>
				<v-row v-if="reportedStory.location" justify="center">
					<v-col cols="1">
						<v-icon dark>
							mdi-map-marker
						</v-icon>
					</v-col>
					<v-col cols="2">
						{{ reportedStory.location.name }}
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="2">
				<v-btn color="orange darken-1" @click="removeStory">
					Remove story
					<v-icon right dark>
						mdi-trash-can
					</v-icon>
				</v-btn>
			</v-col>
			<v-col cols="2">
				<v-btn color="red lighten-1" @click="banAuthor">
					Ban author
					<v-icon right dark>
						mdi-account-cancel
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { videoPlayer } from 'vue-md-player';
import PostCardSmall from '../../../components/user/feed/PostCardSmall.vue';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'ReportedStory',
	components: { videoPlayer, PostCardSmall },
	computed: {
		reportedStory: {
			get() {
				return this.$store.getters.reportedStory;
			}
		}
	},
	methods: {
		async fetchStory(storyId) {
			if (isNaN(storyId)) this.$router.push('/admin/reports');
			await this.$store.dispatch('getReportedStory', storyId);
		},
		async removeStory() {
			await this.$store.dispatch('deleteReportedStory');
			this.$router.push({ name: 'ReportsView' });
		},
		async banAuthor() {
			await this.$store.dispatch('banUser', this.reportedStory.author);
			this.$router.push({ name: 'ReportsView' });
		},
		isVideo(url) {
			return url.includes('videos');
		}
	},
	async mounted() {
		await this.fetchStory(this.$route.params.storyId);
	}
};
</script>

<style scoped></style>
