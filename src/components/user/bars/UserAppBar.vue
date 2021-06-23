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

			<v-btn v-if="isAdmin" icon to="/admin">
				<v-icon>mdi-account-key</v-icon>
			</v-btn>
			<v-btn icon to="/home/interactions">
				<v-icon>mdi-thumbs-up-down</v-icon>
			</v-btn>
			<v-btn icon to="/home/followers">
				<v-icon>mdi-account-multiple</v-icon>
			</v-btn>
			<v-btn icon :to="'/' + username">
				<v-icon>mdi-account</v-icon>
			</v-btn>
			<v-btn icon to="/home/feed">
				<v-icon>mdi-home</v-icon>
			</v-btn>

			<v-btn icon to="/home/publish">
				<v-icon>mdi-plus-box-outline</v-icon>
			</v-btn>

			<v-btn icon to="/home/search">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<notifications-dropdown />

			<v-btn icon @click="drawer = !drawer">
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" absolute bottom right temporary>
			<v-list nav dense>
				<v-list-item-group>
					<v-list-item to="/home/settings">
						<v-list-item-icon>
							<v-icon>mdi-cog</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Profile settings</v-list-item-title>
					</v-list-item>

					<v-list-item to="/home/close-friends">
						<v-list-item-icon>
							<v-icon>mdi-account-multiple</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Manage close friends</v-list-item-title>
					</v-list-item>

					<v-list-item to="/home/my-collections">
						<v-list-item-icon>
							<v-icon>mdi-image-album</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Post collections</v-list-item-title>
					</v-list-item>

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
		},
		isAdmin() {
			return this.$store.getters.roles.includes('ROLE_ADMIN');
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
