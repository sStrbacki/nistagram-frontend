<template>
	<v-container>
		<v-row class="content-wrap" align="center" justify="center">
			<v-slide-group class="pa-4" show-arrows>
				<v-slide-item
					v-for="(storyGroup, index) in closeFriendStoryGroups"
					:key="index"
					v-slot="{ toggle }"
				>
					<v-card
						:color="'teal darken-3'"
						class="ma-4"
						height="150"
						width="100"
						outlined
						@click="toggle"
					>
						<v-row align="center" justify="center" class="mt-4">
							<v-icon
								color="grey lighten-3"
								size="48"
								v-text="'mdi-account-circle'"
							></v-icon>
						</v-row>
						<v-row align="center" justify="center" class="mt-4">
							<v-chip small>{{ storyGroup.publisher }}</v-chip>
						</v-row>
					</v-card>
				</v-slide-item>
			</v-slide-group>
			<v-slide-group class="pa-4" show-arrows>
				<v-slide-item
					v-for="(storyGroup, index) in storyGroups"
					:key="index"
					v-slot="{ toggle }"
				>
					<v-card
						color="grey darken-1"
						class="ma-4"
						height="150"
						width="100"
						outlined
						@click="toggle"
					>
						<v-row align="center" justify="center" class="mt-4">
							<v-icon
								color="grey lighten-3"
								size="48"
								v-text="'mdi-account-circle'"
							></v-icon>
						</v-row>
						<v-row align="center" justify="center" class="mt-4">
							<v-chip small>{{ storyGroup.publisher }}</v-chip>
						</v-row>
					</v-card>
				</v-slide-item>
			</v-slide-group>
		</v-row>
		<v-row v-if="postsLoaded">
			<v-col v-for="post in posts" :key="post.id" cols="3">
				<post-card :data="post.postData" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import PostCard from '../../../components/user/feed/PostCard.vue';

export default {
	name: 'Feed',
	components: { PostCard },
	computed: {
		postsLoaded: {
			get() {
				return this.$store.getters.postsLoaded;
			}
		},
		storyGroups: {
			get() {
				return this.$store.getters.storyGroups;
			}
		},
		closeFriendStoryGroups: {
			get() {
				return this.$store.getters.closeFriendStoryGroups;
			}
		},
		posts: {
			get() {
				return this.$store.getters.posts;
			}
		}
	},
	async mounted() {
		await this.$store.dispatch('fetchPosts');
		await this.$store.dispatch('fetchCloseFriendStories');
		await this.$store.dispatch('fetchStories');
	}
};
</script>

<style></style>
