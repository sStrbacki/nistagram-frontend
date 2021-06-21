import axios from 'axios';
import { api } from '../api';

async function getCategories() {
	try {
		return await axios.get(api.verification.categories);
	} catch (err) {
		return err.response;
	}
}

async function sendVerificationRequest(request) {
	try {
		return await axios.post(api.verification.base, request);
	} catch (err) {
		return err.response;
	}
}

async function getVerificationRequests() {
	try {
		return await axios.get(api.verification.admin);
	} catch (err) {
		return err.response;
	}
}

async function acceptVerificationRequest(requestId) {
	try {
		return await axios.put(api.verification.admin + '/' + requestId);
	} catch (err) {
		return err.response;
	}
}

async function declineVerificationRequest(requestId) {
	try {
		return await axios.delete(api.verification.admin + '/' + requestId);
	} catch (err) {
		return err.response;
	}
}

export {
	getCategories,
	sendVerificationRequest,
	getVerificationRequests,
	acceptVerificationRequest,
	declineVerificationRequest
}
