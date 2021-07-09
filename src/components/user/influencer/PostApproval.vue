<template>
	<div class="d-flex flex-column align-content-center mb-5">
		<v-carousel>
			<v-carousel-item v-for="(url, index) in post.mediaUrls" :key="index">
				<v-img
					v-if="!isVideo(url)"
					:src="url"
				>
					<div class="d-flex justify-center flex-wrap">{{post.caption}}</div>
				</v-img>
				<div v-else>
					<div class="d-flex justify-center flex-wrap">{{post.caption}}</div>
					<video-player>
						<source :src="url" />
					</video-player>
				</div>
			</v-carousel-item>
		</v-carousel>
		<v-btn v-if="!approved" @click="approve()" color="primary" small>Approve Ad</v-btn>
		<v-btn v-else disabled color="primary" small>Approved</v-btn>
	</div>
</template>

<script>
import { videoPlayer } from 'vue-md-player';

export default {
	name: 'PostApproval',
	props: {
		post: Object
	},
	data: () => {
		return {
			approved: false
		}
	},
	components: {
		videoPlayer
	},
	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		async approve() {
			await this.$store.dispatch('approveInfluencerPost', this.post.id);
			this.approved = true;
		}
	}
};
</script>
