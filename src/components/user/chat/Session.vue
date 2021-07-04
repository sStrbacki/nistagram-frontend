<template>
	<v-row justify="center">
		<v-col cols="10">
			<v-row justify="center" class="mb-5">
				<h2>Exchanged messages with {{ partner }}</h2>
			</v-row>
			<div
				style="max-height: 400px"
				class="overflow-y-auto "
				id="scrolled-target"
			>
				<v-row
					no-gutters
					v-for="message in messages"
					:key="message.id"
					:justify="getAlignment(message.sender)"
				>
					<v-card min-width="200" class=" ml-2 mt-5 mr-2 mb-2">
						<v-list>
							<v-list-item-title>
								<v-icon class="ml-2">
									mdi-account-circle
								</v-icon>
								{{ message.sender }}
							</v-list-item-title>
							<v-list-item-subtitle class="ml-8">
								{{ message.text }}
							</v-list-item-subtitle>
						</v-list>
					</v-card>
				</v-row>
			</div>
			<v-row class="mt-7">
				<v-text-field
					v-model="textMessageContent"
					:append-outer-icon="submitEnabled ? 'mdi-send' : ''"
					filled
					clear-icon="mdi-close-circle"
					clearable
					label="Message"
					type="text"
					@click:append-outer="sendMessage"
					@click:clear="clearMessage"
				></v-text-field>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'Session',
	computed: {
		textMessageContent: {
			get() {
				return this.$store.getters.textMessageContent;
			},
			set(value) {
				this.$store.commit('setTextMessageContent', value);
			}
		},
		submitEnabled() {
			return this.textMessageContent;
		},
		messages: {
			get() {
				return this.$store.getters.messages;
			}
		},
		partner: {
			get() {
				return this.$store.getters.partner;
			}
		},
		loggedUser: {
			get() {
				return this.$store.getters.username;
			}
		}
	},
	watch: {
		$route(to, from) {
			if (to.name === from.name)
				this.fetchMessages(this.$route.params.sessionId);
		},
		messages() {
			this.$nextTick(() => this.scrollToBottom());
		}
	},
	methods: {
		async fetchMessages(sessionId) {
			if (isNaN(sessionId)) this.$router.push('/home/chat');
			await this.$store.dispatch('fetchMessages', sessionId);
			this.$store.dispatch('listenToSessionMessages');
			this.$nextTick(() => this.scrollToBottom());
		},
		getAlignment(sender) {
			if (sender === this.loggedUser) return 'end';
			else return 'start';
		},
		clearMessage() {
			this.message = '';
		},
		scrollToBottom() {
			let container = document.getElementById('scrolled-target');
			container.scrollTop = this.messages.length * 200;
		},
		async sendMessage() {
			await this.$store.dispatch('sendMessageToPartner');
		}
	},

	async mounted() {
		if (this.partner === '') {
			this.$router.push({ name: 'NewMessage' });
			return;
		}
		await this.fetchMessages(this.$route.params.sessionId);
	}
};
</script>

<style></style>
