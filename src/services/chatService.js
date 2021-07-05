import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { api } from '../api/index';

async function pushTextMessage(messageRequest) {
	try {
		let res = await axios.post(api.chat.textMessage, messageRequest);
		return res.data;
	} catch (err) {
		return err.response;
	}
}

async function pushTemporaryMessage(messageRequest) {
	try {
		let res = await axios.post(api.chat.temporaryMessage, messageRequest);
		return res.data;
	} catch (err) {
		return err.response;
	}
}

async function pushShareMessage(messageRequest) {
	try {
		let res = await axios.post(api.chat.shareMessage, messageRequest);
		return res.data;
	} catch (err) {
		return err.response;
	}
}

async function markAsOpened(messageId) {
	try {
		let res = await axios.put(
			api.chat.temporaryMessage + `/${messageId}/opened`
		);
		return res.data;
	} catch (err) {
		return err.response;
	}
}

async function fetchSessions() {
	try {
		let res = await axios.get(api.chat.session);
		return res.data;
	} catch (err) {
		return err.response;
	}
}

async function getMessagesBySessionId(sessionId) {
	try {
		let res = await axios.get(api.chat.session + `/${sessionId}/messages`);
		return res.data;
	} catch (err) {
		return err.response;
	}
}

async function acceptSession(sessionId) {
	try {
		let res = await axios.put(api.chat.session + `/${sessionId}/accept`);
		return res.data;
	} catch (err) {
		return err.response;
	}
}

async function declineSession(sessionId) {
	try {
		let res = await axios.put(api.chat.session + `/${sessionId}/decline`);
		return res.data;
	} catch (err) {
		return err.response;
	}
}

async function deleteSession(sessionId) {
	try {
		let res = await axios.delete(api.chat.session + `/${sessionId}`);
		return res.data;
	} catch (err) {
		return err.response;
	}
}

function listenToNewMessages(state, session) {
	let socket = new SockJS(api.chat.ws);
	let stompClient = Stomp.over(socket);

	if (session)
		stompClient.connect({}, () => {
			stompClient.subscribe(`/topic/${session.id}`, message => {
				state.commit('addMessage', JSON.parse(message.body));
			});
		});
}

export {
	pushTextMessage,
	pushTemporaryMessage,
	pushShareMessage,
	markAsOpened,
	fetchSessions,
	getMessagesBySessionId,
	listenToNewMessages,
	acceptSession,
	declineSession,
	deleteSession
};
