<template>
	<v-col cols="12">
		<v-row>
			<v-autocomplete
				v-model="usernameInput"
				:items="suggestedUsers"
				:loading="isLoading"
				:search-input.sync="tagQuery"
				color="white"
				hide-no-data
				hide-selected
				label="Username"
				placeholder="Start typing to find taggable users..."
				return-object
			></v-autocomplete>
		</v-row>

		<v-row dense no-gutters>
			<v-card
				class="mx-auto"
				max-width="400"
				v-for="post in taggedPosts"
				:key="post.id"
			>
				<post-card :post="post" />
			</v-card>
		</v-row>
	</v-col>
</template>

<script>
import PostCard from '@/components/user/feed/PostCard';

export default {
	name: 'TagSearch',
	components: { PostCard },
	data() {
		return {
			usernameInput: '',
			isLoading: false
		};
	},
	methods: {},
	computed: {
		taggedPosts: {
			get() {
				return this.$store.getters.postsWhereUserIsTagged;
			}
		},
		tagQuery: {
			get() {
				return this.$store.getters.postTagQuery;
			},
			set(value) {
				this.$store.commit('setPostTaggedUser', value);
			}
		},
		suggestedUsers: {
			get() {
				return this.$store.getters.postTaggableUsers.map(user => user.username);
			}
		}
	},
	watch: {
		usernameInput(val) {
			// This will set the store value for tagged user to the one which was selected by the user in the drop-down
			this.$store.commit('setPostTaggedUser', val);
			// This will dispatch the search event in store
			this.$store.dispatch('findPostsByTaggedUser');
		},
		// eslint-disable-next-line no-unused-vars
		tagQuery(val) {
			// This will fire every time a user types into the search bar
			this.isLoading = true;
			this.$store.dispatch('findPostTaggableUsers');
		},
		// eslint-disable-next-line no-unused-vars
		suggestedUsers(val) {
			new Promise(r => setTimeout(r, 500)).then(() => {
				this.isLoading = false;
			});
		}
	}
};
</script>

<style></style>
