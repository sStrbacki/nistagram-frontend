import axios from 'axios';
import { api } from '../api';

async function getCategories() {
	try {
		return await axios.get(api.verification.categories);
	} catch (err) {
		return err.response;
	}
}

export {
	getCategories
}
