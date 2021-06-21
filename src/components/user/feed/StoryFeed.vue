<template>
	<v-row
		class="content-wrap"
		align="center"
		justify="center"
		v-if="storiesLoaded"
	>
		<v-slide-group class="pa-4" show-arrows>
			<v-slide-item v-slot="{ toggle }">
				<v-card
					shaped
					:color="'blue accent-1'"
					class="ma-4"
					height="150"
					width="100"
					outlined
					@click="toggle && selectPersonalStories()"
				>
					<v-row align="center" justify="center" class="mt-4">
						<v-icon
							color="grey lighten-3"
							size="48"
							v-text="'mdi-account-circle'"
							v-if="personalStories.length"
						></v-icon>
						<v-icon
							color="grey lighten-3"
							size="48"
							v-text="'mdi-plus'"
							v-else
						></v-icon>
					</v-row>
					<v-row align="center" justify="center" class="mt-4">
						<v-chip small>My stories</v-chip>
					</v-row>
				</v-card>
			</v-slide-item>
		</v-slide-group>
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
		<v-dialog v-model="storyDialog" width="1000" v-if="selectedStories">
			<story-view :stories="selectedStories" :feed="true"></story-view>
		</v-dialog>
	</v-row>
	<v-row align="center" justify="center" class="content-wrap" v-else>
		<v-progress-circular :size="50" indeterminate></v-progress-circular>
	</v-row>
</template>

<script>
import 'vue-md-player/dist/vue-md-player.css';
import StoryView from '@/components/common/story/StoryView';
export default {
	name: 'StoryFeed',
	components: { StoryView },
	data() {
		return {
			selectedStories: null,
			storyDialog: false,
			storiesLoaded: false
		};
	},
	methods: {
		selectStoryGroup(storyGroup) {
			this.selectedStories = storyGroup.entries.map(entry => entry.storyData);
			this.storyDialog = true;
		},
		selectPersonalStories() {
			if (!this.personalStories.length) {
				this.$router.push('/home/publish/story');
				return;
			}
			this.selectedStories = this.personalStories;
			this.storyDialog = true;
		},
		isVideo(url) {
			return url.includes('videos');
		}
	},
	computed: {
		storyGroups: {
			get() {
				return this.$store.getters.storyGroups;
			}
		},
		personalStories: {
			get() {
				return this.$store.getters.personalStories;
			}
		},
		closeFriendStoryGroups: {
			get() {
				return this.$store.getters.closeFriendStoryGroups;
			}
		}
	},
	async mounted() {
		await this.$store.dispatch('fetchCloseFriendStories');
		await this.$store.dispatch('fetchStories');
		await this.$store.dispatch('fetchPersonalStories');
		this.storiesLoaded = true;
	}
};
</script>

<style></style>
