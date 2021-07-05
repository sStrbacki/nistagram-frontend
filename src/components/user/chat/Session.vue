<template>
	<v-row justify="center" v-if="selectedSession">
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
							<v-list-item-subtitle class="ml-8" v-if="message.text">
								{{ message.text }}
							</v-list-item-subtitle>
							<v-list-item-subtitle v-else>
								<v-btn
									color="teal"
									rounded
									class="ml-8 mt-2"
									:disabled="!mediaOpeningEnabled(message)"
									@click="openMediaDialog(message)"
								>
									Open {{ isVideo(message.mediaUrl) ? 'video' : 'photo' }}
								</v-btn>
							</v-list-item-subtitle>
						</v-list>
					</v-card>
				</v-row>
			</div>
			<v-row class="mt-7" v-if="sessionAccepted">
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
			<v-row class="mt-7" v-if="sessionDeclined" justify="center">
				<v-alert border="bottom" colored-border type="warning" elevation="2">
					{{
						this.selectedSession.recipient === this.loggedUser
							? 'You declined this message request'
							: `This message request has been declined by ${this.selectedSession.recipient}`
					}}.
				</v-alert>
			</v-row>
			<v-row class="mt-7" v-if="waitingForAccept" justify="center">
				<v-btn class="mr-2" color="green lighten-2" @click="accept">
					Accept message request
				</v-btn>
				<v-btn class="mr-2" color="deep-orange lighten-1" @click="decline">
					Decline message request
				</v-btn>
				<v-btn color="red darken-2" @click="remove"
					>Delete message request</v-btn
				>
			</v-row>
		</v-col>
		<v-dialog v-model="mediaDialog" width="700" v-if="selectedMessage">
			<v-img
				:src="selectedMessage.mediaUrl"
				contain
				aspect-ratio="1"
				class="grey lighten-2"
				height="320px"
				v-if="!isVideo(selectedMessage.mediaUrl)"
			>
				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center">
						<v-progress-circular
							indeterminate
							color="grey lighten-5"
						></v-progress-circular>
					</v-row>
				</template>
			</v-img>
			<video-player v-else>
				<source :src="selectedMessage.mediaUrl" />
			</video-player>
		</v-dialog>
	</v-row>
</template>

<script>
import { videoPlayer } from 'vue-md-player';
import 'vue-md-player/dist/vue-md-player.css';
export default {
	name: 'Session',
	components: { videoPlayer },
	data() {
		return {
			mediaDialog: false,
			selectedMessage: null
		};
	},
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
		sessionAccepted() {
			return this.selectedSession.sessionStatus === 'ACCEPTED';
		},
		sessionDeclined() {
			return this.selectedSession.sessionStatus === 'DECLINED';
		},
		waitingForAccept() {
			return (
				this.selectedSession.sessionStatus === 'PENDING' &&
				this.loggedUser === this.selectedSession.recipient
			);
		},
		messages: {
			get() {
				return this.$store.getters.messages;
			}
		},
		selectedSession: {
			get() {
				return this.$store.getters.selectedSession;
			}
		},
		partner: {
			get() {
				return this.$store.getters.partner;
			},
			set(value) {
				this.$store.commit('setPartner', value);
			}
		},
		loggedUser: {
			get() {
				return this.$store.getters.username;
			}
		},
		messageSessions: {
			get() {
				return this.$store.getters.messageSessions;
			}
		}
	},
	watch: {
		async $route(to, from) {
			if (to.name === from.name)
				await this.fetchMessages(this.$route.params.sessionId);
		},
		messages() {
			this.$nextTick(() => this.scrollToBottom());
		},
		mediaDialog(newValue, oldValue) {
			if (
				!newValue &&
				oldValue &&
				this.loggedUser !== this.selectedMessage.sender
			)
				this.$store.dispatch('markAsOpened', this.selectedMessage);
		}
	},
	methods: {
		async fetchMessages(sessionId) {
			if (isNaN(sessionId)) this.$router.push('/home/chat');
			this.$store.dispatch('setSelectedSession', sessionId);
			await this.$store.dispatch('fetchMessages', sessionId);
			this.$store.dispatch('listenToSessionMessages');
			this.$nextTick(() => this.scrollToBottom());
		},
		isVideo(url) {
			return url.includes('videos');
		},
		accept() {
			this.$store.dispatch('acceptSession');
		},
		decline() {
			this.$store.dispatch('declineSession');
		},
		remove() {
			this.$store.dispatch('removeSession');
			this.$router.push({ name: 'NewMessage' });
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
			if (container) container.scrollTop = this.messages.length * 200;
		},
		mediaOpeningEnabled(message) {
			if (this.loggedUser === message.sender) return true;
			else return !message.opened;
		},
		openMediaDialog(message) {
			this.selectedMessage = message;
			this.mediaDialog = true;
		},
		async sendMessage() {
			await this.$store.dispatch('sendMessageToPartner');
		}
	},
	async mounted() {
		if (this.messageSessions.length === 0)
			this.$router.push({ name: 'NewMessage' });
		await this.fetchMessages(this.$route.params.sessionId);
	}
};
</script>

<style></style>
