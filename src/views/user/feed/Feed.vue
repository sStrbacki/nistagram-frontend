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
						shaped
						:color="'teal darken-3'"
						class="ma-4"
						height="150"
						width="100"
						outlined
						@click="toggle && selectStoryGroup(storyGroup)"
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
						shaped
						color="grey darken-1"
						class="ma-4"
						height="150"
						width="100"
						outlined
						@click="toggle && selectStoryGroup(storyGroup)"
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
		<v-dialog v-model="storyDialog" width="1000" v-if="selectedStoryGroup">
			<v-slide-group class="pa-4" active-class="success" show-arrows>
				<v-slide-item
					v-for="entry in selectedStoryGroup.entries"
					:key="entry.id"
				>
					<v-card class="ma-4" height="500" width="500">
						<v-img
							contain
							v-if="!isVideo(entry.storyData.mediaUrl)"
							:src="entry.storyData.mediaUrl"
							height="300px"
							aspect-ratio="1"
						>
						</v-img>
						<video-player v-else>
							<source :src="entry.storyData.mediaUrl" />
						</video-player>
						<v-card-title>
							<v-row>
								<v-col cols="1">
									<v-icon dark>
										mdi-account-circle
									</v-icon>
								</v-col>
								<v-col class="subtitle-2 mt-2">
									<p>{{ entry.storyData.author }}</p>
								</v-col>
							</v-row>
						</v-card-title>
						<v-card-subtitle>
							<v-row>
								<v-col cols="1">
									<v-icon dark>
										mdi-closed-caption
									</v-icon>
								</v-col>
								<v-col>
									{{ entry.storyData.caption }}
								</v-col>
							</v-row>
							<v-row v-if="entry.storyData.location">
								<v-col cols="1">
									<v-icon dark>
										mdi-map-marker
									</v-icon>
								</v-col>
								<v-col>
									{{ entry.storyData.location.name }}
								</v-col>
							</v-row>
						</v-card-subtitle>
					</v-card>
				</v-slide-item>
			</v-slide-group>
		</v-dialog>
	</v-container>
</template>

<script>
import PostCard from '../../../components/user/feed/PostCard.vue';
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';

export default {
	name: 'Feed',
	components: { PostCard, videoPlayer },
	data() {
		return {
			selectedStoryGroup: null,
			storyDialog: false
		};
	},
	methods: {
		selectStoryGroup(storyGroup) {
			this.selectedStoryGroup = storyGroup;
			this.storyDialog = true;
			console.log(storyGroup);
		},
		isVideo(url) {
			return url.includes('videos');
		}
	},
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
