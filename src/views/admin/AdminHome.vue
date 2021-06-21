<template>
<div>
	<admin-app-bar></admin-app-bar>
	<router-view></router-view>
</div>
</template>

<script>
import AdminAppBar from '../../components/admin/AdminAppBar';
export default {
	name: 'AdminHome',
	components: { AdminAppBar }
};
</script>

<style scoped>

</style>
