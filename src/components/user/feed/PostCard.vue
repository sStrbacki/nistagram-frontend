<template v-if="post">
	<div>
		<v-card class="mx-auto" min-width="344" max-width="344">
			<v-img
				v-if="!isVideo(post.mediaUrls[0])"
				:src="post.mediaUrls[0]"
				height="200px"
			>
				<v-icon
					v-if="post.mediaUrls.length > 1"
					dark
					fab
					top
					left
					color="gray"
					class="mt-2 ml-2"
				>
					mdi-image-multiple
				</v-icon>
			</v-img>
			<video-player v-else>
				<source :src="post.mediaUrls[0]" />
			</video-player>

			<v-card-title>
				<v-row>
					<v-col cols="1">
						<v-icon dark>
							mdi-account-circle
						</v-icon>
					</v-col>
					<v-col class="subtitle-2 mt-2">
						<p>{{ post.author }}</p>
					</v-col>
					<v-col cols="2">
						<v-menu bottom right open-on-hover transition="slide-x-transition">
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon v-bind="attrs" v-on="on">
									<v-icon>mdi-dots-vertical</v-icon>
								</v-btn>
							</template>

							<v-list class="text-h5">
								<v-list-item class="list-item" @click="openReshareDialog()">
									<v-list-item-icon>
										<v-icon>mdi-share-variant</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title>Share as a story</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-list-item
									class="list-item"
									@click="openCollectionsDialog()"
									v-if="mode !== 'collection'"
								>
									<v-list-item-icon>
										<v-icon>mdi-content-save</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title>Save</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-list-item
									class="list-item"
									v-else
									@click="removePostFromCollection()"
								>
									<v-list-item-icon>
										<v-icon>mdi-close</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title
											>Remove from this collection</v-list-item-title
										>
									</v-list-item-content>
								</v-list-item>

								<v-list-item class="list-item" @click="openPostReportDialog()">
									<v-list-item-icon>
										<v-icon>mdi-alert</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title>Report</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
				</v-row>
			</v-card-title>

			<v-card-subtitle>
				<v-row>
					<v-col cols="4">
						{{ post.caption }}
					</v-col>
					<v-spacer></v-spacer>
					<v-col cols="2">
						<v-btn
							icon
							small
							:color="likedColor"
							@click="changeLiked"
							:disabled="!likeEnabled"
						>
							<v-icon dark>
								mdi-thumb-up
							</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="2">
						<v-btn
							icon
							small
							:color="dislikedColor"
							@click="changeDisliked"
							:disabled="!dislikeEnabled"
						>
							<v-icon dark>
								mdi-thumb-down
							</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-row v-if="post.location && post.location.name">
					<v-col cols="1">
						<v-icon dark>
							mdi-map-marker
						</v-icon>
					</v-col>
					<v-col class="subtitle-2 mt-1">
						<p>{{ post.location.name }}</p>
					</v-col>
				</v-row>
			</v-card-subtitle>

			<v-card-actions>
				<v-btn color="orange lighten-2" text @click="rerouteToPostPreview()">
					See More
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'PostCard',
	data() {
		return {
			likeEnabled: false,
			dislikeEnabled: false,
			postLiked: false,
			postDisliked: false,
			selectedResharePost: null
		};
	},
	props: {
		post: Object,
		mode: String
	},
	components: { videoPlayer },
	computed: {
		selectedPostId: {
			get() {
				return this.$store.getters.selectedPostId;
			},
			set(value) {
				this.$store.commit('setSelectedPost', value);
			}
		},
		resharePost: {
			get() {
				return this.$store.getters.resharePost;
			},
			set(value) {
				this.$store.commit('setResharePost', value);
			}
		},
		reportedPost: {
			set(value) {
				this.$store.commit('setReportedPost', value);
			},
			get() {
				return this.$store.getters.reportedPost;
			}
		},
		collectionDialog: {
			get() {
				return this.$store.getters.collectionDialog;
			},
			set(value) {
				this.$store.commit('setCollectionDialog', value);
			}
		},
		reshareDialog: {
			get() {
				return this.$store.getters.reshareDialog;
			},
			set(value) {
				this.$store.commit('setReshareDialog', value);
			}
		},
		postReportDialog: {
			get() {
				return this.$store.getters.postReportDialog;
			},
			set(value) {
				this.$store.commit('setPostReportDialog', value);
			}
		},
		likedColor() {
			if (this.postLiked) return 'green';
			else return 'gray';
		},
		dislikedColor() {
			if (this.postDisliked) return 'red';
			else return 'gray';
		}
	},
	methods: {
		openPostReportDialog() {
			this.reportedPost = this.post;
			this.postReportDialog = !this.postReportDialog;
		},
		removePostFromCollection() {
			this.$store.dispatch('removePostFromCollection', this.post.id);
		},
		openCollectionsDialog() {
			this.selectedPostId = this.post.id;
			this.collectionDialog = !this.collectionDialog;
		},
		openReshareDialog() {
			this.resharePost = this.post;
			this.reshareDialog = !this.reshareDialog;
		},
		rerouteToPostPreview() {
			this.$router.push({
				name: 'PostPreview',
				params: {
					postId: this.post.id
				}
			});
		},
		isVideo(url) {
			return url.includes('videos');
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
			await this.$store.dispatch('like', this.post.id);
			this.postLiked = true;
			this.likeEnabled = true;
			this.dislikeEnabled = false;
		},
		async removeLike() {
			await this.$store.dispatch('deleteLike', this.post.id);
			this.postLiked = false;
			this.likeEnabled = true;
			this.dislikeEnabled = true;
		},
		async dislike() {
			await this.$store.dispatch('dislike', this.post.id);
			this.postDisliked = true;
			this.dislikeEnabled = true;
			this.likeEnabled = false;
		},
		async removeDislike() {
			await this.$store.dispatch('deleteLike', this.post.id);
			this.postDisliked = false;
			this.likeEnabled = true;
			this.dislikeEnabled = true;
		},
		setLikeEnabled() {
			if (!this.post.userInteractions) {
				this.likeEnabled = true;
				return;
			}
			this.likeEnabled = !this.postDisliked;
		},
		setDislikeEnabled() {
			if (!this.post.userInteractions) {
				this.dislikeEnabled = true;
				return;
			}
			this.dislikeEnabled = !this.postLiked;
		},
		setPostLiked() {
			if (!this.post.userInteractions) return false;
			this.postLiked = this.post.userInteractions
				.filter(interaction => {
					return interaction.sentiment === 'LIKE';
				})
				.map(interaction => {
					return interaction.author;
				})
				.includes(this.$store.getters.username);
		},
		setPostDisliked() {
			if (!this.post.userInteractions) return false;
			this.postDisliked = this.post.userInteractions
				.filter(interaction => {
					return interaction.sentiment === 'DISLIKE';
				})
				.map(interaction => {
					return interaction.author;
				})
				.includes(this.$store.getters.username);
		}
	},
	mounted() {
		this.setPostLiked();
		this.setPostDisliked();
		this.setLikeEnabled();
		this.setDislikeEnabled();
	}
};
</script>

<style scoped>
.list-item {
	cursor: pointer;
}
.player-container {
	height: 200px !important;
}
.comment-input {
	transform: scale(0.775);
	transform-origin: left;
}
</style>
