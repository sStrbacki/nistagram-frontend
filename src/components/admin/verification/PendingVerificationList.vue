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
	}
};
</script>

<style scoped>

</style>
