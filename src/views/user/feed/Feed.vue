<template>
	<v-container>
		<story-feed />
		<post-feed />
		<story-report-dialog />
		<chat-reshare-dialog />
	</v-container>
</template>

<script>
import StoryFeed from '../../../components/user/feed/StoryFeed.vue';
import PostFeed from '../../../components/user/feed/PostFeed.vue';
import StoryReportDialog from '../../../components/user/report/StoryReportDialog.vue';
import ChatReshareDialog from '../../../components/user/chat/ChatReshareDialog.vue';

export default {
	name: 'Feed',
	components: { PostFeed, StoryFeed, StoryReportDialog, ChatReshareDialog }
};
</script>

<style></style,
ReshareDialog>
