<template>
	<v-col cols="12">
		<v-row>
			<v-text-field v-model="searchQuery" @keyup="fetchUsers()">
				<v-icon slot="prepend">
					mdi-magnify
				</v-icon>
			</v-text-field>
		</v-row>
		<v-row v-if="users.length !== 0">
			<v-col>
				<v-list flat>
					<v-list-item v-for="user in users" :key="user.username">
						<v-list-item-avatar>
							<v-icon dark>
								mdi-account-circle
							</v-icon>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title>
								{{ user.username }}
							</v-list-item-title>
							<v-list-item-subtitle>
								{{ user.bio }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
	</v-col>
</template>

<script>
export default {
	name: 'UserSearch',
	data: () => ({
		location: ''
	}),
	computed: {
		searchQuery: {
			get() {
				return this.$store.getters.userQuery;
			},
			set(value) {
				this.$store.commit('setUserQuery', value);
			}
		},
		users: {
			get() {
				return this.$store.getters.foundUsers;
			},
			set(value) {
				this.$store.commit('setUsers', value);
			}
		}
	},
	methods: {
		fetchUsers() {
			if (this.searchQuery !== '') this.$store.dispatch('findUsersByUsername');
			else this.users = [];
		}
	}
};
</script>

<style></style>
