<template>
	<v-row v-if="postsLoaded">
		<v-col v-for="post in posts" :key="post.id" cols="4">
			<post-card v-if="!post.ad" :post="post.postData" />
			<campaign-card v-else :campaign="post.postData"/>
		</v-col>
		<collection-dialog />
		<reshare-dialog />
		<post-report-dialog />
	</v-row>
	<v-row align="center" justify="center" v-else>
		<v-progress-circular :size="50" indeterminate></v-progress-circular>
	</v-row>
</template>

<script>
import PostCard from '../../../components/user/feed/PostCard.vue';
import CollectionDialog from '../post-collection/CollectionDialog.vue';
import ReshareDialog from '../posting/ReshareDialog.vue';
import PostReportDialog from '../report/PostReportDialog.vue';
import CampaignCard from './CampaignCard';

export default {
	name: 'PostFeed',
	components: { CampaignCard, PostCard, CollectionDialog, ReshareDialog, PostReportDialog },
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
