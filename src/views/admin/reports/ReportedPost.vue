<template>
	<v-container v-if="reportedPost">
		<v-row
			align="center"
			justify="center"
			class="content-wrap"
			v-if="reportedPost.mediaUrls.length > 1"
		>
			<v-slide-group class="pa-4" show-arrows center-active>
				<v-slide-item
					v-for="(url, index) in reportedPost.mediaUrls"
					:key="index"
				>
					<v-card class="ma-4" height="400" width="600">
						<v-img contain v-if="!isVideo(url)" :src="url" height="400px">
						</v-img>
						<video-player v-else>
							<source :src="url" />
						</video-player>
					</v-card>
				</v-slide-item>
			</v-slide-group>
		</v-row>
		<v-row align="center" justify="center" v-else>
			<v-card class="ma-4" height="300" width="500">
				<v-img
					contain
					v-if="!isVideo(reportedPost.mediaUrls[0])"
					:src="reportedPost.mediaUrls[0]"
					height="300px"
				>
				</v-img>
				<video-player v-else>
					<source :src="reportedPost.mediaUrls[0]" />
				</video-player>
			</v-card>
		</v-row>
		<v-row align="start" justify="center">
			<v-col cols="6">
				<v-row no-gutters align="center">
					<v-icon dark>
						mdi-account-circle
					</v-icon>
					<div class="ml-2">
						{{ reportedPost.author }}
					</div>
				</v-row>
				<v-row
					no-gutters
					v-if="reportedPost.location && reportedPost.location.name"
					class="mt-2"
				>
					<v-icon dark>
						mdi-map-marker
					</v-icon>
					{{ reportedPost.location.name }}
				</v-row>
				<v-row no-gutters class="mt-2">
					<v-icon dark>
						mdi-closed-caption
					</v-icon>
					<div class="ml-2">
						{{ reportedPost.caption }}
					</div>
				</v-row>
				<v-row no-gutters class="mt-2">
					<v-icon dark color="gray">
						mdi-thumb-up
					</v-icon>
					<div class="ml-2">Likes: {{ likeCount }}</div>
				</v-row>
				<v-row no-gutters class="mt-2">
					<v-icon dark color="gray">
						mdi-thumb-down
					</v-icon>
					<div class="ml-2">Dislikes: {{ dislikeCount }}</div>
				</v-row>
				<v-row no-gutters class="mt-6 ml-3 mb-3" v-if="reportedPost.tags">
					<v-col>
						<v-row>
							<v-icon dark color="gray">
								mdi-tag
							</v-icon>
							Tagged users:
						</v-row>
						<v-row>
							<v-chip
								class="mr-2 mt-2"
								v-for="(tag, index) in reportedPost.tags"
								:key="index"
							>
								{{ tag }}
							</v-chip>
						</v-row>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="3">
				<v-row v-if="reportedPost.comments">
					<v-list-item
						v-for="(comment, index) in reportedPost.comments"
						:key="index"
					>
						<v-list-item-content>
							<v-list-item-title>
								<v-row no-gutters align="center">
									<v-icon dark>
										mdi-account-circle
									</v-icon>
									<div class="ml-2">{{ comment.author }} :</div>
									<div class="ml-2">
										{{ comment.text }}
									</div>
								</v-row>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-row>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="2">
				<v-btn color="orange darken-1" @click="removePost">
					Remove post
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
import 'vue-md-player/dist/vue-md-player.css';

export default {
	name: 'ReportedPost',
	components: { videoPlayer },
	computed: {
		reportedPost: {
			get() {
				return this.$store.getters.reportedPost;
			}
		},
		likeCount() {
			if (!this.reportedPost.userInteractions) return 0;
			return this.reportedPost.userInteractions.filter(interaction => {
				return interaction.sentiment === 'LIKE';
			}).length;
		},
		dislikeCount() {
			if (!this.reportedPost.userInteractions) return 0;
			return this.reportedPost.userInteractions.filter(interaction => {
				return interaction.sentiment === 'DISLIKE';
			}).length;
		}
	},
	methods: {
		async fetchPost(postId) {
			if (isNaN(postId)) this.$router.push('/admin/reports');
			await this.$store.dispatch('getReportedPost', postId);
		},
		async removePost() {
			await this.$store.dispatch('deleteReportedPost');
			this.$router.push({ name: 'ReportsView' });
		},
		async banAuthor() {
			await this.$store.dispatch('banUser', this.reportedPost.author);
			this.$router.push({ name: 'ReportsView' });
		},
		isVideo(url) {
			return url.includes('videos');
		}
	},
	async mounted() {
		await this.fetchPost(this.$route.params.postId);
	}
};
</script>

<style></style>
