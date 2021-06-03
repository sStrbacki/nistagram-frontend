import axios from 'axios';
import api from '../api/index';

async function login(loginRequest) {
	try {
		let res = await axios.post(api.auth.login, loginRequest);
		return res.data;
	} catch (err) {
		return err.response.data;
	}
}
async function register(registrationRequest) {
	try {
		let res = await axios.post(api.auth.register, registrationRequest);
		return res.data;
	} catch (err) {
		return err.response.data;
	}
}
async function getMyProfile() {
	try {
		let res = await axios.get(api.auth.base);
		return res.data;
	} catch (err) {
		return err.response.data;
	}
}
function logout() {
	localStorage.removeItem('username');
	localStorage.removeItem('jwtToken');
}

function storeAuthResponse(authResponse) {
	localStorage.setItem('username', authResponse.username);
	localStorage.setItem('jwtToken', authResponse.token);
}

function getUsername() {
	return localStorage.getItem('username');
}

function getJwtToken() {
	return localStorage.getItem('jwtToken');
}
function isLogged() {
	return !!getJwtToken();
}

export {
	login,
	register,
	logout,
	storeAuthResponse,
	getUsername,
	getJwtToken,
	isLogged,
	getMyProfile,
};
