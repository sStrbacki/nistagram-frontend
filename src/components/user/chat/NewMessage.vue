<template>
	<v-row justify="center">
		<v-col cols="8">
			<v-row justify="center">
				<h2>Compose a new message</h2>
			</v-row>
			<v-row justify="center">
				<user-search mode="recepientSearch" />
			</v-row>
			<v-row class="mt-10">
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
import UserSearch from '../../common/search/UserSearch.vue';
export default {
	components: { UserSearch },
	name: 'NewMessage',
	data() {
		return {
			marker: true
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
			return this.$store.getters.userQuery && this.textMessageContent;
		}
	},
	methods: {
		clearMessage() {
			this.message = '';
		},
		async sendMessage() {
			await this.$store.dispatch('pushTextMessage');
		}
	}
};
</script>

<style></style>
