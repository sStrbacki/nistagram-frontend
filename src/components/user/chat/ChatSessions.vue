<template>
	<v-navigation-drawer
		absolute
		dark
		permanent
		class="sessions-drawer"
		color="blue-grey darken-3"
	>
		<v-list>
			<v-list-item link to="/home/chat/new-message">
				<v-list-item-icon>
					<v-icon>mdi-plus</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>Compose a new message</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-list-item
				link
				v-for="session in messageSessions"
				:key="session.id"
				@click="rerouteToSession(session.id, session.partner)"
			>
				<v-list-item-icon>
					<v-icon>mdi-account-circle</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ session.partner }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'ChatSessions',
	computed: {
		messageSessions: {
			get() {
				return this.$store.getters.messageSessions;
			}
		}
	},
	methods: {
		rerouteToSession(sessionId, partner) {
			this.$store.dispatch('setPartner', partner);
			this.$router.push({ name: 'Session', params: { sessionId: sessionId } });
		}
	},
	async mounted() {
		await this.$store.dispatch('fetchMessageSessions');
	}
};
</script>

<style scoped>
.sessions-drawer {
	margin-top: 5rem !important;
	height: 80% !important;
	border-radius: 2% !important;
}
</style>
