<template>
	<v-col cols="8">
		<v-row justify="center">
			<h2>Pending agent requests</h2>
		</v-row>
		<v-row justify="center" class="mt-6">
			<v-expansion-panels>
				<v-expansion-panel
					v-for="request in pendingRequests"
					:key="request.username"
				>
					<v-expansion-panel-header>
						{{ request.username }}
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<v-row>
							<v-col> Full name: {{ request.fullName }} </v-col>
						</v-row>
						<v-row>
							<v-col> Email: {{ request.email }} </v-col>
						</v-row>
						<v-row>
							<v-col> Phone number: {{ request.phoneNumber }} </v-col>
						</v-row>
						<v-row>
							<v-col> Gender: {{ capitalize(request.gender) }} </v-col>
						</v-row>
						<v-row>
							<v-col>
								Date of birth: {{ formatDate(request.dateOfBirth) }}
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								Website:
								<a :href="request.website">
									{{ request.website }}
								</a>
							</v-col>
						</v-row>
						<v-row>
							<v-col> Verified: {{ request.verified ? 'Yes' : 'No' }} </v-col>
						</v-row>
						<v-row justify="center">
							<v-btn
								color="primary"
								@click="accept(request.username)"
								class="mr-5 mb-4"
								>Accept</v-btn
							>
							<v-btn color="error" @click="decline(request.username)"
								>Decline</v-btn
							>
						</v-row>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
		</v-row>
	</v-col>
</template>

<script>
import moment from 'moment';

export default {
	name: 'RequestManagement',
	computed: {
		pendingRequests: {
			get() {
				return this.$store.getters.pendingRequests;
			}
		}
	},
	methods: {
		capitalize: function(string) {
			string = string.toLowerCase();
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		formatDate(dateString) {
			let date = moment(dateString);
			return date.format('MM.DD.YYYY');
		},
		async accept(username) {
			await this.$store.dispatch('acceptRequest', username);
		},
		async decline(username) {
			await this.$store.dispatch('declineRequest', username);
		}
	},
	async mounted() {
		await this.$store.dispatch('getAllPending');
	}
};
</script>

<style></style>
