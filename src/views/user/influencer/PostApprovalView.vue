<template>
	<v-container class="content-wrap d-flex flex-wrap justify-space-between">
		<div id="post-approval" v-for="post in posts" :key="post.id">
		<post-approval :post="post"></post-approval>
		</div>
	</v-container>
</template>

<script>
	import PostApproval from '../../../components/user/influencer/PostApproval';
	export default {
		name: 'PostApprovalView',
		components: { PostApproval },
		mounted() {
			this.$store.dispatch('fetchInfluencerPostsForApproval');
		},
		computed: {
			posts: {
				get() {
					return this.$store.getters.nonApprovedPosts;
				}
			}
		}
	};
</script>

<style scoped>
	#post-approval {
		max-width: 25%;
	}
</style>
