<template>
	<v-container>
		<v-row class="content-wrap" align="center" justify="center">
			<h2>Log In to Your Account</h2>
		</v-row>
		<v-row align="start" justify="center">
			<v-col cols="8">
				<v-form ref="form" v-model="valid" lazy-validation>
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
					<v-row no-gutters>

            <v-col cols="3">
							<v-btn elevation="1" :disabled="!isFormValid" @click="login">
								Login
							</v-btn>
						</v-col>

            <v-spacer></v-spacer>

						<v-col offset="3">
							<v-btn text to="/register" large>
								Don't have an account?
							</v-btn>
              <v-btn text to="/request-password-reset" large>
                Forgot password?
              </v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'LoginForm',
	data: () => {
		return {
			valid: false,
			passwordVisible: false,
			usernameRules: [v => !!v || 'Username is required'],
			passwordRules: [v => !!v || 'Password is required']
		};
	},
	computed: {
		isFormValid: function() {
			return this.valid && this.username !== '' && this.password !== '';
		},
		username: {
			get() {
				return this.$store.getters.loginUsername;
			},
			set(value) {
				this.$store.commit('setLoginUsername', value);
			}
		},
		password: {
			get() {
				return this.$store.getters.loginPassword;
			},
			set(value) {
				this.$store.commit('setLoginPassword', value);
			}
		}
	},
	methods: {
		login: async function() {
			await this.$store.dispatch('login');
		}
	}
};
</script>

<style></style>
