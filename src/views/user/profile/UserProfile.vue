<template>
	<v-card class="d-flex profile-wrap">
		<v-navigation-drawer permanent>
			<v-list>
				<router-link to="/home" v-slot="{ href, navigate, isActive }">
					<v-list-item link :active="isActive" :href="href" @click="navigate">
						<v-list-item-content>
							<v-list-item-title class="text-h6">
								{{ fullName }}
							</v-list-item-title>
							<v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</router-link>
			</v-list>

			<v-divider></v-divider>

			<v-list nav dense>
				<router-link to="/home/settings" v-slot="{ href, navigate, isActive }">
					<v-list-item link :active="isActive" :href="href" @click="navigate">
						<v-list-item-icon>
							<v-icon>mdi-account</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Personal Info</v-list-item-title>
					</v-list-item>
				</router-link>
				<router-link
					to="/home/settings/privacy"
					v-slot="{ href, navigate, isActive }"
				>
					<v-list-item link :active="isActive" :href="href" @click="navigate">
						<v-list-item-icon>
							<v-icon>mdi-lock</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Privacy</v-list-item-title>
					</v-list-item>
				</router-link>
				<router-link
					to="/home/settings/notifications"
					v-slot="{ href, navigate, isActive }"
				>
					<v-list-item link :active="isActive" :href="href" @click="navigate">
						<v-list-item-icon>
							<v-icon>mdi-bell</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Notification Preferences</v-list-item-title>
					</v-list-item>
				</router-link>
				<router-link
					to="/home/settings/verification"
					v-slot="{ href, navigate, isActive }"
				>
					<v-list-item link :active="isActive" :href="href" @click="navigate">
						<v-list-item-icon>
							<v-icon>mdi-lock</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Verification</v-list-item-title>
					</v-list-item>
				</router-link>
			</v-list>
		</v-navigation-drawer>
		<v-spacer></v-spacer>
		<div class="col-6">
			<router-view />
		</div>
		<v-spacer></v-spacer>
	</v-card>
</template>

<script>
export default {
	name: 'UserProfile',
	computed: {
		fullName: {
			get() {
				return this.$store.getters.fullName;
			},
			set(value) {
				this.$store.commit('setFullName', value);
			}
		},
		email: {
			get() {
				return this.$store.getters.email;
			},
			set(value) {
				this.$store.commit('setEmail', value);
			}
		}
	}
};
</script>

<style scoped>
.profile-wrap {
	margin-top: 4rem !important;
	background-color: transparent !important;
}
</style>
