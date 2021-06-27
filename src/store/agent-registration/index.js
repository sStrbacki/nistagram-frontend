import {
	acceptAgentRequest,
	declineAgentRequest,
	getAllPending,
	getNonPromoted
} from '../../services/userService';
import { notifyError, notifySuccess } from '../../services/notificationService';

export default {
	state: {
		pendingRequests: [],
		nonPromotedUsers: []
	},
	mutations: {
		setPendingRequests: (state, value) => {
			state.pendingRequests = value;
		},
		setNonPromotedUsers: (state, value) => {
			state.nonPromotedUsers = value;
		},
		removePendingRequest: (state, username) => {
			state.pendingRequests = state.pendingRequests.filter(request => {
				return request.username !== username;
			});
		}
	},
	actions: {
		getAllPending: async state => {
			let response = await getAllPending();
			if (response.status >= 400) notifyError(response.data);
			else state.commit('setPendingRequests', response.data);
		},
		getNonPromoted: async state => {
			let response = await getNonPromoted();
			if (response.status >= 400) notifyError(response.data);
			else state.commit('setPromotedUsers', response.data);
		},
		acceptRequest: async (state, username) => {
			let response = await acceptAgentRequest(username);
			if (response.status >= 400) notifyError(response.data);
			else {
				state.commit('removePendingRequest', username);
				notifySuccess('Agent registration request accepted!');
			}
		},
		declineRequest: async (state, username) => {
			let response = await declineAgentRequest(username);
			if (response.status >= 400) notifyError(response.data);
			else {
				state.commit('removePendingRequest', username);
				notifySuccess('Agent registration request declined!');
			}
		}
	},
	getters: {
		pendingRequests: state => {
			return state.pendingRequests;
		},
		nonPromotedUsers: state => {
			return state.nonPromotedUsers;
		}
	}
};
