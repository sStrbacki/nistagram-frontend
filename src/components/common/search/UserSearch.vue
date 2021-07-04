<template>
	<v-col cols="12">
		<v-row>
			<v-text-field v-model="searchQuery" @keyup="fetchUsers()">
				<v-icon slot="prepend">
					mdi-magnify
				</v-icon>
			</v-text-field>
		</v-row>
		<v-row v-if="!selected && users.length !== 0">
			<v-col>
				<v-list flat>
					<v-list-item
						v-for="user in users"
						:key="user.username"
						@click="selectProfile(user.username)"
					>
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
								{{ user.fullName }}
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
	data() {
		return {
			selected: false
		};
	},
	props: {
		mode: String
	},
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
	watch: {
		users() {
			let loggedUserUsername = this.$store.getters.username;
			let foundUsernames = this.$store.getters.foundUsers.map(user => {
				return user.username;
			});

			if (
				this.mode === 'recepientSearch' &&
				foundUsernames.includes(loggedUserUsername)
			)
				this.users = this.users.filter(user => {
					return user.username !== loggedUserUsername;
				});
		}
	},
	methods: {
		fetchUsers() {
			if (this.searchQuery !== '') this.$store.dispatch('findUsersByUsername');
			else this.users = [];
			this.selected = false;
		},
		selectProfile(username) {
			if (this.mode === 'recepientSearch') {
				this.selected = true;
				this.searchQuery = username;
			} else
				this.$router.push({ name: 'Profile', params: { username: username } });
		}
	}
};
</script>

<style></style>
