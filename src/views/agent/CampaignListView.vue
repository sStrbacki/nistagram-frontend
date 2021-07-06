<template>
	<v-container class="d-flex flex-wrap">
		<div
			id="campaign-card"
			v-for="campaign in campaigns"
			:key="campaign.id"
			class="px-3 my-2"
		>
			<campaign-card
				:campaign="campaign"
			></campaign-card>
		</div>
	</v-container>
</template>

<script>
import CampaignCard from '../../components/agent/CampaignCard';
export default {
	name: 'CampaignsView',
	components: { CampaignCard },
	mounted() {
		this.$store.dispatch('fetchPersonalCampaigns');
	},
	computed: {
		campaigns: {
			get() {
				return this.$store.getters.personalCampaigns;
			}
		}
	}
};
</script>

<style scoped>
	#campaign-card {
		width: 25%;
	}
</style>
