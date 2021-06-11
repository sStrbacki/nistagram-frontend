<template>
	<v-container>
		<story-feed />
		<post-feed />
	</v-container>
</template>

<script>
import StoryFeed from '../../../components/user/feed/StoryFeed.vue';
import PostFeed from '../../../components/user/feed/PostFeed.vue';

export default {
	name: 'Feed',
	components: { PostFeed, StoryFeed }
};
</script>

<style></style>
