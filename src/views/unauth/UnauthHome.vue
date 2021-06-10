<template>
	<div>
		<unauth-app-bar />
		<router-view />
	</div>
</template>

<script>
import UnauthAppBar from '../../components/unauth/UnauthAppBar.vue';
export default {
	name: 'UnauthHome',
	components: { UnauthAppBar }
};
</script>

<style>
.page-content {
	margin-top: 5rem !important;
}
</style>
