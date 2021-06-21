<template v-if="post">
	<div>
		<v-card
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
					<v-col cols="4">
						{{ post.caption }}
					</v-col>
				</v-row>
			</v-card-subtitle>
		</v-card>
	</div>
</template>

<script>
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'PostCardSmall',
	components: { videoPlayer },
	props: {
		post: Object
	},
	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		rerouteToPostPage() {
			this.$router.push('/home/post/' + this.post.id);
		}
	}
};
</script>

<style></style>
