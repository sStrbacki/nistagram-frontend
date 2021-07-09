<template>
	<v-container>
		<v-row justify="center" class="content-wrap">
			<v-col cols="8">
				<v-select
					no-data-text="No followers available"
					:items="suggestions"
					v-model="selectedUser"
					label="Followers"
					dense
				></v-select>
			</v-col>
			<v-col cols="2">
				<v-btn
					text
					color="teal"
					:disabled="selectedUser === ''"
					@click="addCloseFriend"
				>
					Add to close friends
				</v-btn>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="8">
				<v-list dense>
					<v-subheader>CLOSE FRIENDS</v-subheader>
				</v-list>
				<v-list-item
					v-for="closeFriend in closeFriends"
					:key="closeFriend.username"
				>
					<v-list-item-icon>
						<v-icon>mdi-account-circle</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ closeFriend.username }}</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn icon @click="removeFromCloseFriends(closeFriend.username)">
							<v-icon color="red">mdi-close</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'CloseFriends',
	data() {
		return {
			selectedUser: ''
		};
	},
	computed: {
		suggestions: {
			get() {
				return this.$store.getters.suggestions.map(suggestion => {
					return suggestion.username;
				});
			}
		},
		closeFriends: {
			get() {
				return this.$store.getters.closeFriendCollection;
			}
		}
	},
	methods: {
		async addCloseFriend() {
			await this.$store.dispatch('addCloseFriend', this.selectedUser);
			this.selectedUser = '';
		},
		async removeFromCloseFriends(username) {
			await this.$store.dispatch('removeCloseFriend', username);
		}
	},
	async mounted() {
		await this.$store.dispatch('getCloseFriends');
		await this.$store.dispatch('getCloseFriendSuggestions');
	}
};
</script>

<style></style>
