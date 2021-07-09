<template>
	<v-card @click="route()" v-if="campaign && campaign.advertisements[0]">
		<v-img contain v-if="!isVideo(campaign.advertisements[0].mediaUrl)" :src="campaign.advertisements[0].mediaUrl" height="400px">
		</v-img>
		<video-player v-else>
			<source :src="campaign.advertisements[0].mediaUrl" />
		</video-player>
		<v-card-title>{{ campaign.name }}</v-card-title>
		<v-card-actions>
			<v-btn @click="edit(campaign.id)" icon color="warning">
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
			<v-btn @click="remove($event, campaign.id)" icon color="primary">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { videoPlayer } from 'vue-md-player';

export default {
	name: 'CampaignCard',
	props: {
		campaign: Object
	},
	components: {
		videoPlayer
	},
	methods: {
		isVideo(url) {
			return url.includes('videos');
		},
		route() {
			this.$router.push('/agent/campaigns/' + this.campaign.id);
		},
		edit() {
			this.$router.push('/agent/campaigns/' + this.campaign.id + '/edit');
		},
		remove(e, campaignId) {
			e.stopPropagation();
			this.$store.dispatch('deletePersonalCampaign', campaignId);
		}
	}
};
</script>

<style scoped>

</style>
