<template>
	<v-col cols="8">
		<v-row justify="center">
			<h2>Register a new agent</h2>
		</v-row>
		<v-form ref="agentRegistrationForm">
			<v-row justify="start" class="content-wrap">
				<v-col cols="8">
					<v-select
						no-data-text="No users available"
						:items="usernames"
						v-model="selectedUsername"
						label="Select an user"
						dense
					></v-select>
				</v-col>
				<v-col cols="2">
					<v-btn text color="teal" :disabled="!dataValid" @click="register">
						Register as agent
					</v-btn>
				</v-col>
			</v-row>
			<v-row justify="start" no-gutters>
				<v-col cols="8">
					<v-text-field
						label="Agents website"
						v-model="website"
						:rules="websiteRules"
					>
						<v-icon slot="prepend" color="teal">
							mdi-web
						</v-icon>
					</v-text-field>
				</v-col>
			</v-row>
		</v-form>
	</v-col>
</template>

<script>
export default {
	name: 'UserPromotion',
	data() {
		return {
			websiteRules: [
				value => !!value || 'Website is required.',
				value =>
					/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(
						value
					) || 'Website must be valid.'
			]
		};
	},
	methods: {
		async register() {
			await this.$store.dispatch('promoteUser');
			this.$refs.agentRegistrationForm.reset();
			this.$refs.agentRegistrationForm.resetValidation();
		}
	},
	computed: {
		nonPromotedUsers: {
			get() {
				return this.$store.getters.nonPromotedUsers;
			}
		},
		website: {
			get() {
				return this.$store.getters.websiteInput;
			},
			set(value) {
				this.$store.commit('setWebsiteInput', value);
			}
		},
		selectedUsername: {
			get() {
				return this.$store.getters.selectedUsername;
			},
			set(value) {
				this.$store.commit('setSelectedUsername', value);
			}
		},
		usernames() {
			return this.nonPromotedUsers.map(user => {
				return user.username;
			});
		},
		dataValid() {
			return (
				/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(
					this.website
				) &&
				this.website &&
				this.selectedUsername
			);
		}
	},
	async mounted() {
		this.$store.dispatch('getNonPromoted');
	}
};
</script>

<style></style>
