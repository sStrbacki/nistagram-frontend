import {
	login,
	register,
	storeAuthResponse,
	requestPasswordReset,
	resetPassword,
	activate
} from "@/services/authService";
import router from "@/router";
import {notifyError, notifySuccess} from "@/services/notificationService";

export default {
	state: {
		registration: {
			fullName: '',
			dateOfBirth: '',
			gender: '',
			phoneNumber: '',
			username: '',
			email: '',
			password: ''
		},
		login: {
			username: '',
			password: '',
		},
		requestPasswordReset: {
			email: ''
		},
		passwordReset: {
			password: '',
			uuid: ''
		},
		accountActivation: {
			uuid: ''
		}
	},
	mutations: {
		setAccountActivationUUID: (state, uuid) =>
			state.accountActivation.uuid = uuid
		,
		setPasswordResetPassword: (state, password) =>
			state.passwordReset.password = password
		,
		setPasswordResetUUID: (state, uuid) =>
			state.passwordReset.uuid = uuid
		,
		setRequestPasswordResetEmail: (state, email) =>
			state.requestPasswordReset.email = email
		,
		setRegistrationFullName: (state, fullName) => {
			state.registration.fullName = fullName;
		},
		setRegistrationDateOfBirth: (state, dateOfBirth) => {
			state.registration.dateOfBirth = dateOfBirth;
		},
		setRegistrationGender: (state, gender) => {
			state.registration.gender = gender;
		},
		setRegistrationPhoneNumber: (state, phoneNumber) => {
			state.registration.phoneNumber = phoneNumber;
		},
		setRegistrationUsername: (state, username) => {
			state.registration.username = username;
		},
		setRegistrationEmail: (state, email) => {
			state.registration.email = email;
		},
		setRegistrationPassword: (state, password) => {
			state.registration.password = password;
		},
		setLoginUsername: (state, username) => {
			state.login.username = username;
		},
		setLoginPassword: (state, password) => {
			state.login.password = password;
		}
	},
	actions: {
		setRequestPasswordResetEmail: ({commit}, email) =>
			commit('setRequestPasswordResetEmail', email)
		,
		setRegistrationFullName: ({ commit }, fullName) => {
			commit('setRegistrationFullName', fullName);
		},
		setRegistrationDateOfBirth: ({ commit }, dateOfBirth) => {
			commit('setRegistrationDateOfBirth', dateOfBirth);
		},
		setRegistrationGender: ({ commit }, gender) => {
			commit('setRegistrationGender', gender);
		},
		setRegistrationPhoneNumber: ({ commit }, phoneNumber) => {
			commit('setRegistrationPhoneNumber', phoneNumber);
		},
		setRegistrationUsername: ({ commit }, username) => {
			commit('setRegistrationUsername', username);
		},
		setRegistrationEmail: ({ commit }, email) => {
			commit('setRegistrationEmail', email);
		},
		setRegistrationPassword: ({ commit }, password) => {
			commit('setRegistrationPassword', password);
		},
		setLoginUsername: ({ commit }, username) => {
			commit('setLoginUsername', username);
		},
		setLoginPassword: ({commit}, password) => {
			commit('setLoginPassword', password);
		},
		register: async context => {
			const response = await register(context.getters.registrationData);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				storeAuthResponse(response);
				await router.push('/home');
			}
		},
		login: async context => {
			const response = await login(context.getters.loginData);
			if (response.status >= 400) {
				notifyError(response.data);
			} else {
				storeAuthResponse(response);
				await router.push('/home');
			}
		},
		requestPasswordReset: async (context) => {
			requestPasswordReset(context.getters.requestPasswordResetEmail)
				.then(() =>
					notifySuccess("Reset for " + context.getters.requestPasswordResetEmail + " requested.")
				)
				.catch(err => notifyError(err.response.data))
		},
		resetPassword: async(context) => {
			resetPassword({
				password: context.getters.passwordResetPassword,
				uuid: context.getters.passwordResetUUID
			})
			.then(() =>
				notifySuccess("Password successfully changed!")
			)
			.catch(err => notifyError(err.response.data))
		},
		activateAccount: async(context) => {
			activate(context.getters.accountActivationUUID)
				.then(() => notifySuccess("Account activated. You may now log in."))
				.catch(err => notifyError(err.response.data));
		}
	},
	getters: {
		accountActivationUUID: (state) => {
			return state.accountActivation.uuid;
		},
		passwordResetPassword: (state) => {
			return state.passwordReset.password;
		},
		passwordResetUUID: (state) => {
			return state.passwordReset.uuid;
		},
		requestPasswordResetEmail: (state) => {
			return state.requestPasswordReset.email
		},
		registrationFullName: (state) => {
			return state.registration.fullName;
		},
		registrationDateOfBirth: state => {
			return state.registration.dateOfBirth;
		},
		registrationGender: state => {
			return state.registration.gender;
		},
		setRegistrationPhoneNumber: state => {
			return state.registration.phoneNumber;
		},
		registrationUsername: state => {
			return state.registration.username;
		},
		registrationEmail: state => {
			return state.registration.email;
		},
		registrationPassword: state => {
			return state.registration.password;
		},
		loginUsername: state => {
			return state.login.username;
		},
		loginPassword: state => {
			return state.login.password;
		},
		loginData: state => {
			return state.login;
		},
		registrationData: state => {
			return state.registration;
		}
	}
};
