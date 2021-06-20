<template>
	<div class="mt-5">
		<div v-if="verified">
			<h2 class="text-h2">You are verified.</h2>
		</div>
		<div v-else>
			<h2>Request verification</h2>
			<div class="mb-5">
				<v-select
					prepend-icon="mdi-briefcase"
					placeholder="Select your category"
					:items="categories"
					:item-text="categoryName"
					:item-value="categoryId"
					v-model="verificationCategory"
				></v-select>
			</div>
			<div class="mb-5">
				<v-file-input
					v-model="file"
					color="deep-purple accent-4"
					counter
					accept="image/*"
					label="Add a picture of your personal document (ID, Passport, Driver's licence etc.)"
					prepend-icon="mdi-card-account-details"
					:show-size="1000"
				>
					<template v-slot:selection="{ index, text }">
						<v-chip
							v-if="index < 2"
							color="deep-purple accent-4"
							dark
							label
							small
						>
							{{ text }}
						</v-chip>
					</template>
				</v-file-input>
			</div>
			<v-btn @click="sendRequest()" color="primary" v-if="!inProgress">Request verification</v-btn>
			<v-progress-circular
				v-else
				indeterminate
				color="grey lighten-5"
			></v-progress-circular>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'VerificationSection',
		data: () => {
			return {
				inProgress: false
			}
		},
		mounted() {
			this.$store.dispatch('getVerificationCategories');
		},
		methods: {
			categoryName: category => category.name,
			categoryId: category => category.id,
			async sendRequest() {
				this.inProgress = true;
				await this.$store.dispatch('sendVerificationRequest');
				this.inProgress = false;
			}
		},
		computed: {
			verified: {
				get() {
					return false;
				}
			},
			categories: {
				get() {
					return this.$store.getters.verificationCategories;
				}
			},
			file: {
				get() {
					return this.$store.getters.file;
				},
				set(value) {
					this.$store.commit('setFile', value);
				}
			},
			verificationCategory: {
				get() {
					return this.$store.getters.verificationCategory;
				},
				set(value) {
					this.$store.commit('setVerificationCategory', value);
				}
			}
		}
	};
</script>

<style scoped>

</style>
