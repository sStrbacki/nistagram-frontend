<template>
	<div v-if="postsLoaded" class="content-wrap">
		<v-row align="center" justify="center">
			<h2>{{ selectedCollection }}</h2>
		</v-row>
		<v-row v-if="posts.length !== 0">
			<v-col v-for="post in posts" :key="post.id" cols="4">
				<post-card :post="post" mode="collection" />
			</v-col>
		</v-row>
		<v-row v-else align="center" justify="center" class="alert-empty">
			<v-alert border="top" colored-border type="info" elevation="2">
				This collection is empty :(
			</v-alert>
		</v-row>
	</div>
	<v-row align="center" justify="center" v-else>
		<v-progress-circular :size="50" indeterminate></v-progress-circular>
	</v-row>
</template>

<script>
import PostCard from '../../../components/user/feed/PostCard.vue';

export default {
	name: 'Collection',
	components: {
		PostCard
	},
	async mounted() {
		let collectionName = this.$route.params.collectionName;
		if (collectionName === 'default') {
			await this.$store.dispatch('fetchPostsFromDefaultCollection');
			this.selectedCollection = 'Default collection';
		} else {
			await this.$store.dispatch('fetchPostsFromCollection', collectionName);
			this.selectedCollection = collectionName;
		}
	},
	computed: {
		selectedCollection: {
			get() {
				return this.$store.getters.selectedCollection;
			},
			set(value) {
				this.$store.commit('setSelectedCollection', value);
			}
		},
		posts: {
			get() {
				return this.$store.getters.collectionPosts;
			}
		},
		postsLoaded: {
			get() {
				return this.$store.getters.collectionPostsLoaded;
			}
		}
	}
};
</script>

<style scoped>
.alert-empty {
	margin-top: 5rem !important;
}
</style>
