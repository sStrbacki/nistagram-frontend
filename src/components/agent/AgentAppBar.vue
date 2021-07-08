<template>
	<div>
		<v-app-bar absolute elevate-on-scroll>
			<v-img
				alt="Nistagram Logo"
				class="shrink mr-2"
				contain
				src="../../assets/nistagram-logo.png"
				transition="scale-transition"
				width="40"
			/>

			<v-toolbar-title class="logo-name">Ништаграм</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon to="/agent/campaigns">
				<v-icon>mdi-finance</v-icon>
			</v-btn>
			<v-btn icon to="/agent/new-campaign">
				<v-icon>mdi-file-plus</v-icon>
			</v-btn>
			<v-btn icon to='/agent/influencer'>
				<v-icon>mdi-account-star</v-icon>
			</v-btn>
			<v-btn v-if="isUser" icon to="/home/feed">
				<v-icon>mdi-exit-to-app</v-icon>
			</v-btn>

			<v-btn icon @click="drawer = !drawer">
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" absolute bottom right temporary>
			<v-list nav dense>
				<v-list-item-group>
					<v-list-item @click="signOut()">
						<v-list-item-icon>
							<v-icon>mdi-logout</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import { logout } from '../../services/authService';

export default {
	name: 'AgentAppBar',
	data() {
		return {
			drawer: false
		};
	},
	methods: {
		signOut() {
			logout();
			this.$router.push('/');
		}
	},
	computed: {
		isUser: {
			get() {
				return this.$store.getters.roles.includes('ROLE_USER');
			}
		}
	}
};
</script>

<style scoped>

</style>