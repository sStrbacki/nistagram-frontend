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
	mounted() {
		this.$store.dispatch('getProfile');
		this.$store.dispatch('getNotifications');
	}
};
</script>

<style></style>
