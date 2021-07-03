<template>
	<v-slide-group class="pa-4" active-class="success" show-arrows center-active>
		<v-slide-item v-for="story in stories" :key="story.id">
			<v-card class="ma-4" height="600" width="500">
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
				<div v-if="!ad">
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
							<v-col v-if="feed && story.author !== currentUser" cols="3">
								<v-btn
									color="blue-grey"
									small
									@click="openStoryReportDialog(story)"
								>
									Report

									<v-icon dark>
										mdi-alert
									</v-icon>
								</v-btn>
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
					<v-card-actions v-if="story.author === currentUser">
						<v-btn
							small
							color="info"
							v-if="!editStoryId"
							@click="selectStory(story.id)"
							>Add as highlight</v-btn
						>
						<div class="d-flex align-center" v-if="editStoryId === story.id">
							<v-select
								placeholder="Select existing highlight"
								:items="highlights"
								:item-text="highlightName"
								:item-value="highlightId"
								v-model="selectedHighlight"
								@change="highlightInput = ''"
							></v-select>
							<span class="mx-2"> or </span>
							<v-text-field
								placeholder="Add new highlight"
								v-model="highlightInput"
								@keydown="selectedHighlight = null"
							></v-text-field>
							<v-btn color="primary" icon @click="addHighlight()"
								><v-icon>mdi-check</v-icon></v-btn
							>
							<v-btn color="warning" icon @click="cancelHighlight()"
								><v-icon>mdi-close</v-icon></v-btn
							>
						</div>
					</v-card-actions>
				</div>
				<v-card-actions v-else>
					<a class="v-btn mx-auto mt-10" :href="story.websiteUrl">Visit advertiser site</a>
				</v-card-actions>
			</v-card>
		</v-slide-item>
	</v-slide-group>
</template>

<script>
import PostCardSmall from '../../../components/user/feed/PostCardSmall.vue';
import { videoPlayer } from 'vue-md-player';
import {
	addStoryToHighlight,
	createHighlight
} from '@/services/contentService';
import { notifyError } from '@/services/notificationService';
export default {
	name: 'StoryView',
	components: { PostCardSmall, videoPlayer },
	props: {
		stories: Array,
		feed: Boolean,
		ad: Boolean
	},
	data: () => {
		return {
			editStoryId: '',
			highlightInput: '',
			selectedHighlight: null
		};
	},

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
			},
			set(value) {
				this.$store.commit('setReportedStory', value);
			}
		},
		currentUser: {
			get() {
				return this.$store.getters.username;
			}
		},
		highlights: {
			get() {
				return this.$store.getters.viewingProfileHighlights;
			}
		}
	},
	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		openStoryReportDialog(story) {
			this.storyReportDialog = !this.storyReportDialog;
			this.reportedStory = story;
		},
		selectStory(id) {
			this.editStoryId = id;
		},
		highlightId: highlight => highlight.id,
		highlightName: highlight => highlight.name,
		cancelHighlight() {
			this.editStoryId = '';
			this.selectedHighlight = null;
			this.highlightInput = '';
		},
		async addHighlight() {
			if (this.highlightInput) {
				const response = await createHighlight(this.highlightInput);
				if (response.status >= 400) {
					notifyError(response.data);
				} else {
					await this.addStoryToHighlight(this.editStoryId, response.data.id);
				}
			} else {
				await this.addStoryToHighlight(
					this.editStoryId,
					this.selectedHighlight
				);
			}
			this.cancelHighlight();
		},
		async addStoryToHighlight(storyId, highlightId) {
			const res = await addStoryToHighlight(storyId, highlightId);
			if (res.status >= 400) {
				notifyError(res.data);
			}
		}
	},
	mounted() {
		this.$store.dispatch('getViewingProfileHighlights', this.currentUser);
	}
};
</script>

<style scoped></style>
