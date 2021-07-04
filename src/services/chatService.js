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

function listenToNewMessages(state, sessionId) {
	let socket = new SockJS(api.notification.ws);
	let stompClient = Stomp.over(socket);

	stompClient.connect({}, () => {
		stompClient.subscribe(`/topic/${sessionId}`, message => {
			state.commit('addMessage', JSON.parse(message.body));
		});
	});
}

export {
	pushTextMessage,
	fetchSessions,
	getMessagesBySessionId,
	listenToNewMessages
};
