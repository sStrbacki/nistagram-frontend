<template>
	<v-row v-if="postsLoaded">
		<v-col v-for="post in posts" :key="post.id" cols="4">
			<post-card :post="post" />
		</v-col>
	</v-row>
</template>

<script>
import PostCard from '../../../components/user/feed/PostCard.vue';

export default {
	name: 'PostFeed',
	components: { PostCard },
	data() {
		return {
			postsLoaded: false
		};
	},
	computed: {
		posts: {
			get() {
				return this.$store.getters.posts;
			}
		}
	},
	async mounted() {
		await this.$store.dispatch('fetchPosts');
		this.postsLoaded = true;
	}
};
</script>

<style></style>
