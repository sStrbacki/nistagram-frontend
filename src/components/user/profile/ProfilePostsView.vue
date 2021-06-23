<template>
	<div class="d-flex flex-wrap">
		<v-col cols="4" class="pa-2" v-for="post in posts" v-bind:key="post.id">
			<ProfilePost :post="post"></ProfilePost>
		</v-col>
	</div>
</template>

<script>
import ProfilePost from './ProfilePost';

export default {
	name: 'ProfilePostsView',
	components: {
		ProfilePost
	},
	computed: {
		username() {
			return this.$route.params.username;
		},
		posts: {
			get() {
				return this.$store.getters.viewingProfilePosts;
			}
		}
	}
};
</script>

<style scoped></style>
