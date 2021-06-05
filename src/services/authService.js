import axios from 'axios';
import { api } from '../api/index';

async function login(loginRequest) {
	try {
		return await axios.post(api.auth.login, loginRequest, {responseType: 'text'});
	} catch (err) {
		return err.response;
	}
}
async function register(registrationRequest) {
	try {
		return await axios.post(api.user.register, registrationRequest, {responseType: 'text'});
	} catch (err) {
		return err.response;
	}
}
async function getMyProfile() {
	try {
		let res = await axios.get(api.auth.base);
		return res.data;
	} catch (err) {
		return err.response;
	}
}
function logout() {
	localStorage.removeItem('username');
	localStorage.removeItem('jwtToken');
}

function storeAuthResponse(authResponse) {
	localStorage.setItem('jwtToken', authResponse.headers.authorization);
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
