<template>
	<v-container>
		<v-row class="content-wrap" justify="center">
			<h2>Suggested users</h2>
		</v-row>
		<v-row justify="start" v-if="recommendations.length !== 0">
			<v-col
				v-for="(recommendation, index) in recommendations"
				:key="index"
				cols="4"
			>
				<recommendation-card :recommendation="recommendation" />
			</v-col>
		</v-row>
		<v-row justify="center" class="mt-5" v-else>
			<v-alert border="top" colored-border type="info" elevation="2">
				There is no available recommendations at the moment.
			</v-alert>
		</v-row>
	</v-container>
</template>

<script>
import RecommendationCard from '../../../components/user/recommendation/RecommendationCard.vue';

export default {
	name: 'FollowRecommendations',
	components: { RecommendationCard },
	computed: {
		recommendations: {
			get() {
				return this.$store.getters.recommendations;
			}
		}
	},
	mounted() {
		this.$store.dispatch('getRecommendations');
	}
};
</script>

<style></style>
