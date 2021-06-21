<template>
	<v-dialog v-model="storyReportDialog" width="700" v-if="reportedStory">
		<v-card>
			<v-card-title>
				Report an inappropriate story.
			</v-card-title>
			<v-card-text>
				<v-row align="center" justify="center">
					<v-card class="ma-4" height="500" width="500">
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
						<v-card-title>
							<v-row>
								<v-col cols="1">
									<v-icon dark>
										mdi-account-circle
									</v-icon>
								</v-col>
								<v-col class="subtitle-2 mt-2">
									<p>{{ reportedStory.author }}</p>
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
									{{ reportedStory.caption }}
								</v-col>
							</v-row>
							<v-row v-if="reportedStory.location">
								<v-col cols="1">
									<v-icon dark>
										mdi-map-marker
									</v-icon>
								</v-col>
								<v-col>
									{{ reportedStory.location.name }}
								</v-col>
							</v-row>
						</v-card-subtitle>
					</v-card>
				</v-row>
				<v-row align="center" justify="center" class="mt-4">
					<v-col cols="8">
						<v-text-field
							v-model="reason"
							label="Reason"
							:rules="rules"
							hide-details="auto"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row align="center" justify="center" class="mt-4">
					<v-btn depressed :disabled="!submitEnabled" @click="reportStory">
						Submit
					</v-btn>
				</v-row>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import PostCardSmall from '../../../components/user/feed/PostCardSmall.vue';
import { videoPlayer } from 'vue-md-player';
export default {
	name: 'StoryReportDialog',
	components: { PostCardSmall, videoPlayer },
	data: () => ({
		rules: [
			value => !!value || 'Required.',
			value => (value && value.length >= 3) || 'Min 3 characters'
		]
	}),
	computed: {
		storyReportDialog: {
			get() {
				return this.$store.getters.storyReportDialog;
			},
			set(value) {
				this.$store.commit('setStoryReportDialog', value);
			}
		},
		reportedStory: {
			get() {
				return this.$store.getters.reportedStory;
			}
		},
		reason: {
			get() {
				return this.$store.getters.storyReportReason;
			},
			set(value) {
				this.$store.commit('setStoryReportReason', value);
			}
		},
		submitEnabled() {
			return this.reason && this.reason.length >= 3;
		}
	},
	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		reportStory() {
			this.$store.dispatch('reportStory');
			this.storyReportDialog = !this.storyReportDialog;
		}
	}
};
</script>

<style></style>
