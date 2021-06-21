<template>
	<v-container>
		<story-feed />
		<post-feed />
		<story-report-dialog />
	</v-container>
</template>

<script>
import StoryFeed from '../../../components/user/feed/StoryFeed.vue';
import PostFeed from '../../../components/user/feed/PostFeed.vue';
import StoryReportDialog from '../../../components/user/report/StoryReportDialog.vue';

export default {
	name: 'Feed',
	components: { PostFeed, StoryFeed, StoryReportDialog }
};
</script>

<style></style>
