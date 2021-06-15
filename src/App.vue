<template>
	<v-app>
		<notifications group="alert" />
		<router-view />
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		//
	})
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap');
.content-wrap {
	margin-top: 5rem !important;
	margin-bottom: 5rem !important;
}
</style>
