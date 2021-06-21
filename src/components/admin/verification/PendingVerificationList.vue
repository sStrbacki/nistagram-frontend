<template>
	<v-expansion-panels>
		<v-expansion-panel
			v-for="request in verificationRequests"
			:key="request.id"
		>
			<v-expansion-panel-header>
				{{ request.profile.username }}
			</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-row>
					<v-col>
						{{ request.profile.fullName }}
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						{{ request.profile.email }}
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						{{ request.category.name }}
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<img :src="request.imageUrl">
					</v-col>
				</v-row>
				<span>
					<v-btn color="primary" @click="accept(request.id)" class="ma-2">Accept</v-btn>
					<v-btn color="secondary" @click="decline(request.id)" class="ms-2">Decline</v-btn>
				</span>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
export default {
	name: 'PendingVerificationList',
	mounted() {
		this.$store.dispatch('getVerificationRequests');
	},
	computed: {
		verificationRequests: {
			get() {
				return this.$store.getters.verificationRequests;
			}
		}
	},
	methods: {
		async accept(requestId) {
			await this.$store.dispatch('acceptVerificationRequest', requestId)
			await this.$store.dispatch('getVerificationRequests');
		},
		async decline(requestId) {
			await this.$store.dispatch('declineVerificationRequest', requestId);
			await this.$store.dispatch('getVerificationRequests');
		}
	}
};
</script>

<style scoped>

</style>
