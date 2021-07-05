<template>
	<v-dialog v-model="chatReshareDialog" width="700">
		<v-card>
			<v-card-text>
				<v-row align="center" justify="center" v-if="chatResharePost">
					<v-col cols="8">
						<post-card-small :post="chatResharePost" />
					</v-col>
				</v-row>
				<v-row align="center" justify="center" v-else-if="chatReshareStory">
					<v-col cols="8">
						<story-card-small :story="chatReshareStory" />
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="8">
						<user-search mode="recepientSearch" />
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-btn :disabled="!submitEnabled" @click="send">
						Send
						<v-icon class="ml-2">mdi-send</v-icon>
					</v-btn>
				</v-row>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import UserSearch from '../../common/search/UserSearch.vue';
import PostCardSmall from '../feed/PostCardSmall.vue';
import StoryCardSmall from '../feed/StoryCardSmall.vue';
export default {
	name: 'ChatReshareDialog',
	components: { PostCardSmall, StoryCardSmall, UserSearch },
	computed: {
		submitEnabled() {
			return this.$store.getters.userQuery;
		},
		chatReshareDialog: {
			get() {
				return this.$store.getters.chatReshareDialog;
			},
			set(value) {
				this.$store.commit('setChatReshareDialog', value);
			}
		},
		chatResharePost: {
			get() {
				return this.$store.getters.chatResharePost;
			},
			set(value) {
				this.$store.commit('setChatResharePost', value);
			}
		},
		chatReshareStory: {
			get() {
				return this.$store.getters.chatReshareStory;
			},
			set(value) {
				this.$store.commit('setChatReshareStory', value);
			}
		}
	},
	watch: {
		chatReshareDialog(newValue, oldValue) {
			if (!newValue && oldValue)
				this.$store.dispatch('clearSelectedChatContent');
		}
	},
	methods: {
		async send() {
			await this.$store.dispatch('pushShareMessage');
			this.chatReshareDialog = false;
		}
	}
};
</script>

<style></style>
