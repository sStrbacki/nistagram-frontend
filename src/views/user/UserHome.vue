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
	components: { UserAppBar }
};
</script>

<style></style>
