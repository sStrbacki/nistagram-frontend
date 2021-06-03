export default {
	state: {
		registration: {
			username: '',
			email: '',
			password: '',
		},
		login: {
			username: '',
			password: '',
		},
	},
	mutations: {
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
		},
	},
	actions: {
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
		// register: async (context) => {
		// 	var response = await register(context.getters.registrationData);
		// 	storeAuthResponse(response);
		// 	if (response.statusCode) notifyError(response.message);
		// 	else router.push('/home');
		// },
		// login: async (context) => {
		// 	var response = await login(context.getters.loginData);
		// 	storeAuthResponse(response);
		// 	if (response.statusCode) notifyError(response.message);
		// 	else router.push('/home');
		// },
	},
	getters: {
		registrationUsername: (state) => {
			return state.registration.username;
		},
		registrationEmail: (state) => {
			return state.registration.email;
		},
		registrationPassword: (state) => {
			return state.registration.password;
		},
		loginUsername: (state) => {
			return state.login.username;
		},
		loginPassword: (state) => {
			return state.login.password;
		},
		loginData: (state) => {
			return state.login;
		},
		registrationData: (state) => {
			return state.registration;
		},
	},
};
