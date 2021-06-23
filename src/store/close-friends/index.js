import {
	addCloseFriend,
	getCloseFriends,
	getFollowed,
	removeCloseFriend
} from '../../services/graphService';
import { notifyError } from '../../services/notificationService';

export default {
	state: {
		closeFriendSuggestions: [],
		closeFriends: []
	},
	mutations: {
		setCloseFriendCollection: (state, closeFriends) => {
			state.closeFriends = closeFriends;
		},
		addCloseFriendSuggestion: (state, suggestion) => {
			state.closeFriendSuggestions = [
				...state.closeFriendSuggestions,
				{ username: suggestion }
			];
		},
		setCloseFriendSuggestions: (state, suggestions) => {
			if (state.closeFriends.length == 0)
				state.closeFriendSuggestions = suggestions;
			suggestions.forEach(suggestion => {
				if (
					!state.closeFriends
						.map(closeFriend => {
							return closeFriend.username;
						})
						.includes(suggestion.username)
				)
					state.closeFriendSuggestions.push(suggestion);
			});
		},
		removeCloseFriendSuggestion: (state, username) => {
			state.closeFriendSuggestions = state.closeFriendSuggestions.filter(
				suggestion => {
					return suggestion.username != username;
				}
			);
		},
		addCloseFriend: (state, closeFriend) => {
			state.closeFriends = [...state.closeFriends, { username: closeFriend }];
		},
		removeCloseFriend: (state, username) => {
			state.closeFriends = state.closeFriends.filter(closeFriend => {
				return closeFriend.username != username;
			});
		}
	},
	actions: {
		addCloseFriend: async (state, username) => {
			let res = await addCloseFriend(username);
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('addCloseFriend', username);
				state.commit('removeCloseFriendSuggestion', username);
			}
		},
		removeCloseFriend: async (state, username) => {
			let res = await removeCloseFriend(username);
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('removeCloseFriend', username);
				state.commit('addCloseFriendSuggestion', username);
			}
		},
		getCloseFriends: async state => {
			let res = await getCloseFriends();
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('setCloseFriendCollection', res.data);
			}
		},
		getCloseFriendSuggestions: async state => {
			let res = await getFollowed();
			if (res.status >= 400) notifyError(res.data);
			else {
				state.commit('setCloseFriendSuggestions', res.data);
			}
		}
	},
	getters: {
		closeFriendCollection: state => {
			return state.closeFriends;
		},
		suggestions: state => {
			return state.closeFriendSuggestions;
		}
	}
};
