import {
	pushTextMessage,
	fetchSessions,
	getMessagesBySessionId,
	listenToNewMessages
} from '../../services/chatService';
import { notifyError } from '../../services/notificationService';

export default {
	state: {
		messageSessions: [],
		partner: '',
		textMessageContent: '',
		selectedSession: undefined,
		messages: []
	},
	mutations: {
		setMessageSessions: (state, value) => {
			state.messageSessions = value;
		},
		setTextMessageContent: (state, value) => {
			state.textMessageContent = value;
		},
		clearTextMessageContent: state => {
			state.textMessageContent = '';
		},
		setPartner: (state, value) => {
			state.partner = value;
		},
		setSelectedSession: (state, value) => {
			state.selectedSession = value;
		},
		setSessionMessages: (state, value) => {
			state.messages = value;
		},
		addMessage: (state, value) => {
			let messageIds = state.messages.map(message => {
				return message.id;
			});
			if (!messageIds.includes(value.id))
				state.messages = [...state.messages, value];
		}
	},
	actions: {
		pushTextMessage: async state => {
			let messageRequest = {
				sender: state.rootGetters.username,
				receiver: state.rootGetters.userQuery,
				text: state.getters.textMessageContent
			};
			let res = await pushTextMessage(messageRequest);
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('clearTextMessageContent');
			}
		},
		sendMessageToPartner: async state => {
			let messageRequest = {
				sender: state.rootGetters.username,
				receiver: state.getters.partner,
				text: state.getters.textMessageContent
			};

			let res = await pushTextMessage(messageRequest);
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('addMessage', res);
				state.commit('clearTextMessageContent');
			}
		},
		fetchMessageSessions: async state => {
			let res = await fetchSessions();
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setMessageSessions', res);
		},
		fetchMessages: async (state, sessionId) => {
			state.commit('setSelectedSession', sessionId);
			let res = await getMessagesBySessionId(sessionId);
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('setSessionMessages', res);
			}
		},
		setPartner: (state, partner) => {
			state.commit('setPartner', partner);
		},
		listenToSessionMessages: state => {
			listenToNewMessages(state, state.getters.selectedSession);
		}
	},
	getters: {
		textMessageContent: state => {
			return state.textMessageContent;
		},
		messageSessions: state => {
			return state.messageSessions;
		},
		partner: state => {
			return state.partner;
		},
		messages: state => {
			return state.messages;
		},
		selectedSession: state => {
			return state.selectedSession;
		}
	}
};
