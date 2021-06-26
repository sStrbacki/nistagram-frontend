<template>
	<v-container>
		<h6>Please enter your business website URL. After submitting, an administrator will validate your request.</h6>
		<v-text-field v-model="websiteUrl" placeholder="Enter your website URL"></v-text-field>
		<v-btn color="primary" @click="submit()">Submit</v-btn>
	</v-container>
</template>

<script>
	export default {
		name: 'AgentRegistration',
		methods: {
			submit() {
				this.$store.dispatch('requestAgentRegistration');
			}
		},
		computed: {
			websiteUrl: {
				get() {
					return this.$store.getters.agentRegistrationWebsiteUrl;
				},
				set(value) {
					this.$store.commit('setAgentRegistrationWebsiteUrl', value);
				}
			}
		}
	};
</script>

<style scoped>

</style>
