<template v-if="post.postData">
	<div>
		<v-card class="mx-auto" min-width="344" max-width="344">
			<v-img
				v-if="!isVideo(post.postData.mediaUrls[0])"
				:src="post.postData.mediaUrls[0]"
				height="200px"
			>
				<v-icon
					v-if="post.postData.mediaUrls.length > 1"
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
				<source :src="post.postData.mediaUrls[0]" />
			</video-player>

			<v-card-title>
				<v-row>
					<v-col cols="1">
						<v-icon dark>
							mdi-account-circle
						</v-icon>
					</v-col>
					<v-col class="subtitle-2 mt-2">
						<p>{{ post.postData.author }}</p>
					</v-col>
					<v-col cols="2">
						<v-menu bottom right open-on-hover transition="slide-x-transition">
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon v-bind="attrs" v-on="on">
									<v-icon>mdi-dots-vertical</v-icon>
								</v-btn>
							</template>

							<v-list class="text-h5">
								<v-list-item class="list-item">
									<v-list-item-icon>
										<v-icon>mdi-share-variant</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title>Share as a story</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-list-item class="list-item">
									<v-list-item-icon>
										<v-icon>mdi-content-save</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title>Save</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-list-item class="list-item">
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
						{{ post.postData.caption }}
					</v-col>
					<v-spacer></v-spacer>
					<v-col cols="2">
						<v-btn
							icon
							small
							color="primary"
							@click="like()"
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
							color="error"
							@click="dislike()"
							:disabled="!dislikeEnabled"
						>
							<v-icon dark>
								mdi-thumb-down
							</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-row v-if="post.postData.location && post.postData.location.name">
					<v-col cols="1">
						<v-icon dark>
							mdi-map-marker
						</v-icon>
					</v-col>
					<v-col class="subtitle-2 mt-1">
						<p>{{ post.postData.location.name }}</p>
					</v-col>
				</v-row>
			</v-card-subtitle>

			<v-card-actions>
				<v-btn color="orange lighten-2" text @click="postDialog = !postDialog">
					See More
				</v-btn>
			</v-card-actions>
		</v-card>
		<v-dialog v-model="postDialog" width="700">
			<v-card height="520">
				<v-slide-group
					class="pa-4"
					show-arrows
					center-active
					v-if="post.postData.mediaUrls.length > 1"
				>
					<v-slide-item
						v-for="(url, index) in post.postData.mediaUrls"
						:key="index"
					>
						<v-card class="ma-4" height="300" width="500">
							<v-img contain v-if="!isVideo(url)" :src="url" height="300px">
							</v-img>
							<video-player v-else>
								<source :src="url" />
							</video-player>
						</v-card>
					</v-slide-item>
				</v-slide-group>
				<v-row align="center" justify="center" v-else>
					<v-card class="ma-4" height="300" width="500">
						<v-img
							contain
							v-if="!isVideo(post.postData.mediaUrls[0])"
							:src="post.postData.mediaUrls[0]"
							height="300px"
						>
						</v-img>
						<video-player v-else>
							<source :src="post.postData.mediaUrls[0]" />
						</video-player>
					</v-card>
				</v-row>
				<v-card-subtitle>
					<v-row>
						<v-col>
							<v-row no-gutters align="center">
								<v-icon dark>
									mdi-account-circle
								</v-icon>
								<div class="ml-2">
									{{ post.postData.author }}
								</div>
							</v-row>
							<v-row
								no-gutters
								v-if="post.postData.location && post.postData.location.name"
								class="mt-2"
							>
								<v-icon dark>
									mdi-map-marker
								</v-icon>
								<div class="ml-2">
									{{ post.postData.location.name }}
								</div>
							</v-row>

							<v-row no-gutters class="mt-2">
								<v-icon dark>
									mdi-closed-caption
								</v-icon>
								<div class="ml-2">
									{{ post.postData.caption }}
								</div>
							</v-row>
							<v-row no-gutters class="mt-2">
								<v-icon dark color="gray">
									mdi-thumb-up
								</v-icon>
								<div class="ml-2">
									Likes: 0
								</div>
							</v-row>
							<v-row no-gutters class="mt-2">
								<v-icon dark color="gray">
									mdi-thumb-down
								</v-icon>
								<div class="ml-2">
									Dislikes: 0
								</div>
							</v-row>
						</v-col>
						<v-col align-self="start">
							<v-row no-gutters>
								<v-col>
									<v-text-field
										class="comment-input"
										prepend-icon="mdi-comment"
										label="Leave a comment"
									></v-text-field>
								</v-col>
								<v-col align-self="center" cols="4">
									<v-btn icon>
										<v-icon dark color="success" small>
											mdi-send
										</v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card-subtitle>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'PostCard',
	data() {
		return {
			postDialog: false,
			likeEnabled: false,
			dislikeEnabled: false
		};
	},
	props: {
		post: Object
	},
	components: { videoPlayer },
	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		async like() {
			await this.$store.dispatch('like', this.post.contentId);
			this.likeEnabled = false;
			this.dislikeEnabled = true;
		},
		async dislike() {
			await this.$store.dispatch('dislike', this.post.contentId);
			this.dislikeEnabled = false;
			this.likeEnabled = true;
		},
		setLikeEnabled() {
			if (!this.post.postData.userInteractions) {
				this.likeEnabled = true;
				return;
			}
			this.likeEnabled = !this.post.postData.userInteractions
				.filter(interaction => {
					return interaction.sentiment === 'LIKE';
				})
				.map(interaction => {
					return interaction.author;
				})
				.includes(this.$store.getters.username);
		},
		setDislikeEnabled() {
			if (!this.post.postData.userInteractions) {
				this.dislikeEnabled = true;
				return;
			}
			this.dislikeEnabled = !this.post.postData.userInteractions
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
