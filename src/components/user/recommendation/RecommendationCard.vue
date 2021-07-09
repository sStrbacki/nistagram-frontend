<template>
	<v-card class="mx-auto" max-width="200" outlined>
		<v-card-text>
			<div class="text-h6 text--primary">
				<v-icon class="mr-2 mb-1">mdi-account-circle</v-icon>
				{{ recommendation.recommendationUsername }}
			</div>
			<p
				v-if="recommendation.mutualConnectionsUsername.length !== 0"
				class="mt-2"
			>
				Followed by {{ getMutualConnectionsString }}.
			</p>
			<p class="mt-2" v-else>
				Suggested for you.
			</p>
		</v-card-text>
		<v-card-actions>
			<v-row justify="center" class="mb-2">
				<v-btn rounded @click="follow()">
					<v-icon class="mr-2">mdi-account-plus</v-icon>
					Follow
				</v-btn>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'RecommendationCard',
	props: {
		recommendation: Object
	},
	computed: {
		getMutualConnectionsString() {
			if (this.recommendation.mutualConnectionsUsername.length == 1)
				return this.recommendation.mutualConnectionsUsername[0];

			let connectionsString = '';

			this.recommendation.mutualConnectionsUsername.forEach(
				(username, index) => {
					connectionsString += `${username}`;
					if (index < this.recommendation.mutualConnectionsUsername.length - 1)
						connectionsString += ', ';
				}
			);
			return connectionsString;
		}
	},
	methods: {
		follow() {
			this.$store.dispatch(
				'followRecommendedProfile',
				this.recommendation.recommendationUsername
			);
		}
	}
};
</script>

<style></style>
