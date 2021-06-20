import { notifyError } from '../../services/notificationService';
import { getCategories } from '../../services/verificationService';

export default {
	state: {
		verificationCategories: []
	},
	mutations: {
		setVerificationCategories: (state, categories) => {
			state.verificationCategories = categories;
		}
	},
	actions: {
		getVerificationCategories: async ({ commit }) => {
			const response = await getCategories();
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				commit('setVerificationCategories', response.data);
			}
		}
	},
	getters: {
		verificationCategories: (state) => {
			return state.verificationCategories;
		}
	}
}
