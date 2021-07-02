<template>
	<div v-if="campaign">
		<v-card class="mx-auto d-flex flex-column align-center" min-width="344" max-width="344">
			<v-carousel
				height="200px"
				cycle
				hide-delimiters
			>
				<v-carousel-item v-for="ad in campaign.advertisements" :key="ad.id">
					<a :href="ad.websiteUrl">
						<v-img
							v-if="!isVideo(ad.mediaUrl)"
							:src="ad.mediaUrl"
							height="200px"
						><div class=" caption ms-1">ad</div></v-img>
						<video-player v-else>
							<source :src="ad.mediaUrl"/>
						</video-player>
					</a>
				</v-carousel-item>
			</v-carousel>
			<p class="caption mt-1">{{ campaign.name }}</p>
		</v-card>
	</div>
</template>

<script>
	import { videoPlayer } from 'vue-md-player';

	export default {
		name: 'CampaignCard',
		components: { videoPlayer },
		props: {
			campaign: Object
		},
		methods: {
			isVideo(url) {
				return url.includes('videos');
			}
		}
	};
</script>

<style scoped>

</style>
