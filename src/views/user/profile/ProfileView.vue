<template>
	<div>
		<user-app-bar v-if="isLoggedIn"></user-app-bar>
		<unauth-app-bar v-else></unauth-app-bar>
		<v-container class="content-wrap">
			<profile-header></profile-header>
			<v-card
				class="d-flex justify-center my-5 py-5"
				v-if="viewingProfileBlocked"
			>
				You've blocked this user!
			</v-card>
			<div v-else-if="!profilePrivate || following || username === currentUser">
				<profile-highlights-bar></profile-highlights-bar>
				<v-tabs class="d-flex justify-center">
					<v-tab @click="goToPosts()">Posts</v-tab>
					<v-tab @click="goToTagged()">Tagged</v-tab>
				</v-tabs>
				<v-card>
					<router-view></router-view>
				</v-card>
			</div>

			<v-card
				class="d-flex justify-center my-5 py-5"
				v-else-if="profilePrivate && following === false"
			>
				This profile is private!
			</v-card>
			<v-card
				class="d-flex flex-column align-center my-5 py-5"
				v-else-if="!isLoggedIn"
			>
				<div class="mb-5">This profile is private!</div>
				<v-btn plain color="primary" to="/">Log in</v-btn>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import ProfileHeader from '../../../components/user/profile/ProfileHeader';
import ProfileHighlightsBar from '../../../components/user/profile/ProfileHighlightsBar';
import { isLogged } from '@/services/authService';
import UserAppBar from '@/components/user/bars/UserAppBar';
import UnauthAppBar from '@/components/unauth/UnauthAppBar';

export default {
	name: 'ProfileView',
	components: { UnauthAppBar, UserAppBar, ProfileHighlightsBar, ProfileHeader },
	computed: {
		username() {
			return this.$route.params.username;
		},
		profilePrivate() {
			return this.$store.getters.viewingProfilePrivate;
		},
		following() {
			return this.$store.getters.followingViewingProfile;
		},
		currentUser() {
			return this.$store.getters.username;
		},
		isLoggedIn() {
			return isLogged();
		},
		viewingProfileBlocked() {
			return this.$store.getters.viewingProfileBlocked;
		}
	},
	mounted() {
		this.getProfile();
	},
	watch: {
		$route() {
			this.getProfile();
		}
	},
	methods: {
		goToPosts() {
			this.$router.push('/' + this.username);
		},
		goToTagged() {
			this.$router.push('/' + this.username + '/tagged');
		},
		async getProfile() {
			await this.$store.dispatch('getViewingProfilePrivate', this.username);
			if (this.profilePrivate) {
				this.getData();
			} else {
				this.getDataPublic();
			}
		},
		getData() {
			this.$store.dispatch('getViewingProfile', this.username);
			this.$store.dispatch('getViewingProfileStats', this.username);
			if (this.isLoggedIn) {
				this.$store.dispatch('getViewingProfileBlocked', this.username);
				this.$store.dispatch('getBlockedByViewingProfile', this.username);
				this.$store.dispatch('getViewingProfilePosts', this.username);
				this.$store.dispatch('getFollowingViewingProfile', this.username);
				this.$store.dispatch('getPendingViewingProfile', this.username);
				this.$store.dispatch('getViewingProfileMuted', this.username);
				this.$store.dispatch('getViewingProfileHighlights', this.username);
			}
		},
		getDataPublic() {
			this.$store.dispatch('getViewingProfile', this.username);
			this.$store.dispatch('getViewingProfilePostsPublic', this.username);
			this.$store.dispatch('getViewingProfileStats', this.username);
			this.$store.dispatch('getViewingProfileHighlightsPublic', this.username);
			if (this.isLoggedIn) {
				this.$store.dispatch('getViewingProfileBlocked', this.username);
				this.$store.dispatch('getBlockedByViewingProfile', this.username);
				this.$store.dispatch('getPendingViewingProfile', this.username);
				this.$store.dispatch('getViewingProfileMuted', this.username);
				this.$store.dispatch('getFollowingViewingProfile', this.username);
			}
		}
	}
};
</script>

<style scoped></style>
