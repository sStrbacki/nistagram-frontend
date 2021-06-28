import {
	acceptAgentRequest,
	declineAgentRequest,
	getAllPending,
	getNonPromoted,
	promote
} from '../../services/userService';
import { notifyError, notifySuccess } from '../../services/notificationService';

export default {
	state: {
		pendingRequests: [],
		nonPromotedUsers: [],
		websiteInput: '',
		selectedUsername: ''
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
		},
		setWebsiteInput: (state, value) => {
			state.websiteInput = value;
		},
		setSelectedUsername: (state, value) => {
			state.selectedUsername = value;
		},
		removeNonPromotedUser: (state, username) => {
			state.nonPromotedUsers = state.nonPromotedUsers.filter(user => {
				return user.username !== username;
			});
		},
		clearAgentPromotionData: state => {
			state.websiteInput = '';
			state.selectedUsername = '';
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
			else state.commit('setNonPromotedUsers', response.data);
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
		},
		promoteUser: async state => {
			let response = await promote({
				username: state.getters.selectedUsername,
				website: state.getters.websiteInput
			});
			if (response.status >= 400) notifyError(response.data);
			else {
				state.commit('removeNonPromotedUser', state.getters.selectedUsername);
				state.commit('clearAgentPromotionData');
				notifySuccess('Agent successfully registered');
			}
		}
	},
	getters: {
		pendingRequests: state => {
			return state.pendingRequests;
		},
		nonPromotedUsers: state => {
			return state.nonPromotedUsers;
		},
		websiteInput: state => {
			return state.websiteInput;
		},
		selectedUsername: state => {
			return state.selectedUsername;
		}
	}
};
