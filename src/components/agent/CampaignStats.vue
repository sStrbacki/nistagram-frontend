<template>
	<v-container v-if="campaignStats.campaign">
		<v-carousel>
			<v-carousel-item v-for="ad in campaignStats.campaign.advertisements" :key="ad.id">
				<div class="d-flex">
					<div id="media">
						<v-img contain v-if="!isVideo(ad.mediaUrl)" src="https://www.filmibeat.com/ph-big/2020/02/v-2020_158253142110.jpg" alt="No image." height="400px">
						</v-img>
						<video-player v-else>
							<source :src="ad.mediaUrl" />
						</video-player>
					</div>
					<div v-if="ad.clickStats" class="ms-5">
						<h2>{{ad.caption}}</h2>
						<v-divider light></v-divider>
						<h3>Total clicks: {{ad.clickStats.clicks}}</h3>
						<h3>Unique user clicks: {{ad.clickStats.uniqueClicks}}</h3>
						<a :href="ad.websiteUrl">Visit website</a>
					</div>
				</div>
			</v-carousel-item>
		</v-carousel>
		<div v-if="campaignStats.post">
			<h1><router-link :to="'/home/post/' + campaignStats.post.id">{{campaignStats.campaign.name}}</router-link></h1>
			<v-divider light></v-divider>
			<h3>Total clicks: {{campaignClicks}}</h3>
			<h3>Unique user clicks: {{campaignUniqueClicks}}</h3>
			<h3>Likes: {{campaignLikeCount}}</h3>
			<h3>Dislikes: {{campaignDislikeCount}}</h3>
			<h3>Comments: {{campaignCommentCount}}</h3>
		</div>
	</v-container>
</template>

<script>
export default {
	name: 'CampaignStats',
	mounted() {
		this.$store.dispatch('fetchCampaignStats',
			this.$route.params.id);
	},
	computed: {
		campaignStats: {
			get() {
				return this.$store.getters.campaignStats
			}
		},
		campaignClicks: {
			get() {
				let allClicks = 0;
				this.campaignStats.campaign.advertisements
					.forEach(ad => allClicks += ad.clickStats.clicks);
				return allClicks;
			}
		},
		campaignUniqueClicks: {
			get() {
				let uniqueClicks = 0;
				this.campaignStats.campaign.advertisements
					.forEach(ad => uniqueClicks += ad.clickStats.uniqueClicks);
				return uniqueClicks;
			}
		},
		campaignLikeCount: {
			get() {
				let likes = 0;
				const userInteractions = this.campaignStats.post.userInteractions;
				if (userInteractions) {
					likes = userInteractions
						.filter(interaction => interaction.sentiment === 'LIKE').length;
				}
				return likes;
			}
		},
		campaignDislikeCount: {
			get() {
				let dislikes = 0;
				const userInteractions = this.campaignStats.post.userInteractions;
				if (userInteractions) {
					dislikes = userInteractions
						.filter(interaction => interaction.sentiment === 'DISLIKE').length;
				}
				return dislikes;
			}
		},
		campaignCommentCount: {
			get() {
				let commentCount = 0;
				const comments = this.campaignStats.post.comments;
				if (comments) {
					commentCount = comments.length;
				}
				return commentCount;
			}
		}
	},
	methods: {
		isVideo(url) {
			return url.includes('videos');
		}
	}
};
</script>

<style scoped>
	#media {
		width: 50%;
	}
</style>