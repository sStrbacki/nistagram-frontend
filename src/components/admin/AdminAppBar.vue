<template>
	<div>
		<v-app-bar absolute elevate-on-scroll>
			<v-img
				alt="Nistagram Logo"
				class="shrink mr-2"
				contain
				src="../../../assets/nistagram-logo.png"
				transition="scale-transition"
				width="40"
			/>

			<v-toolbar-title class="logo-name">Ништаграм</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon to="/admin/verification">
				<v-icon>mdi-check</v-icon>
			</v-btn>
			<v-btn icon to="/admin/verification">
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
import { logout } from '../../../services/authService';
import NotificationsDropdown from '../notifications/NotificationsDropdown.vue';

export default {
	components: { NotificationsDropdown },
	name: 'UserAppBar',
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
		username() {
			return this.$store.getters.username;
		}
	}
};
</script>

<style>
.logo-name {
	font-family: 'Amatic SC', cursive !important;
	font-size: 2rem !important;
}
</style>
