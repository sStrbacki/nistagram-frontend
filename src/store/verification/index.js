import { notifyError, notifySuccess } from '../../services/notificationService';
import { getCategories, sendVerificationRequest } from '../../services/verificationService';

export default {
	state: {
		verificationCategories: [],
		verificationCategory: ''
	},
	mutations: {
		setVerificationCategories: (state, categories) => {
			state.verificationCategories = categories;
		},
		setVerificationCategory: (state, category) => {
			state.verificationCategory = category;
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
		},
		sendVerificationRequest: async (context) => {
			await context.dispatch('postFile');
			if (!context.getters.fileUrl) {
				notifyError('Error uploading image!');
			} else {
				const request = {
					categoryId: context.getters.verificationCategory,
					imageUrl: context.getters.fileUrl
				}
				const response = await sendVerificationRequest(request);
				if (response.status >= 400) {
					notifyError(response.data);
				} else {
					notifySuccess('Verification request successfully sent!')
				}
			}
		}
	},
	getters: {
		verificationCategories: (state) => {
			return state.verificationCategories;
		},
		verificationCategory: (state) => {
			return state.verificationCategory;
		}
	}
}
