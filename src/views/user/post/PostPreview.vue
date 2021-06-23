<template>
	<v-container v-if="loaded" class="content-wrap">
		<v-row align="center" justify="center" v-if="mediaUrls.length > 1">
			<v-slide-group class="pa-4" show-arrows center-active>
				<v-slide-item v-for="(url, index) in mediaUrls" :key="index">
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
					v-if="!isVideo(mediaUrls[0])"
					:src="mediaUrls[0]"
					height="300px"
				>
				</v-img>
				<video-player v-else>
					<source :src="mediaUrls[0]" />
				</video-player>
			</v-card>
		</v-row>
		<v-row align="start" justify="center">
			<v-col cols="4">
				<v-row no-gutters align="center">
					<v-icon dark>
						mdi-account-circle
					</v-icon>
					<div
						class="ml-2"
						style="cursor: pointer;"
						@click="rerouteToProfile(author)"
					>
						{{ author }}
					</div>
				</v-row>
				<v-row no-gutters v-if="location && location.name" class="mt-2">
					<v-icon dark>
						mdi-map-marker
					</v-icon>
					<div class="ml-2">
						{{ location.name }}
					</div>
				</v-row>
				<v-row no-gutters class="mt-2">
					<v-icon dark>
						mdi-closed-caption
					</v-icon>
					<div class="ml-2">
						{{ caption }}
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
				<v-row no-gutters class="mt-6 ml-3 mb-3" v-if="tags">
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
								v-for="(tag, index) in tags"
								:key="index"
								@click="rerouteToProfile(tag)"
							>
								{{ tag }}
							</v-chip>
						</v-row>
					</v-col>
				</v-row>
				<v-row class="mt-4">
					<v-col cols="4">
						<v-btn
							small
							:color="likedColor"
							@click="changeLiked"
							:disabled="!likeEnabled"
						>
							Like
							<v-icon dark class="ml-2 mb-1">
								mdi-thumb-up
							</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="2">
						<v-btn
							small
							:color="dislikedColor"
							@click="changeDisliked"
							:disabled="!dislikeEnabled"
						>
							Dislike
							<v-icon dark class="ml-2 mt-1">
								mdi-thumb-down
							</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
			<v-col align-self="start" cols="4">
				<v-row v-if="comments">
					<v-list-item v-for="(comment, index) in comments" :key="index">
						<v-list-item-content>
							<v-list-item-title>
								<v-row no-gutters align="center">
									<v-icon dark>
										mdi-account-circle
									</v-icon>
									<div
										class="ml-2"
										style="cursor: pointer;"
										@click="rerouteToProfile(comment.author)"
									>
										{{ comment.author }} :
									</div>
									<div class="ml-2">
										{{ comment.text }}
									</div>
								</v-row>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<v-text-field
							class="comment-input"
							prepend-icon="mdi-comment"
							label="Leave a comment"
							v-model="comment"
						></v-text-field>
					</v-col>
					<v-col align-self="center" cols="1">
						<v-btn icon @click="leaveComment()">
							<v-icon dark color="success" small :disabled="!comment">
								mdi-send
							</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
	<v-container v-else>
		<v-progress-circular :size="50" indeterminate></v-progress-circular>
	</v-container>
</template>

<script>
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'PostPreview',
	components: { videoPlayer },
	data() {
		return {
			loaded: false,
			likeEnabled: false,
			dislikeEnabled: false,
			postLiked: false,
			postDisliked: false,
			comment: ''
		};
	},
	watch: {
		$route(to, from) {
			if (to.name === 'PostPreview' && from.name === 'PostPreview')
				this.fetchPost(to.params.postId);
		}
	},
	computed: {
		id: {
			get() {
				return this.$store.getters.id;
			}
		},
		author: {
			get() {
				return this.$store.getters.postAuthor;
			}
		},
		caption: {
			get() {
				return this.$store.getters.postCaption;
			}
		},
		comments: {
			get() {
				return this.$store.getters.postComments;
			}
		},
		location: {
			get() {
				return this.$store.getters.postLocation;
			}
		},
		mediaUrls: {
			get() {
				return this.$store.getters.postMediaUrls;
			}
		},
		time: {
			get() {
				return this.$store.getters.postTime;
			}
		},
		userInteractions: {
			get() {
				return this.$store.getters.postUserInteractions;
			}
		},
		tags: {
			get() {
				return this.$store.getters.postTags;
			}
		},
		likedColor() {
			if (this.postLiked) return 'green';
			else return 'gray';
		},
		dislikedColor() {
			if (this.postDisliked) return 'red';
			else return 'gray';
		},
		likeCount() {
			if (!this.userInteractions) return 0;
			return this.userInteractions.filter(interaction => {
				return interaction.sentiment === 'LIKE';
			}).length;
		},
		dislikeCount() {
			if (!this.userInteractions) return 0;
			return this.userInteractions.filter(interaction => {
				return interaction.sentiment === 'DISLIKE';
			}).length;
		}
	},

	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		rerouteToProfile(author) {
			this.$router.push({ name: 'Profile', params: { username: author } });
		},
		async leaveComment() {
			await this.$store.dispatch('comment', this.comment);
			this.comment = '';
		},
		changeLiked() {
			if (this.postLiked) this.removeLike();
			else this.like();
		},
		changeDisliked() {
			if (this.postDisliked) this.removeDislike();
			else this.dislike();
		},
		async like() {
			await this.$store.dispatch('likePost', this.id);
			this.postLiked = true;
			this.likeEnabled = true;
			this.dislikeEnabled = false;
		},
		async removeLike() {
			await this.$store.dispatch('deleteLikeFromPost', this.id);
			this.postLiked = false;
			this.likeEnabled = true;
			this.dislikeEnabled = true;
		},
		async dislike() {
			await this.$store.dispatch('dislikePost', this.id);
			this.postDisliked = true;
			this.dislikeEnabled = true;
			this.likeEnabled = false;
		},
		async removeDislike() {
			await this.$store.dispatch('deleteDislikeFromPost', this.id);
			this.postDisliked = false;
			this.likeEnabled = true;
			this.dislikeEnabled = true;
		},
		setLikeEnabled() {
			if (!this.userInteractions) {
				this.likeEnabled = true;
				return;
			}
			this.likeEnabled = !this.postDisliked;
		},
		setDislikeEnabled() {
			if (!this.userInteractions) {
				this.dislikeEnabled = true;
				return;
			}
			this.dislikeEnabled = !this.postLiked;
		},
		setPostLiked() {
			if (!this.userInteractions) return false;
			this.postLiked = this.userInteractions
				.filter(interaction => {
					return interaction.sentiment === 'LIKE';
				})
				.map(interaction => {
					return interaction.author;
				})
				.includes(this.$store.getters.username);
		},
		setPostDisliked() {
			if (!this.userInteractions) return false;
			this.postDisliked = this.userInteractions
				.filter(interaction => {
					return interaction.sentiment === 'DISLIKE';
				})
				.map(interaction => {
					return interaction.author;
				})
				.includes(this.$store.getters.username);
		},
		async fetchPost(postId) {
			if (isNaN(postId)) this.$router.push('/home/feed');
			await this.$store.dispatch('getPostById', postId);
		}
	},
	async mounted() {
		await this.fetchPost(this.$route.params.postId);
		this.setPostLiked();
		this.setPostDisliked();
		this.setLikeEnabled();
		this.setDislikeEnabled();
		this.loaded = true;
	}
};
</script>

<style></style>
