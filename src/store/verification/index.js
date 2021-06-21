import { notifyError, notifySuccess } from '../../services/notificationService';
import {
	acceptVerificationRequest, declineVerificationRequest,
	getCategories,
	getVerificationRequests,
	sendVerificationRequest
} from '../../services/verificationService';

export default {
	state: {
		verificationCategories: [],
		verificationCategory: '',
		verificationRequests: [],
	},
	mutations: {
		setVerificationCategories: (state, categories) => {
			state.verificationCategories = categories;
		},
		setVerificationCategory: (state, category) => {
			state.verificationCategory = category;
		},
		setVerificationRequests: (state, requests) => {
			state.verificationRequests = requests;
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
					notifySuccess('Verification request successfully sent!');
				}
			}
		},
		getVerificationRequests: async (context) => {
			const response = await getVerificationRequests();
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				context.commit('setVerificationRequests', response.data);
			}
		},
		acceptVerificationRequest: async (context, requestId) => {
			const response = await acceptVerificationRequest(requestId);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				notifySuccess('User successfully verified.');
			}
		},
		declineVerificationRequest: async (context, requestId) => {
			const response = await declineVerificationRequest(requestId);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				notifySuccess('Verification request declined.');
			}
		}
	},
	getters: {
		verificationCategories: (state) => {
			return state.verificationCategories;
		},
		verificationCategory: (state) => {
			return state.verificationCategory;
		},
		verificationRequests: (state) => {
			return state.verificationRequests;
		}
	}
}
