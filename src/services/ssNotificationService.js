import { api } from '../api/index';
import axios from 'axios';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

async function getAll() {
	try {
		let res = await axios.get(api.notification.base);
		return res.data;
	} catch (err) {
		return err.response.data;
	}
}
async function hide(notificationId) {
	try {
		let res = await axios.delete(api.notification.base + '/' + notificationId);
		return res.data;
	} catch (err) {
		return err.response.data;
	}
}
function listenToNotifications(state) {
	let socket = new SockJS(api.notification.ws);
	let stompClient = Stomp.over(socket);

	stompClient.connect({}, () => {
		stompClient.subscribe(
			`/user/${state.rootGetters.username}/queue/notify`,
			notification => {
				state.commit('addNotification', JSON.parse(notification.body));
			}
		);
	});
}

export { getAll, hide, listenToNotifications };
