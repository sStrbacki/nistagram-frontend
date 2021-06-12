import { login, register, storeAuthResponse } from '@/services/authService';
import router from '@/router';
import { notifyError } from '@/services/notificationService';

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
			password: ''
		}
	},
	mutations: {
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
		setLoginPassword: ({ commit }, password) => {
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
		}
	},
	getters: {
		registrationFullName: state => {
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
