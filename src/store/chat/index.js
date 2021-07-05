import {
	pushTextMessage,
	fetchSessions,
	getMessagesBySessionId,
	listenToNewMessages,
	acceptSession,
	declineSession,
	deleteSession,
	pushTemporaryMessage,
	markAsOpened
} from '../../services/chatService';
import { notifyError } from '../../services/notificationService';

export default {
	state: {
		messageSessions: [],
		partner: '',
		textMessageContent: '',
		selectedSession: null,
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
		markAsOpened: (state, messageId) => {
			let message = state.messages.filter(message => {
				return message.id === messageId;
			})[0];
			message.opened = true;
		},
		setPartner: (state, value) => {
			state.partner = value;
		},
		setSelectedSession: (state, sessionId) => {
			state.selectedSession = state.messageSessions.filter(session => {
				return session.id === sessionId;
			})[0];
		},
		setSessionMessages: (state, value) => {
			state.messages = value;
		},
		setSessionAccepted: (state, sessionId) => {
			let session = state.messageSessions.filter(session => {
				return session.id === sessionId;
			})[0];
			session.sessionStatus = 'ACCEPTED';
		},
		setSessionDeclined: (state, sessionId) => {
			let session = state.messageSessions.filter(session => {
				return session.id === sessionId;
			})[0];
			session.sessionStatus = 'DECLINED';
		},
		addMessage: (state, value) => {
			let messageIds = state.messages.map(message => {
				return message.id;
			});
			if (!messageIds.includes(value.id))
				state.messages = [...state.messages, value];
		},
		deleteSession: (state, sessionId) => {
			state.messageSessions = state.messageSessions.filter(session => {
				return session.id !== sessionId;
			});
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
		pushTemporaryMessage: async state => {
			let messageRequest = {
				sender: state.rootGetters.username,
				receiver: state.rootGetters.userQuery,
				mediaUrl: state.rootGetters.fileUrl
			};
			let res = await pushTemporaryMessage(messageRequest);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('clearTextMessageContent');
		},
		markAsOpened: async (state, message) => {
			let res = await markAsOpened(message.id);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('markAsOpened', message.id);
		},
		acceptSession: async state => {
			let res = await acceptSession(state.getters.selectedSession.id);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setSessionAccepted', state.getters.selectedSession.id);
		},
		declineSession: async state => {
			let res = await declineSession(state.getters.selectedSession.id);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setSessionDeclined', state.getters.selectedSession.id);
		},
		removeSession: async state => {
			let res = await deleteSession(state.getters.selectedSession.id);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('deleteSession', state.getters.selectedSession.id);
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
			let res = await getMessagesBySessionId(sessionId);
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('setSessionMessages', res);
			}
		},
		setPartner: (state, partner) => {
			state.commit('setPartner', partner);
		},
		setSelectedSession: (state, sessionId) => {
			state.commit('setSelectedSession', sessionId);
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
