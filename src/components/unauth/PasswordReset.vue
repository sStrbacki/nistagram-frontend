<template>
	<v-container>
		<v-row class="content-wrap" align="center" justify="center">
			<h2>Hello, let's create a new password for you!.</h2>
		</v-row>
		<div style="width: 50%; margin: 0 auto;">
			<v-row class="content-wrap" align="center" justify="center">
				<v-text-field
					placeholder="New password"
					label="New password"
					v-model="password"
					:rules="passwordRules"
					class="input-group--focused"
				></v-text-field>
			</v-row>
			<v-row class="content-wrap" align="center" justify="center">
				<v-text-field
					placeholder="Repeated password"
					label="Repeated password"
					v-model="repeatedPassword"
					:rules="repeatedPasswordRule"
					class="input-group--focused"
				></v-text-field>
			</v-row>
			<v-row>
				<v-btn @click="reset" color="green" style="margin: 0 auto;"
					>Reset password</v-btn
				>
			</v-row>
		</div>
	</v-container>
</template>

<script>
import { notifyError } from '@/services/notificationService';

export default {
	name: 'PasswordReset',
	data: function() {
		return {
			repeatedPassword: '',
			passwordRules: [this.notEmptyRule(), this.longerThanXRule(8)],
			repeatedPasswordRule: [this.notEmptyRule(), this.longerThanXRule(8)]
		};
	},
	computed: {
		password: {
			get: function() {
				return this.$store.getters.passwordResetPassword;
			},
			set: function(value) {
				this.$store.commit('setPasswordResetPassword', value);
			}
		}
	},
	methods: {
		notEmptyRule: () => v => !!v || 'Password is required!',
		longerThanXRule: x => v =>
			v.length > x || 'Password must be at least 8 chars long.',

		reset: function() {
			if (this.repeatedPassword !== this.password) {
				notifyError('Passwords do not match!');
			} else this.$store.dispatch('resetPassword');
		}
	},
	mounted() {
		const urlUUID = this.$route.params.uuid;
		this.$store.commit('setPasswordResetUUID', urlUUID);
	}
};
</script>

<style scoped></style>
