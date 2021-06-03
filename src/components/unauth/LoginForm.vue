<template>
	<v-form ref="form" v-model="valid" lazy-validation>
		<v-row align="center" justify="center">
			<v-col cols="6">
				<v-text-field
					v-model="username"
					label="Username"
					:rules="usernameRules"
					required
				></v-text-field>
				<v-text-field
					:append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
					:type="passwordVisible ? 'text' : 'password'"
					label="Password"
					v-model="password"
					:rules="passwordRules"
					class="input-group--focused"
					@click:append="passwordVisible = !passwordVisible"
				></v-text-field>
				<v-row>
					<v-col>
						<v-btn
							elevation="1"
							class="mt-1"
							:disabled="!isFormValid"
							@click="login"
						>
							Login
						</v-btn>
					</v-col>
					<v-col>
						<v-btn text to="/register" large> Don't have an account? </v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
export default {
	name: 'LoginForm',
	data: () => {
		return {
			valid: false,
			passwordVisible: false,
			usernameRules: [(v) => !!v || 'Username is required'],
			passwordRules: [(v) => !!v || 'Password is required'],
		};
	},
	computed: {
		isFormValid: function () {
			return this.valid && this.username !== '' && this.password !== '';
		},
		username: {
			get() {
				return this.$store.getters.loginUsername;
			},
			set(value) {
				this.$store.commit('setLoginUsername', value);
			},
		},
		password: {
			get() {
				return this.$store.getters.loginPassword;
			},
			set(value) {
				this.$store.commit('setLoginPassword', value);
			},
		},
	},
	methods: {
		login: async function () {
			//await this.$store.dispatch('login');
		},
	},
};
</script>

<style></style>
