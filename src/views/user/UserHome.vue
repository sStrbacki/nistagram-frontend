<template>
	<div>
		<user-app-bar />
		<router-view />
	</div>
</template>

<script>
import UserAppBar from '../../components/user/bars/UserAppBar.vue';

export default {
	name: 'UserHome',
	components: { UserAppBar },
	async mounted() {
		await this.$store.dispatch('getProfile');
		await this.$store.dispatch('getNotifications');
		await this.$store.dispatch('listenToNotifications');
	}
};
</script>

<style></style>
