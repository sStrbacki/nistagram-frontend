<template>
	<div class="mt-5">
		<div v-if="verified">
			<h2 class="text-h2">You are verified.</h2>
		</div>
		<div v-else>
			<v-select :items="categories"></v-select>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'VerificationSection',
		mounted() {
			this.$store.dispatch('getVerificationCategories');
		},
		computed: {
			verified: {
				get() {
					return false;
				}
			},
			categories: {
				get() {
					return this.$store.getters.verificationCategories;
				}
			}
		}
	};
</script>

<style scoped>

</style>
