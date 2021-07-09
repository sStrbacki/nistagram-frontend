<template>
	<div>
		<v-card
			v-if="!fetchPost"
			class="mx-auto"
			min-width="344"
			max-width="344"
			@click="rerouteToPostPage()"
		>
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
				</v-row>
			</v-card-title>

			<v-card-subtitle>
				<v-row>
					<v-col cols="1">
						<v-icon dark>
							mdi-closed-caption
						</v-icon>
					</v-col>
					<v-col cols="4">
						{{ post.caption }}
					</v-col>
				</v-row>
			</v-card-subtitle>
		</v-card>
		<v-card min-width="200" class="ma-2" v-else-if="!postId">
			<v-list-item-subtitle class="ml-2 mr-2">
				<v-alert border="bottom" colored-border type="warning" elevation="2">
					This post is unavailable.
				</v-alert>
			</v-list-item-subtitle>
		</v-card>
		<v-card
			v-else-if="fetchedPost"
			class="mx-auto"
			min-width="344"
			max-width="344"
			@click="rerouteToPostPage()"
		>
			<v-img
				v-if="!isVideo(fetchedPost.mediaUrls[0])"
				:src="fetchedPost.mediaUrls[0]"
				height="200px"
			>
				<v-icon
					v-if="fetchedPost.mediaUrls.length > 1"
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
				<source :src="fetchedPost.mediaUrls[0]" />
			</video-player>

			<v-card-title>
				<v-row>
					<v-col cols="1">
						<v-icon dark>
							mdi-account-circle
						</v-icon>
					</v-col>
					<v-col class="subtitle-2 mt-2">
						<p>{{ fetchedPost.author }}</p>
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
					<v-col cols="4">
						{{ fetchedPost.caption }}
					</v-col>
				</v-row>
			</v-card-subtitle>
		</v-card>
	</div>
</template>

<script>
import { getPostById } from '../../../services/contentService';
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'PostCardSmall',
	components: { videoPlayer },
	data() {
		return {
			fetchedPost: null,
			unavailable: false
		};
	},
	props: {
		post: Object,
		fetchPost: Boolean,
		postId: Number
	},
	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		rerouteToPostPage() {
			if (this.fetchPost)
				this.$router.push('/home/post/' + this.fetchedPost.id);
			else this.$router.push('/home/post/' + this.post.id);
		},
		async getPost(postId) {
			let response = await getPostById(postId);
			if (response.status >= 400) this.unavailable = true;
			else this.fetchedPost = response.data;
		}
	},
	async mounted() {
		if (this.fetchPost) {
			await this.getPost(this.postId);
		}
	}
};
</script>

<style></style>
