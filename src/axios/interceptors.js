import { getJwtToken } from '../services/authService.js';
import axios from 'axios';

export default function interceptorsSetup() {
	axios.interceptors.request.use(function (config) {
		const jwt = getJwtToken();

		if (jwt) config.headers['Authorization'] = 'Bearer ' + jwt;

		return config;
	});
}
