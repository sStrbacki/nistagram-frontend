import { notifyError } from '../../services/notificationService';
import {
	getAll,
	hide,
	listenToNotifications
} from '../../services/ssNotificationService';

export default {
	state: {
		notifications: []
	},
	mutations: {
		setNotifications: (state, value) => {
			state.notifications = value;
		},
		addNotification: (state, notificationDto) => {
			if (notificationDto.notification.target !== notificationDto.loggedUser)
				return;
			let notificationIds = state.notifications.map(notification => {
				return notification.id;
			});
			if (!notificationIds.includes(notificationDto.notification.id)) {
				state.notifications = [
					...state.notifications,
					notificationDto.notification
				];
			}
		},
		removeNotification: (state, notificationId) => {
			state.notifications = state.notifications.filter(notification => {
				return notification.id !== notificationId;
			});
		}
	},
	actions: {
		getNotifications: async state => {
			let res = await getAll();
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setNotifications', res);
		},
		hideNotification: async (state, notificationId) => {
			let res = await hide(notificationId);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('removeNotification', notificationId);
		},
		listenToNotifications: state => {
			listenToNotifications(state);
		}
	},
	getters: {
		notifications: state => {
			return state.notifications;
		}
	}
};
