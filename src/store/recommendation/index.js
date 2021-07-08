import { followProfile, recommend } from '../../services/graphService';
import { notifyError } from '../../services/notificationService';

export default {
	state: {
		recommendations: []
	},
	mutations: {
		setRecommendations: (state, value) => {
			state.recommendations = value;
		},
		removeRecommendation: (state, username) => {
			state.recommendations = state.recommendations.filter(recommendation => {
				return recommendation.recommendationUsername !== username;
			});
		}
	},
	actions: {
		getRecommendations: async state => {
			let res = await recommend();
			if (res.status >= 400) notifyError(res.data);
			else state.commit('setRecommendations', res.data);
		},
		followRecommendedProfile: async (state, username) => {
			let res = await followProfile(username);
			if (res.status >= 400) notifyError(res.data);
			else state.commit('removeRecommendation', username);
		},
		removeRecommendation: (state, username) => {
			state.commit('removeRecommendation', username);
		}
	},
	getters: {
		recommendations: state => {
			return state.recommendations;
		}
	}
};
